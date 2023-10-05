import React from "react"
import { Link } from "react-router-dom"
import "./sidebarmenu.css"

export default function Sidebar(props) {
    return (
        <div className = "sidebar-background">
            <div className = "sidebar-user-info"> 
                {/* Eventually can put images/${props.img}*/}
                <img className = "sidebar-user-info-pic" src= "images/human-logo.png" alt="Logo" />
                <h1 className = "sidebar-user-info-username">{props.item.username}</h1>
            </div>
            <div className = "sidebar-listing">
                <Link className = "sidebar-home" to = "/homepage">Home</Link>
                <Link className = "sidebar-account" to = "/profile">Account information</Link>
                <Link className = "sidebar-mylisting" to = "/mylisting">My Listing</Link>
                <Link className = "sidebar-savedlisting" to = "/savedlisting">Saved Listing</Link>
                <Link className = "sidebar-bookedlisting" to = "/bookedlisting">Booked Listing</Link>
            </div>
            <div className = "sidebar-logout-button">
                <Link className = "sidebar-logout" to = "/"><i>Log Out</i></Link>
            </div>
        </div>
    )
}