import React from "react"
import SPORTSYNCLOGO from "../images/sportsync-logo.png"
import TREEHARVESTING from "../images/harvesting-apple.png"
import "./registerSidebar.css"

export default function RegisterSidebar() {
  return (
    <div className = "register-sidebar">
        <img className = "register-sidebar-logo" src = {SPORTSYNCLOGO} alt = "sportsync-logo" width = "87px" />
        <div className = 'register-feature'>
            <h1 className = "register-sidebar-text">What are you waiting for? <br /> Join SportSync now!</h1>
            <img className = "register-sidebar-image" src = {TREEHARVESTING} alt = "harvest-apple-image" />
        </div>
    </div>
  )
}