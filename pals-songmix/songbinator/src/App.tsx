import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

interface IArtistTitle {
  related_artists:IArtists[]
}

interface IArtists {
  name:string
}

interface IDispatchProps { 
  
};
interface IStateProps { 
  value: string 
  similarArtists:IArtistTitle
};

export default class App extends React.Component<IDispatchProps, IStateProps> {
  constructor(props:IDispatchProps) {
    super(props);
    this.state = {value: '', similarArtists: {related_artists:[{name:""}]}};

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

  async fetchArtists(name:string) {
    let result:any = {related_artists:[]};
    try {
      result = await axios.get('/submitArtist?name=' + name);
      
    } catch (error) {
      
    }
    this.setState({similarArtists:result.data})
  }

  render() {
    return (
      <div>
        
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <p>{this.state.value}</p>
        {this.state.similarArtists.related_artists && this.state.similarArtists.related_artists.map((artist) =>
          (
            <p>{artist.name}</p>
          ))}

         <button onClick={() => this.fetchArtists(this.state.value)}>Go</button>
        
      </div>
    );
  }
}