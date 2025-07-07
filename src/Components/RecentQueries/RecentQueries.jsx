import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";



const RecentQueries = () => {
  const { user } = useContext(AuthContext); 
  const [recentQueries, setRecentQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch("https://next-pick-server.vercel.app/AddQueries");
        if (!res.ok) throw new Error("Failed to fetch queries");
        const data = await res.json();

        const latestSix = data
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 6);

        setRecentQueries(latestSix);
      } catch (err) {
        console.error(err);
        setError("Could not load recent queries.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecent();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 noto-serif-Regular">
      <h1 className="text-4xl noto-serif-Bold text-[#333446] mb-10 text-center">
         Recent Product Queries
      </h1>

      {loading && <p className="text-center text-gray-600 text-xl">Loading...</p>}
      {error && <p className="text-center text-red-600 text-xl">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentQueries.map((query) => (
          <div
            key={query._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-xl transition duration-300"
          >
            <img
              src={query.productImage || "https://via.placeholder.com/400"}
              alt={query.productName}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {query.queryTitle}
              </h2>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-semibold">Product:</span> {query.productName}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-semibold">Brand:</span> {query.productBrand}
              </p>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                <span className="font-semibold">Reason:</span>{" "}
                {query.reason || "No reason provided."}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Posted:{" "}
                {query.timestamp
                  ? new Date(query.timestamp).toLocaleString()
                  : "Unknown"}
              </p>

              <Link
                to={user ? `/query-details/${query._id}` : "/auth/login"} 
                className="inline-block bg-blue-950 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentQueries;
