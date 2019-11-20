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

@app.route('/createPlaylist')
def playlist():
   return createPlaylist()

@app.route('/successLoginDone')
def ok():
   code = request.args['code']
   response = make_response(render_template('index.html'))
   response.set_cookie("spotify_code", code)
   return response

if __name__ == '__main__':
    app.run(debug=True)
