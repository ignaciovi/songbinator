from flask import request
import requests
import json
import flask


def addTracksToPlaylist(tracks, token, playlist):
    track_list = ["spotify:track:" + track["track_id"] for track in tracks["tracks"]]
    payload=  {
        "uris": track_list
    }

    requests.post(
                "https://api.spotify.com/v1/playlists/{}/tracks".format(playlist),
                headers={"Authorization": "Bearer {}".format(token), "Content-Type": "application/json"}, json=payload)

    return "Success"
