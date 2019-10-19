import spotipy
import spotipy.util as util
import webbrowser
# from services.createPlaylist import createPlaylist

def getSpotifyLogin():
	token = util.prompt_for_user_token(
					username="ignaciovi21",
					scope="playlist-modify-public playlist-modify-private",
					client_id="b9147e7fb3954d24a264480d4a63700d",
					client_secret="45f9260cb0174d4aa27d58738e0e3791",
					redirect_uri="http://127.0.0.1:5000/successLoginDone")

	
	spotify = spotipy.Spotify(auth=token)


	return spotify

	#webbrowser.open(spotify)

	#testlogin = spotipy.Spotify(auth=token)

	# spotipy.Spotify(auth=token).user_playlist_create("ignaciovi21", "TestPlaylist", False)
