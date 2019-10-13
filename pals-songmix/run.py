from flask import Flask, request
from flask import render_template
from services.submitArtist import submitArtist

app = Flask(__name__)

@app.route('/')
def student():
   return render_template('index.html')

@app.route('/submitArtist',methods = ['POST', 'GET'])
def result():
   related_artists = submitArtist()
   return render_template('result.html', message = related_artists)

if __name__ == '__main__':
    app.run(debug=True)
