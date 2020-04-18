/* eslint-disable */
require('dotenv').config()

import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, {Marker} from 'react-map-gl';
import './style.css'

import * as data from '../data/get-latest.json';


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function Map() {
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });

    // const places =[];
    const places = data.places;

    return (
        <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            onViewportChange={setViewport}
        >

            { data.reports
                .filter(report => !report.hide)
                .forEach(report => {
                    const { infected, placeId } = report;
                    const currentPlace = places.find(place => place.id == placeId);
                    // console.log(currentPlace);
                    // new mapboxgl.Marker({
                    //     // color: getColorFromCount(infected)
                    //     color:"grey"
                    // })
                        // .setLngLat([currentPlace.longitude, currentPlace.latitude])
                        // .addTo(map);
                        // console.log(currentPlace.longitude);
                    return (<Marker key={placeId} longitude={currentPlace.longitude} latitude={currentPlace.latitude}>
                        <button className="marker-btn">
                            {/* <img src="../logo.svg"></img> */}
                            <div>Find Me</div>
                        </button>

                    </Marker>)

                })


            }


        </ReactMapGL>
    );
        
}