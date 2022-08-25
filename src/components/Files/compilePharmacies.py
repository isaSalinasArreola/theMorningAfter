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
    return data

pharm100 = getFeatures("src\pharmacies100.json")
pharm200 = getFeatures("src\pharmacies200.json")
pharm300 = getFeatures("src\pharmacies300.json")
pharm400 = getFeatures("src\pharmacies400.json")
pharm500 = getFeatures("src\pharmacies500.json")
pharm600 = getFeatures("src\pharmacies600.json")
pharm700 = getFeatures("src\pharmacies700.json")
pharm800 = getFeatures("src\pharmacies800.json")
pharm900 = getFeatures("src\pharmacies900.json")
pharm1000 = getFeatures("src\pharmacies1000.json")
pharm1100 = getFeatures("src\pharmacies1100.json")


def capitalizeFirst(str):
    arr = str.split(" ")
    fin = ""
    for word in arr:
      temp = word
      if "TX" not in word and "CVS" not in word and "HEB" not in word and "H.E.B" not in word:
        temp = word.lower()
        temp = word.capitalize()
      fin = fin + " " + temp
    return fin
  
pharmacies = []
for pharm in pharm100:
  pharmacies.append(pharm)
for pharm in pharm200:
  pharmacies.append(pharm)
for pharm in pharm300:
  pharmacies.append(pharm)
for pharm in pharm400:
  pharmacies.append(pharm)
for pharm in pharm500:
  pharmacies.append(pharm)
for pharm in pharm600:
  pharmacies.append(pharm)
for pharm in pharm700:
  pharmacies.append(pharm)
for pharm in pharm800:
  pharmacies.append(pharm)
for pharm in pharm900:
  pharmacies.append(pharm)
for pharm in pharm1000:
  pharmacies.append(pharm)
for pharm in pharm1100:
  pharmacies.append(pharm)


print(len(pharmacies))
tot = (len(pharm100) + len(pharm200) + len(pharm300) + len(pharm400) + 
  len(pharm500) + len(pharm600) + len(pharm700) + len(pharm800) +
  len(pharm900) + len(pharm1000) + len(pharm1100))
print(tot)

pharmDict = []


for pharmacy in pharmacies:
    count = 5
    response = muterun_js('src\components\Stats\PharmacyMap\locationCoordinates.js', pharmacy['address'])
    while(response.exitcode != 0 and count !=0):
        response = muterun_js('src\components\Stats\PharmacyMap\locationCoordinates.js', pharmacy['address'])
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
            "id": pharmacy['id'],
            "name": capitalizeFirst(pharmacy['name']),
            "phoneFormatted": pharmacy['phone'],
            "address": capitalizeFirst(pharmacy['address']),
            "city": capitalizeFirst(pharmacy['city']),
            "county": capitalizeFirst(pharmacy['county']),
            "website": pharmacy['website']
        }
      }

    pharmDict.append(feature)


print(len(pharmDict))

#send cities to JSON file to be read later
new_array = {"type": "FeatureCollection", "features": pharmDict}
file = open("src\components\Stats\PharmacyMap\major_pharrmacies.json","r+")
file.truncate(0)
file.close()

with open("src\components\Stats\PharmacyMap\major_pharrmacies.json", 'w') as outfile:
    json.dump(new_array, outfile)

