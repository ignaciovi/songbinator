from flask import Flask, request
from flask import render_template
from services.getSimilarArtists import getSimilarArtists
from services.getSongs import getSongs
from services.getSpotifyLogin import getSpotifyLogin
import webbrowser
import spotipy
import json
import requests
import spotipy.util as util
from spotipy import oauth2


app = Flask(__name__)

credentials = 0

# When accessing route / we will automatically run the code below
@app.route('/')
def start():
   return render_template('index.html')

@app.route('/submitArtist', methods = ['POST', 'GET'])
def getSimilarArtistsResponse():
   related_artists = getSimilarArtists()
   return render_template('result.html', message = related_artists)

@app.route('/getSongs', methods = ['POST', 'GET'])
def getSongsResponse():
   songs = getSongs()
   return render_template('result.html', message = songs)

@app.route('/successLogin')
def success():
   credentials = getSpotifyLogin()
   return render_template('successLogin.html')

@app.route('/successLoginDone')
def ok():
   # print(request)
   # auth_token = request.args['code']
   # # print("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
   # # print(auth_token)

   code = request.args['code']

   code_payload = {
        "grant_type": "authorization_code",
        "code": str(code),
        "redirect_uri": "http://127.0.0.1:5000/successLoginDone",
        "client_id":"b9147e7fb3954d24a264480d4a63700d",
        "client_secret":"45f9260cb0174d4aa27d58738e0e3791",
    }

   post_request = requests.post("https://accounts.spotify.com/api/token", data=code_payload)
   response_data = json.loads(post_request.text)
   access_token2 = response_data["access_token"]

   # access_token = oauth2.SpotifyOAuth(client_id= "b9147e7fb3954d24a264480d4a63700d", 
   #    client_secret= "45f9260cb0174d4aa27d58738e0e3791" , 
   #    redirect_uri = "http://127.0.0.1:5000/successLoginDone")

   # print("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
   # new_token = access_token.get_access_token(request.args['code'])
   # print(new_token)
   # print("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")

   data2=  {
      "name": "New Playlist",
      "description": "New playlist description",
      "public": False

   }

   requests.post(
            "https://api.spotify.com/v1/users/ignaciovi21/playlists",
            headers={"Authorization": "Bearer {}".format(access_token2), "Content-Type": "application/json"}, json=data2)

   #dumm = requests.get("https://api.spotify.com/v1/me", headers={"Authorization": "Bearer {}".format(new_token)})
   print("qqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
   #print(dumm)

   #spotipy.Spotify(auth=new_token).user_playlist_create("ignaciovi21", "TestPlaylist", False)


   return render_template('successLoginDone.html')

@app.route('/doubleok')
def doubleok():
   return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
