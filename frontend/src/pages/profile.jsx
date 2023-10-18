import React, { useEffect, useState } from "react"
import axios from "../api/axios.js"
import Sidebar from "../components/sidebarmenu.jsx"
import AccountInfo from "../components/accountinfo.jsx"
import "./profile.css"

export default function Profile() {
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
        <div className = "profile-container">
            <Sidebar 
                key = {`sidebar_${userData.id}`}
                item = {userData}
            />
            <AccountInfo
                key = {`account_info_${userData.id}`}
                item = {userData}
            />
        </div>
    )
}
