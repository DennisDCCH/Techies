import React from "react"
import SPORTSYNCLOGO from "../images/sportsync-logo.png"
import HUMANLOGO from "../images/human-logo.png"
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
                <button type="button" className="nav-button-register">
                    <Link className = "nav-button-register-link" to = "/registration">Register</Link>
                </button>
                <button type="button" className="nav-button-login">
                    <Link className = "nav-button-register-login" to = "/login">Login</Link>
                </button>
            </div>
        </nav>
    )
}