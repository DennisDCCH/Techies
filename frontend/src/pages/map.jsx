import React, { useState, useEffect,useRef } from "react"
import { GoogleMap, useLoadScript, Marker, MarkerF, Circle } from "@react-google-maps/api"
import MAN from "../images/man.png"
import TAXI from "../images/taxi.png"
import MapSidebar from "../components/mapSidebar"
import MapSearchBar from "../components/mapSearchBar"
import "./map.css"
import axios from "../api/axios"

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
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [taxiData, setTaxiData] = useState({});
  const [userCenter, setUserCenter] = useState({ lat: 1.3600, lng: 103.8000 });
  const [filteredCoordinates,setFilteredCoordinates] = useState([]);
  const [coordinatesArray,setCoordinatesArray] = useState([]);
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState("")
  let content = null;

  useEffect(() => {
      axios.get("/user")
      .then((response) => {
          setUserData(response.data);
      })
      .catch((error) => {
          console.error("Error fetching user data:", error);
      });
  }, []);

  const radius = 3000;

  function updateUserCentre(newCenter) {
    setUserCenter(newCenter);
    // console.log("my new coords are ", userCenter);
    // console.log(coordinatesArray)
    const updatedCoordsArray = coordinatesArray.filter((coord) =>
    checkMarkerInsideCircle(coord, newCenter, radius)
  )
    setFilteredCoordinates(updatedCoordsArray);
    // console.log(updatedCoordsArray)
  }

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.data.gov.sg/v1/transport/taxi-availability");
      // console.log("hi")
      const data = await response.json();
      setTaxiData(data);
      // console.log("data", data);
      const coordinatesObject = data.features[0].geometry.coordinates
      setCoordinatesArray(Object.values(coordinatesObject))
      // console.log(Object.values(coordinatesObject))
      setFilteredCoordinates( Object.values(coordinatesObject).filter((coord) =>
        checkMarkerInsideCircle(coord, userCenter, radius)
      ));
      // console.log(filteredCoordinates)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function chooseRandomTaxi() {
    if(selectedMarker) {
      setMessage("You have previously booked a taxi already");
    } else {
      const randomIndex = Math.floor(Math.random() * filteredCoordinates.length);
      const selectedTaxi = filteredCoordinates[randomIndex];
      const updatedFilteredCoordinates = filteredCoordinates.filter(
        (coord, index) => index !== randomIndex
      )
      setFilteredCoordinates(updatedFilteredCoordinates);
      const taxiCoord = {lat: selectedTaxi[1], lng: selectedTaxi[0]}
      setSelectedMarker(taxiCoord);
      setMessage("You have successfully booked a taxi");
    }
    console.log(message)
  }

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [userCenter]);

  if (!isLoaded) return <div>now Loading...</div>

  if(taxiData.features === undefined) return <div>Loading...</div>

  const totalTaxis = filteredCoordinates.length

  const myLocation = {
    url: MAN,
    scaledSize: new window.google.maps.Size(40, 40),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(20, 20),
  };
  const icon = {
    url: TAXI,
    scaledSize: new window.google.maps.Size(40, 40),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(20, 20),
    zIndex: 1,
  };

  return (
      <div className = "map-page-container">
          <MapSidebar
              item = {userData}
          />
          <div className = "map-container">
            <h1>There are {totalTaxis} available taxis in your area!</h1>
            <MapSearchBar
              updateUserCentre={updateUserCentre}
            />
            <div className="map-booktaxi"> 
              <div>
                <button onClick={chooseRandomTaxi}>Grab a Taxi!</button>
              </div> 
              <h2>{message}</h2>
            </div>
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
                <Marker
                  icon = {icon}
                  position = {selectedMarker}
                />
                <Marker icon={myLocation} position={userCenter} />
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