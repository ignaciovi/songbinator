import requests
import json
from flask import make_response, render_template
from .params import params

def getToken(code, base_url):
	credentials = params()
	code_payload = {
		"grant_type": "authorization_code",
		"code": str(code),
		"redirect_uri": base_url,
		"client_id":credentials["client_id"],
		"client_secret":credentials["client_secret"],
	}

	token_request = requests.post("https://accounts.spotify.com/api/token", data=code_payload)
	response_data = json.loads(token_request.text)
	access_token = response_data["access_token"]

	return access_token