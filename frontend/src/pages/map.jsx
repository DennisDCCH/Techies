import React, { useState, useEffect } from "react"
import { GoogleMap, useLoadScript, Marker, Circle } from "@react-google-maps/api"

import userData from "../data/user"

import MapSidebar from "../components/mapSidebar"
import MapSearchBar from "../components/mapSearchBar"
import "./map.css"
import user from "../data/user"

export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAqfV5D6spu0saYX6khc2BQJsoSsK8vAVA",
        libraries: ["places"],
    })

    const [taxiData, setTaxiData] = useState({});
    const [userCenter, setUserCenter] = useState({ lat: 1.3600, lng: 103.8000 });

    const radius = 5000;
    let index=0;

    function updateUserCentre(newCenter) {
      setUserCenter(newCenter);
      console.log("my new coords are ", userCenter);
    }

    useEffect(() => {
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
    //sanity check that all taxis are showing up
    console.log(taxiData);

    if (!isLoaded) return <div>Loading...</div>

    if(taxiData.features === undefined) return <div>Loading...</div>

    const coordinatesObject = taxiData.features[0].geometry.coordinates
    const totalTaxis = taxiData.features[0].properties.taxi_count

    return (
        <div className = "map-page-container">
            <MapSidebar
                item = {userData}
            />
            <div className = "map-container">
              <h1>There are {totalTaxis} available taxis!</h1>
              <MapSearchBar  updateUserCentre={updateUserCentre}/>
                <GoogleMap
                    zoom = {15}
                    center = {userCenter}
                    mapContainerClassName="map-size"
                >
                    {coordinatesObject &&
                    coordinatesObject.map(coord => (
                        <Marker
                        key={index++}
                        position={
                            { lat: coord[1],
                              lng: coord[0], }
                            }
                        />
                    ))}
                    <Marker className="user-marker" position={userCenter} />
                    <Circle center={userCenter} radius={radius} />
                </GoogleMap>
            </div>
        </div>
    )
}