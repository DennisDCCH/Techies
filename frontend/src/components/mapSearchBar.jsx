import React, {useState, useEffect } from "react";

import MAGNIFYINGLOGO from "../images/magnifying-logo.png";
import "./mapSidebar.css";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from "react-places-autocomplete";

export default function MapSidebar({ updateUserCentre}) {
    //const [currLocation, setCurrLocation] = useState({});
    const [address, setAddress] = useState("");

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        updateUserCentre(position.coords);
        //console.log(position.coords, currLocation);
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
            updateUserCentre(latLng);
            //console.log(currLocation)
        })
          .catch((error) => console.error("Error", error));
      }
        return (<div>
        {/* <p>Your location is lat: {currLocation.lat}, lng: {currLocation.lng}</p> */}
        <div className="mapsidebar-input">
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
                >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div >
                    <input
                    {...getInputProps({
                        placeholder: " Search Places ",
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
                    ? { backgroundColor: "#fafafa", cursor: "pointer", position: "relative", zIndex: "100"}
                    : { backgroundColor: "grey", cursor: "pointer", position: "relative", zIndex: "100" };
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

        </div>
        <input className="mapsidebar-input-button" type="image" src={MAGNIFYINGLOGO} alt="Search" />
        <h2 className="address-para">Address: {address}</h2>
        </div>
    );
};