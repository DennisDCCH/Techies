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

    //username checker function

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


    console.log(submission); 

    try {
        const response = await axios.post(REGISTER_URL, submission);

        // Check the response and handle it as needed
        if (response.status === 200) {
            // Registration was successful; you can perform any necessary actions here
            // For example, you might want to redirect the user to a success page.
            console.log("success")
            return redirect("/");
        } else if (response.status === 409) {
            // User with the same username already exists
            const errorResponse = await response.json();
            const errorMessage = errorResponse.message;
            return { error: errorMessage };
        } else {
            // Handle other response statuses as needed
            return { error: "Registration failed" };
        }
    } catch (error) {
        // Handle any Axios request error, such as network issues or server unavailability
        console.log(error)
        return { error: "An error occurred while registering" };
    }
}