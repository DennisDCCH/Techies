import React from "react"
import SPORTS from "../images/sports.png"
import TAXILOGO from "../images/taxi-logo.png"
import COACHLOGO from "../images/coach-logo.png"

export default function MainContent() {
    return (
        <div className = "main">
            <div className = "main-left">
                <h2 className = "main-title">GET IN THE GAME</h2>
                <h3 className = "main-description">
                    With SportSync, coaches can set up <br />
                    training sessions that other users <br />
                    athletes can book, while athletes can <br />
                    search for training opportunities. <br /><br />

                    By checking out the available training <br />
                    sessions, amateur athletes can choose <br />
                    to develop their game sense for that <br />
                    respective sport.
                </h3>
                <h1 className = "main-explore">Explore Now:</h1>
            </div>
            <div className = "main-right">
                <div className = "main-right-top">
                    <img src = {SPORTS} width = "751px" height = "445px" />
                </div>
                <div className = "main-right-bottom">
                    <div className = "main-right-bottom-taxi">
                        <img src = {TAXILOGO} width = "150px" height = "150px" />
                        <p>Taxi</p>
                    </div>
                    <div className = "main-right-bottom-coach">
                        <img src = {COACHLOGO} width = "150px" height = "150px" />
                        <p>Coaches</p>
                    </div>
                </div>
            </div>
        </div>
    )
}