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

    //username checker function
    

    //password checker function 
    // function checkPassRequirement(pass1, pass2){
    //     if (pass1 != pass2)
    //         console.log("ERROR: Password is not the same")
    //     else if (pass1.length < 8 || 
    //             !(/\d/.test(pass1)) || 
    //             !(/[A-Z]/.test(pass1)) || 
    //             !(/[a-z]/.test(pass1)) || 
    //             !(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pass1)))
    //         console.log("ERROR: Password must be at least 8 characters long and a combination of uppercase letters, lowercase letters, numbers, and special charcters")
    // }

    // checkPassRequirement(submission.password, submission.password2);

    // password checker function 
    if (submission.password != submission.password2)
        return {error: "ERROR: Password is not the same"};
    if (submission.password.length < 8)
        return {error: "ERROR: Password must at least 8 characters long"};
    if (!(/\d/.test(submission.password)) )
        return {error: "ERROR: Password must have at least 1 number"};
    if (!(/[A-Z]/.test(submission.password)))
        return {error: "ERROR: Password must have at least 1 upper case"};
    if (!(/[a-z]/.test(submission.password)))
        return {error: "ERROR: Password must have at least 1 lower case"};
    if (!(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(submission.password)))
        return {error: "ERROR: Password must have at least 1 special character"};

    console.log(submission);

    return redirect("/")
}