import React, { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { makeAuthenticatedRequest } from "../../utils/apiUtils";
import {
  FaUser,
  FaEnvelope,
  FaImage,
  FaLanguage,
  FaDollarSign,
  FaFileAlt,
  FaStar,
  FaPlus,
  FaCheckCircle,
  FaGraduationCap,
} from "react-icons/fa";

const AddTutorials = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if user is logged in
    if (!user) {
      toast.error("Please log in to add tutorials");
      setLoading(false);
      return;
    }

    const form = e.target;
    const formData = {
      name: user.displayName,
      email: user.email,
      image: form.image.value,
      language: form.language.value,
      price: form.price.value,
      description: form.description.value,
    };

    // Validation
    if (
      !formData.image ||
      !formData.language ||
      !formData.price ||
      !formData.description
    ) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (formData.language === "Language") {
      toast.error("Please select a language");
      setLoading(false);
      return;
    }

    try {
      const response = await makeAuthenticatedRequest(
        "https://tutor-lingo-server.vercel.app/api/tutors",
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Tutorial added successfully!");
        form.reset();
      } else {
        toast.error(result.message || "Failed to add tutorial");
      }
    } catch (error) {
      console.error("Network error details:", error);
      console.error("Error type:", error.name);
      console.error("Error message:", error.message);

      // More specific error messages
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        toast.error(
          "Cannot connect to server. Make sure the server is running on port 3001."
        );
      } else if (
        error.name === "TypeError" &&
        error.message.includes("NetworkError")
      ) {
        toast.error("Network error. Check your internet connection.");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
              <FaGraduationCap className="text-2xl text-rose-700" />
            </div>
            <h1 className="text-4xl font-bold text-base-content mb-4">
              Become a Tutor
            </h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Share your language expertise and help students around the world
              achieve their learning goals
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-base-100 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Progress Steps */}
            <div className="bg-rose-50 p-6">
              <h2 className="text-rose-700 text-3xl font-semibold text-center">
                Add Tutorials
              </h2>
            </div>

            <div className="p-8 space-y-8">
              {/* Personal Information Section */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FaUser className="text-primary text-xl" />
                  <h3 className="text-2xl font-bold text-base-content">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FaUser className="text-primary" />
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered bg-base-200"
                      value={user?.displayName || ""}
                      readOnly
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FaEnvelope className="text-primary" />
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered bg-base-200"
                      value={user?.email || ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Tutorial Details Section */}
              <div className="divider"></div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FaGraduationCap className="text-rose-500 text-xl" />
                  <h3 className="text-2xl font-bold text-base-content">
                    Tutorial Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Form Fields */}
                  <div className="lg:col-span-3 space-y-6">
                    <div className="form-control">
                      <label className="label mb-2">
                        <span className="label-text flex items-center gap-2">
                          <FaImage className="text-rose-500" />
                          Profile Image URL{" "}
                          <span className="text-error text-xs">*</span>
                        </span>
                      </label>
                      <input
                        type="url"
                        name="image"
                        className="input input-bordered w-full"
                        placeholder="https://example.com/your-photo.jpg"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text flex items-center gap-2">
                            <FaLanguage className="text-rose-500" />
                            Language{" "}
                            <span className="text-error text-xs">*</span>
                          </span>
                        </label>
                        <select
                          name="language"
                          className="select select-bordered w-full"
                          required
                        >
                          <option value="">Choose a language</option>
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

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text flex items-center gap-2">
                            <FaDollarSign className="text-success" />
                            Hourly Rate{" "}
                            <span className="text-error text-xs">*</span>
                          </span>
                        </label>
                        <input
                          type="number"
                          name="price"
                          className="input input-bordered w-full"
                          placeholder="25.00"
                          min="5"
                          max="1000"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label mb-2">
                        <span className="label-text flex items-center gap-2">
                          <FaFileAlt className="text-rose-500" />
                          Teaching Description{" "}
                          <span className="text-error text-xs">*</span>
                        </span>
                      </label>
                      <textarea
                        name="description"
                        className="textarea textarea-bordered h-32 w-full"
                        placeholder="Describe your teaching style, experience, qualifications, and what students can expect from your lessons..."
                        required
                      ></textarea>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FaStar className="text-warning" />
                          Initial Reviews
                        </span>
                      </label>
                      <input
                        type="number"
                        value={0}
                        className="input input-bordered bg-base-200 w-full"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Section */}
              <div className="divider"></div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn bg-rose-700 text-white btn-lg px-12"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating Tutorial...
                    </>
                  ) : (
                    <>
                      <FaPlus className="mr-2" />
                      Add Tutorial
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTutorials;
