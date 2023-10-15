import React, { useState }from "react"
import { Link } from "react-router-dom"

import MAGNIFYINGLOGO from "../images/magnifying-logo.png"

import "./mapSidebar.css"

export default function MapSidebar (props) {
    const [address, setAddress] = useState(""); 
    const [coordinates, setCoordinates] = useState(null);

    return (
        <div className = "mapsidebar-background">
            <div className = "mapsidebar-user-info"> 
                <img className = "mapsidebar-user-info-pic" src= {`images/${props.item.userImg}`} alt="Logo" />
                <h1 className = "mapsidebar-user-info-username">{props.item.username}</h1>
            </div>
            <div className = "mapsidebar-listing">
                <Link className = "mapsidebar-home" to = "/homepage">Home</Link>
            </div>
            <div className = "mapsidebar-input">
                <input className = "mapsidebar-input-box" type="text" placeholder = "Input Location"/>
                <input className = "mapsidebar-input-button"type = "image" src = {MAGNIFYINGLOGO}/>
            </div>
        </div>
    )
}