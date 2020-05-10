import * as React from 'react';
import './PlaylistCreationTool.css';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { ArtistComponent } from './ArtistComponent';

interface ITracks {
  tracks:ITrackDetails[]
}
  
interface ITrackDetails {
  track_name:string
  track_id:string
}
  
export interface IArtist {
  name:string
}
  
interface IPayload {
  tracks:ITracks
  playlist:string
}
  
interface IDispatchProps { 
};
  
interface IStateProps { 
  artist:string 
  tracksState:ITracks
  artistList:IArtist[]
	suggestedArtists:IArtist[]
};

interface IProps {
	updateIsLoading:(isLoading:boolean) => any
	updatePlaylistName:(playlistName:any) => any
	updatePlaylistId:(playlistId:string) => any
	updateProgress:(progress:number) => any
	playlistName:string
}

export class PlaylistCreationTool extends React.Component<IProps, IStateProps> {
  constructor(props:IProps) {
		super(props);
		this.state = {artist:"", tracksState: {tracks:[]},
			artistList:[], suggestedArtists:[] };

		this.updateArtistList = this.updateArtistList.bind(this);
	}

	updateArtistList(artistList:IArtist[]){
		this.setState({artistList: artistList})
	}

	renderSuggestion = (suggestion:IArtist) => (
		<div>
			{suggestion.name}
		</div>
	);

	onChange = (event:any) => {
		this.setState({
			artist: event.target.value
		});
	};

	async getSuggestions(artist:any) {
		let fetched_suggestedArtists:any = {suggestedArtists:[]};
		let fetched_suggestedArtists_data:any[] = []
	
		fetched_suggestedArtists = await axios.get('/getSuggestedArtists?name=' + artist.value); 
		fetched_suggestedArtists_data = fetched_suggestedArtists.data.suggestedArtists

		this.setState({suggestedArtists: fetched_suggestedArtists_data});
	}

	onSuggestionsFetchRequested = (value:any) => {
		this.getSuggestions(value)
	};

	onChangePlaylist = (event:any) => {
    this.props.updatePlaylistName(event.target.value);
  }

	async createPlaylist() {
		let fetched_related_artists:any = {related_artists:[]};
		let fetched_tracks:any = {tracks:[]};
		let track_collection:any = []
		let track_collection_dict:any = {tracks:[]};
		let related_artists:IArtist[] = []
		this.props.updateIsLoading(true)
	
		try {
			for (let input_artist of this.state.artistList) {
				fetched_related_artists = await axios.get('/getSimilarArtists?name=' + input_artist.name + "&artists=" + this.state.artistList.length);    
				related_artists = related_artists.concat(fetched_related_artists.data.related_artists)
			}

			let related_artists_filter_dup = related_artists.reduce((unique:IArtist[], o:IArtist) => {
				if(!unique.some(obj => obj.name === o.name)) {
					unique.push(o);
				}
				return unique;
			},[]);
			
			// Unable to perform .forEach with async calls. Also .entries() doesnt work in TS
			let index = 0
			for (let related_artist of related_artists_filter_dup) {
				fetched_tracks = await axios.get('/getTracks?name=' + related_artist.name);
				let progress = Math.floor(index / related_artists_filter_dup.length * 100 * 0.9);
				console.log(progress)
				index += 1;
				this.props.updateProgress(progress);
				track_collection = track_collection.concat(fetched_tracks.data.tracks);
			}

			if (track_collection) {
				track_collection_dict.tracks = track_collection
			}

			this.setState({tracksState:track_collection_dict})  

			let playlist = await axios.get('/createPlaylist?name=' + this.props.playlistName);

			this.props.updatePlaylistId(playlist.data.playlist_id)  

			const payload:IPayload = {tracks:this.state.tracksState, 
				playlist:playlist.data.playlist_id}

			await axios.post('/addTracks', payload)

			this.props.updateIsLoading(false)

		} catch (error) {}

		}

  render() {
    const getIsAddDisabled = () => {
			let isArtistInSuggested:boolean = false
			this.state.suggestedArtists.forEach((item) =>
			{
				if (item.name === this.state.artist){
					isArtistInSuggested = true;
				}
			})

			let isDuplicatedArtist:boolean = false;
			this.state.artistList.forEach((item) =>
			{
				if (item.name === this.state.artist){
					isDuplicatedArtist = true;
				}
			})

			const disabledAdd = !isArtistInSuggested || isDuplicatedArtist || this.state.artistList.length > 15;

			return disabledAdd
		}
		
		const disabledAdd = getIsAddDisabled()

		const addArtist = (artist:string) => {
			let artistList:IArtist[] = this.state.artistList
			const mustInclude = (artistList.find(o => o.name === artist)) === undefined || artistList.length === 0;
			if (mustInclude) {
				artistList = artistList.concat({name:artist})  
				this.setState({artistList: artistList})
			}
			this.setState({artist:""})
			this.setState({suggestedArtists:[]})
		}
	
		let isGoDisabled:boolean = this.state.artistList.length === 0 || this.props.playlistName === "";

		const onKeyDown = (event:any) => {
			if (event.key === 'Enter' && !disabledAdd) {
				addArtist(this.state.artist)
			}
		};

		const onSuggestionSelected = (value:any) => {		
			this.setState({
				artist: value.target.innerText
			});

			addArtist(value.target.innerText)
		};

		const inputProps = {
			placeholder: 'Type artist',
			value:this.state.artist,
			onChange: this.onChange,
			onKeyDown: onKeyDown
			};

    return (
					<div className="mainComponent">   
						<div className="box mainBox">
							<div className="inputBox">
								<div className="menuInput">
									<Autosuggest
										suggestions={this.state.suggestedArtists}
										onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
										getSuggestionValue={option => option.name}
										renderSuggestion={this.renderSuggestion}
										onSuggestionSelected={onSuggestionSelected}
										inputProps={inputProps}
									/>
								</div>
								<div className="menuButtons">
									<button className="button" disabled={disabledAdd} 
											onClick={() => addArtist(this.state.artist)}>Add</button>
									<button className="button" disabled={isGoDisabled} onClick={() => this.createPlaylist()}>Create playlist</button>
								</div>
							</div>
							{this.state.artistList.length > 0 && <input className="input" type="text" onChange={this.onChangePlaylist} value={this.props.playlistName} placeholder="Playlist name"></input>}
						</div>

						{this.state.tracksState.tracks && this.state.tracksState.tracks.map((item) =>
								(
								<p>{item.track_name}</p>
								))
						}

						<div className="artistContainer">
								{this.state.artistList.length === 0 && <div className="artistText"> Type artist </div>}
								{this.state.artistList && this.state.artistList.map((item, index) =>
										(
											<ArtistComponent 
												index={index}
												name={item.name}
												artistList={this.state.artistList}
												updateArtistList={this.updateArtistList}
											/>
									)
									)
								}
						</div>
					</div>
    )
  }
}
