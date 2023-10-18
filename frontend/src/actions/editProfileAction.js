import { redirect } from "react-router-dom"
import axios from "../api/axios"

export const editProfileAction = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        email: data.get("email"),
        username: data.get("username"),
        dob: data.get("dob"),
        userImg: data.get("file"),
        bio: data.get("bio")
    }

    console.log(submission)

    try {
        const response = await axios.put("/user", submission);

        if(response.status === 201) {
            return redirect("/profile")
        } else {
            return { error: "Profile update failed"}
        }
    } catch (error) {
        console.log(error)
        const errorMessage = error.response.data.message
        return { error: errorMessage };
    }
}