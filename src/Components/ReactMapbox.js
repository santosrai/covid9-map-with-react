/* eslint-disable */
require('dotenv').config()

import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker } from 'react-map-gl';
import './style.css'

import * as data from '../data/get-latest.json';
import * as skate_data from '../data/skate-board.json';


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
        <div>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/dark-v10"
                onViewportChange={setViewport}
            >
                {skate_data.features.map(park =>
                    // const square = function(number) { return number * number }
                    (
                        <Marker key={park.properties.PARK_ID} longitude={park.geometry.coordinates[0]} latitude={park.geometry.coordinates[1]}>
                            <button className="marker-btn">
                                {/* <img src="../logo.svg"></img> */}
                                {/* <div>Find Me</div> */}
                                {/* {console.log(currentPlace.longitude)} */}
                            </button>
                        </Marker>

                    )
                )
                }


                {data.reports
                    .filter(report => !report.hide)
                    .map(report => {
                        const { infected, placeId } = report;
                        const currentPlace = places.find(place => place.id == placeId);
                        // currentPlaces
                        // console.log(currentPlace);
                        // new mapboxgl.Marker({
                        //     // color: getColorFromCount(infected)
                        //     color:"grey"
                        // })
                        // .setLngLat([currentPlace.longitude, currentPlace.latitude])
                        // .addTo(map);
                        // console.log(currentPlace.longitude);
                    
                     
                            // <Marker key={placeId} longitude={currentPlace.longitude} latitude={currentPlace.latitude}>
                            (<Marker  longitude={138.25293} latitude={36.204823}>

                                <button className="marker-btn">
                                    {/* <img src="../logo.svg"></img> */}
                                    {/* <div>Find Me</div> */}
                                    {/* {console.log(currentPlace.longitude)} */}
                                </button>

                            </Marker>
                            )

                    })
                }


            </ReactMapGL>
        </div>
    );

}