import * as React from 'react';
import './ArtistComponent.css';
import { IArtist } from './PlaylistCreationTool';

interface IParentProps { 
  name:string;
  index:number;
  artistList:IArtist[];
  updateArtistList:(payload:IArtist[]) => any
};

export class ArtistComponent extends React.Component<IParentProps> {
  removeArtist(index:number){
    const removedArtistList:IArtist[] = this.props.artistList
    removedArtistList.splice(index,1)
		this.props.updateArtistList(removedArtistList)
  }
  
  render() {
    return (
      <div className="box artistComponent" id="boxEffect" key={this.props.index}>
        <div className="selectedArtist">
          <p>{this.props.name}</p>
          <button className="button XButton" onClick={() => this.removeArtist(this.props.index)}>X</button>
        </div>
      </div>
    )
  }
}
