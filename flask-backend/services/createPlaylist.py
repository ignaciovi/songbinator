from flask import request
import requests
import json


def createPlaylist(playlist):

    try:
        access_token = request.cookies.get("spotify_token")

        payload=  {
            "name": playlist,
            "description": "Playlist created with Songbinator",
            "public": False
        }

        spotify_user_request = requests.get(
            "https://api.spotify.com/v1/me",
            headers={"Authorization": "Bearer {}".format(access_token)}).json()
    
        created_playlist = requests.post(
                    "https://api.spotify.com/v1/users/{}/playlists".format(spotify_user_request["id"]),
                    headers={"Authorization": "Bearer {}".format(access_token), "Content-Type": "application/json"}, json=payload)

        playlist_id = created_playlist.json()["id"]
        
        return {"playlist_id": playlist_id}
    
    except Exception as e:
        print("Error in createPlaylist: ", e)
        return None

