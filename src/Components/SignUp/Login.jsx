import React from 'react';
import { FcGoogle } from "react-icons/fc";
import NavBar from '../Header/NavBar';
import { Link } from 'react-router';
import Footer from '../Footer/Footer';

const Login = () => {
  return (
    <>
    <NavBar />
    <div className="min-h-screen noto-serif-Regular flex items-center justify-center bg-[#7F8CAA]">
      <div className="bg-white rounded-lg shadow-lg flex max-w-4xl w-full overflow-hidden">
 
        <div className="w-1/2 bg-white flex items-center justify-center p-8">
          <img
            src="https://i.ibb.co/Q7Zdzd3x/desktop-mobile-illustration-login-page-data-analysis-559664-335.jpg"
            alt="Student illustration"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="w-1/2 bg-[#f7f9fc] p-10">
          <h2 className="text-2xl font-semibold text-[#2c2c78] mb-2">NextPick</h2>
          <p className="text-sm text-gray-600 mb-6">Hey! Enter your details to sign in to your account</p>

          <form>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c2c78]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c2c78]"
              />
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
              </div>
            </div>

            <button className="w-full bg-[#333446] hover:bg-[#2c2c78] text-white font-semibold py-2 px-4 rounded" >
              <FcGoogle className="inline mr-2" />
              Login with Google
            </button>

            <button
              type="submit"
              className="w-full bg-[#7F8CAA] text-white py-2 mt-3 rounded-md hover:bg-[#2c2c78] transition duration-200"
            >
              Login
            </button>

            <Link to="/auth/register" className="w-full md:w-auto">
            <p className="mt-4 text-sm text-center text-gray-600">
              Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Create new account</a>
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
