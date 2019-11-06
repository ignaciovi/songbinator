import React from 'react';
import './App.css';
import axios from 'axios';

interface ITracks {
  tracks:ITrackDetails[]
}

interface ITrackDetails {
  track_name:string
  track_id:string
}

interface IDispatchProps { 
};

interface IStateProps { 
  value: string 
  tracks_state:ITracks
};

export default class App extends React.Component<IDispatchProps, IStateProps> {
  constructor(props:IDispatchProps) {
    super(props);
    this.state = {value: '', tracks_state: {tracks:[{track_name:"", track_id:""}]}};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event:any) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event:any) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  async fetchTracks(name:string) {
    let fetched_related_artists:any = {related_artists:[]};
    let fetched_tracks:any = {tracks:[]};
    let track_collection:any = []
    let track_collection_dict:any = {tracks:[]};
    
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
 
    } catch (error) {}
  }

  render() {
    return (
      <div>
        
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <p>{this.state.value}</p>
        {this.state.tracks_state.tracks && this.state.tracks_state.tracks.map((item) =>
          (
            <p>{item.track_name}</p>
          ))}

         <button onClick={() => this.fetchTracks(this.state.value)}>Go</button>
        
      </div>
    );
  }
}