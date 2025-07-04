import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import NavBar from "../Header/NavBar";
import Footer from "../Footer/Footer";

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/Recommendations?email=${user?.email}`
        );
        if (!res.ok) throw new Error("Failed to fetch recommendations");
        const data = await res.json();
        setRecommendations(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load recommendations.");
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
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        💡 Recommendations For Me
      </h1>

      {loading && <p className="text-center text-gray-600 text-xl">Loading...</p>}
      {error && <p className="text-center text-red-600 text-xl">{error}</p>}

      {!loading && !error && recommendations.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No recommendations available yet.
        </p>
      )}

      {recommendations.length > 0 && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full text-sm text-left bg-white border border-gray-200">
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
                      src={rec.recommendedProductImage || "https://via.placeholder.com/50"}
                      alt={rec.recommendedProductName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border">{rec.recommendationTitle}</td>
                  <td className="px-4 py-3 border">{rec.recommendedProductName}</td>
                  <td className="px-4 py-3 border">{rec.recommenderName}</td>
                  <td className="px-4 py-3 border">{rec.recommendationReason}</td>
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
