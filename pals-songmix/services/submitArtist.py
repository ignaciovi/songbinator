from flask import Flask, request
from flask import render_template
import spotipy.oauth2 as oauth2
import requests

def submitArtist():
    creds = oauth2.SpotifyClientCredentials(client_id="c2d07b756064444495ab44c7d14d4a81", client_secret="c6bae7d2398d4098b0d1435d7a7cf486")
    token = creds.get_access_token()

    if request.method == 'POST':
      artist_name = request.form.getlist('Name')[0]

    spotify_id_request = requests.get(
        "https://api.spotify.com/v1/search?q={}&type=artist".format(artist_name),
        headers={"Authorization": "Bearer {}".format(token)}).json()

    artist_id = spotify_id_request["artists"]["items"][0]["id"]

    spotify_id_request = requests.get(
        "https://api.spotify.com/v1/artists/{}/related-artists".format(artist_id),
        headers={"Authorization": "Bearer {}".format(token)}).json()

    if spotify_id_request:
        related_artists = [artist["name"] for artist in spotify_id_request["artists"]]

    return related_artists