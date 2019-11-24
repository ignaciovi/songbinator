import * as React from 'react';

export class Login extends React.Component {

  render() {
    return (
        <div> 
            <button className="button">
                <a href={`https://accounts.spotify.com/authorize?client_id=b9147e7fb3954d24a264480d4a63700d&redirect_uri=http://127.0.0.1:5000/successLoginDone&scope=playlist-modify-public playlist-modify-private playlist-read-private&response_type=code`}
                >Login</a>
            </button>
        </div>
    );
  }
}