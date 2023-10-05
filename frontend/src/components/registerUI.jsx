import React from "react"
import { Form, Link, redirect, useActionData } from "react-router-dom"
import RegisterSidebar from "./registerSidebar.jsx"
import "./registerUI.css"

export default function RegisterUI() {
    const data = useActionData()

    return (
        <div className = "register-background">
            <RegisterSidebar />
            <div className = "registerUI">
                <Form className = "register-form"  method = "post" action = "/registration">
                    <h1 className = "register-form-text">Register</h1>
                    <div className = "register-form-name">
                        <div className = "register-form-firstname">
                                <label className = "register-form-firstname-text">First Name</label>
                                <input className = "register-form-firstname-box" type = "firstname" name = "firstname" />
                        </div>
                        <div className = "register-form-lastname">
                                <label className = "register-form-lastname-text">Last Name</label>
                                <input className = "register-form-lastname-box" type = "lastname" name = "lastname"/>
                        </div>
                    </div>
                    <div className = "register-form-email">
                        <label className = "register-form-email-text">Email</label>
                        <input className = "register-form-email-box" type = "email" name = "email"/>
                    </div>
                    <div className = "register-form-username">
                        <label className = "register-form-username-text">Username</label>
                        <input className = "register-form-username-box" type = "username" name = "username"/>
                    </div>
                    <div className = "register-form-password">
                        <label className = "register-form-password-text">Password</label>
                        <input className = "register-form-password-box" type = "password" name = "password"/>
                    </div>
                    <div className = "register-form-password2">
                        <label className = "register-form-password2-text">Re-enter Password</label>
                        <input className = "register-form-password2-box" type = "password" name = "password2"/>
                    </div>
                    <div className = "register-form-miscellaneous">
                        <div className = "register-form-gender">
                            <label className = "register-form-gender-text">Gender</label>
                            <select className = "register-form-gender-option" name = "gender">
                                <option value="" disabled selected>Select an option</option>
                                <option value = "Male">Male</option>
                                <option value = "Female">Female</option>
                                <option value = "Others">Others</option>
                            </select>
                        </div>
                        <div className = "register-form-age">
                            <label className = "register-form-age-text" htmlFor = "dob">Date of Birth</label>
                            <input className = "register-form-age-box" type = "date" name = "dob"/>
                        </div>
                    </div>
                    <Link className = "register-to-login" to = "/">Already have an account? Login here!</Link>
                    <button className = "register-button" type = "submit">Register New Account</button>

                    {data && data.error && <p className = "register-error">{data.error}</p>}
                </Form>
            </div>
        </div>

  )
}

export const registerAction = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        firstname: data.get("firstname"),
        lastname: data.get("lastname"),
        email: data.get("email"),
        username: data.get("username"),
        password: data.get("password"),
        password2: data.get("password2"),
        gender: data.get("gender"),
        dob: data.get("dob")
    }

    //password checker function can be done here or call another function

    if(submission.password != submission.password2){
        return {error: "ERROR: Password is not the same"}
    }
    
    console.log(submission)

    return redirect("/")
}