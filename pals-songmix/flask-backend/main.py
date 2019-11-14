from flask import Flask, request, make_response
from flask import render_template
from services.getSimilarArtists import getSimilarArtists
from services.getSongs import getSongs
from services.getSpotifyLogin import getSpotifyLogin
from services.getNothing import getNothing
from services.getSuggestedArtists import getSuggestedArtists
from services.createPlaylist import createPlaylist
import webbrowser
import spotipy
import json
import requests
import spotipy.util as util
from spotipy import oauth2


app = Flask("__main__")

credentials = 0

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/getSimilarArtists', methods = ['GET'])
def getSimilarArtistsResponse():
   content = request.args.get('name')
   return getSimilarArtists(content)

@app.route('/suggestedArtists', methods = ['GET'])
def getSuggestedArtistsResponse():
   content = request.args.get('name')
   return getSuggestedArtists(content)

@app.route('/getSongs', methods = ['GET'])
def getSongsResponse():
   content = request.args.get('name')
   return getSongs(content)


@app.route('/login')
def login():
   return getSpotifyLogin()

@app.route('/playlist')
def playlist():
   return createPlaylist()

@app.route('/successLoginDone')
def ok():
   code = request.args['code']

   # code_payload = {
   #      "grant_type": "authorization_code",
   #      "code": str(code),
   #      "redirect_uri": "http://127.0.0.1:5000/successLoginDone",
   #      "client_id":"b9147e7fb3954d24a264480d4a63700d",
   #      "client_secret":"45f9260cb0174d4aa27d58738e0e3791",
   #  }

   # post_request = requests.post("https://accounts.spotify.com/api/token", data=code_payload)
   # response_data = json.loads(post_request.text)
   # access_token2 = response_data["access_token"]

   # data2=  {
   #    "name": "New Playlist",
   #    "description": "New playlist description",
   #    "public": False

   # }

   # requests.post(
   #          "https://api.spotify.com/v1/users/ignaciovi21/playlists",
   #          headers={"Authorization": "Bearer {}".format(access_token2), "Content-Type": "application/json"}, json=data2)

   response = make_response(render_template('index.html'))
   response.set_cookie("spoty_code", code)
   return response

@app.route('/doubleok')
def doubleok():
   return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
