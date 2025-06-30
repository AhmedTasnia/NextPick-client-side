import React from "react";
import { MessageCircleHeart, Users, HelpCircle } from "lucide-react";

const Impact = () => {
  return (
    <>
    <div className="">
      <section className=" bg-[#B8CFCE] dark:bg-[#1e293b] py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
          data-aos="fade-up"
        >
          ✨ What Our Users Say
        </h2>
        <p
          className="text-lg text-gray-600 dark:text-gray-300 mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Trusted by real users, powered by real experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p className="text-gray-700 dark:text-gray-200 italic mb-4">
              “This platform helped me choose the best smartphone within budget.
              The user recommendations felt genuine and really helpful.”
            </p>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              — Aisha R., Student
            </h4>
          </div>

          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <p className="text-gray-700 dark:text-gray-200 italic mb-4">
              “Love how fast I got responses to my query. It’s like a friendly tech community
              where everyone helps out.”
            </p>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              — Arif M., Freelancer
            </h4>
          </div>

          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <p className="text-gray-700 dark:text-gray-200 italic mb-4">
              “I was confused between 3 laptops, but the insights here saved me time and money.”
            </p>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              — Tanvir K., Developer
            </h4>
          </div>
        </div>
      </div>
    </section>
    </div>
    </>
  );
};

export default Impact;
