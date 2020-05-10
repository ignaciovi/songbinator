import * as React from 'react';
import './PlaylistCreated.css';

interface IStateProps { 
  playlistName:string;
  playlistId:string;
  };
  
export class PlaylistCreated extends React.Component<IStateProps> {
  render() {
    return (
      <div>
        <h2 className="subtitle"> Playlist created! Search for "{this.props.playlistName}" in your Spotify App. 
					<br />Thank you! 
					<br /><br />
          <button className="button is-success"><a className="spotifyLink" href={"https://open.spotify.com/playlist/" + this.props.playlistId}>Open on Spotify Web</a></button>
          </h2>
      </div>
    )
  }
}
