import { redirect } from "react-router-dom"

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
        description: undefined,
    }

    //password checker function can be done here or call another function

    if(submission.password != submission.password2){
        return {error: "ERROR: Password is not the same"}
    }

    console.log(submission)

    return redirect("/")
}