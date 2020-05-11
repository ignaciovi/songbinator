import * as React from 'react';
import './ArtistsContainer.css';
import { ArtistComponent } from './ArtistComponent';
import { IArtist } from './PlaylistCreationTool';

interface IParentProps { 
  artistList:IArtist[];
  updateArtistList:(payload:IArtist[]) => any
  };
  
export class ArtistsContainer extends React.Component<IParentProps> {
  render() {
    return (
      <div className="artistContainer">
        {!this.props.artistList ? 
          <div className="artistText"> Type artist </div>
          :
          <div>{this.props.artistList && this.props.artistList.map((item, index) =>
            (
              <ArtistComponent 
                index={index}
                name={item.name}
                artistList={this.props.artistList}
                updateArtistList={this.props.updateArtistList}
              />
            ))}
          </div>
        }
      </div>
    )
  }
}
