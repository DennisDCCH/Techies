import { redirect } from "react-router-dom"
import axios from "../api/axios";

const URL = "/user/changepassword";

export const changePwAction = async ({ request }) => {
    const data = await request.formData()

    const newpw2 = data.get("newpw2")

    const submission = {
        password: data.get("oldpw"),
        newpw: data.get("newpw"),
    }
    console.log(submission, newpw2)

    // password checker function 
    if (submission.newpw != newpw2)
        return {error: "Password is not the same"};
    if (submission.newpw.length < 8)
        return {error: "Password must at least 8 characters long"};
    if (!(/\d/.test(submission.newpw)) )
        return {error: "Password must have at least 1 number"};
    if (!(/[A-Z]/.test(submission.newpw)))
        return {error: "Password must have at least 1 upper case"};
    if (!(/[a-z]/.test(submission.newpw)))
        return {error: "Password must have at least 1 lower case"};
    if (!(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(submission.newpw)))
        return {error: "Password must have at least 1 special character"};

    

    try {
        await axios.put(URL, submission);
        return redirect("/");
    } catch (error) {
        console.log(error)
        const errorMessage = error.response.data.message
        return { error: errorMessage };
    }

}