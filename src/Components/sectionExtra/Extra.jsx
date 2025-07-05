import React from "react";
import { HelpCircle, Users, MessageCircleHeart } from "lucide-react";

const Extra = () => {
  return (
    <section className=" dark:bg-gray-900 py-16 px-4 md:px-10 noto-serif-Regular">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
          data-aos="fade-up"
        >
           Platform Impact
        </h2>
        <p
          className="text-lg text-gray-600 dark:text-gray-300 mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          We're growing with our community—here's what we’ve achieved so far.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <HelpCircle className="h-10 w-10 text-blue-600 dark:text-blue-300 mb-2" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">120+</h3>
            <p className="text-gray-600 dark:text-gray-400">Queries Answered</p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <Users className="h-10 w-10 text-green-600 dark:text-green-300 mb-2" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">50+</h3>
            <p className="text-gray-600 dark:text-gray-400">Active Users</p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <MessageCircleHeart className="h-10 w-10 text-pink-600 dark:text-pink-300 mb-2" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">300+</h3>
            <p className="text-gray-600 dark:text-gray-400">Helpful Recommendations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Extra;
