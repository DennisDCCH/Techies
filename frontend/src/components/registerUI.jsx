import React, { useState } from "react"
import { Form, Link, redirect, useActionData } from "react-router-dom"
import RegisterSidebar from "./registerSidebar.jsx"
import "./registerUI.css"

export default function RegisterUI() {
    const data = useActionData()

    const handleRegister = async (e) => {
        e.preventDefault(); // use event to prevent default: reload the page

        try {
            const response = await axios.post(LOGIN_URL, // attaches itself to the baseUrl that we alr defined in the api directory
                JSON.stringify({ submission }),           // sends the user's credentials (user and pwd) to the login URL
                {
                    headers: { 'Content-Type:': 'application/json '},
                    withCredentials: true
                    // ensures that any cookies set by the server during this request are saved 
                    // and sent with subsequent requests, which is crucial for session-based authentication or when using HTTP-only cookies.
                }
            );
            console.log(JSON.stringify(response?.data));  // store token in memory
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ submission });  // update local state
            navigate(from, { replace: true });
        } catch (err) {
    
            return {err: "Password must have at least 1 special character"} 
            // if (!err?.response) {
            //     setErrMsg('NoServerResponse');
            // } else if (err.response?.status === 400) {
            //     setErrMsg('Missing Username or Password');
            // } else if (err.response?.status === 401) {
            //     setErrMsg('Unauthorized');
            // } else {
            //     setErrMsg('Login Failed');
            // }
            // errRef.current.focus();
        }
    }

    return (
        <div className = "register-background">
            <RegisterSidebar />
            <div className = "registerUI">
                <Form className = "register-form"  method = "post" action = "/registration">
                    <h1 className = "register-form-text">Register</h1>
                    <div className = "register-form-name">
                        <div className = "register-form-firstname">
                                <label className = "register-form-firstname-text">First Name</label>
                                <input className = "register-form-firstname-box" type = "text" name = "firstname" required/>
                        </div>
                        <div className = "register-form-lastname">
                                <label className = "register-form-lastname-text">Last Name</label>
                                <input className = "register-form-lastname-box" type = "text" name = "lastname" required/>
                        </div>
                    </div>
                    <div className = "register-form-email">
                        <label className = "register-form-email-text">Email</label>
                        <input className = "register-form-email-box" type = "email" name = "email" required/>
                    </div>
                    <div className = "register-form-username">
                        <label className = "register-form-username-text">Username</label>
                        <input className = "register-form-username-box" type = "text" name = "username" required/>
                    </div>
                    <div className = "register-form-password">
                        <label className = "register-form-password-text">Password</label>
                        <input className = "register-form-password-box" type = "password" name = "password" required/>
                    </div>
                    <div className = "register-form-password2">
                        <label className = "register-form-password2-text">Re-enter Password</label>
                        <input className = "register-form-password2-box" type = "password" name = "password2" required/>
                    </div>
                    <div className = "register-form-miscellaneous">
                        <div className = "register-form-gender">
                            <label className = "register-form-gender-text">Gender</label>
                            <select className = "register-form-gender-option" name = "gender" required>
                                <option value="" disabled selected>Select an option</option>
                                <option value = "Male">Male</option>
                                <option value = "Female">Female</option>
                                <option value = "Others">Others</option>
                            </select>
                        </div>
                        <div className = "register-form-age">
                            <label className = "register-form-age-text" htmlFor = "dob">Date of Birth</label>
                            <input className = "register-form-age-box" type = "date" name = "dob" required/>
                        </div>
                    </div>
                    <Link className = "register-to-login" to = "/">Already have an account? Login here!</Link>
                    <button className = "register-button" type = "submit">Register New Account</button>

                    {data && data.error && <p className = "register-error">{data.error}</p>}

                    {/* To do for fun if got time -Dennis
                    https://www.youtube.com/watch?v=AF6vGYIyV8M&ab_channel=GreatStack
                    {data && data.error && <Popup message = {data.error}/>}
                    */}
                </Form>
            </div>
        </div>

  )
}