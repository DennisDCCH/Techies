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
                <Link className = "sidebar-account">Account information</Link>
                <Link className = "sidebar-mylisting">My Listing</Link>
                <Link className = "sidebar-savedlisting">Saved Listing</Link>
                <Link className = "sidebar-bookedlisting">Booked Listing</Link>
            </div>
            <Link className = "sidebar-logout" to = "/"><i>Log Out</i></Link>
        </div>
    )
}