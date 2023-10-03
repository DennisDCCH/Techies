import React from "react"
import SPORTSYNCLOGO from "../images/sportsync-logo.png"
import PARKIMAGE from "../images/park-image.png"
import "./loginSidebar.css"

export default function LoginSidebar() {
  return (
    <div className = "login-sidebar">
        <img className = "login-sidebar-logo" src = {SPORTSYNCLOGO} alt = "sportsync-logo" width = "87px" />
        <div className = 'login-feature'>
          <h1 className = "login-sidebar-text">Ready to get in the game?</h1>
          <img className = "login-sidebar-image" src = {PARKIMAGE} alt = "park-image" />
        </div>
    </div>
  )
}