import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router"; // react-router-dom, not react-router
import { FaHeart, FaTh, FaThLarge, FaThList } from "react-icons/fa";
import NavBar from "../Header/NavBar";
import Footer from "../Footer/Footer";
import { AuthContext } from "../../provider/AuthProvider";
import { secureFetch } from "../../Hook/api";

const AllQueries = () => {
  const [queries, setQueries] = useState([]);
  const [gridLayout, setGridLayout] = useState(3);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQueries = async () => {
      setLoading(true);
      setError("");
      try {
        let data;
        // If you want protected route:
        if (user) {
          const res = await secureFetch("https://next-pick-server.vercel.app/AddQueries");
          data = res.data;
        } else {
          // fallback to public fetch
          const res = await fetch("https://next-pick-server.vercel.app/AddQueries");
          if (!res.ok) throw new Error("Failed to fetch queries");
          data = await res.json();
        }

        // Sort by timestamp descending
        const sorted = data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setQueries(sorted);
      } catch (err) {
        console.error("Error fetching queries:", err);
        setError("Failed to load queries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, [user]);

  const handleRecommendClick = (queryId) => {
    if (!user) {
      navigate("/auth/login");
    } else {
      navigate(`/query-details/${queryId}`);
    }
  };

  // Filter queries by productName search
  const filteredQueries = queries.filter((query) =>
    query.productName?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <div className="container mx-auto noto-serif-Regular px-4 py-10">
        {/* Header */}
        <div className="text-center py-12 px-6 rounded-2xl shadow-lg mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950 mb-4 drop-shadow">
            All Queries
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Here you'll find all queries submitted by users. Click ‘Recommend’ to support queries that you want to recommend a better product to help the user.
          </p>
        </div>

        {/* Search + Layout Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by Product Name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border px-4 py-2 rounded-lg shadow-sm w-full sm:w-1/2"
            aria-label="Search queries by product name"
          />

          <div className="flex justify-start sm:justify-end gap-3">
            {[1, 2, 3].map((n) => {
              const icons = [<FaThList />, <FaThLarge />, <FaTh />];
              const titles = ["1 Column", "2 Columns", "3 Columns"];
              return (
                <button
                  key={n}
                  onClick={() => setGridLayout(n)}
                  className={`p-3 rounded-full text-white text-lg shadow-md transition ${
                    gridLayout === n
                      ? "bg-blue-800"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                  title={titles[n - 1]}
                  aria-pressed={gridLayout === n}
                  aria-label={`Set layout to ${titles[n - 1]}`}
                >
                  {icons[n - 1]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-600 text-xl mb-8">Loading queries...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 text-xl mb-8">{error}</p>
        )}

        {/* Grid of Cards */}
        {!loading && !error && (
          <div
            className={`grid gap-8 ${
              gridLayout === 1
                ? "grid-cols-1"
                : gridLayout === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filteredQueries.length > 0 ? (
              filteredQueries.map((query) => (
                <div
                  key={query._id}
                  className="bg-white p-6 rounded-xl border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  {query.productImage && (
                    <img
                      src={query.productImage}
                      alt={query.productName}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h2 className="text-2xl font-bold text-blue-800 mb-1">
                    {query.queryTitle || "Untitled Query"}
                  </h2>
                  <h3 className="text-md text-blue-500 font-medium mb-2 italic">
                    {/* You had query.queryTitle here, I replaced with queryTitle only */}
                    {query.reason || ""}
                  </h3>
                  <p className="text-gray-700 mb-3">
                    {/* No description field in your schema, so removed */}
                  </p>
                  <div className="text-sm text-gray-600 mb-1">
                    <strong>Product Name:</strong> {query.productName || "N/A"}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <strong>Product Brand:</strong> {query.productBrand || "N/A"}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    Posted on: {new Date(query.timestamp).toLocaleString()}
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t">
                    <span className="text-blue-700 font-semibold text-sm">
                      💙 {query.recommendationCount || 0} Recommendations
                    </span>
                    <button
                      onClick={() => handleRecommendClick(query._id)}
                      className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition flex items-center gap-2 text-sm font-medium"
                      aria-label={`Recommend query titled ${query.queryTitle}`}
                    >
                      <FaHeart />
                      Recommend
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500 text-lg">
                No queries matched your search.
              </p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllQueries;
