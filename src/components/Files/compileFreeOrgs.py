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

freeOrgs =  [
    {
        "name": "Jane's Due Process", 
        "services": ["Lubbock", "Bryan", "College Station"],
        "pickup": "Yes, but only at some locations.",
        "delivery": "Yes",
        "time" : "12 - 48 hours",
        "contact" : "Text",
        "contact_site" : "(866) 999-5283",
        "website" : "https://janesdueprocess.org/",
        "insta": "@janesdueprocess",
        "details" : "After contacting their hotline, a volunteer will ask you for a safe address and time window to deliver the kit. Each kit includes 2 emergency contraceptives (plan B), 2 pregnancy tests, condoms, and an info zine."

    },
    {
        "name": "FREE Aggies",
        "services": ["Bryan", "College Station"],
        "pickup": "No",
        "delivery": "Yes",
        "time" : "12 - 48 hours",
        "contact" : "Online Form",
        "contact_site" : "http://tx.ag/FREEshrs",
        "website" : "https://linktr.ee/freeaggies",
        "insta": "@freeaggies",
        "details" : "A volunteer will contact you by text after you submit their Sexual Health Resource Service request form.  You can request Plan B, condoms, and pregnancy tests."

    },
    {
        "name": "Frontera Folx",
        "services": ["El Paso"],
        "pickup": "Yes",
        "delivery": "Yes",
        "time" : "Varies",
        "contact" : "DM",
        "contact_site" : "@fronterafolx",
        "website" : "https://linktr.ee/fronterafolx", 
        "insta": "@fronterafolx",
        "details" : "To request emergency contraception or pregnancy tests, send a DM on Instagram specifying what you're asking for. You can have it delivered or pick it up, though pick up may be faster if you need it within 72 hours."
    },
    {
        "name": "South Texans for RJ",
        "services": ["Brooks", "Cameron", "Duval", "Hidalgo", "Jim Hogg", "Jim Wells", "Kleberg", "Kenedy", "Starr", "Willacy", "Webb", "Zapata"],
        "pickup": "No",
        "delivery": "Yes",
        "time": "May take up to 14 business days",
        "contact": "Online Form",
        "contact_site": "bit.ly/sotx4rj",
        "website": "https://linktr.ee/sotx4rj", 
        "insta": "@sotx4rj",
        "details": "To request emergency contraception, use their online form.   Deliveries will be sent by mail and may take up to 14 business days.  Requests are currently limited to 1 request per household every 3 months."
    },
    {
        "name": "Suenos Sin Fronteras",
        "services": ["San Antonio", "Texas"],
        "pickup": "No",
        "delivery": "Yes",
        "time": "Varies",
        "contact": "Email misalud@suenossinfronterastx.org or call/text",
        "contact_site": "210-562-4743",
        "website": "https://msha.ke/ssftx/",
        "insta": "@suenossinfronterastx",
        "details": "To request a kit, call, text, or email.   They will deliver free emergency contraception in San Antonio. They will also mail it for free to those living in Texas."
    },
    {
        "name": "Buckle Bunnies Fund",
        "services": ["San Antonio", "Corpus Christi"],
        "pickup": "Yes",
        "delivery": "Yes, but only to certain areas",
        "time": "Varies",
        "contact": "DM @bucklebunniesfundtx, text 325-261-6327, or fill out their online Form",
        "contact_site": "https://airtable.com/shr11jqkW4grqBmpr",
        "website": "https://linktr.ee/bucklebunniesfund", 
        "insta": "@bucklebunniesfundtx",
        "details": "Free repro justice bags are available for pick up only.   Each kit contains emergency contraception (plan B).   You can also ask for condoms, lube, NARCAN, painkillers (advil, aleve, ibuprofen), diapers, fentanyl testing strips, pads/tampons, and vbGQY.\n They offer repro, post abortion, and post birth bags."

    },
    {
        "name": "Bridge Collective ATX",
        "services": ["Austin"],
        "pickup": "Yes",
        "delivery": "Yes",
        "time": "12 - 72 hours",
        "contact": "Online Form",
        "contact_site": "https://thebridgecollective.org/health-kit/",
        "website": "https://linktr.ee/thebridgecollective", 
        "insta": "@thebridgecollective",
        "details": "Bridge Collective repro kits contain 2 emergency contraception pills (plan B), 2 pregnancy tests, instructions, a few condoms, and information about reproductive health resources in the Central TX area.   Requests are currently limites to 1 delivery per person every 3 months.  If you have any issues with the form, email their volunteer team at deliveryintake@thebridgecollective.org"
    },
    {
        "name": "Luz de Atabey Midwifery Project (LAMP)",
        "services": ["Austin"],
        "pickup": "Yes",
        "delivery": "Yes",
        "time": "Varies",
        "contact": "DM @lampatx, call 512-969-2193, or email",
        "contact_site": "info@lampatx.org",
        "website": "https://lampatx.org",
        "insta": "@lampatx",
        "details": "They do home visits, delivery, and have a weekly pop-up clinic.   They also speak spanish and have interpeters available. All of their services are low cost or free of charge."

    },
    {
        "name": "Dallas Liberation Movement",
        "services": ["Dallas", "Arlington", "Fort Worth"],
        "pickup": "No",
        "delivery": "Yes",
        "time":"12 - 72 hours",
        "contact": "Text",
        "contact_site": "682-999-6374",
        "website": "https://linktr.ee/dallasliberationmvmt", 
        "insta": "@dallasliberationmvmt",
        "details": "To request a kit, text their hotline for support.  Each kit includes: 2 emergency contraception pills (plan B), 2 pregnancy tests, condoms, antacid, a small plastic cup, and an info zine.  They are also always looking for volunteers to help them deliver their repro kits, visit their website to learn more!"}]

orgDict = []
taken = []

for org in freeOrgs:
    count = 5
    for loc in org['services']:
        temp = loc + ",TX"
        response = muterun_js('src\components\Stats\PharmacyMap\locationCoordinates.js', temp)
        while(response.exitcode != 0 and count !=0):
            response = muterun_js('src\components\Stats\PharmacyMap\locationCoordinates.js', temp)
            count = count - 1
        if(response.exitcode != 0):
            print("HELP")
        str = response.stdout.decode("utf-8")
        str = str.replace(",", "")
        arr = str.split(" ")
        lat = float(arr[2])
        lng = float(arr[4])
        if(lat in taken): lat = lat + 0.000002
        if(lng in taken): lng = lng + 0.000002
        taken.append(lat)
        taken.append(lng)
        name = org['name'] + " - " + loc
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
                "name": name,
                "city": loc,
                "website": org['website'],
                "insta": org['insta'],
                "pickup": org['pickup'],
                "delivery": org['delivery'],
                "time": org['time'],
                "contact": org['contact'],
                "contact_site": org['contact_site'],
                "details": org["details"]
            }
        }

        orgDict.append(feature)



#send cities to JSON file to be read later
new_array = {"type": "FeatureCollection", "features": orgDict}
file = open("src\components\Stats\PharmacyMap\org_Locations.json","r+")
file.truncate(0)
file.close()

with open("src\components\Stats\PharmacyMap\org_Locations.json", 'w') as outfile:
    json.dump(new_array, outfile)

