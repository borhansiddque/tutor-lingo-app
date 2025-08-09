import React, { useContext } from "react";
import ThemeToggle from "./ThemeToggle";
import { Link, NavLink } from "react-router";
import { MdMenu } from "react-icons/md";
import {
  FaHome,
  FaSearch,
  FaPlus,
  FaBook,
  FaUserGraduate,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("You LogOut Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const links = (
    <>
      <li>
        {" "}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-2 font-medium py-1 px-2 rounded-lg transition-all duration-200 hover:bg-rose-100 ${
              isActive
                ? "text-white bg-rose-700 shadow-md hover:text-rose-700"
                : "hover:text-rose-700"
            }`
          }
          to={"/"}
        >
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-2 font-medium py-1 px-2 rounded-lg transition-all duration-200 hover:bg-rose-100 ${
              isActive
                ? "text-white bg-rose-700 shadow-md hover:text-rose-700"
                : "hover:text-rose-700"
            }`
          }
          to={"/find-tutors"}
        >
          <span>Find Tutors</span>
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-2 font-medium py-1 px-2 rounded-lg transition-all duration-200 hover:bg-rose-100 ${
              isActive
                ? "text-white bg-rose-700 shadow-md hover:text-rose-700"
                : "hover:text-rose-700"
            }`
          }
          to={"/about-us"}
        >
          <span>About Us</span>
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            {" "}
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium py-1 px-2 rounded-lg transition-all duration-200 hover:bg-rose-100 ${
                  isActive
                    ? "text-white bg-rose-700 shadow-md hover:text-rose-700"
                    : "hover:text-rose-700"
                }`
              }
              to={"/add-tutorials"}
            >
              <span>Add Tutorials</span>
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium py-1 px-2 rounded-lg transition-all duration-200 hover:bg-rose-100 ${
                  isActive
                    ? "text-white bg-rose-700 shadow-md hover:text-rose-700"
                    : "hover:text-rose-700"
                }`
              }
              to={"/my-tutorials"}
            >
              <span>My Tutorials</span>
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium py-1 px-2 rounded-lg transition-all duration-200 hover:bg-rose-100 ${
                  isActive
                    ? "text-white bg-rose-700 shadow-md hover:text-rose-700"
                    : "hover:text-rose-700"
                }`
              }
              to={"/my-booked-tutors"}
            >
              <span>Booked Tutors</span>
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="bg-base-200 shadow-sm sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden px-2"
            >
              <MdMenu size={24}></MdMenu>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"}>
            <h3 className="text-2xl text-rose-500 font-semibold">
              TutorLingo.
            </h3>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-2">{links}</ul>
        </div>
        <div className="navbar-end gap-4">
          <ThemeToggle></ThemeToggle>
          {user ? (
            <div className="flex gap-2">
              {/* <NavLink className={"hidden sm:block"}>
                <button
                  onClick={handleLogOut}
                  className="btn bg-rose-700 hover:bg-rose-600 text-white px-7"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span>Logout</span>
                </button>
              </NavLink> */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar ring-2 ring-rose-700"
                  title={user.displayName || user.email}
                >
                  <div className="w-10 rounded-full bg-white">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        user.photoURL
                          ? user.photoURL
                          : "https://img.icons8.com/?size=50&id=23265&format=png"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-54 shadow rounded bg-white space-y-2"
                >
                  <li className="text-base text-rose-700 text-center">
                    {user && user.displayName}
                  </li>
                  <li className="text-sm text-rose-900 text-center font-semibold">
                    {user && user.email}
                  </li>
                  <li className="block">
                    <button
                      onClick={handleLogOut}
                      className="btn bg-rose-700 hover:bg-rose-600 text-white w-full flex items-center gap-2 border-none text-sm"
                    >
                      <FaSignOutAlt size={18} />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <NavLink to={"/login"}>
              <button className="btn bg-rose-700 hover:bg-rose-600 text-white px-7">
                <FaSignInAlt className="text-sm" />
                <span>Login</span>
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
