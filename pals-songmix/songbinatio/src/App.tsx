import React from 'react';
import logo from './logo.svg';
import './App.css';



// interface IStateProps {
//   count: number;
//   name:string;
// };

// interface IDispatchProps {
//  setName: (name:string) => any
// };

// export default class App extends React.Component<any,IStateProps> {
//   constructor(props:IDispatchProps) {
//     super(props);
//     this.state = {
//       count:0,
//       name:"",
//     }
//     this.setName = this.setName.bind(this)
//   }

//   increment = () => {
//     this.setState({
//       count: (this.state.count + 1)
//     });
//   };

//   decrement = () => {
//     this.setState({
//       count: (this.state.count - 1)
//     });
//   };

//   setName(name:string) {
//     this.setState({
//       name
//     });
//   }

//   render () {
//     return (
//       <div>
//         <h1>{this.props.count}</h1>
//         <button onClick={this.increment}>Increment</button>
//         <button onClick={this.decrement}>Decrement</button>
//         <div>
//          <input type="text" name="name" onChange={(event) => this.props.setName(event.target.value)}/>
//          <p>{this.props.name}</p>
//        </div>
//       </div>
//     );
//   }
// }

// export default App;

// export default connect<IStateProps, IDispatchProps, {}>(App);

// export const FCCounterConnected = connect(
//   IStateProps,
//   IDispatchProps
// )(App);

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
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        <p>{this.state.value}</p>
      </form>
    );
  }
}