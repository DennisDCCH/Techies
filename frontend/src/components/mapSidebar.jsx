import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MAGNIFYINGLOGO from "../images/magnifying-logo.png";
import "./mapSidebar.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function MapSidebar(props) {
  const [currLocation, setCurrLocation] = useState({});
  const [address, setAddress] = useState("");

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      setCurrLocation(position.coords);
      console.log(position.coords, currLocation);
    });
  }

  const handleChange = (address) => {
    setAddress(address);
  }

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng, address)
        setAddress(address);
        setCurrLocation(latLng);
        console.log(currLocation)
    })
      .catch((error) => console.error("Error", error));
  }

  return (
    <div className="mapsidebar-background">
      <div className="mapsidebar-user-info">
        <img className="mapsidebar-user-info-pic" src={`images/${props.item.userImg}`} alt="User Logo" />
        <h1 className="mapsidebar-user-info-username">{props.item.username}</h1>
      </div>
      <div className="mapsidebar-listing">
        <Link className="mapsidebar-home" to="/homepage">
          Home
        </Link>
      </div>
      <p>Your location is lat: {currLocation.lat}, lng: {currLocation.lng}</p>
      <p>Address: {address}</p>
      <div className="mapsidebar-input">
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div key={suggestions.description}>
              <input
                {...getInputProps({
                  placeholder: "Search Places ",
                  className: "mapsidebar-input-box",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "black", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <input className="mapsidebar-input-button" type="image" src={MAGNIFYINGLOGO} alt="Search" />
      </div>
    </div>
  );
}
