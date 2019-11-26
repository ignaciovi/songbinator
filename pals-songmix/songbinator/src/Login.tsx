import * as React from 'react';
import './Login.css';

export class Login extends React.Component {
  redirect() {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=b9147e7fb3954d24a264480d4a63700d&redirect_uri=http://127.0.0.1:5000/successLoginDone&scope=playlist-modify-public playlist-modify-private playlist-read-private&response_type=code`

  }

  render() {
    return (
        <div> 
          {/* Green button and using bulma */}
            <button className="button" id="monitor" onClick={() => this.redirect()}>
                Login
            </button>
        </div>
    );
  }
}