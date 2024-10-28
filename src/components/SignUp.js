import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BACKEND_API_BASE_URL;

const Signup = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${baseUrl}/user/register`, data);

            toast.success(response.data.message || "user register successfull");
            navigate("/login");
        } catch (error) {
            toast.error(
                error.response.data.message || error.response.data.data
            );
        }
    };

    return (
        <div className="bg-richblack-800 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-[30px] mono font-bold m-2 text-richblue-100">
                Signup{" "}
            </h1>{" "}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col border-0.5 shadow-richblue-25 shadow-md p-10 rounded-md w-[400px]">
                    <label
                        className="font-semibold ml-1 text-richblue-100"
                        htmlFor="">
                        Name:{" "}
                    </label>{" "}
                    <input
                        placeholder="Enter your name"
                        className="border-0.5  m-1 outline-none rounded-lg p-2 px-2 bg--800 bg-richblack-700 font-semibold text-white border-richblue-200 text-[16px] shadow-md shadow-richblue-300"
                        {...register("name", { required: "name is required" })}
                    />{" "}
                    {errors.name && (
                        <p className="text-red-500"> {errors.name.message} </p>
                    )}{" "}
                    <label
                        className="font-semibold ml-1 text-richblue-100"
                        htmlFor="">
                        Email:{" "}
                    </label>{" "}
                    <input
                        placeholder="Enter your email"
                        className="border-0.5  m-1 outline-none rounded-lg p-2 px-2 bg--800 bg-richblack-700 font-semibold text-white border-richblue-200 text-[16px] shadow-md shadow-richblue-300"
                        {...register("email", {
                            required: "email is required",
                        })}
                    />{" "}
                    {errors.email && (
                        <p className="text-red-500"> {errors.email.message} </p>
                    )}{" "}
                    <label
                        className="font-semibold ml-1 text-richblue-100"
                        htmlFor="">
                        MobileNo:{" "}
                    </label>{" "}
                    <input
                        placeholder="Enter your MobileNo."
                        className="border-0.5  m-1 outline-none rounded-lg p-2 px-2 bg--800 bg-richblack-700 font-semibold text-white border-richblue-200 text-[16px] shadow-md shadow-richblue-300"
                        {...register("mobileNo", {
                            required: "mobileNo is required",
                        })}
                    />{" "}
                    {errors.mobileNo && (
                        <p className="text-red-500">
                            {" "}
                            {errors.mobileNo.message}{" "}
                        </p>
                    )}{" "}
                    <label
                        className="font-semibold ml-1 text-richblue-100"
                        htmlFor="">
                        Password:{" "}
                    </label>{" "}
                    <input
                        {...register("password", {
                            required: "password is required",
                        })}
                        placeholder="Enter your password"
                        className="border-0.5  m-1 outline-none rounded-lg p-2 px-2 bg--800 bg-richblack-700 font-semibold text-white border-richblue-200 text-[16px] shadow-md shadow-richblue-300"
                    />
                    {errors.password && (
                        <p className="text-red-500">
                            {" "}
                            {errors.password.message}{" "}
                        </p>
                    )}{" "}
                    <button
                        type="submit"
                        className="text-richblue-600 p-1 rounded-md bg-richblue-25 m-2 font-semibold">
                        {" "}
                        Submit{" "}
                    </button>{" "}
                </div>{" "}
            </form>{" "}
        </div>
    );
};

export default Signup;
