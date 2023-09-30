import React , { useState } from "react"
import { Link } from "react-router-dom"
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
        <div className = "registerUI">
            <h1 className = "registerUI-text">Register</h1>
            <form className = "register-form" onSubmit = {handleSubmit}>
                <div className = "register-form-name">
                    <div className = "register-form-firstname">
                            <label htmlFor = "firstname">Firstname</label>
                            <input value = {firstname} onChange = {(e) => setFirstname(e.target.value)} type = "firstname" />
                    </div>
                    <div className = "register-form-lastname">
                            <label htmlFor = "lastname">Lastname</label>
                            <input value = {lastname} onChange = {(e) => setLastname(e.target.value)} type = "lastname" />
                    </div>
                </div> 
                <div className = "register-form-email">
                    <label htmlFor = "email">Email</label>
                    <input value = {email} onChange = {(e) => setEmail(e.target.value)} type = "email" />
                </div>
                <div className = "register-form-username">
                    <label htmlFor = "username">Username</label>
                    <input value = {username} onChange = {(e) => setUsername(e.target.value)} type = "username" />
                </div>
                <div className = "register-form-password">
                    <label htmlFor = "password">Password</label>
                    <input value = {password} onChange = {(e) => setPassword(e.target.value)} type = "password" />
                </div>
                <div className = "register-form-password2">
                    <label htmlFor = "password2">Re-enter Password</label>
                    <input value = {password2} onChange = {(e) => setPassword2(e.target.value)} type = "password2" />
                </div>
                <div className = "register-form-miscellaneous">
                    <div className = "register-form-gender">
                        <label htmlFor = "gender">Gender</label>
                        <input value = {gender} onChange = {(e) => setGender(e.target.value)} type = "gender" />
                    </div>
                    <div className = "register-form-age">
                        <label htmlFor = "age">Age</label>
                        <input value = {age} onChange = {(e) => setAge(e.target.value)} type = "age" />
                    </div> 
                </div>
                <button>
                    <Link to = "/login">Already have an account? Login here!</Link>
                </button>
                <button type = "submit">Register New Account</button>
            </form>
        </div>
  )
}