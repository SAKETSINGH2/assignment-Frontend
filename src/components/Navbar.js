import { Link } from "react-router-dom";
import { useAuth } from "./context/userAuth";

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();

    return (
        <div className="bg-cyan-600">
            <div className="flex justify-between font-semibold text-white gap-x-6 p-4">
                <div>
                    {" "}
                    <Link to="/">
                        <p> Home </p>
                    </Link>
                </div>

                <div>
                    {" "}
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile">
                                <button className="bg-slate-50 rounded-md text-black p-2 m-2 px-7 text-[18px] font-semibold">
                                    Profile
                                </button>
                            </Link>

                            <button
                                onClick={() => {
                                    logout();
                                }}
                                className="bg-slate-50 rounded-md text-black p-2 m-2 px-7 text-[18px] font-semibold"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup">
                                <button className="bg-slate-50 rounded-md text-black p-2 m-2 px-7 text-[18px] font-semibold">
                                    singup
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="bg-slate-50 rounded-md text-black p-2 m-2 px-7 text-[18px] font-semibold">
                                    login
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Navbar;
