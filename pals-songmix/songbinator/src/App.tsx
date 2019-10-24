import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


interface IDispatchProps { 
  
};
interface IStateProps { 
  value: string 
};

export default class App extends React.Component<IDispatchProps, IStateProps> {
  constructor(props:IDispatchProps) {
    super(props);
    this.state = {value: ''};

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

  fetchArtists(name:string) {
    axios.get('/submitArtist?name=' + name)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  }

  render() {
    return (
      <div>
        
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <p>{this.state.value}</p>

         <button onClick={() => this.fetchArtists(this.state.value)}>Go</button>
        
      </div>
    );
  }
}