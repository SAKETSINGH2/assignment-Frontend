import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex justify-evenly bg-cyan-900">
            <div className="flex font-semibold text-white gap-x-6 m-6">
                <Link to="/">
                    <p> Home </p>{" "}
                </Link>{" "}
                <Link to="/profile">
                    <p> Profile </p>{" "}
                </Link>{" "}
            </div>{" "}
        </div>
    );
};
export default Navbar;
