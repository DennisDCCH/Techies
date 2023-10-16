import React, { useState, useEffect } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

import userData from "../data/user"

import MapSidebar from "../components/mapSidebar"
import "./map.css"


export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAqfV5D6spu0saYX6khc2BQJsoSsK8vAVA",
    })

    const [taxiData, setTaxiData] = useState(null);
    const [userCenter, setUserCenter] = useState({ lat: 1.3521, lng: 103.8198 });

    const handleCenterUpdate = () => {
      // Replace with your logic to set the dynamic center dynamically
      setUserCenter({ lat: 1.3600, lng: 103.8000 }); // Updated dynamic center
    };

    useEffect(() => {
      // Fetch data from your API
      console.log("hi")
      const fetchData = async () => {
        try {
          const response = await fetch("https://api.data.gov.sg/v1/transport/taxi-availability");
          console.log("hi")
          const data = await response.json();
          setTaxiData(data);
          console.log(data);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);
    console.log(taxiData);
    if (!isLoaded) return <div>Loading...</div>
    let index = 0;
    const coordinatesObject = taxiData.features[0].geometry.coordinates
    const totalTaxis = taxiData.features[0].properties.taxi_count
    // console.log(coordinatesObject)
    return (
        <div className = "map-page-container">
            <MapSidebar
                item = {userData}
            />
            <div className = "map-container">
                <GoogleMap
                    zoom = {15}
                    center = {userCenter}
                    mapContainerClassName="map-size"
                >
                    {coordinatesObject &&
                    coordinatesObject.map(coord => (

                        <Marker
                        key={index}
                        position={
                            { lat: coord[1],
                              lng: coord[0], }
                            }
                        />

                    ))}
                    <Marker position={userCenter} />
                </GoogleMap>
            </div>
        </div>
    )
}