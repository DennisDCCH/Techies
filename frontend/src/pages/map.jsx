import React, { useState, useEffect } from "react"
import { GoogleMap, useLoadScript, Marker, MarkerF, Circle } from "@react-google-maps/api"

import userData from "../data/user"

import MapSidebar from "../components/mapSidebar"
import MapSearchBar from "../components/mapSearchBar"
import "./map.css"
import user from "../data/user"

function checkMarkerInsideCircle(marker, userCenter, radius) {
  const latDist = (marker[1] - userCenter.lat)/57.29577951;
  const lngDist = (marker[0] - userCenter.lng)/57.29577951;
  let a = Math.pow(Math.sin(latDist / 2), 2)
                 + Math.cos(marker[1]/57.29577951) * Math.cos(userCenter.lat/57.29577951)
                 * Math.pow(Math.sin(lngDist / 2),2);

        let c = 2 * Math.asin(Math.sqrt(a));
        // Radius of earth in kilometers
        let r = 6371;

        // calculate the result
  const distance = c * r;
  // console.log(distance);
  return (distance <= (radius/1000));
}


export default function Map() {
  const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyAqfV5D6spu0saYX6khc2BQJsoSsK8vAVA",
      libraries: ["places"],
  })

  const [taxiData, setTaxiData] = useState({});
  const [userCenter, setUserCenter] = useState({ lat: 1.3600, lng: 103.8000 });

  const [filteredCoordinates,setFilteredCoordinates] = useState([]);

  const [coordinatesArray,setCoordinatesArray] = useState([]);
  const radius = 5000;
  let index=0;

  function updateUserCentre(newCenter) {
    setUserCenter(newCenter);
    // console.log("my new coords are ", userCenter);
    console.log(coordinatesArray)
    const updatedCoordsArray = coordinatesArray.filter((coord) =>
    checkMarkerInsideCircle(coord, newCenter, radius)
  )
    setFilteredCoordinates(updatedCoordsArray);
    console.log(updatedCoordsArray)
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
        const coordinatesObject = data.features[0].geometry.coordinates
        setCoordinatesArray(Object.values(coordinatesObject))
        console.log(Object.values(coordinatesObject))
        setFilteredCoordinates( Object.values(coordinatesObject).filter((coord) =>
          checkMarkerInsideCircle(coord, userCenter, radius)
        ));
        console.log(filteredCoordinates)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  //sanity check that all taxis are showing up
  console.log(taxiData);
  console.log(filteredCoordinates);

  if (!isLoaded) return <div>meow Loading...</div>

  if(taxiData.features === undefined) return <div>Loading...</div>

  const totalTaxis = taxiData.features[0].properties.taxi_count

  return (
      <div className = "map-page-container">
          <MapSidebar
              item = {userData}
          />
          <div className = "map-container">
            <h1>There are {totalTaxis} available taxis!</h1>
            <MapSearchBar  updateUserCentre={updateUserCentre} />
              <GoogleMap
                  zoom = {15}
                  center = {userCenter}
                  mapContainerClassName="map-size"
              >
                {/* render the markers within the circle */}
                  {filteredCoordinates &&
                    filteredCoordinates.map((coord, index) => (
                      <Marker
                        key={index}
                        position={{ lat: coord[1], lng: coord[0] }}
                      />
                    ))
                  }
                  <Marker className="user-marker" position={userCenter} />
                  <Circle center={userCenter}
                  radius={radius}
                  options={{
                    fillColor: "green",
                    fillOpacity: 0.35,
                    strokeColor: "green",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                  }}
                  />
              </GoogleMap>
          </div>
      </div>
  )
}