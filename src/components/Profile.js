import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./context/userAuth";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BACKEND_API_BASE_URL;

const Profile = () => {
    const [user, setUser] = useState(null);
    const [istwoFactorEnabled, setIstwoFactorEnabled] = useState(false);
    const [isActiveSessions, setIsActiveSessions] = useState([]);
    const [isShowSessions, setIsShowSessions] = useState(false);

    const navigate = useNavigate();

    const { removeToken, authtoken } = useAuth();

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user/profile`, {
                headers: {
                    Authorization: authtoken,
                },
            });

            if (response.data.result) {
                setUser(response.data.data);
                setIstwoFactorEnabled(response.data.data.twoFactorAuthEnabled);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                    "An error occurred while fetching the profile"
            );
        }
    };

    const fetchUserActiveSessions = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/user/all_active_session`,
                {
                    headers: {
                        Authorization: authtoken,
                    },
                }
            );

            if (response.data.result) {
                setIsActiveSessions(response.data.data);
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message || error);
        }
    };

    const handleLogout = async (sessionId) => {
        const response = await axios.post(
            `${baseUrl}/user/logout/${sessionId}`,
            {},
            { headers: { Authorization: authtoken } }
        );

        if (response.data.result) {
            toast.success(response.data?.message);
            fetchUserActiveSessions();
        }
    };

    useEffect(() => {
        fetchUserProfile();
        fetchUserActiveSessions();
    }, []);

    const toggleTwoFactor = async () => {
        try {
            const apiUrl = istwoFactorEnabled
                ? `${baseUrl}/user/remove_two_factor_auth`
                : `${baseUrl}/user/add_two_factor_auth`;

            const response = await axios.post(
                apiUrl,
                {},
                {
                    headers: {
                        Authorization: authtoken,
                    },
                }
            );

            if (response.data.result) {
                toast.success(response.data.message);
                setIstwoFactorEnabled(!istwoFactorEnabled);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    };

    return (
        <div className="bg-richblack-800 min-h-screen flex flex-col items-center py-10">
            <div className="bg-white shadow-md rounded-lg p-6 w-96 text-center ">
                <img
                    src=".././profileImage.webp"
                    alt="profilePic"
                    className="w-[100px] rounded-full ml-[35%]"
                />
                <p className="text-gray-600  text-[18px] font-semibold">
                    Hi,
                    <span className="text-[18px] "> {user?.name}</span>
                </p>
                <p className="text-gray-700  text-[14px] font-semibold m-2">
                    MobileNo :
                    <span className="text-[14px] "> {user?.mobileNo}</span>
                </p>
                <p className="text-gray-700  text-[14px] font-semibold">
                    Email :<span className="text-[14px] "> {user?.email}</span>
                </p>
                <div className="text-gray-700 text-[16px] font-semibold m-2">
                    Two Factor Authentication
                    {user?.twoFactorAuth === "1" ? (
                        <p className="text-white bg-green-400 rounded-md p-2 text-[10px] m-2">
                            Currently Enabled
                        </p>
                    ) : (
                        <p className="text-white bg-red-700 rounded-md p-2 text-[10px] m-2">
                            Currently Disabled
                        </p>
                    )}
                    {istwoFactorEnabled ? (
                        <button
                            onClick={toggleTwoFactor}
                            className="bg-red-500 rounded-md p-1 w-full mt-5"
                        >
                            Disable 2FA
                        </button>
                    ) : (
                        <button
                            onClick={toggleTwoFactor}
                            className="bg-green-500 rounded-md p-1 w-full mt-5"
                        >
                            Enable 2FA
                        </button>
                    )}
                </div>
                <div>
                    <h2
                        className=" text-white text-[16px] font-semibold bg-richblue-400 rounded-md mt-5 p-2 cursor-pointer"
                        onClick={() => {
                            setIsShowSessions(true);
                        }}
                    >
                        Show Active Sessions
                    </h2>
                    <div className="overflow-y-scroll h-[250px] mt-5">
                        {isShowSessions &&
                            isActiveSessions.map((data) => (
                                <div className="border-0.5 m-2 outline-none rounded-lg p-1 px-2  bg-richblack-600 font-semibold text-white border-richblue-200 text-[16px] shadow-md shadow-richblue-300">
                                    <div className="m-2">
                                        <p className="m-1">
                                            city : {data.city}
                                            <span>
                                                : country : {data.country}
                                            </span>
                                        </p>
                                        <p>
                                            loginTime :
                                            {new Date(
                                                data.loginTime
                                            ).toLocaleString()}
                                        </p>
                                        <p>
                                            {data.deviceInfo.browser} :
                                            <span> {data.deviceInfo.os} :</span>
                                            <span>
                                                {data.deviceInfo.version}
                                            </span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout(data?.sessionId);
                                        }}
                                        className="bg-red-500 rounded-md text-white font-semibold p-1"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
