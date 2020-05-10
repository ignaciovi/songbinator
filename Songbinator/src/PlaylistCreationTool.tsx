import * as React from 'react';
import './PlaylistCreationTool.css';
import { ArtistComponent } from './ArtistComponent';
import { InputContainer } from './InputContainer';

export interface IArtist {
  name:string
}

interface IStateProps {
	artistList:IArtist[];
}
  
interface IProps {
	updateIsLoading:(isLoading:boolean) => any
	updatePlaylistName:(playlistName:any) => any
	updatePlaylistId:(playlistId:string) => any
	updateProgress:(progress:number) => any
	playlistName:string
}

export class PlaylistCreationTool extends React.Component<IProps, IStateProps> {
  constructor(props:IProps) {
		super(props);
		this.state = {artistList:[]};

		this.updateArtistList = this.updateArtistList.bind(this);
	}

	updateArtistList(artistList:IArtist[]){
		this.setState({
			artistList: artistList
		});
	}

  render() {
    return (
			<div className="mainComponent">   
				<InputContainer 
					updateArtistList={this.updateArtistList}
					updateIsLoading = {this.props.updateIsLoading}
					updatePlaylistName = {this.props.updatePlaylistName}
					updatePlaylistId = {this.props.updatePlaylistId}
					updateProgress = {this.props.updateProgress}
					playlistName={this.props.playlistName}
					artistList={this.state.artistList}
				/> 

				<div className="artistContainer">
					{this.state.artistList.length === 0 && <div className="artistText"> Type artist </div>}
					{this.state.artistList && this.state.artistList.map((item, index) =>
							(
								<ArtistComponent 
									index={index}
									name={item.name}
									artistList={this.state.artistList}
									updateArtistList={this.updateArtistList}
								/>
						)
							)
						}
				</div>
			</div>
    )
  }
}
