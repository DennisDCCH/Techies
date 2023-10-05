import React from "react"
import EMAILLOGO from "../images/email-logo.png"
import FACEBOOKLOGO from "../images/facebook-logo.png"
import INSTAGRAMLOGO from "../images/instagram-logo.png"
import TLOGO from "../images/t-logo.png"
import "./footer.css"

export default function Footer() {
    return (
        <footer>
            <div className = "footer-left">
                <img src = {EMAILLOGO} alt = "Email-logo" />
                <small>sportsync@gmail.com</small>
            </div>
            <div className = "footer-right">
                <a href="https://www.facebook.com/" target="_blank">
                    <img src={FACEBOOKLOGO} alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/" target="_blank">
                    <img src={INSTAGRAMLOGO} alt="Instagram" />
                </a>
                <a href="https://www.twitter.com/" target="_blank">
                    <img src={TLOGO} alt="Twitter" />
                </a>
            </div>
        </footer>
    )
}