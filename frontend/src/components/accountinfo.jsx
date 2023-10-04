import React from "react"
import { Link } from "react-router-dom"
import "./accountinfo.css"

export default function AccountInfo(props) {
    return (
        <div className = "accountinfo"> 
            <h1 className = "accountinfo-title">Account Information</h1>
            <div className = "accountinfo-username">
                <p>Username</p>
                <p className = "accountinfo-user-username">{props.item.username}</p>
            </div>
            <div className = "accountinfo-email">
                <p>Email</p>
                <p className = "accountinfo-user-email">{props.item.email}</p>
            </div>
            <div className = "accountinfo-dob">
                <p>Date of Birth</p>
                <p className = "accountinfo-user-dob">{props.item.dob}</p>
            </div>
            <button className = "accountinfo-editprofile-button">
                <Link className = "accountinfo-editprofile-link">Edit Profile</Link>
            </button>
        </div>
    )
}