import React from 'react';
import Cookies from 'js-cookie';
import './App.css';
import 'bulma/css/bulma.css'
import { Login } from './Login';
import { AppComponent } from './AppComponent';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-156008572-1');

export default class App extends React.Component {

  render() {
    const isLogged = Cookies.get('spotify_code') === undefined ? false : true;

    ReactGA.pageview(window.location.pathname + window.location.search)
    
    return (
      <div className="App">
        {isLogged ?
          <AppComponent/>
          :
          <Login/>         
        }
      </div>
    );
  }
}


