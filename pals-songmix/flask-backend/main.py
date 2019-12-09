from flask import Flask, request, make_response, render_template
from services.getSimilarArtists import getSimilarArtists
from services.getTracks import getTracks
from services.getSuggestedArtists import getSuggestedArtists
from services.createPlaylist import createPlaylist
from services.addTracksToPlaylist import addTracksToPlaylist
from services.getToken import getToken
import webbrowser
import json
import requests
import flask
import os

app = Flask("__main__")
port = int(os.getenv('PORT', 8000))

@app.route('/')
def main():
   response = make_response(render_template('index.html'))
   response.set_cookie("spotify_code", "", expires=0)
   response.set_cookie("spotify_token", "", expires=0)
   return response

@app.route('/getSimilarArtists', methods = ['GET'])
def getSimilarArtistsResponse():
   content = request.args.get('name')
   artists_length = request.args.get('artists')
   return getSimilarArtists(content,artists_length)

@app.route('/getSuggestedArtists', methods = ['GET'])
def getSuggestedArtistsResponse():
   content = request.args.get('name')
   return getSuggestedArtists(content)

@app.route('/getTracks', methods = ['GET'])
def getTracksResponse():
   content = request.args.get('name')
   return getTracks(content)

@app.route('/createPlaylist')
def playlist():
   content = request.args.get('name')
   return createPlaylist(content)

@app.route('/addTracks', methods =  ['POST'])
def addTrack():
   return addTracksToPlaylist(request.get_json()["tracks"], request.get_json()["playlist"])

@app.route('/successLoginDone')
def successLoginDone():
   code = request.args['code']
   response = make_response(render_template('index.html'))
   response.set_cookie("spotify_code", code)
   access_token = getToken(code, request.base_url)
   response.set_cookie("spotify_token", access_token)
   return response

if __name__ == '__main__':
   # app.run(debug=True)
   app.run(host='0.0.0.0', port=port, debug=True)
