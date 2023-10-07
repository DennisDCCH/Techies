import React from "react"

import data from "../data/user"
import list from "../data/one-list"

import Sidebar from "../components/sidebarmenu"
import ListInfo from "../components/listinfo"

import "./editlisting.css"

export default function EditListing() {
    return (
        <div className = "editlist-container">
            <Sidebar 
                key = {data.id}
                item = {data}
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