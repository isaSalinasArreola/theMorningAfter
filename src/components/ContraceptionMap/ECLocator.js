import React, { useRef, useEffect, useState } from 'react';
import './ECMap.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import * as majorPharmacies from '../Files/major_pharrmacies.json';
import * as clinicLocations from '../Files/clinic_Locations.json';
import * as orgLocations from '../Files/org_Locations.json';
const orgs = orgLocations;
const stores = majorPharmacies;
const clinics = clinicLocations;

function ECLocator(){
    
    mapboxgl.accessToken = "pk.eyJ1IjoiaXNhbWVpc2FtYXJpbyIsImEiOiJjbDc1YjlvOTMxcTRtM3BsY2VuMDV5aGEzIn0.8xcq0rLjot0DEhn2SbDSdA";

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-97.9018);
    const [lat, setLat] = useState(31.9686);
    const [zoom, setZoom] = useState(5);

    const[query, setQuery] = useState("");

    function flyToStore(currentFeature) {
        map.current.flyTo({
          center: currentFeature.geometry.coordinates,
          zoom: 15
        });
      }
      function createOrgPopUp(currentFeature) {
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        /** Check if there is already a popup on the map and if so, remove it */
        if (popUps[0]) popUps[0].remove();
      
        const popup = new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML(`<div class = 'clinic-pop><h8 class = 'title'>${currentFeature.properties.name}</h8></div>
          <p>Area: ${currentFeature.properties.city} <br/>
          City: ${currentFeature.properties.city} <br/>
          Pickup? ${currentFeature.properties.pickup} <br/>
          Delivery? ${currentFeature.properties.delivery} ${currentFeature.properties.time} <br/>
          Contact: ${currentFeature.properties.contact} ${currentFeature.properties.contact_site} <br/>
          Website: 
          <a href = ${currentFeature.properties.website}>
          ${currentFeature.properties.website} </a> <br/>
          Insta: 
          <a href = ${currentFeature.properties.insta}>
          ${currentFeature.properties.insta} </a> <br/>
          </p>`)
          .addTo(map.current);
      }
    
      function createClinicPopUp(currentFeature) {
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        /** Check if there is already a popup on the map and if so, remove it */
        if (popUps[0]) popUps[0].remove();
      
        const popup = new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML(`<div class = 'clinic-pop><h8 class = 'title'>${currentFeature.properties.name}</h8></div>
          <p>Address: ${currentFeature.properties.address} <br/>
          City: ${currentFeature.properties.city} <br/>
          Phone: ${currentFeature.properties.phoneFormatted} <br/>
          Website: 
          <a href = ${currentFeature.properties.website}>
          ${currentFeature.properties.website} </a> <br/>
          Hours: ${currentFeature.properties.hours} 
          </p>`)
          .addTo(map.current);
      }
      
      function createPharmacyPopUp(currentFeature) {
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        /** Check if there is already a popup on the map and if so, remove it */
        if (popUps[0]) popUps[0].remove();
      
        const popup = new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML(`<div><h8 class = 'title'>${currentFeature.properties.name}</h8></div>
          <p>Pharmacy License ID: ${currentFeature.properties.id} <br/>
          Address: ${currentFeature.properties.address} <br/>
          City: ${currentFeature.properties.city} <br/>
          County: ${currentFeature.properties.county} <br/>
          Phone: ${currentFeature.properties.phoneFormatted} <br/>
          Website: 
          <a href = ${currentFeature.properties.website}>
          ${currentFeature.properties.website} </a>
          </p>`)
          .addTo(map.current);
      }

    function addPharmacyMarkers(){
        for(const marker of stores.features){
            const el = document.createElement('div');
            el.id = `marker-${marker.properties.id}`;
            el.className = 'pharmacy';
            el.addEventListener('click', (e) => {
                /* Fly to the point */
                flyToStore(marker);
                /* Close all other popups and display popup for clicked store */
                createPharmacyPopUp(marker);
                /* Highlight listing in sidebar */
                const activeItem = document.getElementsByClassName('active');
                e.stopPropagation();
                if (activeItem[0]) {
                  activeItem[0].classList.remove('active');
                }
                const listing = document.getElementById(`listing-${marker.properties.id}`);
                listing.classList.add('active');
              });

            new mapboxgl.Marker(el, {offset : [0, -23]})
            .setLngLat(marker.geometry.coordinates)
            .addTo(map.current);
        }
    }

    function addClinicMarkers(){
        for(const marker of clinics.features){
            const el = document.createElement('div');
            el.id = `marker-${marker.properties.name}`;
            el.className = 'clinic';
            el.addEventListener('click', (e) => {
                /* Fly to the point */
                flyToStore(marker);
                /* Close all other popups and display popup for clicked store */
                createClinicPopUp(marker);
                /* Highlight listing in sidebar */
                const activeItem = document.getElementsByClassName('active');
                e.stopPropagation();
                if (activeItem[0]) {
                  activeItem[0].classList.remove('active');
                }
                const listing = document.getElementById(`listing-${marker.properties.name}`);
                listing.classList.add('active');
              });

            new mapboxgl.Marker(el, {offset : [0, -23]})
            .setLngLat(marker.geometry.coordinates)
            .addTo(map.current);
        }
    }

    function addOrgMarkers(){
        for(const marker of orgs.features){
            const el = document.createElement('div');
            el.id = `marker-${marker.properties.name}`;
            el.className = 'org';
            el.addEventListener('click', (e) => {
                /* Fly to the point */
                flyToStore(marker);
                /* Close all other popups and display popup for clicked store */
                createOrgPopUp(marker);
                /* Highlight listing in sidebar */
                const activeItem = document.getElementsByClassName('active');
                e.stopPropagation();
                if (activeItem[0]) {
                  activeItem[0].classList.remove('active');
                }
                const listing = document.getElementById(`listing-${marker.properties.name}`);
                listing.classList.add('active');
              });

            new mapboxgl.Marker(el, {offset : [0, -23]})
            .setLngLat(marker.geometry.coordinates)
            .addTo(map.current);
        }
    }


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
        });
        map.current.on('load', () => {
            /* Add the data to your map as a layer */
            map.current.addSource('places', {
                type: 'geojson',
                data: stores
            });
            map.current.addSource('clinics', {
                type: 'geojson',
                data: clinics
            });
            addPharmacyMarkers();
            addClinicMarkers();
            addOrgMarkers();

        });
        });
    

    
    return(
        <>
        <header>
            <h2>Emergency Contraceptive Options Locator</h2>
            <div class='heading'>
                    <p>All emergency contraception locations around Texas, including pharmacies, Title X clinics, and free organizations. Pharmacies are PURPLE, low cost clinics are GREEN, and free orgs are ORANGE. If you click on a pin, it will zoom into that location. Happy searching!</p>
                </div>
        </header>
        <head>
        <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js'></script>
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css' rel='stylesheet' />
        </head>
        <body>
            <div class='sidebar'>
                <div id='listings' class='listings'>
                <input placeholder="Enter city, pharmacy, or address" onChange={event => setQuery(event.target.value)}/>
                    <div>
                    {
                        stores.features.filter((post) => {
                            if (query === ""){
                                return post;
                            }
                            else if(post.properties.name.toLowerCase().includes(query.toLowerCase())
                            || post.properties.address.toLowerCase().includes(query.toLowerCase())
                            || post.properties.city.toLowerCase().includes(query.toLowerCase())
                            || post.properties.county.toLowerCase().includes(query.toLowerCase())
                            || ("pharmacy").includes(query.toLowerCase())){
                                return post;
                            }
                        }).map((store) =>
                        {
                            const html = (store.properties.website == "Unknown" ? "#" : store.properties.website);
                            return (
                                <div id={`listing-${store.properties.id}`} class='item'>
                                <h5>{store.properties.name}</h5>
                                <div>Address: {store.properties.address}<br/>
                                    Phone: {store.properties.phoneFormatted} <br/>
                                    Website: <a href = {html} class = 'title' id = {`link-${store.properties.id}`}>
                                        {store.properties.website}</a>
                                        <small>Pharmacy</small>
                                    </div>
                            </div>
                            );
                        }
                        )
                    }</div>
                    <div>
                        {
                            clinics.features.filter((post) => {
                                if (query === ""){
                                    return post;
                                }
                                else if(post.properties.name.toLowerCase().includes(query.toLowerCase())
                                || post.properties.address.toLowerCase().includes(query.toLowerCase())
                                || post.properties.city.toLowerCase().includes(query.toLowerCase())
                                || ("title x clinic low cost clinic").includes(query.toLowerCase())){
                                    return post;
                                }
                            }).map((clinic) =>
                            {
                                return (
                                    <div id={`listing-${clinic.properties.name}`} class='item'>
                                    <h5>{clinic.properties.name}</h5>
                                    <div>Address: {clinic.properties.address}<br/>
                                        Phone: {clinic.properties.phoneFormatted} <br/>
                                        Website: <a href = {clinic.properties.website} class = 'title' id = {`link-${clinic.properties.name}`}>
                                            {clinic.properties.website}</a> <br/>
                                        <small>Title X Low Cost Clinic</small>
                                        </div>
                                </div>
                                );
                            }
                            )
                        }
                    </div>
                    <div>
                        {
                            orgs.features.filter((post) => {
                                if (query === ""){
                                    return post;
                                }
                                else if(post.properties.name.toLowerCase().includes(query.toLowerCase())
                                || post.properties.city.toLowerCase().includes(query.toLowerCase())
                                || ("low cost free org").includes(query.toLowerCase())){
                                    return post;
                                }
                            }).map((org) =>
                            {
                                return (
                                    <div id={`listing-${org.properties.name}`} class='item'>
                                    <h5>{org.properties.name}</h5>
                                    <div>Serves the {org.properties.city} area<br/>
                                        Request EC: {org.properties.contact} {org.properties.contact_site}<br/>
                                        Pickup? {org.properties.pickup} Delivery? {org.properties.delivery}<br/>
                                        What to expect? {org.properties.details} <br/>
                                        <small>Organization provides FREE emergency contraception</small>
                                        </div>
                                </div>
                                );
                            }
                            )
                        }
                        </div>                   
                        
                </div>
                </div>
                <div id = "map" class = "map">
                    <div ref = {mapContainer} className= "map-container">
                    </div>
                </div>
        </body>
        </>
    );
}

export default ECLocator;