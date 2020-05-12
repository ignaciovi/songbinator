import axios from 'axios';
import { IPayload } from '../components/InputContainer/InputContainer';

export const getSuggestionsService = async (artist:string) => await axios.get('/getSuggestedArtists?name=' + artist);
export const getSimilarArtistsService = async (artistName:string, artistListLenght:number) => await axios.get('/getSimilarArtists?name=' + artistName + "&artists=" + artistListLenght);
export const createPlaylistService = async (playlistName:string) => await axios.get('/createPlaylist?name=' + playlistName);
export const getTracksService = async (artistName:string) => await axios.get('/getTracks?name=' + artistName);
export const addTracksService = async (payload:IPayload) => await axios.post('/addTracks', payload)