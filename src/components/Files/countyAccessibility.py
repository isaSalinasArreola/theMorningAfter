from distutils.log import info
import json
import math
import csv
import re

def getFeatures(file):
    # Opening JSON file
    f = open(file)   
    # returns JSON object as 
    # a dictionary
    JSONdata = json.load(f)
    data = JSONdata.get('features')   
    # Closing file
    f.close()
    return data


cntyAccessibility = {}


infobyZip = getFeatures("src\components\Stats\infobyZip.json")

#set up initial county data
for zip in infobyZip:
    temp = infobyZip.get(zip)
    cntyAccessibility[temp.get('cnty')] = 0


#add in access options from clinics
clinics = getFeatures("src\\components\\Stats\\titleXclinics.json")
for clinic in clinics:
    cnty = infobyZip[clinic["zipcode"]].get("cnty")
    tot = cntyAccessibility.get(cnty)
    tot = tot + 8
    cntyAccessibility.update({
        cnty : tot
    })

#print("AFTER CLINICS ")
#print(cntyAccessibility.get('Harris')

areas_around_Austin = '%.@.[1153787468,"What is your zip code? ","Right now, we are only offering drop-offs in the greater Austin area (30 mile-ish radius of Austin)",3,[[175789106,[["76530",null,-2,null,false],["76574",null,-2,null,false],["78130",null,-2,null,false],["78602",null,-2,null,false],["78610",null,-2,null,false],["78612",null,-2,null,false],["78613",null,-2,null,false],["78615",null,-2,null,false],["78616",null,-2,null,false],["78617",null,-2,null,false],["78619",null,-2,null,false],["78620",null,-2,null,false],["78621",null,-2,null,false],["78626",null,-2,null,false],["78628",null,-2,null,false],["78633",null,-2,null,false],["78634",null,-2,null,false],["78640",null,-2,null,false],["78641",null,-2,null,false],["78642",null,-2,null,false],["78644",null,-2,null,false],["78645",null,-2,null,false],["78650",null,-2,null,false],["78652",null,-2,null,false],["78653",null,-2,null,false],["78655",null,-2,null,false],["78656",null,-2,null,false],["78660",null,-2,null,false],["78662",null,-2,null,false],["78664",null,-2,null,false],["78665",null,-2,null,false],["78666",null,-2,null,false],["78669",null,-2,null,false],["78676",null,-2,null,false],["78681",null,-2,null,false],["78701",null,-2,null,false],["78702",null,-2,null,false],["78703",null,-2,null,false],["78704",null,-2,null,false],["78705",null,-2,null,false],["78712",null,-2,null,false],["78717",null,-2,null,false],["78719",null,-2,null,false],["78721",null,-2,null,false],["78722",null,-2,null,false],["78723",null,-2,null,false],["78724",null,-2,null,false],["78725",null,-2,null,false],["78726",null,-2,null,false],["78727",null,-2,null,false],["78728",null,-2,null,false],["78729",null,-2,null,false],["78730",null,-2,null,false],["78731",null,-2,null,false],["78732",null,-2,null,false],["78733",null,-2,null,false],["78734",null,-2,null,false],["78735",null,-2,null,false],["78736",null,-2,null,false],["78737",null,-2,null,false],["78738",null,-2,null,false],["78739",null,-2,null,false],["78741",null,-2,null,false],["78742",null,-2,null,false],["78744",null,-2,null,false],["78745",null,-2,null,false],["78746",null,-2,null,false],["78747",null,-2,null,false],["78748",null,-2,null,false],["78749",null,-2,null,false],["78750",null,-2,null,false],["78751",null,-2,null,false],["78752",null,-2,null,false],["78753",null,-2,null,false],["78754",null,-2,null,false],["78756",null,-2,null,false],["78757",null,-2,null,false],["78758",null,-2,null,false],["78759",null,-2,null,false]'
areas_around_Austin = re.sub(r'[^ :a-zA-Z0-9]', ' ', areas_around_Austin)
areas_around_Austin.replace("null", "")
areas_around_Austin.replace("false", "")
areas_around_Austin = re.sub(r'[^ :0-9]', '', areas_around_Austin)
areas_around_Austin = areas_around_Austin.split("        3   ")[1]
areas_around_Austin_arr = areas_around_Austin.split("    2      ")
areas_around_Austin_arr[0] = areas_around_Austin_arr[0].split('    ')[1]
areas_around_Austin_arr[78] = areas_around_Austin_arr[78].split('    ')[0]

def getCountiesFromArea(area):
    cntyAreas = []
    if area == "Texas":
        for cnty in cntyAccessibility:
            cntyAreas.append(cnty) 
    if area == "30 mi surrounding Austin":
        for zip in areas_around_Austin_arr:
            cntyAreas.append(infobyZip.get(zip)['cnty'])
            #print("ADDED")
    else:
        for zip in infobyZip:
            if area in infobyZip.get(zip)['cnty'] or area in infobyZip.get(zip)['city']:
                cntyAreas.append(infobyZip.get(zip)['cnty'])
    
    return [*set(cntyAreas)]


freePlanB = getFeatures("src\\components\\Stats\\freePlanB.json")
for freeOrg in freePlanB:
    if("Yes" in freeOrg["pickup"] and freeOrg["pickup_locations"] != "Unknown"):
        for location in freeOrg["pickup_locations"]:
            ind = len(location["address"])
            zip = (location["address"])[(ind -5):]
            cnty = (infobyZip.get(zip)).get("cnty")
            tot = cntyAccessibility.get(cnty)
            tot = tot + 10
            cntyAccessibility.update({
                cnty : tot
            })
    
    #print("AFTER PICKUP ")
    #print(cntyAccessibility.get('Harris')
    
    locs = freeOrg["services"]
    if("Yes" in freeOrg["delivery"]):
        score = 0
        if "48" in freeOrg["time"]: score = 8
        if "72" in freeOrg["time"]: score = 7
        if "days" in freeOrg["time"]: score = 1
        if "Varies" in freeOrg["time"]: score = 3
        if "Stock" in freeOrg["time"]: score = 0

        for area in locs:
            cntyAreas = getCountiesFromArea(area)
            if(area == "Texas"): score = 1
            for cnty in cntyAreas:
                tot = cntyAccessibility.get(cnty)
                tot = tot + score
                cntyAccessibility.update({
                    cnty : tot
                })
#print("AFTER DELIVERY ")
#print(cntyAccessibility.get('Harris')

#scores = [2, 3, 9, 10, 11, 12, 15, 17, 18, 19, 20, 25, 26, 27, 32, 34, 35, 42, 53, 59, 66, 72, 330, 83, 105, 123]
#scoreLo = 2
#scoreHi = 330
#score count = {123: 1, 2: 192, 105: 1, 9: 1, 17: 2, 10: 22, 11: 2, 18: 4, 
# 66: 1, 42: 1, 32: 1, 3: 10, 19: 2, 330: 1, 12: 1, 34: 1, 72: 1, 27: 1, 
# 15: 1, 53: 2, 83: 1, 59: 1, 35: 1, 25: 1, 20: 1, 26: 1}

#send cities to JSON file to be read later
new_array = {"type": "all_assistance", "features": cntyAccessibility}
file = open("src\components\Stats\countyAccessibility.json","r+")
file.truncate(0)
file.close()

with open("src\components\Stats\countyAccessibility.json", 'w') as outfile:
    json.dump(new_array, outfile)
