import React from 'react';
import Cookies from 'js-cookie';
import './App.css';
import axios from 'axios';
import 'bulma/css/bulma.css'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
//import { Button, InputProps } from "react-bulma-components";

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

interface IDispatchProps { 
};

interface IStateProps { 
  artist: string 
  tracks_state:ITracks
  loader:boolean
  number_artists: number
  artist_list:IArtist[]
  suggested_artists:IArtist[]
};

export default class App extends React.Component<IDispatchProps, IStateProps> {
  constructor(props:IDispatchProps) {
    super(props);
    this.state = {artist: '', tracks_state: {tracks:[{track_name:"", track_id:""}]},
     loader:false, number_artists:1, artist_list:[], suggested_artists:[]};

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
    try {
      let playlist = await axios.get('/createPlaylist');
    } catch (error) {}

  }

  async fetchTracks(input_artists:IArtist[]) {
    let fetched_related_artists:any = {related_artists:[]};
    let fetched_tracks:any = {tracks:[]};
    let track_collection:any = []
    let track_collection_dict:any = {tracks:[]};

    this.setState({loader:true})  
 
    try {
      for (let input_artist of input_artists) {
        fetched_related_artists = await axios.get('/getSimilarArtists?name=' + input_artist.name);    

        let related_artists:IArtist[] = fetched_related_artists.data.related_artists

        for (let related_artist of related_artists) {
          fetched_tracks = await axios.get('/getSongs?name=' + related_artist.name);
          track_collection = track_collection.concat(fetched_tracks.data.tracks)  
        }

        if (track_collection) {
          track_collection_dict.tracks = track_collection
        }
      }
    } catch (error) {}
    
      this.setState({tracks_state:track_collection_dict})  
      this.setState({loader:false})  

      // We can call here the playlist creation and add the first song to the playlist


      // We are loading in another way
      // let login = await axios.get('/login');
      // if (login) {
      //   let createPlaylist = await axios.get('/successLoginDone');
      // }
 
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
    
    return (
      <div className="searchFields">

        {!logged ?       
          <div>
            <button className="button"><a
              href={`https://accounts.spotify.com/authorize?client_id=b9147e7fb3954d24a264480d4a63700d&redirect_uri=http://127.0.0.1:5000/successLoginDone&scope=playlist-modify-public playlist-modify-private playlist-read-private&response_type=code`}
              >Login</a>
            </button>
          </div> : 
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
                  <button className="button" disabled={isGoDisabled} onClick={() => this.fetchTracks(this.state.artist_list)}>Go</button>

                  <button className="button" disabled={false} onClick={() => this.createPlaylist()}>Create playlist</button>
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
          </div> : <p>Loading...</p>}</div>}   
        </div>
    );
  }
}


