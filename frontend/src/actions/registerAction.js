import { redirect } from "react-router-dom"
import axios from "../api/axios"

const LOGIN_URL = '/register'

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
        dob: data.get("dob"),
        userImg: undefined,
        bio: undefined,
    }

    //username checker function

    // password checker function 
    if (submission.password != submission.password2)
        return {error: "Password is not the same"};
    if (submission.password.length < 8)
        return {error: "Password must at least 8 characters long"};
    if (!(/\d/.test(submission.password)) )
        return {error: "Password must have at least 1 number"};
    if (!(/[A-Z]/.test(submission.password)))
        return {error: "Password must have at least 1 upper case"};
    if (!(/[a-z]/.test(submission.password)))
        return {error: "Password must have at least 1 lower case"};
    if (!(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(submission.password)))
        return {error: "Password must have at least 1 special character"};


    console.log(submission); 

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

    return redirect("/")
}