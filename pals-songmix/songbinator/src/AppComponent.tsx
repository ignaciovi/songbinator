import * as React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import Cookies from 'js-cookie';

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
    token:string
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

  };

export class AppComponent extends React.Component<IDispatchProps, IStateProps> {
    constructor(props:IDispatchProps) {
        super(props);
        this.state = {artist:"", tracks_state: {tracks:[]},
         loader:false, artist_list:[], suggested_artists:[]};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeAutocomplete = this.handleChangeAutocomplete.bind(this);
        this.addArtist = this.addArtist.bind(this);
        this.removeArtist = this.removeArtist.bind(this);
      }

    async handleChange(event:any) {
        let fetched_suggested_artists:any = {suggested_artists:[]};
        let fetched_suggested_artists_data:any[] = []
        let artist_name_input:string = event.target.value
      
        fetched_suggested_artists = await axios.get('/suggestedArtists?name=' + artist_name_input); 
        fetched_suggested_artists_data = fetched_suggested_artists.data.suggested_artists
    
        this.setState({artist: artist_name_input});
        this.setState({suggested_artists: fetched_suggested_artists_data});
      }
    
      async handleChangeAutocomplete(event:any) {
        let artist_name_autocomplete:string = event.target.textContent
    
        this.setState({artist: artist_name_autocomplete});
      }
    
      addArtist(artist:string) {
        let artist_list:IArtist[] = this.state.artist_list
        artist_list = artist_list.concat({name:artist})  
        this.setState({artist_list: artist_list})
        this.setState({artist:""})
      }
    
      removeArtist(index:number) {
        let artist_list:IArtist[] = this.state.artist_list
        artist_list.splice(index,1)
        this.setState({artist_list: artist_list})
      }
    
      async createPlaylist() {
      
    
        let fetched_related_artists:any = {related_artists:[]};
        let fetched_tracks:any = {tracks:[]};
        let track_collection:any = []
        let track_collection_dict:any = {tracks:[]};
    
        this.setState({loader:true})  
     
        try {
          for (let input_artist of this.state.artist_list) {
            fetched_related_artists = await axios.get('/getSimilarArtists?name=' + input_artist.name);    
    
            let related_artists:IArtist[] = fetched_related_artists.data.related_artists
    
            for (let related_artist of related_artists) {
              fetched_tracks = await axios.get('/getSongs?name=' + related_artist.name);
              track_collection = track_collection.concat(fetched_tracks.data.tracks)  
            }
    
            if (track_collection) {
              track_collection_dict.tracks = track_collection.slice(0,5)
            }
          }
        } catch (error) {}
        
          this.setState({tracks_state:track_collection_dict})  
    
          let playlist = await axios.get('/createPlaylist');
    
          const payload:IPayload = {tracks:this.state.tracks_state, 
            token:playlist.data.token, 
            playlist:playlist.data.playlist_id}
    
          let add_track = await axios.post('/addTrack', payload)
    
          this.setState({loader:false})  
      }

  render() {

    let isAddDisabled:boolean = true
    this.state.suggested_artists && this.state.suggested_artists.map((item) =>
    {
      if (item.name === this.state.artist && this.state.artist !== ""){
        isAddDisabled = false
    }})
    let isGoDisabled:boolean = this.state.artist_list.length > 0 ? false : true
    let isDuplicatedArtist:boolean = false
    this.state.artist_list.map((item) =>
    {
      if (item.name === this.state.artist){
        isDuplicatedArtist = true
    }})

    const logged = Cookies.get('spotify_code') === undefined ? false : true;
    const playlistCreated = this.state.loader === false && this.state.tracks_state.tracks !== []

    return (
        <div>
            {!this.state.loader ? <div className="columns layout">   

            <div className="column centered">
              <div className="box flex">
                <Autocomplete
                freeSolo
                options={this.state.suggested_artists}
                getOptionLabel={option => option.name}
                onChange={this.handleChangeAutocomplete}
                
                renderInput={params => (
                  <TextField {...params} label="Artist Name" variant="outlined" fullWidth value={this.state.artist}
                  onChange={this.handleChange} />
                      )}
                />
                <div className="menuButtons">
                  <button className="button" disabled={isAddDisabled || isDuplicatedArtist} 
                    onClick={() => this.addArtist(this.state.artist)}>Add</button>

                  <button className="button" disabled={isGoDisabled} onClick={() => this.createPlaylist()}>Create playlist</button>
                </div>
              </div>

              {this.state.tracks_state.tracks && this.state.tracks_state.tracks.map((item) =>
                (
                  <p>{item.track_name}</p>
                ))
              }
            </div>

            <div className="column centered fixedSizeDiv">
              <div className="artistContainer">
                {this.state.artist_list.length === 0 && <div className="artistText"> Insert artist </div>}
                  {this.state.artist_list && this.state.artist_list.map((item, index) =>
                    (
                      <div className="box artistComponent" key={index}>
                        <div className="selectedArtist">
                          <p>{item.name}</p>
                          <button className="button" onClick={() => this.removeArtist(index)}>X</button>
                          </div>
                        </div>
                    ))
                  }
              </div>
            </div> 
          </div> : <p>Loading...</p>}</div>
    );
  }
}