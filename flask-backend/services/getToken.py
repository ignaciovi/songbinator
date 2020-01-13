import requests
import json
from flask import make_response, render_template

def getToken(code, base_url):
	code_payload = {
		"grant_type": "authorization_code",
		"code": str(code),
		"redirect_uri": base_url,
		"client_id":"YOUR_CLIENT_ID",
		"client_secret":"YOUR_CLIENT_SECRET",
	}

	token_request = requests.post("https://accounts.spotify.com/api/token", data=code_payload)
	response_data = json.loads(token_request.text)
	access_token = response_data["access_token"]

	return access_token