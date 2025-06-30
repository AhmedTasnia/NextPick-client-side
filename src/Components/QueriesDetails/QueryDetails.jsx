import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router"; // fixed import to react-router-dom
import NavBar from "../Header/NavBar";
import Footer from "../Footer/Footer";

const QueryDetails = () => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
          Query Details
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 grid gap-6 md:grid-cols-2">
          <div>
            <img
              src={query.productImage || "https://via.placeholder.com/300"}
              alt={query.productName || "Product"}
              className="w-full h-64 object-cover rounded-lg border"
            />
          </div>

          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{query.queryTitle}</h2>

            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">Product Name:</span> {query.productName}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">Product Brand:</span> {query.productBrand}
            </p>

            <p className="text-md text-gray-600 mb-4">
              <span className="font-semibold">Reason foe Boycott:</span><br />
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
      </div>
      <Footer />
    </>
  );
};

export default QueryDetails;
