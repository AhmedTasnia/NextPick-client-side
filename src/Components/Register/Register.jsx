import React, { useContext, useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaImage } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import NavBar from '../Header/NavBar';
import Footer from '../Footer/Footer';
import { AuthContext } from '../../provider/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // ✅ Fixed import
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
      <div className="min-h-screen noto-serif-Regular bg-[#7F8CAA] flex items-center justify-center px-4">
        <div className="bg-gray-100 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6">Sign up</h2>
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
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <p className="mt-4 text-sm text-center mb-4 text-gray-600">
                Already have an account? <a href="/auth/login" className="text-blue-600 hover:underline">Login</a>
              </p>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-[#333446] hover:bg-[#2c2c78] text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2"
              >
                <FcGoogle className="text-xl" />
                Login with Google
              </button>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                REGISTER
              </button>
            </form>
          </div>

          <div className="md:w-1/2 bg-white flex items-center justify-center p-6">
            <img
              src="https://i.ibb.co/HfHPDVrK/online-registration-sign-up-concept-flat-vector-illustration-young-male-cartoon-character-sitting-hu.jpg"
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
