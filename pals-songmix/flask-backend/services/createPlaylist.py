
def createPlaylist(spotifyClient):
    print("THis is the client")
    print(spotifyClient)
    spotifyClient.user_playlist_create("ignaciovi21", "TestPlaylist", False)