import React from "react"
import ReactDOM from "react-dom/client"
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
import MyListing from "./pages/userlisting"
import SavedListing from "./pages/usersavedlisting"
import BookedListing from "./pages/userbookedlisting"

//actions
import { loginAction } from "./components/loginUI"
import { registerAction } from "./components/registerUI"

const router = createBrowserRouter([
    {
        path: "/registration",
        element: <Registration />,
        action: registerAction,
    },
    {
        path: "/",
        element: <Login />,
        action: loginAction,
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
    },
    {
        path: "/mylisting",
        element: <MyListing />
    },
    {
        path: "/savedlisting",
        element: <SavedListing />
    },
    {
        path: "/bookedlisting",
        element: <BookedListing />
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <RouterProvider router = {router} />
)