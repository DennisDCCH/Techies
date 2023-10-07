import React, { useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

import data from "../data/user"

import MapSidebar from "../components/mapSidebar"
import "./map.css"

const center = {lat: 1.3521,lng: 103.8198}

export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAqfV5D6spu0saYX6khc2BQJsoSsK8vAVA",
    })

    if (!isLoaded) return <div>Loading...</div>

    return (
        <div className = "map-page-container">
            <MapSidebar
                item = {data}
            />
            <div className = "map-container">
                <GoogleMap
                    zoom = {15}
                    center = {center}
                    mapContainerClassName="map-size"
                >
                    <Marker position = {center}/>
                </GoogleMap>
            </div>
        </div>
    )
}