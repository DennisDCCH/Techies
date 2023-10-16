import React, { useState, useEffect } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

import userData from "../data/user"

import MapSidebar from "../components/mapSidebar"
import "./map.css"

const center = {lat: 1.3521,lng: 103.8198}

export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAqfV5D6spu0saYX6khc2BQJsoSsK8vAVA",
    })

    const [apiData, setApiData] = useState([]);

    useEffect(() => {
      // Fetch data from your API
      const fetchData = async () => {
        try {
          const response = await fetch("https://api.data.gov.sg/v1/transport/taxi-availability");
          const data = await response.json();
          setApiData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);

    if (!isLoaded) return <div>Loading...</div>

    return (
        <div className = "map-page-container">
            <MapSidebar
                item = {userData}
            />
            <div className = "map-container">
                <GoogleMap
                    zoom = {15}
                    center = {center}
                    mapContainerClassName="map-size"
                >
                    {apiData.map((item, index) => (
                        <Marker
                        key={index}
                        position={{ lat: item.latitude, lng: item.longitude }}
                        />
                    ))}
                </GoogleMap>
            </div>
        </div>
    )
}