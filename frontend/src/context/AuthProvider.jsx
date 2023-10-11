// This is a basic setup for using React's Context API 
// to manage and provide authentication-related data 
// throughout a React application

import React, { useContext, createContext, useState } from "react";

// creating new context for authentication
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({}); 
    // to read & update the `auth` state, which might hold 
    // authentication-related date like the user's info or a token

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

// `AuthProvider` is a React component used to wrap parts of your app 
// where you want the authentication context to be accessible 




// `auth` could be an object like:
// {
//   token: "some_jwt_token",
//   user: {
//     id: 123,
//     name: "John Doe",
//     role: "admin"
//   }
// }