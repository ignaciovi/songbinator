from flask import request
import requests
import json


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
    access_token2 = response_data["access_token"]

    data2=  {
        "name": "New Playlist",
        "description": "New playlist description",
        "public": False

    }

    #TODO need to put objective user, not mine hardcoded
    created_playlist = requests.post(
                "https://api.spotify.com/v1/users/ignaciovi21/playlists",
                headers={"Authorization": "Bearer {}".format(access_token2), "Content-Type": "application/json"}, json=data2)

    print(created_playlist.json()["id"])

    playlist_id = created_playlist.json()["id"]

    # spotify_id_request = requests.get(
    #     "https://api.spotify.com/v1/me/playlists",
    #     headers={"Authorization": "Bearer {}".format(access_token2)}).json()

    # for playlist in spotify_id_request["items"]:
    #     if playlist["name"] == "New Playlist":
    #         print(playlist["name"])
    #         playlist_id = playlist["id"]

    data2=  {
        "uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"]
    }

    requests.post(
                "https://api.spotify.com/v1/playlists/{}/tracks".format(playlist_id),
                headers={"Authorization": "Bearer {}".format(access_token2), "Content-Type": "application/json"}, json=data2)

    

    

