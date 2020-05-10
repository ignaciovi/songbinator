import * as React from 'react';
import './PlaylistCreated.css';
import { ArtistComponent } from './ArtistComponent';
import { IArtist } from './PlaylistCreationTool';

interface IStateProps { 
  artistList:IArtist[];
  updateArtistList:(payload:IArtist[]) => any
  };
  
export class ArtistsContainer extends React.Component<IStateProps> {
  render() {
    return (
      <div className="artistContainer">
        {this.props.artistList.length === 0 && <div className="artistText"> Type artist </div>}
        {this.props.artistList && this.props.artistList.map((item, index) =>
            (
              <ArtistComponent 
                index={index}
                name={item.name}
                artistList={this.props.artistList}
                updateArtistList={this.props.updateArtistList}
              />
            )
          )
        }
			</div>
    )
  }
}
