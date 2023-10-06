import React from "react"

//temp data
import data from "../data/user"

//components
import Sidebar from "../components/sidebarmenu"
import NewListing from "../components/newlist"

//css
import "./createlisting.css"

export default function CreateListing() {
    return (
        <div className = "create-container">
            <Sidebar 
                key = {data.id}
                item = {data}
            />
            <div className = "create-form-container">
                <NewListing />
            </div>
        </div>
        
    )
}