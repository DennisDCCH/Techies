import React, { useEffect, useState } from "react"

import data from "../data/user"
import list from "../data/one-list"

import Sidebar from "../components/sidebarmenu"
import ListInfo from "../components/listinfo"

import "./editlisting.css"
import axios from "../api/axios"

export default function EditListing() {
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
        <div className = "editlist-container">
            <Sidebar 
                key = {`sidebar_${userData.id}`}
                item = {userData}
            />
            <div className = "editlist-form-container">
                <ListInfo
                    key = {list.id}
                    item = {list}
                />
            </div>
        </div>

    )
}