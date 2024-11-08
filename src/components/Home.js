import React from "react";

const Home = () => {
    return (
        <div>
            <div className="text-[40px] font-bold mono flex justify-center bg-richblue-700 place-items-center min-h-screen">
                {/* <h1>Home Page</h1> */}
                <div className="place-items-center">
                    <h1 className="text-5xl font-bold mb-10 text-white">
                        Welcome to Our Web App
                    </h1>
                    <img
                        src=".././homeImage.png"
                        alt="homeImage"
                        className="w-1/2 rounded-md "
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
