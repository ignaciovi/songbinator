import React from 'react';
import './App.css';
import axios from 'axios';
import 'bulma/css/bulma.css'
// import { Button } from "react-bulma-components";
import ContentLoader, { Facebook } from "react-content-loader";


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

const MyLoader = () => (
  <ContentLoader>
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
);

const MyFacebookLoader = () => <Facebook />;

const App2 = () => (
  <>
    <MyLoader />
    <MyFacebookLoader />
  </>
);

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

    this.setState({value:"true"})  
 
    
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
      this.setState({value:"false"})  
 
    } catch (error) {}
  }

  render() {
    return (
      <div className="searchFields">
        {this.state.value !== "true" ? <div><input type="text" className="input is-primary" value={this.state.value} onChange={this.handleChange} placeholder="Artist Name" />
        {this.state.tracks_state.tracks && this.state.tracks_state.tracks.map((item) =>
          (
            <p>{item.track_name}</p>
          ))}

         <button className="button" onClick={() => this.fetchTracks(this.state.value)}>Go</button>
         </div> : <p>Loading...</p>}
         
      </div>
    );
  }
}


