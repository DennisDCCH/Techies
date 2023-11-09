import React from "react"
import SPORTSYNCLOGO from "../images/sportsync-logo.png"
import HUMANLOGO from "../images/human-logo.png"
import DROPDOWNMENULOGO from "../images/dropdown-menu-logo.png"
import { Link } from "react-router-dom"
import "./navbar.css"


export default function Navbar(props) {
    if (props.notification == true) {
        var notificationMessage = "NEW!"
    }

    return (
        <nav>
            <div className="nav-left">
                <Link className = "nav-home" to = "/homepage">
                    <img src={SPORTSYNCLOGO} alt = "sportsync-logo" width = "141px" />
                </Link>
                <h3 className="nav-logo_name">SportSync</h3>
            </div>
            <div className="nav-right">
                <p className = "error">{notificationMessage}</p>
                <Link className = "nav-profile" to = "/profile">
                    <img src={HUMANLOGO} alt = "human-logo" width = "98px" height = "97px" />
                </Link>
                <button type="button" className="nav-button-logout">
                    <Link className = "nav-button-logout-link" to = "/">Logout</Link>
                </button>
                <div className="dropdown-container">
                    <img className = "nav-right-dropdown-icon" src = {DROPDOWNMENULOGO} alt = "dropdown-menu-logo"/>
                    <ul className="dropdown-menu-nav">
                        <li><Link to = "/marketplace">Activities</Link></li>
                        <li><Link to = "/map">Map</Link></li>
                        <li><Link to = "/chat">Chat</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}