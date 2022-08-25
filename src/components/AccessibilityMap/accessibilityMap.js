import {
    ComposableMap,
    Geographies,
    Geography
  } from "react-simple-maps";
import React from "react";
import countyAccessibility from "../Files/countyAccessibility.json";

const geoURL = "https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/Texas_County_Boundaries/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
const countyScores = countyAccessibility.features;


function AccessibilityMap(){

    const mapPolygonColorToDensity=(density => {
        return density > 150
            ? '#7a0177'
            : density > 80
            ? '#ae017e'
            : density > 40
            ? '#dd3497'
            : density > 20
            ? '#f768a1'
            : density > 10
            ? '#fa9fb5'
            : density > 3
            ? '#fcc5c0'
            : '#feebe2';
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
                                const name = geo["properties"]["CNTY_NM"]
                                const d = countyScores[name]
                                return(
                                    <Geography key = {geo.rsmKey} geography = {geo} fill = {mapPolygonColorToDensity(d)}/>
                                );
                        })}
                    </Geographies>
            </ComposableMap>
        </div>
    </div>
    );
}
export default AccessibilityMap;