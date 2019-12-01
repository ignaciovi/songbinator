import * as React from 'react';
import './Login.css';

export class Login extends React.Component {
  redirect() {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=b9147e7fb3954d24a264480d4a63700d&redirect_uri=http://127.0.0.1:5000/successLoginDone&scope=playlist-modify-public playlist-modify-private playlist-read-private&response_type=code`
  }

  render() {
    return (
        <div> 
          <div id="comeTop">
            <h1 className="title">Songbinator</h1>
            <h2 className="subtitle">Problem finding a playlist that satisfies the musical taste of you and all your friends?
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