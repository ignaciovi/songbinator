from flask import Flask, request
from flask import render_template
from random import shuffle
import spotipy.oauth2 as oauth2
import requests

def getSongs(artist_name):

  creds = oauth2.SpotifyClientCredentials(client_id="c2d07b756064444495ab44c7d14d4a81", client_secret="c6bae7d2398d4098b0d1435d7a7cf486")
  token = creds.get_access_token()


  spotify_id_request = requests.get(
          "https://api.spotify.com/v1/search?q={}&type=artist".format(artist_name),
          headers={"Authorization": "Bearer {}".format(token)}).json()

  artist_id = spotify_id_request["artists"]["items"][0]["id"]

  spotify_id_request = requests.get(
  "https://api.spotify.com/v1/artists/{}/top-tracks?country=US".format(artist_id),
  headers={"Authorization": "Bearer {}".format(token)}).json()



  # Get track ids
  if spotify_id_request:
    songs = ([{"track_name": track["name"], "track_id": track["id"]} for track in spotify_id_request["tracks"]])
    if (len(songs) > 5):
      songs_json = {"tracks": songs[0:5]}

    return songs_json