import React from 'react';
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaInstagram } from 'react-icons/fa';
import { WiCloudy } from 'react-icons/wi';

const Footer = () => {
  return (
    <footer className="bg-[#333446] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

        {/* Weather Section */}
        <div>
          <h4 className="text-sm text-gray-400 mb-2">Current weather</h4>
          <p className="mb-1">Venice old town</p>
          <div className="flex items-center gap-2">
            <WiCloudy size={28} />
            <span className="text-lg">17<sup>°C</sup></span>
          </div>
        </div>

        {/* Social Media Section */}
        <div>
          <h4 className="text-sm text-gray-400 mb-2">Connect with us</h4>
          <p className="mb-1">Social media channels</p>
          <div className="flex gap-4 mt-2 text-white">
            <FaFacebookF />
            <FaTwitter />
            <FaGooglePlusG />
            <FaInstagram />
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h4 className="text-sm text-gray-400 mb-2">Newsletter sign up</h4>
          <p className="mb-2">Sign up for special offers</p>
          <div className="flex overflow-hidden rounded-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-white outline-white border-2 border-[#b19472] bg-transparent focus:border-[#b19472] focus:ring-0"
            />
            <button className="bg-[#b19472] px-4 py-2 text-white">Sign Up</button>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Is this your website? <a href="#" className="text-[#b19472] underline">Claim your form</a> to manage and email your new subscribers!
          </p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-sm text-gray-500 dark:text-gray-400 fira-sans-regular text-center mt-8">
        <p>© 2025 Product Review Theme by Next Pick. All rights reserved.</p>
        <p>Proudly powered by WordPress.</p>
      </div>
    </footer>
  );
};

export default Footer;
