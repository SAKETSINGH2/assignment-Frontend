import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BACKEND_API_BASE_URL;

const OtpVerification = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { mobileNo } = location.state;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${baseUrl}/user/verify_otp`, {
                ...data,
                mobileNo,
            });

            toast.success(response.data.message || "OTP verified successfully");

            localStorage.setItem("token", response.data.token);

            navigate("/profile");
        } catch (error) {
            toast.error(error.response.data?.message);
        }
    };

    return (
        <div className="bg-richblack-800 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-[30px] mono font-bold m-2 text-richblue-100">
                OTP Verification{" "}
            </h1>{" "}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col border-0.5 shadow-richblue-25 shadow-md p-10 rounded-md w-[400px]">
                    <label
                        className="font-semibold ml-1 text-richblue-100"
                        htmlFor="mobileNo">
                        mobileNo:
                    </label>{" "}
                    <input
                        type="text"
                        value={mobileNo}
                        readOnly
                        className="border-0.5 m-1 outline-none rounded-lg p-2 px-2 bg--800 bg-richblack-700 font-semibold text-white border-richblue-200 text-[16px] shadow-md shadow-richblue-300"
                    />
                    <label
                        className="font-semibold ml-1 text-richblue-100"
                        htmlFor="otp">
                        OTP:
                    </label>{" "}
                    <input
                        placeholder="Enter your OTP"
                        className="border-0.5 m-1 outline-none rounded-lg p-2 px-2 bg--800 bg-richblack-700 font-semibold text-white border-richblue-200 text-[16px] shadow-md shadow-richblue-300"
                        {...register("otp", {
                            required: "OTP is required",
                        })}
                    />{" "}
                    {errors.otp && (
                        <p className="text-red-500"> {errors.otp.message} </p>
                    )}{" "}
                    <button
                        type="submit"
                        className="text-richblue-600 p-1 rounded-md bg-richblue-25 m-2 font-semibold">
                        Verify OTP{" "}
                    </button>{" "}
                </div>{" "}
            </form>{" "}
        </div>
    );
};

export default OtpVerification;
