import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaStar, FaDollarSign, FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";

const FeaturedTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedTutors();
  }, []);

  const fetchFeaturedTutors = async () => {
    try {
      const response = await fetch(
        "https://tutor-lingo-server.vercel.app/api/tutors"
      );
      if (response.ok) {
        const data = await response.json();
        // Show only first 6 tutors as featured
        setTutors(data.slice(0, 6));
      }
    } catch (error) {
      console.error("Failed to fetch tutors:", error);
      toast.error("Failed to load featured tutors");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-base-content mb-4">
              Featured Tutors
            </h2>
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 md:py-18 bg-base-200 rounded-2xl">
      <div className=" mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-base-content mb-4">
            Meet Our Featured Tutors
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Learn from experienced, certified tutors who are passionate about
            helping you succeed
          </p>
        </div>

        {tutors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {tutors.map((tutor) => (
                <div
                  key={tutor._id}
                  className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-full h-50 object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-base-100/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-base-content">
                        {tutor.language}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-base-content mb-2">
                      {tutor.name}
                    </h3>
                    <p className="text-base-content/70 text-sm mb-4 line-clamp-3">
                      {tutor.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-warning" />
                        <span className="text-sm font-medium">
                          {tutor.review} reviews
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaDollarSign className="text-success" />
                        <span className="text-lg font-bold text-success">
                          ${tutor.price}/hr
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/tutor-details/${tutor._id}`}
                      className="btn bg-rose-700 text-white btn-sm w-full"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/find-tutors" className="btn btn-outline btn-lg">
                View All Tutors
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-base-content mb-4">
              No tutors available yet
            </h3>
            <p className="text-base-content/70 mb-6">
              Be the first to join our platform as a tutor!
            </p>
            <Link to="/add-tutorials" className="btn btn-primary">
              Become a Tutor
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTutors;
