from flask import request
import requests
import json


def createPlaylist():
    code = request.cookies.get("spoty_code")

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

    requests.post(
                "https://api.spotify.com/v1/users/ignaciovi21/playlists",
                headers={"Authorization": "Bearer {}".format(access_token2), "Content-Type": "application/json"}, json=data2)

        # print("THis is the client")
        # print(spotifyClient)
        # spotifyClient.user_playlist_create("ignaciovi21", "TestPlaylist", False)