from flask import request
from random import shuffle
import requests

def getTracks(artist_name):
  access_token = request.cookies.get("spotify_token")

  spotify_id_request = requests.get(
          "https://api.spotify.com/v1/search?q={}&type=artist".format(artist_name),
          headers={"Authorization": "Bearer {}".format(access_token)}).json()

  artist_id = spotify_id_request["artists"]["items"][0]["id"]

  spotify_tracks_request = requests.get(
  "https://api.spotify.com/v1/artists/{}/top-tracks?country=US".format(artist_id),
  headers={"Authorization": "Bearer {}".format(access_token)}).json()

  if spotify_id_request:
    songs = ([{"track_name": track["name"], "track_id": track["id"]} for track in spotify_tracks_request["tracks"]])
    if (len(songs) > 5):
      songs_json = {"tracks": songs[0:5]}
    else:
      songs_json = {"tracks": songs}

    return songs_json