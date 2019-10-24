import React from 'react';
import logo from './logo.svg';
import './App.css';

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

  render() {
    return (
      <div>
        
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <p>{this.state.value}</p>
        <form action = "/submitArtist" method = "POST">
         <p>Artist for songs<input type = "text" name = "related_artists" /></p>
         <p><input type = "submit" value = "submit" /></p>
         </form>
        
      </div>
    );
  }
}