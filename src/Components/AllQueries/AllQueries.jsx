import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaHeart, FaTh, FaThLarge, FaThList } from 'react-icons/fa';
import NavBar from '../Header/NavBar';
import Footer from '../Footer/Footer';

const AllQueries = () => {
  const [queries, setQueries] = useState([]);
  const [gridLayout, setGridLayout] = useState(3);

  useEffect(() => {
    fetch('http://localhost:3000/AddQueries') 
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setQueries(sorted);
      })
      .catch((err) => console.error('Error fetching queries:', err));
  }, []);

  return (
    <>
    <NavBar />
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center py-12 px-6 rounded-2xl shadow-lg mb-10  ">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4 drop-shadow">
          All Queries
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Here you'll find all queries submitted by users. Click ‘Recommend’ to support queries you find useful or interesting.
        </p>
      </div>

      {/* Layout Toggle */}
      <div className="flex justify-end gap-3 mb-8">
        <button
          onClick={() => setGridLayout(1)}
          className={`p-3 rounded-full text-white text-lg shadow-md transition ${
            gridLayout === 1 ? 'bg-blue-800' : 'bg-gray-500 hover:bg-gray-600'
          }`}
          title="1 Column"
        >
          <FaThList />
        </button>
        <button
          onClick={() => setGridLayout(2)}
          className={`p-3 rounded-full text-white text-lg shadow-md transition ${
            gridLayout === 2 ? 'bg-blue-800' : 'bg-gray-500 hover:bg-gray-600'
          }`}
          title="2 Columns"
        >
          <FaThLarge />
        </button>
        <button
          onClick={() => setGridLayout(3)}
          className={`p-3 rounded-full text-white text-lg shadow-md transition ${
            gridLayout === 3 ? 'bg-blue-800' : 'bg-gray-500 hover:bg-gray-600'
          }`}
          title="3 Columns"
        >
          <FaTh />
        </button>
      </div>

      {/* Grid of Cards */}
      <div
        className={`grid gap-8 ${
          gridLayout === 1
            ? 'grid-cols-1'
            : gridLayout === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {queries.map((query) => (
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
              {query.title}
            </h2>
            <h3 className="text-md text-blue-500 font-medium mb-2 italic">
              {query.queryTitle}
            </h3>
            <p className="text-gray-700 mb-3">{query.description}</p>
            <div className="text-sm text-gray-600 mb-1">
              <strong>Product Name:</strong> {query.productName || 'N/A'}
            </div>
            <div className="text-sm text-gray-600 mb-1">
              <strong>Product Brand:</strong> {query.productBrand || 'N/A'}
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Posted on: {new Date(query.timestamp).toLocaleString()}
            </div>
            <div className="flex justify-between items-center mt-auto pt-4 border-t">
              <span className="text-blue-700 font-semibold text-sm">
                💙 {query.recommendationCount || 0} Recommendations
              </span>
              <Link
                to={`/query-details/${query._id}`}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition flex items-center gap-2 text-sm font-medium"
              >
                <FaHeart />
                Recommend
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AllQueries;
