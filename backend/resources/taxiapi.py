from flask import Flask, render_template,jsonify
import requests
from flask_smorest import Blueprint
from flask.views import MethodView
from datetime import datetime
from datetime import timedelta
from datetime import timezone

blp = Blueprint("Taxi Availability", "taxiavailability", description="Operations on Taxi Availability")

@blp.route("/taxiavailability")
class taxiapi(MethodView):
    def get(self):
        """ Retrieve Data from Taxi Availability API """
        api_url = "https://api.data.gov.sg/v1/transport/taxi-availability"  # Actual API URL
        response = requests.get(api_url)

        if response.status_code == 200:
            data = response.json() # Parse the JSON response
            # Process the data and pass it to HTML template
            return data
        else:
            return "Error fetching data from the API"