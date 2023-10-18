import React, { useEffect, useState } from "react"

//temp data
import data from "../data/user"

//components
import Sidebar from "../components/sidebarmenu"
import NewPassword from "../components/newpassword"

//css
import "./changepassword.css"
import axios from "../api/axios"

export default function ChangePassword () {
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
        <div className = "password-container">
            <Sidebar 
                key = {`sidebar_${userData.id}`}
                item = {userData}
            />
            <div className = "password-form-container">
                <NewPassword />
            </div>
        </div>
    )
}