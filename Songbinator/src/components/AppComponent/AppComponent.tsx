import * as React from 'react';
import { PlaylistCreated } from '../PlaylistCreated/PlaylistCreated';
import { PlaylistCreationTool } from '../PlaylistCreationTool/PlaylistCreationTool';
import './AppComponent.css';

interface IStateProps { 
	isLoading:boolean
	playlistName:string
	playlistId:string
	progressNumber:number
};

export class AppComponent extends React.Component<{},IStateProps> {
	constructor(props:any) {
		super(props);
		this.state = { isLoading:false, playlistName:"",
			progressNumber:0, playlistId:""};
			this.updateIsLoading= this.updateIsLoading.bind(this);
			this.updatePlaylistName = this.updatePlaylistName.bind(this);
			this.updatePlaylistId = this.updatePlaylistId.bind(this);
			this.updateProgress = this.updateProgress.bind(this);
	}

	updateIsLoading(isLoading:boolean){
		this.setState({isLoading: isLoading})
	}

	updatePlaylistName(playlistName:string){
		this.setState({playlistName: playlistName})
	}

	updatePlaylistId(playlistId:string){
		this.setState({playlistId: playlistId})
	}

	updateProgress(progressNumber:number){
		this.setState({progressNumber: progressNumber})
	}
	
	render() {
		return (
			<div>
				{this.state.isLoading ?
				<h2 className="subtitle">Loading... {this.state.progressNumber}%</h2>
				:
				<div> 
					{this.state.progressNumber === 0 ?
					<PlaylistCreationTool
						updateIsLoading = {this.updateIsLoading}
						updatePlaylistName = {this.updatePlaylistName}
						updatePlaylistId = {this.updatePlaylistId}
						updateProgress = {this.updateProgress}
						playlistName={this.state.playlistName}
					/> 
					: 
					<PlaylistCreated
						playlistName={this.state.playlistName}
						playlistId={this.state.playlistId}
					/>
					}
				</div>
				}
			</div>
		);
	}
}
