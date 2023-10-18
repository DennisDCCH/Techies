import React, { useState } from "react"
import "./searchbar.css"
import FILTERLOGO from "../images/filter-logo.png"
// FILTER_URL = backend endpoint

export default function Searchbar() {

    const handleClick = async (filterField, filterValue) => {

        const filter = [
            {
                field: filterField,
                op: 'like',
                value: filterValue
            }
        ]

        const payload = {
            filter: [filter]
        }
        
        try {
            const response = await axios.post(FILTER_URL, JSON.stringify(payload))

            if (response.status === 200) {
                console.log(response.data);

            } else {
                return { error: "Filter failed" };
            }
        } catch (error) {
            console.log(error.response.data.message)
            const errorMessage = error.response.data.message
            return { error: errorMessage };
        }
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
                            <ul className="dropdown-menu" id="filter-item">
                                <li>Sports
                                    <ul className="dropdown-menu-sports">
                                        <li onClick={() => handleClick('Sport', 'Basketball')}>Basketball</li>
                                        <li onClick={() => handleClick('Sport', 'Volleyball')}>Volleyball</li>
                                        <li onClick={() => handleClick('Sport', 'Badminton')}>Badminton</li>
                                        <li onClick={() => handleClick('Sport', 'Mountain Biking')}>Mountain Biking</li>
                                        <li onClick={() => handleClick('Sport', 'Soccer')}>Soccer</li>
                                        <li onClick={() => handleClick('Sport', 'Table Tennis')}>Table Tennis</li>
                                    </ul>
                                </li>
                                <li>Proficiency
                                    <ul className="dropdown-menu-proficiency" onClick={handleClick} >
                                        <li onClick={() => handleClick('Proficiency', 'High')}>High</li>
                                        <li onClick={() => handleClick('Proficiency', 'Medium')}>Medium</li>
                                        <li onClick={() => handleClick('Proficiency', 'Low')}>Low</li>
                                    </ul>
                                </li>
                            </ul>
                </div>
            </div>
        </section>
    )
}