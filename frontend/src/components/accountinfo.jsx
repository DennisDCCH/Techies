import React from "react"
import { Link } from "react-router-dom"
import "./accountinfo.css"

export default function AccountInfo(props) {
    return (
        <div className = "accountinfo">
            <div className = "accountinfo-head">
                <h1 className = "accountinfo-title">Account Information</h1>
                <button className = "accountinfo-editprofile-button">
                    <Link className = "accountinfo-editprofile-link" to = "/edit-profile">Edit Profile</Link>
                </button>
            </div>
            <div className = "accountinfo-username">
                <span>Username</span>
                <span className = "accountinfo-user-username">{props.item.username}</span>
            </div>
            <div className = "accountinfo-email">
                <span>Email</span>
                <span className = "accountinfo-user-email">{props.item.email}</span>
            </div>
            <div className = "accountinfo-dob">
                <span>Date of Birth</span>
                <span className = "accountinfo-user-dob">{props.item.dob}</span>
            </div>
            <div className = "accountinfo-bio">
                <span>Bio</span>
                <span className = "accountinfo-user-bio">{props.item.bio}</span>
            </div>
        </div>
    )
}