import React from "react"
import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import "./map.css"

const center = {
    lat: 1.342792,
    lng: 103.682346}

export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAqfV5D6spu0saYX6khc2BQJsoSsK8vAVA",
    })

    if (!isLoaded) return <div>Loading...</div>

    return (
        <div>
            <h1>Loaded</h1>
            <GoogleMap
                zoom = {20}
                center = {center}
                mapContainerClassName="map-container"
            >

            </GoogleMap>
        </div>
    )
}