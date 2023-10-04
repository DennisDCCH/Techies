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
import Profile from "./pages/profile"
import Marketplace from "./pages/marketplace"
import Map from "./pages/map"
import Chat from "./pages/chat"

const router = createBrowserRouter([
    {
        path: "/registration",
        element: <Registration />
    },
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/homepage",
        element: <Homepage />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/marketplace",
        element: <Marketplace />
    },
    {
        path: "/map",
        element: <Map />
    },
    {
        path: "/chat",
        element: <Chat />
    }
    
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <RouterProvider router = {router} />
)