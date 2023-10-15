import React from "react"
import ReactDOM from "react-dom/client"
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom"
import RequiredAuth from "react-auth-kit"

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
import Listing from "./pages/listing"
import CreateListing from "./pages/createlisting"
import ChangePassword from "./pages/changepassword"
import EditProfile from "./pages/editprofile"
import EditListing from "./pages/editlisting"

//actions
import { loginAction } from "./actions/loginAction"
import { registerAction } from "./actions/registerAction"
import { createListingAction } from "./actions/createListingAction"
import { changePwAction } from "./actions/changePwAction"
import { editProfileAction } from "./actions/editProfileAction"
import { editListAction } from "./actions/editListAction"
import { reviewAction } from "./actions/reviewAction"
import { AuthProvider } from "./context/AuthProvider"

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
        element: (
            <RequiredAuth loginPath = "/">
                <Homepage />
            </RequiredAuth>
        ),
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
    },
    {
        path: "/listing/:id",
        element: <Listing />,
        action: reviewAction
    },
    {
        path: "/create",
        element: <CreateListing />,
        action: createListingAction
    },
    {
        path: "/change-password",
        element: <ChangePassword />,
        action: changePwAction
    },
    {
        path: "/edit-profile",
        element: <EditProfile />,
        action: editProfileAction,
    },
    {
        path: "/edit-listing",
        element: <EditListing />,
        action: editListAction,
    }
])

function handleUnauthenticatedAccess() {
    window.location.href = "/";
  }

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <AuthProvider
        authType = {"cookie"}
        authName = {"_auth"}
        cookieDomain = {window.location.hostname}
        cookieSecure = {false}
        onUnauthenticatedAccess = {handleUnauthenticatedAccess}
    >
        <RouterProvider router = {router} />
    </AuthProvider>
)