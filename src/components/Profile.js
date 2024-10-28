import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BACKEND_API_BASE_URL;

const Profile = () => {
    const [user, setUser] = useState(null);
    const [istwoFactorEnabled, setIstwoFactorEnabled] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${baseUrl}/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });

                if (response.data.result) {
                    setUser(response.data.data);
                    setIstwoFactorEnabled(
                        response.data.data.twoFactorAuthEnabled
                    );
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

        fetchUserProfile();
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
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
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
                <h2 className="text-gray-800  text-[18px] font-semibold ">
                    {user?.name}
                </h2>
                <p className="text-gray-600  text-[18px] font-semibold">
                    userName :{" "}
                    <span className="text-[14px] ">{user?.name}</span>
                </p>
                <p className="text-gray-600  text-[18px] font-semibold">
                    MobileNo :
                    <span className="text-[14px] ">{user?.mobileNo}</span>
                </p>
                <p className="text-gray-600  text-[18px] font-semibold">
                    email :<span className="text-[14px] ">{user?.email}</span>
                </p>
                <p className="text-gray-600 text-[18px] font-semibold flex ">
                    Two factor authentication :
                    {user?.twoFactorAuth == "1" ? (
                        <p className="text-white bg-green-400 rounded-md w-[100px]">
                            Enabled{" "}
                        </p>
                    ) : (
                        <p className="text-white bg-red-700 rounded-md w-[100px]">
                            Disabled
                        </p>
                    )}
                </p>

                <button
                    onClick={toggleTwoFactor}
                    className={`mt-4 px-4 py-2 rounded ${
                        istwoFactorEnabled ? "bg-red-500" : "bg-green-500"
                    } text-white`}>
                    {istwoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                </button>
            </div>
        </div>
    );
};

export default Profile;
