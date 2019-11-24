from flask import request
import requests
import json
import flask


def createPlaylist():
    code = request.cookies.get("spotify_code")

    code_payload = {
        "grant_type": "authorization_code",
        "code": str(code),
        "redirect_uri": "http://127.0.0.1:5000/successLoginDone",
        "client_id":"b9147e7fb3954d24a264480d4a63700d",
        "client_secret":"45f9260cb0174d4aa27d58738e0e3791",
    }

    post_request = requests.post("https://accounts.spotify.com/api/token", data=code_payload)
    response_data = json.loads(post_request.text)
    access_token = response_data["access_token"]

    payload=  {
        "name": "New Playlist",
        "description": "New playlist description",
        "public": False
    }

    #TODO need to put objective user, not mine hardcoded
    created_playlist = requests.post(
                "https://api.spotify.com/v1/users/ignaciovi21/playlists",
                headers={"Authorization": "Bearer {}".format(access_token), "Content-Type": "application/json"}, json=payload)

    playlist_id = created_playlist.json()["id"]
    
    return {"token": access_token, "playlist_id": playlist_id}
    

