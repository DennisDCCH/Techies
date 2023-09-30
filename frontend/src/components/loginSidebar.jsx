import React from "react"
import SPORTSYNCLOGO from "../images/sportsync-logo.png"
import PARKIMAGE from "../images/park-image.png"
import "./loginSidebar.css"

/*
Cannot get the background to be completely flushed from top to bottom.

Currently, just move the image down all the way to the bottom in order to not have any white spots
But this might differ for different devices or monitor sizes
Same probelem for registerSidebar
*/
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