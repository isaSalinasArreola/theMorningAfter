import {
    ComposableMap,
    Geographies,
    Geography
  } from "react-simple-maps";
import React from "react";
import countyAccessibility from "../Files/countyAccessibility.json";
import majorByCounty from "../Files/majorbyCounty.json";
import { polygon } from "leaflet";

const geoURL = "https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/Texas_County_Boundaries/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
const countyScores = countyAccessibility.features;
const scores = majorByCounty.features;


function MajorMap(){

    const mapPolygonColorToDensity=(name => {
        if(name in scores){
            const temp = scores[name];
            const density = temp["winner"];
            return density == 'walgreens'
            ? '#e31a1c'
            : density == 'cvs' 
            ? '#b2df8a'
            : density == 'kroger'
            ? '#ff7f00'
            : density == 'tom thumb'
            ? '#33a02c'
            : density == 'heb'
            ? '#fb9a99'
            : density == 'costco'
            ? '##fdbf6f'
            : density == 'randalls'
            ? '#1f78b4'
            : density == 'sam' 
            ? '#cab2d6'
            : density == 'walmart' 
            ? '#a6cee3'
            : "#FFFF";
        }
        return '#FFFF';


    })

    return(
    <div className = 'container'>
        <div className = "">
            <ComposableMap projection = "geoMercator"
                projectionConfig = {{
                    center: [-99.7, 31.5],
                    scale: 1600
                }}
                width = {400}
                height = {400}
                style=
                {{ 
                    width: "80%", 
                    height: "auto" , 
                    background: "#FFF"}}>
                    <Geographies geography ={geoURL} stroke="#000" strokeWidth={0.5}>
                        {({geographies}) => 
                            geographies.map((geo) => {
                                const name = geo["properties"]["CNTY_NM"];
                                return(
                                    <Geography key = {geo.rsmKey} geography = {geo} fill = {mapPolygonColorToDensity(name.toUpperCase())} />
                                );
                        })}
                    </Geographies>
            </ComposableMap>
        </div>
    </div>
    );
}
export default MajorMap;