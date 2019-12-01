import requests
import json
from flask import make_response, render_template

def getToken(code):
	code_payload = {
		"grant_type": "authorization_code",
		"code": str(code),
		"redirect_uri": "http://127.0.0.1:5000/successLoginDone",
		"client_id":"b9147e7fb3954d24a264480d4a63700d",
		"client_secret":"45f9260cb0174d4aa27d58738e0e3791",
	}

	token_request = requests.post("https://accounts.spotify.com/api/token", data=code_payload)
	response_data = json.loads(token_request.text)
	access_token = response_data["access_token"]

	return access_token
