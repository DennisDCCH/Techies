from flask import Flask, render_template
import requests
from flask_smorest import Blueprint


blp = Blueprint("Taxi Availability", "taxiavailability", description="Operations on Taxi Availability")

@blp.route('/taxiavailability')
def index():
    api_url = "https://api.data.gov.sg/v1/transport/taxi-availability"  # Actual API URL
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()  # Parse the JSON response
        # Process the data and pass it to HTML template
        return render_template('index.html', data=data)
    else:
        return "Error fetching data from the API"