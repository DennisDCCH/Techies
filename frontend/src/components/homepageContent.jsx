import React from "react"
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
                        <img src = {COACHLOGO} width = "150px" height = "150px" />
                        <p>Coaches</p>
                    </div>
                    <div className = "main-right-bottom-map">
                        <img src = {MAPLOGO} width = "150px" height = "150px" />
                        <p>Taxi</p>
                    </div>
                    <div className = "main-right-bottom-chat">
                        <img src = {CHATLOGO} width = "150px" height = "150px" />
                        <p>Taxi</p>
                    </div>
                </div>
            </div>
        </div>
    )
}