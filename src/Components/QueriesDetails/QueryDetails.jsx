import React, { useEffect, useState } from "react";
import { useParams } from "react-router"; 
import NavBar from "../Header/NavBar";
import Footer from "../Footer/Footer";

const QueryDetails = () => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const [recTitle, setRecTitle] = useState("");
  const [recProductName, setRecProductName] = useState("");
  const [recProductImage, setRecProductImage] = useState("");
  const [recReason, setRecReason] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const fetchQueryById = async () => {
      try {
        const res = await fetch(`http://localhost:3000/AddQueries/${id}`);
        if (!res.ok) throw new Error("Failed to fetch query");
        const data = await res.json();
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

  
    const recommendationData = {
      recommendationTitle: recTitle,
      recommendedProductName: recProductName,
      recommendedProductImage: recProductImage,
      recommendationReason: recReason,
      relatedQueryId: id,
      timestamp: new Date().toISOString(),
    };

    console.log("Submitting Recommendation:", recommendationData);

 
    setSubmitStatus("Recommendation submitted successfully!");
    setRecTitle("");
    setRecProductName("");
    setRecProductImage("");
    setRecReason("");

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
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
          Query Details
        </h1>

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

            <p className="text-md text-gray-600 mb-4">
              <span className="font-semibold">Reason for Boycott:</span><br />
              {query.reason || "N/A"}
            </p>

            <p className="text-sm text-gray-500 mb-2">
              Posted on: {query.timestamp ? new Date(query.timestamp).toLocaleString() : "N/A"}
            </p>
            <p className="text-blue-600 font-semibold text-lg">
              Recommendations: {query.recommendationCount ?? 0}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
            Add A Recommendation
          </h2>

          {submitStatus && (
            <p className="mb-4 text-green-600 font-medium text-center">{submitStatus}</p>
          )}

          <form onSubmit={handleRecommendationSubmit} className="space-y-6 max-w-xl mx-auto">
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
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Why do you recommend this product?"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
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
