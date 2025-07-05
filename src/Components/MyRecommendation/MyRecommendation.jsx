import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import NavBar from "../Header/NavBar";
import Footer from "../Footer/Footer";

const MyRecommendations = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyRecommendations = async () => {
      try {
        const res = await fetch(`http://localhost:3000/Recommendations?email=${user.email}`);
        const data = await res.json();
        setRecommendations(data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecommendations();
  }, [user?.email]);

  const handleDelete = async (recId, relatedQueryId) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this recommendation!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/recommendations/${recId}`, {
          method: "DELETE",
        });

        const result = await res.json();

        if (result.success) {
          setRecommendations(recommendations.filter((rec) => rec._id !== recId));

          await fetch(`http://localhost:3000/decreaseRecommendationCount/${relatedQueryId}`, {
            method: "PATCH",
          });

          Swal.fire("Deleted!", "Recommendation has been deleted.", "success");
        } else {
          Swal.fire("Error!", result.message || "Failed to delete.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto noto-serif-Regular px-4 py-12 max-w-7xl">
        <h1 className="text-4xl font-bold text-center text-blue-950 mb-8">
          My Recommendations
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : recommendations.length === 0 ? (
          <p className="text-center text-gray-500">No recommendations found.</p>
        ) : (
          <>
            {/* Table for md+ screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full border-collapse shadow-md rounded-xl overflow-hidden">
                <thead className="bg-blue-50 text-left text-sm text-gray-700">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Image</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4">Query Title</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendations.map((rec, index) => (
                    <tr
                      key={rec._id}
                      className="hover:bg-blue-50 border-t text-sm text-gray-700"
                    >
                      <td className="py-3 px-4 font-medium">{index + 1}</td>
                      <td className="py-3 px-4">
                        <img
                          src={rec.recommendedProductImage || "https://via.placeholder.com/50"}
                          alt={rec.recommendedProductName}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="py-3 px-4">{rec.recommendationTitle}</td>
                      <td className="py-3 px-4">{rec.recommendedProductName}</td>
                      <td className="py-3 px-4">{rec.recommendationReason}</td>
                      <td className="py-3 px-4">{rec.queryTitle}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDelete(rec._id, rec.relatedQueryId)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-6">
              {recommendations.map((rec, index) => (
                <div
                  key={rec._id}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 border"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={rec.recommendedProductImage || "https://via.placeholder.com/50"}
                      alt={rec.recommendedProductName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <div className="font-bold text-green-700 text-lg">{rec.recommendationTitle}</div>
                      <div className="text-xs text-gray-500">#{index + 1}</div>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">Product: </span>
                    <span>{rec.recommendedProductName}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Reason: </span>
                    <span>{rec.recommendationReason}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Query Title: </span>
                    <span>{rec.queryTitle}</span>
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => handleDelete(rec._id, rec.relatedQueryId)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded w-full"
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
      <Footer />
    </>
  );
};

export default MyRecommendations;
