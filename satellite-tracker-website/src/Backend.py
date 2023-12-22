import requests
import json
from flask import Flask, jsonify
from flask import request

# API inputs
Satellites = [58171, 58197, 58228, 58252]
altitude = 500 # Altitude in meters
days = 10 # Days visible, max 10
minVisibility = 60 # Seconds of visability
API_key = "ENTER-KEY" # Key generated from https://www.n2yo.com account

app = Flask(__name__)

@app.route('/backend', methods=['GET'])
def get_tasks():
    # Pulls the latitide/longitude data from the frontends GET request URL
    latitide = float(request.args.get('latitude'))
    longitude = float(request.args.get('longitude'))
    location_dict = {
        "latitude": latitide,
        "longitude": longitude
    }
    
    # Pulls days from the frontends GET request URL
    days = int(request.args.get('days'))
    
    # Writes latitide/longitude data to Location.JSON file
    writeFile =open("satellite-tracker-website\Location.json", 'w')
    writeFile.write(json.dumps(location_dict, indent=4, sort_keys=True))
    writeFile.close()
    
    # Set JSON file to Loading icon
    writeFile =open("satellite-tracker-website\VisualSatPasses.json", 'w')
    Loading_dict = {"1": {"info": {}, "passes": []}}
    writeFile.write(json.dumps(Loading_dict, indent=4, sort_keys=True))
    writeFile.close()
    
    i = 0
    response_dict = {}
    # Calls API for each satellite in array
    for item in Satellites:
        satellite = Satellites[i]
        getAPI =  "https://api.n2yo.com/rest/v1/satellite/visualpasses/{}/{}/{}/{}/{}/{}&apiKey={}".format(satellite, latitide, longitude, altitude, days, minVisibility, API_key)
        x = requests.get(getAPI, headers = {})
        
        # Convert json into dictionary
        response_dict[str(i+1)] = x.json() 
        i += 1
    # Write API response to JSON File
    writeFile =open("satellite-tracker-website\VisualSatPasses.json", 'w')
    writeFile.write(json.dumps(response_dict, indent=4, sort_keys=True))
    writeFile.close()
    return jsonify({'tasks': response_dict})

if __name__ == '__main__':
    app.run(debug=True, port=7000)