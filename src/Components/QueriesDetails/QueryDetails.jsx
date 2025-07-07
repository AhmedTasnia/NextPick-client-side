import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import NavBar from "../Header/NavBar";
import Footer from "../Footer/Footer";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { secureFetch } from "../../Hook/api";



const QueryDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [recTitle, setRecTitle] = useState("");
  const [recProductName, setRecProductName] = useState("");
  const [recProductImage, setRecProductImage] = useState("");
  const [recReason, setRecReason] = useState("");

  useEffect(() => {
    const fetchQueryById = async () => {
      try {
        const res = await secureFetch(`https://next-pick-server.vercel.app/AddQueries/${id}`);
        const data = res.data;
        setQuery(data);
      } catch (err) {
        console.error(err);
        setError("Could not load the query details.");
      } finally {
        setLoading(false);
      }
    };

    fetchQueryById();
  }, [id]);

  const handleRecommendationSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("Warning", "You must be logged in to submit a recommendation.", "warning");
      return;
    }

    const recommendationData = {
      recommendationTitle: recTitle,
      recommendedProductName: recProductName,
      recommendedProductImage: recProductImage,
      recommendationReason: recReason,
      relatedQueryId: query._id,
      queryTitle: query.queryTitle,
      productName: query.productName,
      queryOwnerEmail: query.userEmail,
      queryOwnerName: query.userName,
      recommenderEmail: user.email,
      recommenderName: user.displayName || "Anonymous",
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await secureFetch("https://next-pick-server.vercel.app/recommendations", {
        method: "POST",
        body: recommendationData,
      });

      const result = res.data;

      if (result.success) {
        Swal.fire("Success!", "Recommendation submitted successfully.", "success");

        setRecTitle("");
        setRecProductName("");
        setRecProductImage("");
        setRecReason("");

        setQuery((prev) => ({
          ...prev,
          recommendationCount: (prev.recommendationCount || 0) + 1,
        }));
      } else {
        Swal.fire("Error", "Failed to submit recommendation.", "error");
      }
    } catch (err) {
      console.error("Error submitting recommendation:", err);
      Swal.fire("Error", "An error occurred. Try again later.", "error");
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="text-center py-20 text-gray-600 text-xl">Loading...</div>
        <Footer />
      </>
    );
  }

  if (error || !query || !query._id) {
    return (
      <>
        <NavBar />
        <div className="text-center py-20 text-red-600 text-xl">{error || "Query not found."}</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 noto-serif-Regular py-12 max-w-7xl">
        <h1 className="text-4xl font-bold text-[#333446] mb-6 text-center">Query Details</h1>

        <div className="bg-white shadow-lg rounded-lg p-6 grid gap-6 md:grid-cols-2 mb-12">
          <div>
            <img
              src={query.productImage || "https://via.placeholder.com/300"}
              alt={query.productName || "Product"}
              className="w-full h-64 object-cover rounded-lg border"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{query.queryTitle}</h2>
            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">Product Name:</span> {query.productName}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">Brand:</span> {query.productBrand}
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <span className="font-semibold">Reason for Boycott: </span>
              {query.reason || "N/A"}
            </p>
            <p className="text-lg text-gray-500 mb-2">
              Posted on: {query.timestamp ? new Date(query.timestamp).toLocaleString() : "N/A"}
            </p>
            <p className="text-blue-950 font-semibold text-lg">
              Recommendations: {query.recommendationCount ?? 0}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold mb-6 text-center text-[#333446]">
            Add A Recommendation
          </h2>

          <form onSubmit={handleRecommendationSubmit} className="space-y-6 container mx-auto">
            <div>
              <label htmlFor="recTitle" className="block mb-1 font-semibold">
                Recommendation Title
              </label>
              <input
                id="recTitle"
                type="text"
                value={recTitle}
                onChange={(e) => setRecTitle(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter recommendation title"
              />
            </div>

            <div>
              <label htmlFor="recProductName" className="block mb-1 font-semibold">
                Recommended Product Name
              </label>
              <input
                id="recProductName"
                type="text"
                value={recProductName}
                onChange={(e) => setRecProductName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter recommended product name"
              />
            </div>

            <div>
              <label htmlFor="recProductImage" className="block mb-1 font-semibold">
                Recommended Product Image URL
              </label>
              <input
                id="recProductImage"
                type="url"
                value={recProductImage}
                onChange={(e) => setRecProductImage(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter image URL"
              />
            </div>

            <div>
              <label htmlFor="recReason" className="block mb-1 font-semibold">
                Recommendation Reason
              </label>
              <textarea
                id="recReason"
                value={recReason}
                onChange={(e) => setRecReason(e.target.value)}
                required
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Why do you recommend this product?"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-950 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded"
              >
                Add Recommendation
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QueryDetails;
