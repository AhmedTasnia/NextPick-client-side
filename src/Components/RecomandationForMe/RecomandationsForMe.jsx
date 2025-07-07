import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import NavBar from "../Header/NavBar";
import Footer from "../Footer/Footer";
import { secureFetch } from "../../Hook/api";

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await secureFetch(
          `https://next-pick-server.vercel.app/recommendations-for-me?email=${user.email}`
        );

        const data = res.data;

        setRecommendations(data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          setError("Unauthorized: Please login again.");
        } else {
          setError("Failed to load recommendations.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchRecommendations();
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <div className="container mx-auto noto-serif-Regular px-4 py-12 m-4 max-w-7xl">
        <h1 className="text-4xl font-bold text-center text-blue-950 mb-8">
          💡 Recommendations For Me
        </h1>

        {loading && (
          <p className="text-center text-gray-600 text-xl">Loading...</p>
        )}
        {error && <p className="text-center text-red-600 text-xl">{error}</p>}

        {!loading && !error && recommendations.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No recommendations available yet.
          </p>
        )}

        <div className="grid gap-6 md:hidden">
          {recommendations.map((rec, index) => (
            <div
              key={rec._id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-blue-900 font-semibold text-lg">
                  #{index + 1} - {rec.recommendationTitle}
                </h3>
                <img
                  src={
                    rec.recommendedProductImage ||
                    "https://via.placeholder.com/50"
                  }
                  alt={rec.recommendedProductName}
                  className="w-12 h-12 object-cover rounded"
                />
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Recommended Product:</strong>{" "}
                  {rec.recommendedProductName}
                </p>
                <p>
                  <strong>Recommender:</strong> {rec.recommenderName}
                </p>
                <p>
                  <strong>Reason:</strong> {rec.recommendationReason}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(rec.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {recommendations.length > 0 && (
          <div className="overflow-x-auto shadow-lg rounded-lg hidden md:block">
            <table className="min-w-full text-lg text-left bg-white border border-gray-200">
              <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="px-4 py-3 border">#</th>
                  <th className="px-4 py-3 border">Image</th>
                  <th className="px-4 py-3 border">Title</th>
                  <th className="px-4 py-3 border">Recommended Product</th>
                  <th className="px-4 py-3 border">Recommender</th>
                  <th className="px-4 py-3 border">Reason</th>
                  <th className="px-4 py-3 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map((rec, index) => (
                  <tr key={rec._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 border">{index + 1}</td>
                    <td className="px-4 py-3 border">
                      <img
                        src={
                          rec.recommendedProductImage ||
                          "https://via.placeholder.com/50"
                        }
                        alt={rec.recommendedProductName}
                        className="w-10 h-10 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 border break-words max-w-xs">
                      {rec.recommendationTitle}
                    </td>
                    <td className="px-4 py-3 border break-words max-w-xs">
                      {rec.recommendedProductName}
                    </td>
                    <td className="px-4 py-3 border break-words max-w-xs">
                      {rec.recommenderName}
                    </td>
                    <td className="px-4 py-3 border break-words max-w-sm">
                      {rec.recommendationReason}
                    </td>
                    <td className="px-4 py-3 border text-xs text-gray-500">
                      {new Date(rec.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RecommendationsForMe;
