import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import NavBar from '../Header/NavBar';
import { Link } from 'react-router';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration Data:', formData);
  };

  return (
    <>
    <NavBar/>
    <div className="min-h-screen noto-serif-Regular bg-[#7F8CAA] flex items-center justify-center px-4">
        <div className="bg-gray-100 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        
            <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6">Sign up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            
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
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                    type="PhotoURL"
                    name="PhotoURL"
                    placeholder="Photo URL"
                    value={formData.password}
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
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>


                <Link to="/auth/login" className="w-full md:w-auto">
                <p className="mt-4 text-sm text-center mb-4 text-gray-600">
                Already have account? <a href="#" className="text-blue-600 hover:underline"> Login </a>
                </p>
                </Link>

                <button className="w-full bg-[#333446] hover:bg-[#2c2c78] text-white font-semibold py-2 px-4 rounded">
                <FcGoogle className="inline mr-2" />
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

            <div className="md:w-1/2 bg-white  flex items-center justify-center p-6">
            <img
                src="https://i.ibb.co/HfHPDVrK/online-registration-sign-up-concept-flat-vector-illustration-young-male-cartoon-character-sitting-hu.jpg"
                alt="Register illustration"
                className="w-full h-auto object-contain"
            />
            </div>
        </div>
        </div>
    </>
    
  );
};

export default Register;
