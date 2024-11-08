import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./components/context/userAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <AuthProvider>
            <ToastContainer />
            <RouterProvider router={appRouter} />
        </AuthProvider>
    </>

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
);
