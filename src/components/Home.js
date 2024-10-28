import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div className="text-[40px] font-bold mono flex justify-center">
                Home Page
            </div>
            <div className="text-[20px] font-semibold mono flex flex-col justify-center items-center min-h-screen">
                <Link to="/login">
                    {" "}
                    <button className="bg-richblue-400 text-richblue-50 rounded-md p-2 w-[200px] m-2">
                        Go to Login page
                    </button>
                </Link>
                <Link to="/signup">
                    {" "}
                    <button className="bg-richblue-400 rounded-md p-2 w-[200px] text-richblue-50">
                        Go to Signup page
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
