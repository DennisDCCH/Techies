import { redirect } from "react-router-dom"

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

    return redirect("/profile")
}