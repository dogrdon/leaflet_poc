FLASK + Leaflet.js MVP
======================

## Clone the repo

```
git clone git@github.com:dogrdon/leaflet_poc.git
```

## CD to the application dir

```
cd leaflet_poc/app
```

## Install dependencies:

### Flask
```
pip install flask --user
```

### Redivis python client
```
pipenv install -e "git+https://github.com/redivis/redipy.git#egg=redivis-bigquery&subdirectory=bigquery"
```


## Set API_KEY

```
echo "[API_CONFIG]\n\nAPI_KEY = '{YOUR REDIVIS API KEY HERE}'" > ./config.ini
```


## Start server:

```
python app.py
```

## View the demo by navigating to `http://localhost:5000`
