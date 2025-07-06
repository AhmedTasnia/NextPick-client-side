import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router"; // ✅ FIXED import
import { AuthContext } from "../../provider/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/"); // ✅ Redirect to Home after logout
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const commonLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#B8CFCE] underline pb-1" : "text-white"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/AllQueries"
          className={({ isActive }) =>
            isActive ? "text-[#B8CFCE] underline pb-1" : "text-white"
          }
        >
          Queries
        </NavLink>
      </li>
    </>
  );

  const privateLinks = user && (
    <>
      <li>
        <NavLink
          to="/RecommendationsForMe"
          className={({ isActive }) =>
            isActive ? "text-[#B8CFCE] underline pb-1" : "text-white"
          }
        >
          Recommendations For Me
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/MyQueries"
          className={({ isActive }) =>
            isActive ? "text-[#B8CFCE] underline pb-1" : "text-white"
          }
        >
          My Queries
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/MyRecommendations"
          className={({ isActive }) =>
            isActive ? "text-[#B8CFCE] underline pb-1" : "text-white"
          }
        >
          My Recommendations
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="px-4 navbar shadow-sm noto-serif-Regular  bg-[#333446] text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#333446] rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {commonLinks}
              {privateLinks}
            </ul>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <NavLink to="/">
              <img
                src="https://i.postimg.cc/PxG9zzzF/Logo.jpg"
                alt="logo"
                className="h-10 w-10 rounded-full object-cover"
              />
            </NavLink>
            <h1 className="text-xl  noto-serif-Bold hidden lg:block">
              Next Pick
            </h1>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {commonLinks}
            {privateLinks}
          </ul>
        </div>

        <div className="navbar-end noto-serif-Regular  gap-3 flex items-center">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL || "https://i.postimg.cc/3x1f5z6C/user.png"}
                  alt="User Avatar"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="hidden lg:block">{user.photoURL}</span>
              </div>
              <button
                onClick={handleLogOut}
                className="btn btn-sm bg-red-600 text-white hover:bg-red-700 border-0"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm bg-[#7F8CAA] text-white hover:bg-[#EAEFEF] hover:text-black border-0"
              onClick={handleLoginClick}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
