import { redirect } from "react-router-dom"

export const changePwAction = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        password: data.get("oldpw"),
        newpw: data.get("newpw"),
        newpw2: data.get("newpw2")
    }

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

    console.log(submission)

    return redirect("/profile")
}