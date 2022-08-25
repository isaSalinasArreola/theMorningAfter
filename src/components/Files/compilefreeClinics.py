#format for geoJSON each pharmacy needs the following
# {
        #"type": "Feature",
        #"geometry": {
        #  "type": "Point",
        #  "coordinates": [
        #    -77.034084142948,
        #    38.909671288923
        #  ]
        #},
        #"properties": {
        #  "phoneFormatted": "(202) 234-7336",
        #  "phone": "2022347336",
        #  "address": "1471 P St NW",
        #  "city": "Washington DC",
        #  "country": "United States",
        #  "crossStreet": "at 15th St NW",
        #  "postalCode": "20005",
        #  "state": "D.C."
        #}
      #}

import json
from Naked.toolshed.shell import muterun_js

def getFeatures(file):
    # Opening JSON file
    f = open(file)   
    # returns JSON object as 
    # a dictionary
    data = json.load(f)
    # Closing file
    f.close()
    return data['features']

freeClinics = getFeatures("src\\components\\Stats\\titleXclinics.json")

pharmDict = []


for clinic in freeClinics:
    count = 5
    response = muterun_js('src\components\Stats\PharmacyMap\locationCoordinates.js', clinic['address'])
    while(response.exitcode != 0 and count !=0):
        response = muterun_js('src\components\Stats\PharmacyMap\locationCoordinates.js', clinic['address'])
        count = count - 1
    if(response.exitcode != 0):
      print("HELP")
    str = response.stdout.decode("utf-8")
    str = str.replace(",", "")
    arr = str.split(" ")
    lat = float(arr[2])
    lng = float(arr[4])
    feature = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            lng, #lng
            lat #lat
          ]
        },
        "properties": {
            "name": clinic['name'],
            "phoneFormatted": clinic['phone'],
            "address": clinic['address'],
            "city": clinic['city'],
            "website": clinic['link'],
            "zipcode": clinic['zipcode'],
            "hours": clinic['hours'],
            "details": clinic["details"]
        }
      }

    pharmDict.append(feature)


print(len(pharmDict))

#send cities to JSON file to be read later
new_array = {"type": "FeatureCollection", "features": pharmDict}
file = open("src\components\Stats\PharmacyMap\clinic_Locations.json","r+")
file.truncate(0)
file.close()

with open("src\components\Stats\PharmacyMap\clinic_Locations.json", 'w') as outfile:
    json.dump(new_array, outfile)

