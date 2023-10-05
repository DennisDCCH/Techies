import React from "react"
/* temp data */
import data from "../data/user.js"
import Sidebar from "../components/sidebarmenu.jsx"
import AccountInfo from "../components/accountinfo.jsx"
import "./profile.css"

export default function Profile() {
    return (
        <div className = "profile-container">
            <Sidebar 
                id = {data.id}
                item = {data}
            />
            <AccountInfo
                id = {data.id}
                item = {data}
            />
        </div>
    )
}
