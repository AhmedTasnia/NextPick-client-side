import React, { } from "react";
import { Link, NavLink, useNavigate } from "react-router"; // from react-router (not dom)
// import { toast } from "react-toastify";
// import { ToastContainer } from 'react-toastify';

const NavBar = () => {
  const navigate = useNavigate();
  document.title = "HOME";

    // const notify = () => toast("Logged Out successfully");
    // const notify1 = () => toast("Logged In successfully");



  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  const handleRegisterClick = () => {
    navigate("/auth/register");
  };

//   const handleLogOut = () => {
//     logOut()
//       .then(() => {
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleUserDetails = () => {
//     navigate("/auth/userDetails");
//   };
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#B8CFCE] dark:text-amber-300 fira-sans-bold underline pb-1"
              : "text-[#EAEFEF] dark:text-gray-300 fira-sans-regular"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/ExploreGardener"
          className={({ isActive }) =>
            isActive
              ? "text-[#B8CFCE] dark:text-amber-300 font-bold underline pb-1"
              : "text-[#EAEFEF] dark:text-gray-300"
          }
        >
          Queries
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/BrowseTips"
          className={({ isActive }) =>
            isActive
              ? "text-[#B8CFCE] dark:text-amber-300 fira-sans-semibold underline pb-1"
              : "text-[#EAEFEF] dark:text-gray-300"
          }
        >
          Recommendations For Me
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/BrowseTips"
          className={({ isActive }) =>
            isActive
              ? "text-[#B8CFCE] dark:text-amber-300 fira-sans-semibold underline pb-1"
              : "text-[#EAEFEF] dark:text-gray-300"
          }
        >
          My Queries
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/BrowseTips"
          className={({ isActive }) =>
            isActive
              ? "text-[#B8CFCE] dark:text-amber-300 fira-sans-semibold underline pb-1"
              : "text-[#EAEFEF] dark:text-gray-300"
          }
        >
          My recommendations
        </NavLink>
      </li>
   
    </>
  );

  return (
    <div className="px-4 navbar shadow-sm bg-[#333446] text-white noto-serif-Light">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <NavLink to="/">
              <img
                src="https://i.ibb.co/T5dX0wx/logo.jpg"
                alt="logo"
                className="h-10 w-10 rounded-full object-cover"
              />
            </NavLink>
            <h1 className="text-xl font-semibold bubblegum-sans-regular hidden lg:block"></h1>
              Next Pick
            
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end gap-3 flex items-center">
          {
        //   user ?
        //    (
        //     <>
        //       <img onClick={handleUserDetails}
        //         src={user.photoURL || "https://via.placeholder.com/40"}
        //         alt="User"
        //         className="h-8 w-8 rounded-full border-2 border-white"
        //       />
        //       <span  className="hidden lg:block text-sm font-medium text-white">
        //         Hi...{user.displayName || "User"}
        //       </span>
        //       <Link to="/">
        //       <button
        //         onClick={() => {
        //           handleLogOut();
        //           notify();
        //         } }
        //         className="btn btn-sm bg-red-600 text-white hover:bg-red-700 border-0"
        //       >
        //         Logout
        //       </button>
        //       </Link>
        //     </>
        //   ) : 
          (
            <>
              <button
                className="btn btn-sm bg-[#B8CFCE] text-black hover:bg-yellow-500 border-0"
                onClick={handleLoginClick}
              >
                Login
              </button>
              <button
                className="btn btn-sm bg-green-800 text-white hover:bg-green-600 border-0"
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default NavBar;

