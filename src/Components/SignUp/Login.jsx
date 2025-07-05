import React, { useContext, useEffect, useRef, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash,FaEnvelope, FaLock } from "react-icons/fa";
import NavBar from '../Header/NavBar';
import { Link } from 'react-router';
import Footer from '../Footer/Footer';
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const provider = new GoogleAuthProvider();
  const { signIn, setUser } = useContext(AuthContext);

  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          icon: "success",
          title: `Logged in as ${result.user.displayName}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Google sign-in failed",
          text: error.message,
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields",
      });
      return;
    }

    signIn(email, password)
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: error.message,
        });
      });
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Please enter your email first",
      });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Reset Failed",
          text: error.message,
        });
      });
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen noto-serif-Regular flex items-center justify-center bg-[#7F8CAA] px-2">
        <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-8">
            <img
              src="https://i.ibb.co/Q7Zdzd3x/desktop-mobile-illustration-login-page-data-analysis-559664-335.jpg"
              alt="Login illustration"
              className="w-3/4 md:w-full h-auto object-contain"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 bg-[#f7f9fc] p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-[#2c2c78] mb-2">NextPick</h2>
            <p className="text-sm text-gray-600 mb-6">Hey! Enter your details to sign in to your account</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className=" relative">
                 <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>

                <div onClick={handleForgotPassword} className="text-right mt-1">
                  <button type="button" className="text-sm text-blue-600 hover:underline">Forgot password?</button>
                </div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="w-full bg-[#333446] hover:bg-[#2c2c78] text-white font-semibold py-2 px-4 rounded flex items-center justify-center mb-2"
              >
                <FcGoogle className="inline mr-2" />
                Login with Google
              </button>

              <button
                type="submit"
                className="w-full bg-[#7F8CAA] text-white py-2 mt-1 rounded-md hover:bg-[#2c2c78] transition duration-200"
              >
                Login
              </button>

              <Link to="/auth/register" className="w-full md:w-auto block">
                <p className="mt-4 text-sm text-center text-gray-600">
                  Don’t have an account? <span className="text-blue-600 hover:underline">Create new account</span>
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
