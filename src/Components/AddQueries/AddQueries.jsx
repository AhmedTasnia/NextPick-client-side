import React, { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import Footer from "../Footer/Footer";
import NavBar from "../Header/NavBar";

const AddQuery = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    productName: "",
    productBrand: "",
    productImage: "",
    queryTitle: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullQuery = {
      ...formData,
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email || "N/A",
      timestamp: new Date().toISOString(),
    };

    console.log("Submitted Query:", fullQuery);

    fetch ('http://localhost:3000/AddQueries', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  },
        body: JSON.stringify(fullQuery),
        }) 
        .then((res) => res.json())
        .then((data) => {
            console.log("Query added successfully:", data); 
        })



    Swal.fire("✅ Query Added!", "Your product query has been submitted.", "success");

    setFormData({
      productName: "",
      productBrand: "",
      productImage: "",
      queryTitle: "",
      reason: "",
    });
  };

return (
    <>
        <NavBar />
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-6 px-2 flex justify-center items-center">
            <div className="w-full max-w-5xl bg-white border border-blue-200 rounded-lg shadow-lg p-4 sm:p-6 md:p-10">
                {/* Page Header */}
                <div className="text-center mb-8 md:mb-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">📝 Share Your Product Concern</h1>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                        Submit your queries about products you’re not satisfied with and let others recommend better alternatives.
                    </p>
                </div>

                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-sm"
                >
                    {/* Product Name */}
                    <div className="col-span-1">
                        <label className="block font-semibold text-blue-700 mb-1">📦 Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            placeholder="e.g., XYZ Smartwatch"
                            required
                            className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
                        />
                    </div>

                    {/* Product Brand */}
                    <div className="col-span-1">
                        <label className="block font-semibold text-blue-700 mb-1">🏷️ Product Brand</label>
                        <input
                            type="text"
                            name="productBrand"
                            value={formData.productBrand}
                            onChange={handleChange}
                            placeholder="e.g., BrandCo"
                            required
                            className="w-full px-3 py-2 border border-blue-300 rounded"
                        />
                    </div>

                    {/* Product Image URL */}
                    <div className="col-span-1">
                        <label className="block font-semibold text-blue-700 mb-1">🖼️ Product Image URL</label>
                        <input
                            type="url"
                            name="productImage"
                            value={formData.productImage}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            required
                            className="w-full px-3 py-2 border border-blue-300 rounded"
                        />
                    </div>

                    {/* Query Title */}
                    <div className="col-span-1">
                        <label className="block font-semibold text-blue-700 mb-1">❓ Query Title</label>
                        <input
                            type="text"
                            name="queryTitle"
                            value={formData.queryTitle}
                            onChange={handleChange}
                            placeholder="Is there any better product that gives me the same quality?"
                            required
                            className="w-full px-3 py-2 border border-blue-300 rounded"
                        />
                    </div>

                    {/* Reason */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block font-semibold text-blue-700 mb-1">💬 Boycotting Reason Details</label>
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Explain why you are boycotting this product..."
                            required
                            className="w-full px-3 py-2 border border-blue-300 rounded"
                        />
                    </div>

                    {/* User Name */}
                    <div className="col-span-1">
                        <label className="block font-semibold text-blue-700 mb-1">👤 User Name</label>
                        <input
                            type="text"
                            value={user?.displayName || "Anonymous"}
                            readOnly
                            className="w-full px-3 py-2 border border-blue-300 rounded bg-gray-100"
                        />
                    </div>

                    {/* User Email */}
                    <div className="col-span-1">
                        <label className="block font-semibold text-blue-700 mb-1">📧 User Email</label>
                        <input
                            type="email"
                            value={user?.email || "N/A"}
                            readOnly
                            className="w-full px-3 py-2 border border-blue-300 rounded bg-gray-100"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2 mt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded"
                        >
                            ➕ Add Query
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
    </>
);
};

export default AddQuery;
