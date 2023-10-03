import React from "react"
import ReactDOM from "react-dom"
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom"

//pages
import Homepage from "./pages/homepage"
import Registration from "./pages/registration"
import Login from "./pages/login"


const router = createBrowserRouter([
    {
        path: "/homepage",
        element: <Homepage />
    },
    {
        path: "/registration",
        element: <Registration />
    },
    {
        path: "/",
        element: <Login />
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <RouterProvider router = {router} />
)