import React from "react"
import { Link } from "react-router-dom"
import SPORTS from "../images/sports.png"
import COACHLOGO from "../images/coach-logo.png"
import CHATLOGO from "../images/chat-logo.png"
import MAPLOGO from "../images/map-logo.png"
import "./homepageContent.css"

export default function HomepageContent() {
    return (
        <div className = "main">
            <div className = "main-left">
                <h2 className = "main-title">GET IN THE GAME</h2>
                <h3 className = "main-description">
                    With SportSync, coaches can set up
                    training sessions that other users
                    athletes can book, while athletes can
                    search for training opportunities.<br /><br />

                    By checking out the available training
                    sessions, amateur athletes can choose
                    to develop their game sense for that
                    respective sport.
                </h3>
                <h1 className = "main-explore">Explore Now:</h1>
            </div>
            <div className = "main-right">
                <div className = "main-right-top">
                    <img src = {SPORTS} width = "751px" height = "445px" />
                </div>
                <div className = "main-right-bottom">
                    <div className = "main-right-bottom-coach">
                        <Link to = "/marketplace">
                            <img src = {COACHLOGO} width = "150px" height = "150px" />
                        </Link>
                        <p>Activities</p>
                    </div>
                    <div className = "main-right-bottom-map">
                        <Link to = "/map">
                            <img src = {MAPLOGO} width = "150px" height = "150px" />
                        </Link>
                        <p>Map</p>
                    </div>
                    <div className = "main-right-bottom-chat">
                        <Link to = "/chat">
                            <img src = {CHATLOGO} width = "150px" height = "150px" />
                        </Link>                        
                        <p>Chat</p>
                    </div>
                </div>
            </div>
        </div>
    )
}