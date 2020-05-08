/* eslint-disable */
require('dotenv').config()

import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Banner from './Banner';
import './style.css'
import * as data from '../data/get-latest.json';


const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const getColorFromCount = (count) => {
    if (count > 100) {
        return "red";
    }
    if (count >= 10) {
        return "green";
    }
    return "grey";
}


export default function Map() {
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 36.204823,
        longitude: 138.25293,
        zoom: 8
    });

    const [selectedArea, setSelectedArea] = useState(null);

    const places = data.places;

    useEffect(() => {
        const listener = (e) => {
            if (e.key === "Escape") {
                setSelectedArea({});
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener)
        }
    }, [])

    return (
        <div>
            <Banner />
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/dark-v10"
                onViewportChange={setViewport}
            >

                { data.reports
                    .filter(report => !report.hide)
                    .map(report => {
                        const { infected, placeId } = report;
                        const currentPlace = places.find(place => place.id == placeId);
                        const color = getColorFromCount(infected);

                        return (
                            <Marker key={placeId} longitude={currentPlace.longitude} latitude={currentPlace.latitude}>

                                <svg
                                    height={SIZE}
                                    viewBox="0 0 24 24"
                                    style={{
                                        cursor: 'pointer',
                                        fill: `${color}`,
                                        stroke: 'none',
                                        transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                                    }}
                                    onClick={e => {
                                        e.preventDefault();
                                        setSelectedArea(prevState => ({
                                            ...prevState,
                                            selected_report: report,
                                            selected_place: currentPlace
                                        })
                                        )
                                    }}
                                >
                                    <path d={ICON} />
                                </svg>
                            </Marker>
                        )

                    })
                }

                { selectedArea ?
                (<Popup latitude={selectedArea.selected_place.latitude} longitude={selectedArea.selected_place.longitude}
                    onClose={()=>{
                       setSelectedArea(null); 
                    }}
                >
                    <h3> {selectedArea.selected_place.country}</h3>
                    <p>Confirmed : {selectedArea.selected_report.infected}</p>
                    <p>Recovered : {selectedArea.selected_report.recovered}</p>
                    <p>Death : {selectedArea.selected_report.dead}</p>
                </Popup>)
                :null
                }

            </ReactMapGL>
        </div>
    );

}