from flask import Flask, request
from random import shuffle
import requests

def getSimilarArtists(artist_name,artists_length):

    try:
        access_token = request.cookies.get("spotify_token")

        spotify_id_request = requests.get(
            "https://api.spotify.com/v1/search?q={}&type=artist".format(artist_name),
            headers={"Authorization": "Bearer {}".format(access_token)}).json()

        artist_id = spotify_id_request["artists"]["items"][0]["id"]

        spotify_related_artists_request = requests.get(
            "https://api.spotify.com/v1/artists/{}/related-artists".format(artist_id),
            headers={"Authorization": "Bearer {}".format(access_token)}).json()

        if spotify_related_artists_request:
            all_artists = [{"name": artist_name}]
            related_artists = [{"name": artist["name"]} for artist in spotify_related_artists_request["artists"]]
            if (len(related_artists) > 5):
                shuffle(related_artists)
            all_artists = all_artists + related_artists

            suggested_length = int(100 / ( 5 * int(artists_length)))

            related_artist_json = {"related_artists": all_artists[0:suggested_length]}

        return related_artist_json
    
    except Exception as e:
        print("Error in getSimilarArtists: ", e)
        return None
