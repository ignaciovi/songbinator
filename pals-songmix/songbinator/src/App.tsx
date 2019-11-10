import React from 'react';
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

interface ISuggestedArtist {
  name:string
}

interface IDispatchProps { 
};

interface IStateProps { 
  artist: string 
  tracks_state:ITracks
  loader:boolean
  number_artists: number
  artist_list:string[]
  suggested_artists:ISuggestedArtist[]
};

export default class App extends React.Component<IDispatchProps, IStateProps> {
  constructor(props:IDispatchProps) {
    super(props);
    this.state = {artist: '', tracks_state: {tracks:[{track_name:"", track_id:""}]},
     loader:false, number_artists:1, artist_list:[], suggested_artists:[{name:""}]};

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeAutocomplete = this.handleChangeAutocomplete.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.addArtist = this.addArtist.bind(this);
    this.removeArtist = this.removeArtist.bind(this);
  }

  async handleChange(event:any) {
    let fetched_suggested_artists:any = {suggested_artists:[]};
    let fetched_suggested_artists_data:any[] = []
    let artist_name_input:string = event.target.value
    let artist_name_autocomplete:string = event.target.textContent
    let artist_name:string
  
    fetched_suggested_artists = await axios.get('/suggestedArtists?name=' + artist_name_input); 
    fetched_suggested_artists_data = fetched_suggested_artists.data.suggested_artists

    if (artist_name_autocomplete.length === 0) {
      artist_name = artist_name_input
    } else {
      artist_name = artist_name_autocomplete
    }

    this.setState({artist: artist_name});
    this.setState({suggested_artists: fetched_suggested_artists_data});
  }

  async handleChangeAutocomplete(event:any) {
    let artist_name_autocomplete:string = event.target.textContent

    this.setState({artist: artist_name_autocomplete});
  }

  handleIncrement() {
    this.setState({number_artists: this.state.number_artists + 1});
  }

  handleDecrement() {
    this.setState({number_artists: this.state.number_artists - 1});
  }

  addArtist(artist:string) {
    let artist_list:string[] = this.state.artist_list
    artist_list = artist_list.concat(artist)  
    this.setState({artist_list: artist_list})
  }

  removeArtist(index:number) {
    let artist_list:string[] = this.state.artist_list
    artist_list.splice(index,1)
    this.setState({artist_list: artist_list})
  }

  async fetchTracks(name:string) {
    let fetched_related_artists:any = {related_artists:[]};
    let fetched_tracks:any = {tracks:[]};
    let track_collection:any = []
    let track_collection_dict:any = {tracks:[]};

    this.setState({loader:true})  
 
    try {
      fetched_related_artists = await axios.get('/submitArtist?name=' + name);    
    } catch (error) {}

    let related_artists = fetched_related_artists.data.related_artists

    try {

      for (let artist of related_artists) {
        fetched_tracks = await axios.get('/getSongs?name=' + artist["name"]);
        track_collection = track_collection.concat(fetched_tracks.data.tracks)  
      }

      if (track_collection) {
        track_collection_dict.tracks = track_collection
      }
  
      this.setState({tracks_state:track_collection_dict})  
      this.setState({loader:false})  

      // let login = await axios.get('/login');
      // if (login) {
      //   // nothing
      // }
 
    } catch (error) {}
  }

  render() {
    let isAddDisabled:boolean = true
    this.state.suggested_artists.map((item) =>
    {
      if (item.name === this.state.artist && this.state.artist !== ""){
        isAddDisabled = false
    }})
    let isGoDisabled:boolean = this.state.artist_list.length > 0 ? false : true
    
    return (
      <div className="searchFields">

        {!this.state.loader ? <div className="columns layout">

        {/* <div className="column centered">
          <div className="box flex">
            <button className='button' onClick={this.handleIncrement}>+</button>
            Nº of artists
            <button className='button' onClick={this.handleDecrement}>-</button> 
          </div>        
        </div> */}

        

        <div className="column centered">
          <div className="box flex">
            <Autocomplete
            freeSolo
            options={this.state.suggested_artists}
            getOptionLabel={option => option.name}
            onChange={this.handleChangeAutocomplete}
            renderInput={params => (
              <TextField {...params} label="Artist Name" variant="outlined" fullWidth onChange={this.handleChange} />
            )}
          />
            {/* <input type="text" className="input is-primary" onChange={this.handleChange} placeholder="Artist Name" /> */}
            <button className="button" disabled={isAddDisabled} onClick={() => this.addArtist(this.state.artist)}>Add</button>
            <button className="button" disabled={isGoDisabled} onClick={() => this.fetchTracks(this.state.artist)}>Go</button>
          </div>


          {/* {this.state.artist !== "" && this.state.suggested_artists.map((item) => {
            return <p>{item.name}</p>
            }
          )
          } */}

          {this.state.tracks_state.tracks && this.state.tracks_state.tracks.map((item) =>
            (
              <p>{item.track_name}</p>
            ))
          }
        </div>
        <div className="column centered">
        {this.state.artist_list.length === 0 && <div className="artistText"> Insert artist </div>}
          {this.state.artist_list.map((item, index) =>
            (
              <div className="box" key={index}>
                <div className="selectedArtist">
                  <p>{item}</p>
                  <button className="button" onClick={() => this.removeArtist(index)}>X</button>
                  </div>
                </div>
            ))
          }
        </div> 
        </div> : <p>Loading...</p>}
         
      </div>
    );
  }
}


