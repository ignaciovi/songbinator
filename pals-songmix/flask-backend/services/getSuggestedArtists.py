from flask import Flask, request
from flask import render_template
import spotipy.oauth2 as oauth2
import requests

def getSuggestedArtists(artist_name):
    creds = oauth2.SpotifyClientCredentials(client_id="c2d07b756064444495ab44c7d14d4a81", client_secret="c6bae7d2398d4098b0d1435d7a7cf486")
    token = creds.get_access_token()

    spotify_id_request = requests.get(
        "https://api.spotify.com/v1/search?q={}*&type=artist&limit=5".format(artist_name),
        headers={"Authorization": "Bearer {}".format(token)}).json()


    if spotify_id_request:
        suggested_artists = [{"name": artist["name"]} for artist in spotify_id_request["artists"]["items"]]
        suggested_artists_json = {"suggested_artists": suggested_artists}



    return suggested_artists_json