import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../Header/NavBar";
import Footer from "../Footer/Footer";
import { secureFetch } from "../../Hook/api";

const AllRecommendations = () => {
  const { id } = useParams(); 
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await secureFetch(`https://next-pick-server.vercel.app/recommendations/${id}`);
        setRecommendations(res.data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to load recommendations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          💬 All Recommendations for This Query
        </h1>

        {loading && <p className="text-center text-gray-600 text-lg">Loading recommendations...</p>}
        {error && <p className="text-center text-red-600 text-lg">{error}</p>}
        {!loading && !error && recommendations.length === 0 && (
          <p className="text-center text-gray-500 text-lg">No recommendations yet.</p>
        )}

        <ul className="space-y-6">
          {recommendations.map((rec) => (
            <li
              key={rec._id}
              className="bg-white border border-gray-200 shadow-sm rounded-lg p-5"
            >
              <div className="flex gap-4 items-start">
                <img
                  src={rec.recommendedProductImage || "https://via.placeholder.com/80"}
                  alt={rec.recommendedProductName}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div>
                  <h2 className="text-xl font-bold text-blue-900 mb-1">
                    {rec.recommendationTitle}
                  </h2>
                  <p className="text-gray-700 text-sm mb-1">
                    <strong>Recommended Product:</strong> {rec.recommendedProductName}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <strong>Reason:</strong> {rec.recommendationReason}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    By <span className="font-medium">{rec.recommenderName}</span> on{" "}
                    {rec.timestamp
                      ? new Date(rec.timestamp).toLocaleString()
                      : "Unknown date"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default AllRecommendations;
