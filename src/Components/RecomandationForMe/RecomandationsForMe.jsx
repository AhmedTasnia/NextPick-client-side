import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`http://localhost:3000/Recommendations`);
        if (!res.ok) throw new Error("Failed to fetch recommendations");
        const data = await res.json();

        // Filter where the current user is the query owner but NOT the recommender
        const filtered = data.filter(
          (rec) =>
            rec.queryOwnerEmail === user?.email &&
            rec.recommenderEmail !== user?.email
        );

        setRecommendations(filtered);
      } catch (err) {
        console.error(err);
        setError("Failed to load recommendations.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchRecommendations();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        💡 Recommendations For Me
      </h1>

      {loading && <p className="text-center text-gray-600 text-xl">Loading...</p>}
      {error && <p className="text-center text-red-600 text-xl">{error}</p>}

      {recommendations.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500 text-lg">
          No recommendations available yet.
        </p>
      )}

      {recommendations.length > 0 && (
        <div className="overflow-x-auto rounded shadow border">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-100 text-gray-800 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 border">#</th>
                <th className="px-4 py-3 border">Image</th>
                <th className="px-4 py-3 border">Title</th>
                <th className="px-4 py-3 border">Product</th>
                <th className="px-4 py-3 border">Recommender</th>
                <th className="px-4 py-3 border">Reason</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec, index) => (
                <tr key={rec._id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-3 border">{index + 1}</td>
                  <td className="px-4 py-3 border">
                    <img
                      src={rec.recommendedProductImage || "https://via.placeholder.com/50"}
                      alt={rec.recommendedProductName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border font-semibold">
                    {rec.recommendationTitle}
                  </td>
                  <td className="px-4 py-3 border">{rec.recommendedProductName}</td>
                  <td className="px-4 py-3 border">{rec.recommenderName}</td>
                  <td className="px-4 py-3 border">{rec.recommendationReason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecommendationsForMe;
