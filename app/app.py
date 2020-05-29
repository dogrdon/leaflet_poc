from flask import Flask, render_template
from redivis import bigquery
import os
import sys
import json
import configparser


# get our configurations
config = configparser.ConfigParser()
config.read("config.ini")
API_KEY = config.get("API_CONFIG", "API_KEY")

# instatiate our Flask app
app = Flask(__name__)

# setup and connect to our datasource
os.environ["REDIVIS_API_TOKEN"] = API_KEY
client = bigquery.Client()


# landing page route
@app.route("/")
def home_map():
    """"""
    return render_template("index.html")


# single route for getting our data to send to client
@app.route("/getdata")
def data_time():

    """Getting and shaping the data from the data platform"""

    """Just one table, this can be parameterized
	   also only fetching a subset of columns"""
    QUERY = """
		SELECT geom, voltage, status, alignment 
        FROM modilab.uganda_geodata.umeme_rea_power_distribution_lines_2018;
	"""
    query_job = client.query(QUERY)

    # begin building and shaping response to geojson
    geojson = []
    for row in query_job:
        geojson.append(row)
    data = {"type": "FeatureCollection", "features": []}

    for geo in geojson:
        geom, voltage, status, alignment = geo
        new_geojson_feature = {
            "type": "Feature",
            "geometry": json.loads(geom),
            "properties": {
                "voltage": voltage,
                "status": status,
                "alignment": alignment,
            },
        }

        data["features"].append(new_geojson_feature)

    # print a sample of what we are sending to client for a check
    sample = data["features"][:10]
    print(sample)

    return data


if __name__ == "__main__":
    # run the app

    app.run(debug=True)
