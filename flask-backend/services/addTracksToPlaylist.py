from flask import request
import requests

def addTracksToPlaylist(tracks, playlist):
    access_token = request.cookies.get("spotify_token")
    track_list = ["spotify:track:" + track["track_id"] for track in tracks]
    payload=  {
        "uris": track_list
    }

    requests.post(
                "https://api.spotify.com/v1/playlists/{}/tracks".format(playlist),
                headers={"Authorization": "Bearer {}".format(access_token), "Content-Type": "application/json"}, json=payload)

    return "Success"
