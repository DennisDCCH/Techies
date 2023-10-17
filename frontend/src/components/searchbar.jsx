import React, { useState } from "react"
import "./searchbar.css"
import FILTERLOGO from "../images/filter-logo.png"
import data from "../data/listing.js"

export default function Searchbar() {

    const [query, setQuery] = useState(" "); // define the query state variable

    const handleClick = (e) => {
        const clickedItem = e.target.textContent;
        setQuery(clickedItem);
        // perform functions based on the input change here
        const activity = data.filter((item) => item.sport === value)
        return activity;
    }

    return (
        <section>
            <div className="search">
                <input 
                    className = "search-box" 
                    type="text" 
                    placeholder="Enter your activity"
                    /* do functions based on change */
                />
            </div>
            <div className="nav-right">
                <div className="dropdown">
                    <img className = "filter-icon" src = {FILTERLOGO} alt = "filter-logo"/>
                            <ul className="dropdown-menu">
                                <li>Sports
                                    <ul className="dropdown-menu-sports" onClick={handleClick} value={query}>
                                        <li>Basketball</li>
                                        <li>Volleyball</li>
                                        <li>Badminton</li>
                                        <li>Mountain Biking</li>
                                        <li>Soccer</li>
                                        <li>Table Tennis</li>
                                    </ul>
                                </li>
                                <li>Proficiency
                                    <ul className="dropdown-menu-proficiency" onClick={handleClick} value={query}>
                                        <li>High</li>
                                        <li>Medium</li>
                                        <li>Low</li>
                                    </ul>
                                </li>
                            </ul>
                </div>
            </div>
        </section>
    )
}