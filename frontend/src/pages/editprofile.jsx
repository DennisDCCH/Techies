import React from "react"

//temp data
import data from "../data/user"

import Sidebar from "../components/sidebarmenu"
import ProfileInfo from "../components/profileinfo"

import "./editprofile.css"

export default function EditProfile() {
    return (
        <div className = "editprofile-container">
            <Sidebar
                key = {data.id}
                item = {data}
            />
            <div className = "editprofile-form-container">
                <ProfileInfo 
                    key = {data.id}
                    item = {data}
                />
            </div>
        </div>
    )
}