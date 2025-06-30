import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router"; // ✅ Correct import
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import Footer from "../Footer/Footer";
import NavBar from "../Header/NavBar";
import {
  FaArrowLeft,
  FaArrowRight,
  FaTh,
  FaThLarge,
  FaThList,
} from "react-icons/fa";

const MyQueries = () => {
  const { user } = useContext(AuthContext);
  const [queries, setQueries] = useState([]);
  const [gridLayout, setGridLayout] = useState(3);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/AddQueries?email=${encodeURIComponent(user.email)}`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setQueries(sorted);
      })
      .catch((err) => console.error("Error fetching queries:", err));
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your query!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/AddQueries/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) throw new Error("Delete failed");
            setQueries((prev) => prev.filter((q) => q._id !== id));
            Swal.fire("Deleted!", "Your query has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Failed to delete query.", "error");
          });
      }
    });
  };

  return (
    <>
      <NavBar />
      <div>
        {/* Banner */}
        <div
          className="relative h-[70vh] w-full bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/fn9hmtd/d6fc93bc-aaf4-4683-aa31-699548286a86.png')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My Queries (Private)
            </h1>
            <p className="text-lg mb-6">
              View and manage all your submitted queries here.
            </p>
            <Link
              to="/AddQueries"
              className="bg-[#e5cfa0] text-black px-6 py-2 font-semibold rounded hover:bg-[#d3b981] transition"
            >
              Add Queries
            </Link>
          </div>
        </div>

        {/* My Queries Section */}
        <div className="max-w-6xl mx-auto p-6">
          {queries.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl mb-4">No queries found.</h2>
              <Link
                to="/AddQueries"
                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add a Query
              </Link>
            </div>
          ) : (
            <>
              {/* Layout Buttons */}
              <div className="mb-6 text-right flex justify-end gap-3">
                {[1, 2, 3].map((cols, idx) => {
                  const icons = [<FaThList />, <FaThLarge />, <FaTh />];
                  const labels = ["1 Column", "2 Columns", "3 Columns"];
                  return (
                    <button
                      key={cols}
                      onClick={() => setGridLayout(cols)}
                      className={`flex items-center gap-2 px-4 py-2 rounded ${
                        gridLayout === cols
                          ? "bg-blue-700 text-white"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                    >
                      {icons[idx]} {labels[idx]}
                    </button>
                  );
                })}
              </div>

              {/* Grid */}
              <div
                className={`grid gap-6 ${
                  gridLayout === 1
                    ? "grid-cols-1"
                    : gridLayout === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {queries.map((query) => (
                  <div
                    key={query._id}
                    className="bg-gradient-to-tr from-blue-50 to-white border border-blue-100 p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                  >
                    <img
                      src={query.productImage || "https://via.placeholder.com/300"}
                      alt={query.productName}
                      className="w-full h-48 object-cover rounded-xl mb-4 shadow"
                    />
                    <h3 className="text-xl font-bold text-blue-900 mb-1">
                      {query.queryTitle}
                    </h3>
                    <p className="text-sm text-gray-800 font-medium mb-1">
                      Product: <span className="font-semibold">{query.productName}</span>
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      Brand: <span className="font-medium">{query.productBrand}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {query.description}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Posted on: {new Date(query.timestamp).toLocaleString()}
                    </p>
                    <div className="flex gap-2 flex-wrap mt-2">
                      <Link
                        to={`/query-details/${query._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/update-query/${query._id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm font-medium transition"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(query._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyQueries;
