from flask import Flask, request
from flask import render_template
import requests

def getSuggestedArtists(artist_name):
    access_token = request.cookies.get("spotify_token")

    spotify_id_request = requests.get(
        "https://api.spotify.com/v1/search?q={}*&type=artist&limit=5".format(artist_name),
        headers={"Authorization": "Bearer {}".format(access_token)}).json()


    if spotify_id_request:
        suggested_artists = [{"name": artist["name"]} for artist in spotify_id_request["artists"]["items"]]
        suggested_artists_json = {"suggestedArtists": suggested_artists}

    return suggested_artists_json