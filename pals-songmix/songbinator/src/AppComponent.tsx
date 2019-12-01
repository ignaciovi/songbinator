import * as React from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './AppComponent.css';

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
    tracks_state:ITracks
    loader:boolean
    artist_list:IArtist[]
		suggested_artists:IArtist[]
		playlistName:string
  };

export class AppComponent extends React.Component<IDispatchProps, IStateProps> {
	constructor(props:IDispatchProps) {
		super(props);
		this.state = {artist:"", tracks_state: {tracks:[]},
			loader:false, artist_list:[], suggested_artists:[], playlistName:""};

		this.addArtist = this.addArtist.bind(this);
		this.removeArtist = this.removeArtist.bind(this);
	}
	
	addArtist(artist:string) {
		let artist_list:IArtist[] = this.state.artist_list
		artist_list = artist_list.concat({name:artist})  
		this.setState({artist_list: artist_list})
		this.setState({artist:""})
		this.setState({suggested_artists:[]})
	}

	removeArtist(index:number) {
		let artist_list:IArtist[] = this.state.artist_list
		artist_list.splice(index,1)
		this.setState({artist_list: artist_list})
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
		let fetched_suggested_artists:any = {suggested_artists:[]};
		let fetched_suggested_artists_data:any[] = []
	
		fetched_suggested_artists = await axios.get('/getSuggestedArtists?name=' + artist.value); 
		fetched_suggested_artists_data = fetched_suggested_artists.data.suggested_artists

		this.setState({suggested_artists: fetched_suggested_artists_data});
	}

	onSuggestionsFetchRequested = (value:any) => {
		this.getSuggestions(value)
	};

	onSuggestionSelected = (value:any) => {
		this.setState({
			artist: value.target.innerText
		});
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
			for (let input_artist of this.state.artist_list) {
				fetched_related_artists = await axios.get('/getSimilarArtists?name=' + input_artist.name + "&artists=" + this.state.artist_list.length);    
				related_artists = related_artists.concat(fetched_related_artists.data.related_artists)
			}

			let related_artists_filter_dup = related_artists.reduce((unique:IArtist[], o:IArtist) => {
				if(!unique.some(obj => obj.name === o.name)) {
					unique.push(o);
				}
				return unique;
			},[]);

			for (let related_artist of related_artists_filter_dup) {
				fetched_tracks = await axios.get('/getTracks?name=' + related_artist.name);
				track_collection = track_collection.concat(fetched_tracks.data.tracks)  
			}

			if (track_collection) {
				track_collection_dict.tracks = track_collection
			}

			this.setState({tracks_state:track_collection_dict})  

			let playlist = await axios.get('/createPlaylist?name=' + this.state.playlistName);

			const payload:IPayload = {tracks:this.state.tracks_state, 
				playlist:playlist.data.playlist_id}

			await axios.post('/addTracks', payload)

			this.setState({loader:false})

		} catch (error) {}

		}

	render() {
		let isAddDisabled:boolean = true
		this.state.suggested_artists && this.state.suggested_artists.map((item) =>
		{
			if (item.name === this.state.artist && this.state.artist !== ""){
				isAddDisabled = false
		}})
		let isGoDisabled:boolean = this.state.artist_list.length === 0 || this.state.playlistName === "";
		let isDuplicatedArtist:boolean = false
		this.state.artist_list.map((item) =>
		{
			if (item.name === this.state.artist){
				isDuplicatedArtist = true
			}
		})

		const playlistCreated = this.state.loader === false && this.state.tracks_state.tracks.length !== 0;
		const disabledAdd = isAddDisabled || isDuplicatedArtist || this.state.artist_list.length > 20;

		const onKeyDown = (event:any) => {
			if (event.key === 'Enter' && !disabledAdd) {
				this.addArtist(this.state.artist)
			}
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
										suggestions={this.state.suggested_artists}
										onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
										getSuggestionValue={option => option.name}
										renderSuggestion={this.renderSuggestion}
										onSuggestionSelected={this.onSuggestionSelected}
										inputProps={inputProps}
									/>
								</div>
								<div className="menuButtons">
									<button className="button" disabled={disabledAdd} 
											onClick={() => this.addArtist(this.state.artist)}>Add</button>
									<button className="button" disabled={isGoDisabled} onClick={() => this.createPlaylist()}>Create playlist</button>
								</div>
							</div>
							<input className="input" type="text" onChange={this.onChangePlaylist} value={this.state.playlistName} placeholder="Playlist name"></input>
						</div>

						{this.state.tracks_state.tracks && this.state.tracks_state.tracks.map((item) =>
								(
								<p>{item.track_name}</p>
								))
						}

						<div className="artistContainer">
								{this.state.artist_list.length === 0 && <div className="artistText"> Type artist </div>}
								{this.state.artist_list && this.state.artist_list.map((item, index) =>
										(
										<div className="box artistComponent" id="boxEffect" key={index}>
												<div className="selectedArtist">
												<p>{item.name}</p>
												<button className="button XButton" onClick={() => this.removeArtist(index)}>X</button>
												</div>
												</div>
										)
									)
								}
						</div>
					</div> : <p className="artistText">Playlist created!</p>}
				</div> : <p className="artistText">Loading...</p>}
			</div>
			);
		}
	}