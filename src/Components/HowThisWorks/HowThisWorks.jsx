import React from "react";
import { Lightbulb, MessageSquare, ShoppingCart } from "lucide-react";

const HowThisWorks = () => {
  return (
    <section className=" bg-[#f8fafc] noto-serif-Regular dark:bg-[#1f2937] py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          💡 How It Works
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
          Follow these 3 simple steps to get the best product recommendations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mb-4">
              <Lightbulb className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Step 1: Add a Query
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Post a question about the product you're interested in.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-yellow-600 dark:text-yellow-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Step 2: Get Recommendations
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Receive helpful suggestions and alternatives from other users.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
              <ShoppingCart className="h-8 w-8 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Step 3: Buy Smarter
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Compare the suggestions and choose the best option to purchase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowThisWorks;
