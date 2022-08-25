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

dict = {}

tot = 0

for pharm in pharmacies:
    cnty = pharm["county"]
    if dict.get(cnty, 0) == 0:
        dict[cnty] = {
            "walgreens" : 0,
            "cvs" : 0,
            "randalls": 0,
            "sam" : 0,
            "kroger": 0,
            "tom thumb": 0,
            "costco": 0,
            "heb": 0,
            "walmart": 0,
            "other": 0
        }
    entry = dict.get(cnty)
    name = ""
    for i in entry:
        if i in pharm["name"].lower():
            num = dict.get(cnty)[i]
            dict.get(cnty).update({ i : (num+ 1)})
        else:
            num = dict.get(cnty)["other"]
            dict.get(cnty).update({ "other" : (num+ 1)})
    tot = tot + 1

for i in dict:
    highest =""
    num = 0
    for brand in dict.get(i):
        if dict.get(i)[brand] > num and brand not in "other":
            num = dict.get(i)[brand]
            highest = brand
    dict.get(i).update({"winner": highest})

print(dict)

print(tot)

