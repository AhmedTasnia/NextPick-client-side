import React from "react";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-center py-10 relative overflow-hidden fira-sans"
      style={{
        backgroundImage: "url('https://i.ibb.co/0R2H1r08/badreview.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-[#fdfcf9]/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm p-6 rounded-lg max-w-6xl mx-auto">
        {/* Logo and Title */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <img
            src="https://i.ibb.co/Ldxrbh6n/c695d9cecd0ce837d5d07ef81ad2bfed-two-leaves-illustration.webp"
            alt="logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h1 className="text-2xl font-dynapuff font-bold text-green-800 dark:text-green-300">
            Next Pick
          </h1>
        </div>

        {/* Free Quote Button */}
        <div className="mb-6">
          <button className="border-2 border-[#3F4F44] text-[#3F4F44] dark:text-[#3F4F44] px-6 py-2 rounded-full hover:bg-[#3F4F44] hover:text-white transition flex items-center justify-center gap-2 mx-auto fira-sans-semibold">
            <span>🌿</span> Free Queries
          </button>
        </div>

        {/* Contact Info */}
        <div className="text-gray-700 dark:text-gray-300 mb-4 fira-sans-regular">
          <p>Call Us: 800-454-9272</p>
          <p>Dhaka, Bangladesh – 1060 SenaKunho, Banani</p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-6 text-green-800 dark:text-green-300 text-xl mb-6">
          <a href="#" title="Facebook" className="hover:text-green-600">
            <FaFacebookF />
          </a>
          <a href="#" title="Pinterest" className="hover:text-green-600">
            <FaPinterestP />
          </a>
          <a href="#" title="Instagram" className="hover:text-green-600">
            <FaInstagram />
          </a>
        </div>

        {/* Footer Bottom Text */}
        <div className="text-sm text-gray-500 dark:text-gray-400 fira-sans-regular">
          <p>© 2025 Product Review Theme by Next Pick. All rights reserved.</p>
          <p>Proudly powered by WordPress.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
