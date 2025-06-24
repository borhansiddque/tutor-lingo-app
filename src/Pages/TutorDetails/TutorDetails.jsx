import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import {
  FaStar,
  FaDollarSign,
  FaUser,
  FaLanguage,
  FaBookOpen,
} from "react-icons/fa";
import { makeAuthenticatedRequest } from "../../utils/apiUtils";

const TutorDetails = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTutorDetails();
  }, [id]);

  const fetchTutorDetails = async () => {
    try {
      const response = await fetch(
        `https://tutor-lingo-server.vercel.app/api/tutors/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setTutor(data);
      } else {
        toast.error("Tutor not found");
        navigate("/find-tutors");
      }
    } catch (error) {
      console.error("Failed to load tutor details:", error);
      toast.error("Failed to load tutor details");
    } finally {
      setLoading(false);
    }
  };

  const handleBookTutor = async () => {
    if (!user) {
      toast.error("You must be logged in to book a tutor.");
      navigate("/login");
      return;
    }

    setBooking(true);

    try {
      const response = await makeAuthenticatedRequest(
        `https://tutor-lingo-server.vercel.app/api/tutors/${id}/book`,
        {
          method: "POST",
          body: JSON.stringify({ email: user.email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Tutor booked successfully!");
        navigate("/my-booked-tutors");
      } else {
        toast.error(result.message || "Failed to book tutor");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Tutor not found</h2>
        <Link to="/find-tutors" className="btn bg-rose-700 text-white">
          Back to Find Tutors
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/find-tutors" className="btn btn-ghost mb-6">
          ← Back to Tutors
        </Link>

        {/* Tutor Profile Card */}
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure className="lg:w-1/3">
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-full h-96 lg:h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=No+Image";
              }}
            />
          </figure>

          <div className="card-body lg:w-2/3">
            {/* Header */}
            <div className="mb-5">
              <h1 className="text-3xl font-bold mb-3">{tutor.name}</h1>
              <div className="flex items-center gap-2 ">
                <FaLanguage className="text-rose-700" size={24} />
                <span className="text-xl font-semibold">
                  {tutor.language} Tutor
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title flex items-center gap-1 mb-1">
                  {" "}
                  <FaDollarSign className="text-success" /> Price per hour
                </div>
                <h3 className="font-bold text-2xl">${tutor.price}</h3>
              </div>

              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title flex items-center gap-1 mb-1">
                  {" "}
                  <FaStar className=" text-yellow-500" /> Reviews
                </div>
                <h3 className="font-bold text-2xl">{tutor.review}</h3>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">About This Tutor</h3>
              <p className="text-base-content/80 leading-relaxed">
                {tutor.description}
              </p>
            </div>

            {/* Action Button */}
            <div className="card-actions justify-end">
              {tutor.email === user?.email ? (
                <div className="alert bg-rose-600 text-white w-full">
                  <div className="flex items-center gap-2">
                    <FaUser />
                    <span>This is your own tutorial</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleBookTutor}
                  disabled={booking}
                  className="btn bg-rose-700 text-white btn-lg w-full"
                >
                  {booking ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Booking...
                    </>
                  ) : (
                    <>
                      <FaBookOpen />
                      Book This Tutor
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
