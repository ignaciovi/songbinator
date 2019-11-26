import React from 'react';
import Cookies from 'js-cookie';
import './App.css';
import 'bulma/css/bulma.css'
import { Login } from './Login';
import { AppComponent } from './AppComponent';

export default class App extends React.Component {

  render() {
    const logged = Cookies.get('spotify_code') === undefined ? false : true;
    
    return (
      <div className="App">
        {!logged ?
          <Login />
          : 
          <AppComponent />
        }   
      </div>
    );
  }
}


