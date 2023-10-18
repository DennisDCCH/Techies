import React, { useEffect, useState } from "react"

//temp data
import data from "../data/user"

import Sidebar from "../components/sidebarmenu"
import ProfileInfo from "../components/profileinfo"

import "./editprofile.css"
import axios from "../api/axios"

export default function EditProfile() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get("/user")
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    return (
        <div className = "editprofile-container">
            <Sidebar
                key = {`sidebar_${userData.id}`}
                item = {userData}
            />
            <div className = "editprofile-form-container">
                <ProfileInfo 
                    key = {`profile_info_${userData.id}`}
                    item = {userData}
                />
            </div>
        </div>
    )
}