import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import {
  FaEdit,
  FaTrash,
  FaStar,
  FaDollarSign,
  FaEye,
  FaPlus,
  FaGraduationCap,
  FaUsers,
  FaCalendarAlt,
  FaImage,
  FaLanguage,
  FaFileAlt,
} from "react-icons/fa";
import { makeAuthenticatedRequest } from "../../utils/apiUtils";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyTutorials = () => {
  const { user } = useContext(AuthContext);
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTutorial, setEditingTutorial] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetchMyTutorials();
    }
  }, [user]);

  const fetchMyTutorials = async () => {
    try {
      const response = await makeAuthenticatedRequest(
        `https://tutor-lingo-server.vercel.app/api/tutors/user/${user.email}`
      );
      if (response.ok) {
        const data = await response.json();
        setTutorials(data);
      } else {
        toast.error("Failed to load tutorials");
      }
    } catch (error) {
      console.error("Failed to fetch tutorials:", error);
      toast.error("Failed to load tutorials");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to delete "${name}" tutorial?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background:
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "#1f2937"
          : "#ffffff",
      color:
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "#ffffff"
          : "#000000",
    });

    if (result.isConfirmed) {
      try {
        const response = await makeAuthenticatedRequest(
          `https://tutor-lingo-server.vercel.app/api/tutors/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setTutorials(tutorials.filter((tutorial) => tutorial._id !== id));
          toast.success("Tutorial deleted successfully!");
        } else {
          toast.error("Failed to delete tutorial");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Network error. Please try again.");
      }
    }
  };

  const handleEdit = (tutorial) => {
    setEditingTutorial({
      _id: tutorial._id,
      image: tutorial.image,
      language: tutorial.language,
      price: tutorial.price,
      description: tutorial.description,
    });
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await makeAuthenticatedRequest(
        `https://tutor-lingo-server.vercel.app/api/tutors/${editingTutorial._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            image: editingTutorial.image,
            language: editingTutorial.language,
            price: editingTutorial.price,
            description: editingTutorial.description,
          }),
        }
      );

      if (response.ok) {
        // Update local state
        setTutorials(
          tutorials.map((tutorial) =>
            tutorial._id === editingTutorial._id
              ? { ...tutorial, ...editingTutorial }
              : tutorial
          )
        );

        setShowModal(false);
        setEditingTutorial(null);
        toast.success("Tutorial updated successfully!");
      } else {
        toast.error("Failed to update tutorial");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Network error. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please log in to view your tutorials
          </h2>
          <a href="/login" className="btn btn-primary">
            Login
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
            <FaGraduationCap className="text-2xl text-rose-700" />
          </div>
          <h1 className="text-4xl font-bold text-base-content mb-4">
            My Tutorials
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Manage your language tutorials and track your teaching progress
          </p>
        </div>

        {tutorials.length > 0 && (
          <>
            {/* Add Tutorial Button */}
            <div className="text-center mb-8">
              <Link
                to={"/add-tutorials"}
                className="btn text-white bg-rose-700 btn-lg"
              >
                <FaPlus className="mr-2" />
                Add New Tutorial
              </Link>
            </div>
          </>
        )}

        {tutorials.length === 0 ? (
          // Empty State
          <div className="text-center py-14 md:py-18">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <FaGraduationCap className="text-6xl text-base-content/30 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-base-content mb-4">
                  No tutorials found
                </h3>
                <p className="text-base-content/70 mb-8">
                  Start your teaching journey by creating your first language
                  tutorial. Share your expertise and help students learn new
                  languages!
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="/add-tutorials"
                  className="btn bg-rose-700 text-white btn-lg w-full"
                >
                  <FaPlus className="mr-2" />
                  Create Your First Tutorial
                </a>
                <a href="/find-tutors" className="btn btn-outline w-full">
                  <FaEye className="mr-2" />
                  Browse Other Tutors
                </a>
              </div>
            </div>
          </div>
        ) : (
          // Tutorials Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <div
                key={tutorial._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <figure className="px-6 pt-6">
                  <img
                    src={tutorial.image}
                    alt={tutorial.language}
                    className="rounded-xl w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                </figure>

                <div className="card-body">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="card-title text-xl">{tutorial.name}</h2>
                    <div className="badge bg-rose-50 text-gray-900 badge-lg">
                      {tutorial.language}
                    </div>
                  </div>

                  <p className="text-base-content/70 text-sm mb-4 line-clamp-3">
                    {tutorial.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <FaDollarSign className="text-success" />
                      <span className="text-lg font-bold text-success">
                        ${tutorial.price}/hr
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-warning" />
                      <span className="font-medium">
                        {tutorial.review} reviews
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-base-content/60 mb-4">
                    <FaCalendarAlt />
                    <span>
                      Created:{" "}
                      {new Date(tutorial.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="card-actions justify-end gap-2">
                    <button
                      onClick={() => handleEdit(tutorial)}
                      className="btn btn-outline btn-sm"
                      title="Edit Tutorial"
                    >
                      <FaEdit className="text-primary" />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(tutorial._id, tutorial.language)
                      }
                      className="btn btn-outline btn-sm"
                      title="Delete Tutorial"
                    >
                      <FaTrash className="text-error" />
                    </button>
                    <a
                      href={`/tutor-details/${tutorial._id}`}
                      className="btn btn-primary btn-sm"
                      title="View Details"
                    >
                      <FaEye />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Update Modal */}
        {showModal && editingTutorial && (
          <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
              <h3 className="font-bold text-2xl mb-6 flex items-center gap-3">
                <FaEdit className="text-primary" />
                Update Tutorial
              </h3>

              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Personal Info - Read Only */}
                <div className="bg-base-200 rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <FaGraduationCap className="text-primary" />
                    Tutor Information
                  </h4>
                  <div className="flex gap-5">
                    <div className="form-control flex-1">
                      <label className="label">
                        <span className="label-text">Tutor Name</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered bg-base-300 w-full"
                        value={user?.displayName || ""}
                        readOnly
                      />
                    </div>
                    <div className="form-control flex-1">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        className="input input-bordered bg-base-300 w-full"
                        value={user?.email || ""}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Tutorial Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <FaFileAlt className="text-secondary" />
                    Tutorial Details
                  </h4>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 mb-2">
                        <FaImage className="text-secondary" />
                        Image URL
                      </span>
                    </label>
                    <input
                      type="url"
                      className="input input-bordered w-full"
                      value={editingTutorial.image}
                      onChange={(e) =>
                        setEditingTutorial({
                          ...editingTutorial,
                          image: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="flex gap-5">
                    <div className="form-control flex-1">
                      <label className="label">
                        <span className="label-text flex items-center gap-2 mb-2">
                          <FaLanguage className="text-secondary" />
                          Language
                        </span>
                      </label>
                      <select
                        className="select select-bordered w-full"
                        value={editingTutorial.language}
                        onChange={(e) =>
                          setEditingTutorial({
                            ...editingTutorial,
                            language: e.target.value,
                          })
                        }
                        required
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Italian</option>
                        <option>Chinese</option>
                        <option>Arabic</option>
                        <option>Japanese</option>
                        <option>Portuguese</option>
                        <option>Korean</option>
                        <option>Russian</option>
                        <option>Hindi</option>
                      </select>
                    </div>
                    <div className="form-control flex-1">
                      <label className="label">
                        <span className="label-text flex items-center gap-2 mb-2">
                          <FaDollarSign className="text-success" />
                          Price (USD/hour)
                        </span>
                      </label>
                      <input
                        type="number"
                        className="input input-bordered w-full"
                        value={editingTutorial.price}
                        onChange={(e) =>
                          setEditingTutorial({
                            ...editingTutorial,
                            price: e.target.value,
                          })
                        }
                        min="5"
                        max="200"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 mb-2">
                        <FaFileAlt className="text-secondary" />
                        Description
                      </span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-32 w-full"
                      value={editingTutorial.description}
                      onChange={(e) =>
                        setEditingTutorial({
                          ...editingTutorial,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe your teaching style, experience, and what students can expect..."
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 mb-2">
                        <FaStar className="text-warning" />
                        Reviews
                      </span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered bg-base-300 w-full"
                      value={
                        tutorials.find((t) => t._id === editingTutorial._id)
                          ?.review || 0
                      }
                      readOnly
                    />
                  </div>
                </div>

                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">
                    <FaEdit className="mr-2" />
                    Update Tutorial
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setShowModal(false);
                      setEditingTutorial(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTutorials;
