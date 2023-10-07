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
        bio: undefined,
    }

    //password checker function can be done here or call another function
    function checkPassRequirement(){
        if (submission.password != submission.password2)
            return {error: "ERROR: Password is not the same"}
        else if (submission.password.length < 8 || 
                !(/\d/.test(submission.password)) || 
                !(/[A-Z]/.test(submission.password)) || 
                !(/[a-z]/.test(submission.password)) || 
                !(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(submission.password)))
            return {error: "ERROR: Password must be at least 8 characters long and a combination of uppercase letters, lowercase letters, numbers, and special charcters"}
    }

    console.log(submission)

    return redirect("/")
}