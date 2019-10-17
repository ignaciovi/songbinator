from flask import Flask, request
from flask import render_template
from services.getSimilarArtists import getSimilarArtists
from services.getSongs import getSongs

app = Flask(__name__)

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


if __name__ == '__main__':
    app.run(debug=True)
