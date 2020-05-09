import * as React from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './AppComponent.css';
import { ArtistComponent } from './ArtistComponent';

interface ITracks {
  tracks:ITrackDetails[]
}
  
interface ITrackDetails {
  track_name:string
  track_id:string
}
  
interface IArtist {
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
  loader:boolean
  artistList:IArtist[]
	suggestedArtists:IArtist[]
	playlistName:string
	progress:number
	playlistId:string
  };

export class AppComponent extends React.Component<IDispatchProps, IStateProps> {
	constructor(props:IDispatchProps) {
		super(props);
		this.state = {artist:"", tracksState: {tracks:[]},
			loader:false, artistList:[], suggestedArtists:[], playlistName:"",
			progress:0, playlistId:""};

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
    this.setState({playlistName: event.target.value});
  }

	async createPlaylist() {
		let fetched_related_artists:any = {related_artists:[]};
		let fetched_tracks:any = {tracks:[]};
		let track_collection:any = []
		let track_collection_dict:any = {tracks:[]};
		let related_artists:IArtist[] = []
		this.setState({loader:true})  
	
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
				index += 1;
				this.setState({progress:progress});
				track_collection = track_collection.concat(fetched_tracks.data.tracks);
			}

			if (track_collection) {
				track_collection_dict.tracks = track_collection
			}

			this.setState({tracksState:track_collection_dict})  

			let playlist = await axios.get('/createPlaylist?name=' + this.state.playlistName);

			this.setState({playlistId:playlist.data.playlist_id})  

			const payload:IPayload = {tracks:this.state.tracksState, 
				playlist:playlist.data.playlist_id}

			await axios.post('/addTracks', payload)

			this.setState({loader:false})

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
	
		let isGoDisabled:boolean = this.state.artistList.length === 0 || this.state.playlistName === "";
		const playlistCreated = this.state.loader === false && this.state.tracksState.tracks.length !== 0;

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
			<div>
				{!this.state.loader ?
				<div> 
					{!this.state.loader && !playlistCreated ?
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
							{this.state.artistList.length > 0 && <input className="input" type="text" onChange={this.onChangePlaylist} value={this.state.playlistName} placeholder="Playlist name"></input>}
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
					</div> : <h2 className="subtitle"> Playlist created! Search for "{this.state.playlistName}" in your Spotify App. 
					<br />Thank you! 
					<br /><br /><button className="button is-success"><a className="spotifyLink" href={"https://open.spotify.com/playlist/" + this.state.playlistId}>Open on Spotify Web</a></button></h2>}
        		</div> : <h2 className="subtitle">Loading... {this.state.progress}%</h2>}
			</div>
			);
		}
	}