import * as React from 'react';
import './InputContainer.css';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import { IArtist } from './PlaylistCreationTool';

interface IPayload {
  tracks:ITrackDetails[]
  playlist:string
}
  
interface IStateProps { 
  artist:string 
  tracksState:ITrackDetails[]
  
  suggestedArtists:IArtist[]
};
  
interface ITrackDetails {
  track_name:string
  track_id:string
}

interface IProps {
  artistList:IArtist[]
  playlistName:string;
  updateArtistList:(payload:IArtist[]) => any
  updateIsLoading:(isLoading:boolean) => any
	updatePlaylistName:(playlistName:any) => any
	updatePlaylistId:(playlistId:string) => any
	updateProgress:(progress:number) => any
}
  
export class InputContainer extends React.Component<IProps,IStateProps> {
  constructor(props:IProps) {
		super(props);
		this.state = {artist:"", tracksState: [], suggestedArtists:[] };
  }
  
  onSuggestionsFetchRequested = (value:any) => {
		this.getSuggestions(value)
  };
  
  updateTrackState(track_collection:ITrackDetails[]){
		this.setState({
			tracksState:track_collection
		});
	}

	renderSuggestion = (suggestion:IArtist) => (
		<div>
			{suggestion.name}
		</div>
	);

	onChangeArtist = (event:any) => {
		this.setState({
			artist: event.target.value
		});
	};

	async getSuggestions(artist:any) {
		let fetched_suggestedArtists:any = await axios.get('/getSuggestedArtists?name=' + artist.value); 

		this.setState({suggestedArtists: fetched_suggestedArtists.data.suggestedArtists});
	}

	onChangePlaylist = (event:any) => {
    this.props.updatePlaylistName(event.target.value);
  }

	async createPlaylist() {
		let track_collection:any = []
		let related_artists:IArtist[] = []
		this.props.updateIsLoading(true)
	
		try {
			for (let input_artist of this.props.artistList) {
				let fetched_related_artists:any = await axios.get('/getSimilarArtists?name=' + input_artist.name + "&artists=" + this.props.artistList.length);    
				related_artists = related_artists.concat(fetched_related_artists.data.related_artists)
			}

			let related_artists_filter_dup:any = related_artists.reduce((unique:IArtist[], o:IArtist) => {
				if(!unique.some(obj => obj.name === o.name)) {
					unique.push(o);
				}
				return unique;
			},[]);
			
			let index = 0
			for (let related_artist of related_artists_filter_dup) {
				let fetched_tracks:any = await axios.get('/getTracks?name=' + related_artist.name);
				let progressNumber = Math.floor(index / related_artists_filter_dup.length * 100 * 0.9);
				index += 1;
				this.props.updateProgress(progressNumber);
				track_collection = track_collection.concat(fetched_tracks.data.tracks);
			}

			this.updateTrackState(track_collection)

			let playlist = await axios.get('/createPlaylist?name=' + this.props.playlistName);

			this.props.updatePlaylistId(playlist.data.playlist_id)  

			const payload:IPayload = {tracks:track_collection, 
				playlist:playlist.data.playlist_id}

			await axios.post('/addTracks', payload)

			this.props.updateIsLoading(false)

		} catch (error) {}
			//TODO Error handling

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
			this.props.artistList.forEach((item) =>
			{
				if (item.name === this.state.artist){
					isDuplicatedArtist = true;
				}
			})

			const disabledAdd = !isArtistInSuggested || isDuplicatedArtist || this.props.artistList.length > 15;

			return disabledAdd
		}
		
		const disabledAdd = getIsAddDisabled()

		const addArtist = (artist:string) => {
			let artistList:IArtist[] = this.props.artistList
			const mustInclude = (artistList.find(o => o.name === artist)) === undefined || artistList.length === 0;
			if (mustInclude) {
				artistList = artistList.concat({name:artist})  
				this.props.updateArtistList(artistList)
			}
			this.setState({artist:""})
			this.setState({suggestedArtists:[]})
		}
	
		let isGoDisabled:boolean = this.props.artistList.length === 0 || this.props.playlistName === "";

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
			onChange: this.onChangeArtist,
			onKeyDown: onKeyDown
      };
      
    return (
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
        {this.props.artistList.length > 0 && <input className="input" type="text" onChange={this.onChangePlaylist} value={this.props.playlistName} placeholder="Playlist name"></input>}
      </div>
    )
  }
}
