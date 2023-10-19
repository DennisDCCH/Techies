import React, { useState } from "react"
import "./searchbar.css"
import FILTERLOGO from "../images/filter-logo.png"
import axios from "../api/axios.js"


export default function Searchbar() {

    const [filterSports, setFilterSports] = useState('');
    const [filterProficiency, setFilterProficiency] = useState('');
    const [filterPrice, setFilterPrice] = useState(0);
    
    const handleSportClick = (sport) => {
        setFilterSports(sport);
    };
    
    const handleProficiencyClick = (proficiency) => {
        setFilterProficiency(proficiency);
    };

    const handlePriceValue = (price) => {
        setFilterPrice(price);
    };

    const handleClick = async ({ request }) => {

        const filterCriteria = {
            sports: filterSports,
            proficiency: filterProficiency,
            price: filterPrice
        }

        try {
            const response = await axios.post('/coaching_services/filter', filterCriteria);
    
            if (response.status === 200) {
                console.log('Filter successful');
                // Handle how the filtered lists will be displayed
                // You might update the state with the filtered data and display it.
            } else {
                return { error: "Filter failed" };
            }
        } catch (error) {
            console.log(error)
            const errorMessage = error.response.data.message
            return { error: errorMessage };
        };
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
                                    <ul className="dropdown-menu-sports">
                                        <li onClick={() => handleSportClick('Basketball')}>Basketball</li>
                                        <li onClick={() => handleSportClick('Volleyball')}>Volleyball</li>
                                        <li onClick={() => handleSportClick('Badminton')}>Badminton</li>
                                        <li onClick={() => handleSportClick('Mountain Biking')}>Mountain Biking</li>
                                        <li onClick={() => handleSportClick('Soccer')}>Soccer</li>
                                        <li onClick={() => handleSportClick('Table Tennis')}>Table Tennis</li>
                                    </ul>
                                </li>
                                <li>Proficiency
                                    <ul className="dropdown-menu-proficiency" onClick={handleClick} >
                                        <li onClick={() => handleProficiencyClick('High')}>High</li>
                                        <li onClick={() => handleProficiencyClick('Medium')}>Medium</li>
                                        <li onClick={() => handleProficiencyClick('Low')}>Low</li>
                                    </ul>
                                </li>
                                <li>Price
                                    <input 
                                        type="number" 
                                        className="dropdown-menu-price" 
                                        onChange={(e) => handlePriceValue(e.target.value)}
                                        value={filterPrice}>
                                    </input>
                                </li>
                            </ul>
                </div>
            </div>
        </section>
    )
}