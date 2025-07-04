import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
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
  const [editingQuery, setEditingQuery] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    productBrand: "",
    queryTitle: "",
    description: "",
    productImage: "",
  });

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

  const handleUpdate = (query) => {
    setEditingQuery(query);
    setFormData({
      productName: query.productName,
      productBrand: query.productBrand,
      queryTitle: query.queryTitle,
      description: query.description,
      productImage: query.productImage,
    });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitUpdate = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this query?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/update-query/${editingQuery._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update query");

      const updated = await res.json();
      setQueries((prev) =>
        prev.map((q) => (q._id === editingQuery._id ? updated : q))
      );
      setEditingQuery(null);

      Swal.fire("Updated!", "Your query has been updated.", "success");
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error", "Failed to update query.", "error");
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <div
          className="relative h-[70vh] w-full bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('https://i.ibb.co/fn9hmtd/d6fc93bc-aaf4-4683-aa31-699548286a86.png')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Queries (Private)</h1>
            <p className="text-lg mb-6">View and manage all your submitted queries here.</p>
            <Link
              to="/AddQueries"
              className="bg-[#e5cfa0] text-black px-6 py-2 font-semibold rounded hover:bg-[#d3b981] transition"
            >
              Add Queries
            </Link>
          </div>
        </div>

        <div className="container mx-auto p-6">
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
              <div className="mb-6 text-right flex justify-end gap-3">
                {[1, 2, 3].map((cols, idx) => {
                  const icons = [<FaThList />, <FaThLarge />, <FaTh />];
                  return (
                    <button
                      key={cols}
                      onClick={() => setGridLayout(cols)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-4 ${
                        gridLayout === cols ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                    >
                      {icons[idx]}
                    </button>
                  );
                })}
              </div>

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
                    <h3 className="text-xl font-bold text-blue-900 mb-1">{query.queryTitle}</h3>
                    <p className="text-sm text-gray-800 font-medium mb-1">
                      Product: <span className="font-semibold">{query.productName}</span>
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      Brand: <span className="font-medium">{query.productBrand}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-2">{query.description}</p>
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
                      <button
                        onClick={() => handleUpdate(query)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm font-medium transition"
                      >
                        Update
                      </button>
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

      {editingQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[95%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Update Query</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="text"
                name="productBrand"
                value={formData.productBrand}
                onChange={handleInputChange}
                placeholder="Product Brand"
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="text"
                name="queryTitle"
                value={formData.queryTitle}
                onChange={handleInputChange}
                placeholder="Query Title"
                className="w-full border px-4 py-2 rounded"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full border px-4 py-2 rounded"
              ></textarea>
              <input
                type="text"
                name="productImage"
                value={formData.productImage}
                onChange={handleInputChange}
                placeholder="Product Image URL"
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setEditingQuery(null)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitUpdate}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MyQueries;
