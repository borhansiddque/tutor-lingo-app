import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { FaStar, FaDollarSign, FaCalendar } from "react-icons/fa";
import toast from "react-hot-toast";
import { makeAuthenticatedRequest } from "../../utils/apiUtils";

const MyBookedTutors = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchMyBookings();
    }
  }, [user]);

  const fetchMyBookings = async () => {
    try {
      const response = await makeAuthenticatedRequest(
        `https://tutor-lingo-server.vercel.app/api/bookings/${user.email}`
      );
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (tutorId, tutorName) => {
    try {
      const response = await makeAuthenticatedRequest(
        `https://tutor-lingo-server.vercel.app/api/tutors/${tutorId}/review`,
        {
          method: "POST",
          body: JSON.stringify({ email: user.email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Update the local state to reflect the new review count and reviewed status
        setBookings(
          bookings.map((booking) =>
            booking.tutorId === tutorId
              ? { ...booking, review: booking.review + 1, hasReviewed: true }
              : booking
          )
        );
        toast.success(`Review added for ${tutorName}!`);
      } else {
        toast.error(result.message || "Failed to add review");
      }
    } catch (error) {
      console.error("Review error:", error);
      toast.error("Network error. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">
          Please log in to view your booked tutors
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">My Booked Tutors</h1>
        <p className="text-lg text-base-content/70">
          Manage your booked language tutors
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold mb-4">
            No booked tutors found
          </h3>
          <p className="text-base-content/70 mb-6">
            You haven't booked any tutors yet.
          </p>
          <a href="/find-tutors" className="btn bg-rose-700 text-white">
            Find Tutors
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="card bg-base-100 shadow-xl">
              <figure className="px-4 pt-4">
                <img
                  src={booking.image}
                  alt={booking.tutorName}
                  className="rounded-xl w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">
                  {booking.tutorName}
                  <div className="badge bg-rose-50 text-gray-900">
                    {booking.language}
                  </div>
                </h2>

                <p className="text-sm text-base-content/70 line-clamp-3">
                  {booking.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span className="text-sm font-medium">
                      {booking.review} reviews
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaDollarSign className="text-green-500" />
                    <span className="text-lg font-bold">
                      ${booking.price}/hr
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2 text-sm text-base-content/70">
                  <FaCalendar />
                  <span>
                    Booked on: {new Date(booking.bookedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="card-actions justify-end mt-4">
                  {booking.hasReviewed ? (
                    <div
                      className="btn btn-success btn-sm w-full cursor-not-allowed"
                      disabled
                    >
                      <FaStar />
                      Reviewed
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        handleAddReview(booking.tutorId, booking.tutorName)
                      }
                      className="btn bg-rose-700 text-white btn-sm w-full"
                    >
                      <FaStar />
                      Add Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookedTutors;
