import * as React from 'react';
import './Login.css';
import ReactGA from 'react-ga';

export class Login extends React.Component {
  redirect() {
    const redirect_url = ["https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=", 
                          window.location.href, "successLoginDone&scope=playlist-modify-public playlist-modify-private&response_type=code"]
    window.location.href = redirect_url.join("")
  }

  render() {
    ReactGA.initialize('G-T08XVM656Z');
    ReactGA.pageview('/');
    return (
        <div> 
          <div id="comeTop">
            <h1 className="title">Songbinator</h1>
            <h2 className="subtitle">Problem finding a playlist that satisfies the musical taste of you and your group of friends?
              <br />Give us some artists and we will create you a personalised playlist that everyone will like!
            </h2>
          </div>
          <div id="comeDown">
            <button className="button is-large is-success" onClick={() => this.redirect()}>
                Login
            </button>
            <br /><br />
            <h2 className="subtitle">Login with your Spotify account</h2>
          </div>
        </div>
    );
  }
}