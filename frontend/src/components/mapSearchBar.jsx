import React, {useState, useEffect } from "react";

import MAGNIFYINGLOGO from "../images/live-location.png";
import "./mapSidebar.css";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from "react-places-autocomplete";

export default function MapSidebar({ updateUserCentre}) {
    const [address, setAddress] = useState("");
    const [content, setContent] = useState(null)

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = () => {
        setAddress("Your live location")
        navigator.geolocation.getCurrentPosition((position) => {
            updateUserCentre({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
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
        setContent(null)
        updateUserCentre(latLng);
        })
        .catch((error) => {
            setAddress(null)
            setContent("Please enter a valid address")
        });
    }

    return (
        <div>
        {/* <p>Your location is lat: {currLocation.lat}, lng: {currLocation.lng}</p> */}
            <div className="mapsidebar-input">
                <PlacesAutocomplete
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                    >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div >
                        <div className = "mapsidebar-input-container">
                            <input
                            {...getInputProps({
                                placeholder: " Search Places ",
                                className: "mapsidebar-input-box",
                            })}
                            />
                            <button className= "mapsidebar-input-button" type="button" onClick={getLocation}>
                                <img className= "mapsidebar-input-button" src={MAGNIFYINGLOGO} alt="Search"/>
                            </button>
                        </div>
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
            <h2 className="address-para">Address: {address}</h2>
            <span className = "error">{content}</span>
        </div>
    );
};