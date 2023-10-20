import { redirect } from "react-router-dom"
import axios from "../api/axios"

const REGISTER_URL = '/register'

export const registerAction = async ({ request }) => {
    const data = await request.formData()

    const password2 = data.get("password2")
    const submission = {
        firstname: data.get("firstname"),
        lastname: data.get("lastname"),
        email: data.get("email"),
        username: data.get("username"),
        password: data.get("password"), 
        gender: data.get("gender"),
        dob: data.get("dob"),
        userImg: "",
        bio: "",
    }
    // password checker function 
    if (submission.password != password2)
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

    try {
        const response = await axios.post(REGISTER_URL, submission);

        // Check the response and handle it as needed
        if (response.status === 200) {
            // Registration was successful; you can perform any necessary actions here
            console.log("success")
            return redirect("/");
        } else {
            // Handle other response statuses as needed
            return { error: "Registration failed" };
        }
    } catch (error) {
        // Handle any Axios request error, such as network issues or server unavailability
        console.log(error)
        const errorMessage = error.response.data.message
        return { error: errorMessage };
    }
}