import React , { useState } from "react"
import { Link } from "react-router-dom"
import RegisterSidebar from "./registerSidebar.jsx"
import "./registerUI.css"

export default function RegisterUI() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')

    const handleSubmit = () => {
        e.preventDefault();
        console.log(firstname)
        console.log(lastname)
        console.log(email)
        console.log(username)
        console.log(password)
        console.log(password2)
        console.log(gender)
        console.log(age)
    }

    return (
        <div>
            <RegisterSidebar />
            <div className = "registerUI">
                <form className = "register-form" onSubmit = {handleSubmit}>
                    <h1 className = "register-form-text">Register</h1>
                    <div className = "register-form-name">
                        <div className = "register-form-firstname">
                                <label className = "register-form-firstname-text" htmlFor = "firstname">First Name</label>
                                <input className = "register-form-firstname-box" value = {firstname} onChange = {(e) => setFirstname(e.target.value)} type = "firstname" />
                        </div>
                        <div className = "register-form-lastname">
                                <label className = "register-form-lastname-text" htmlFor = "lastname">Last Name</label>
                                <input className = "register-form-lastname-box" value = {lastname} onChange = {(e) => setLastname(e.target.value)} type = "lastname" />
                        </div>
                    </div>
                    <div className = "register-form-email">
                        <label className = "register-form-email-text" htmlFor = "email">Email</label>
                        <input className = "register-form-email-box" value = {email} onChange = {(e) => setEmail(e.target.value)} type = "email" />
                    </div>
                    <div className = "register-form-username">
                        <label className = "register-form-username-text" htmlFor = "username">Username</label>
                        <input className = "register-form-username-box" value = {username} onChange = {(e) => setUsername(e.target.value)} type = "username" />
                    </div>
                    <div className = "register-form-password">
                        <label className = "register-form-password-text" htmlFor = "password">Password</label>
                        <input className = "register-form-password-box" value = {password} onChange = {(e) => setPassword(e.target.value)} type = "password" />
                    </div>
                    <div className = "register-form-password2">
                        <label className = "register-form-password2-text" htmlFor = "password">Re-enter Password</label>
                        <input className = "register-form-password2-box" value = {password2} onChange = {(e) => setPassword2(e.target.value)} type = "password" />
                    </div>
                    <div className = "register-form-miscellaneous">
                        <div className = "register-form-gender">
                            <label className = "register-form-gender-text" htmlFor = "gender">Gender</label>
                            <select className = "register-form-gender-option" name = "gender" value = {gender} onChange = {(e) => setGender(e.target.value)}>
                                <option value="" disabled selected>Select an option</option>
                                <option value = "male">Male</option>
                                <option value = "female">Female</option>
                                <option value = "others">Others</option>
                            </select>
                        </div>
                        <div className = "register-form-age">
                            <label className = "register-form-age-text" htmlFor = "age">Age</label>
                            <input className = "register-form-age-box" value = {age} onChange = {(e) => setAge(e.target.value)} type = "age" />
                        </div>
                    </div>
                    <Link className = "register-to-login" to = "/login">Already have an account? Login here!</Link>
                    <button className = "register-button" type = "submit">Register New Account</button>
                </form>
            </div>
        </div>

  )
}