import React from "react"
import SPORTSYNCLOGO from "../images/sportsync-logo.png"
import HUMANLOGO from "../images/human-logo.png"
import DROPDOWNMENULOGO from "../images/dropdown-menu-logo.png"
import { Link } from "react-router-dom"
import "./navbar.css"


export default function Navbar() {
    return (
        <nav>
            <div className="nav-left">
              <img src={SPORTSYNCLOGO} alt = "sportsync-logo" width = "141px" />
              <h3 className="nav-logo_name">SportSync</h3>
            </div>
            <div className="nav-right">
                <img src={HUMANLOGO} alt = "human-logo" width = "98px" height = "97px" />
                <button type="button" className="nav-button-logout">
                    <Link className = "nav-button-logout-link" to = "/">Logout</Link>
                </button>
                <img className = "nav-right-dropdown-menu" src = {DROPDOWNMENULOGO} alt = "dropdown-menu-logo"/>
            </div>
        </nav>
    )
}