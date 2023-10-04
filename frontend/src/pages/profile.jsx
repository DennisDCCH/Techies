import React from "react"
import data from "../data/user.js"
import Sidebar from "../components/sidebarmenu.jsx"

export default function Profile() {
    return (
        <div>
            <Sidebar 
                id = {data.id}
                item = {data}
            />
        </div>
    )
}
