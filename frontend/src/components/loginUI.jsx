import React, { useRef, useState, useEffect, useContext } from "react"
import { Link, Form, redirect, useNavigate, useLocation } from "react-router-dom"
import LoginSidebar from "./loginSidebar"
import "./loginUI.css"

import useAuth from '../hooks/useAuth' // global state with a useContext
import axios from '../api/axios'
const LOGIN_URL = '/auth'

export default function loginUI() {
    const { setAuth } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleLogin = async (e) => {
        e.preventDefault(); // use event to prevent default: reload the page

        try {
            const response = await axios.post(LOGIN_URL, // attaches itself to the baseUrl that we alr defined in the api directory
                JSON.stringify({ user, pwd }), // api expects
                {
                    headers: { 'Content-Type:': 'application/json '},
                    withCredentials: true
                    //XMLHttpRequest responses from a different domain cannot set cookie values for their own domain unless withCredentials is set to true before making the request.
                }
            );
            console.log(JSON.stringify(response?.data));
            // store token in memory
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('NoServerResponse');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className = "login-background"> 
            <LoginSidebar /> 
            <div className = "loginUI">
                <Form onLogin={handleLogin} className = "login-form" method = "post" action = "/">
                    <h1 className = "login-form-text">Log-in</h1>
                    <div className = "login-form-username">
                        <label className = "login-form-username-text">Username</label>
                        <input 
                            className = "login-form-username-box" 
                            type = "text" 
                            name = "username" 
                            ref = {userRef}
                            onChange = {(e) => setUser(e.target.value)}
                            value = {user}
                            required
                        />
                    </div>
                    <div className = "login-form-password"> 
                        <label className = "login-form-password-text">Password</label>
                        <input 
                            className = "login-form-password-box" 
                            type = "password" 
                            name = "password" 
                            onChange = {(e) => setPwd(e.target.value)}
                            value = {pwd}
                            required
                        />
                    </div>
                    <Link className = "login-to-register" to = "/registration">Don't have an account? Register here!</Link>
                    <button className = "login-button" type = "submit">Log in</button>
                </Form>
            </div>
        </div> 
  )
}