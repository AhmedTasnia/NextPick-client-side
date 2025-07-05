import React, { useContext, useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaImage, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import NavBar from '../Header/NavBar';
import Footer from '../Footer/Footer';
import { AuthContext } from '../../provider/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import Swal from 'sweetalert2';

const Register = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();

  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, photo, email, password } = formData;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful!',
              text: `Welcome ${name}!`,
              timer: 1500,
              showConfirmButton: false,
            });
            setTimeout(() => {
              window.location.replace('/');
            }, 1500);
          })
          .catch((error) => {
            console.error('Profile update failed:', error);
            Swal.fire({
              icon: 'error',
              title: 'Profile Update Failed',
              text: error.message,
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.message,
        });
      });
  };

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
          window.location.replace("/");
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

  return (
    <>
      <NavBar />
      <div className="min-h-screen noto-serif-Regular bg-gradient-to-r from-[#7F8CAA] to-[#bcc8d6] flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
          {/* Left Form Section */}
          <div className="md:w-1/2 p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Create Your Account</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <FaImage className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="photo"
                  placeholder="Photo URL"
                  value={formData.photo}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <p className="text-sm text-center text-gray-600">
                Already have an account?{" "}
                <a href="/auth/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </p>

              <button
                type="submit"
                className="w-full bg-[#7F8CAA] text-white hover:bg-[#2c2c78]  py-2 rounded-md font-semibold transition duration-200"
              >
                Sign Up
              </button>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-[#333446] hover:bg-[#2c2c78] text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition duration-200"
              >
                <FcGoogle className="text-xl" />
                Sign in with Google
              </button>
            </form>
          </div>

          {/* Right Image Section */}
          <div className="md:w-1/2 bg-white flex items-center justify-center p-6">
            <img
              src="https://i.postimg.cc/59YmrZB9/sign-up-concept-illustration-114360-7965.avif"
              alt="Register illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
