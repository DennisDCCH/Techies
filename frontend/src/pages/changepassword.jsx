import React from "react"

//temp data
import data from "../data/user"

//components
import Sidebar from "../components/sidebarmenu"
import NewPassword from "../components/newpassword"

//css
import "./changepassword.css"

export default function ChangePassword () {
    return (
        <div className = "password-container">
            <Sidebar 
                key = {data.id}
                item = {data}
            />
            <div className = "password-form-container">
                <NewPassword />
            </div>
        </div>
    )
}