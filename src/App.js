import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import OtpVerification from "./components/otpVerification";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/protectedRoute";

function AppLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        // errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />,
            },

            {
                path: "/signup",
                element: <Signup />,
            },

            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/otp_verification",
                element: (
                    // <ProtectedRoute>
                    <OtpVerification />
                    // </ProtectedRoute>
                ),
            },
        ],
    },
]);
export default AppLayout;
