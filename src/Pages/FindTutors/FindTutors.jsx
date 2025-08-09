import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router";
import { FaSearch, FaStar, FaDollarSign } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";

const FindTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { category } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTutors();
  }, [category]);

  const fetchTutors = async () => {
    setLoading(true);
    try {
      let url = "https://tutor-lingo-server.vercel.app/api/tutors";

      // If category is provided from URL params, filter by category
      if (category) {
        url = `https://tutor-lingo-server.vercel.app/api/tutors/category/${category}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      console.error("Failed to load tutors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchTutors();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://tutor-lingo-server.vercel.app/api/tutors/search?q=${searchQuery}`
      );
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    fetchTutors();
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-4xl font-bold mb-4 text-base-content">
          <p className="capitalize">
            {category ? `${category} Tutors` : "Find Your Perfect Tutor"}
          </p>
        </div>
        <p className="text-lg text-base-content/70">
          Connect with experienced language tutors and start your learning
          journey
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
            <input
              type="text"
              placeholder="Search by language (e.g., English, Spanish...)"
              className="input input-bordered w-full pl-5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn bg-rose-700 text-white">
            Search
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="btn btn-outline"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-rose-700"></span>
        </div>
      )}

      {/* Tutors Grid */}
      {!loading && (
        <>
          {tutors.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-4">No Tutors Found</h3>
              <p className="text-base-content/70 mb-4">
                {searchQuery
                  ? "Try searching with different keywords"
                  : "No tutors available at the moment"}
              </p>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="btn bg-rose-700 text-white"
                >
                  View All Tutors
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {tutors.length} Tutor{tutors.length !== 1 ? "s" : ""} Found
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tutors.map((tutor) => (
                  <div
                    key={tutor._id}
                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    <figure className="px-4 pt-4">
                      <img
                        src={tutor.image}
                        alt={tutor.name}
                        className="rounded-xl w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=No+Image";
                        }}
                      />
                    </figure>
                    <div className="card-body">
                      <div className="space-y-2">
                        <div className="text-sm badge bg-rose-50 text-gray-900">
                          {tutor.language} Language Tutor
                        </div>
                        <h2 className="card-title text-lg">
                          {tutor.name}
                          {tutor.email === user?.email && (
                            <div className="badge badge-outline badge-sm">
                              Your Tutorial
                            </div>
                          )}
                        </h2>
                      </div>

                      <p className="text-sm text-base-content/70 line-clamp-3">
                        {tutor.description}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-500" />
                          <span className="text-sm font-medium">
                            {tutor.review} reviews
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaDollarSign className="text-green-500" />
                          <span className="text-lg font-bold">
                            {tutor.price}/hr
                          </span>
                        </div>
                      </div>

                      <div className="card-actions justify-end mt-4">
                        <Link
                          to={`/tutor-details/${tutor._id}`}
                          className="btn bg-rose-700 text-white btn-sm w-full"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FindTutors;
