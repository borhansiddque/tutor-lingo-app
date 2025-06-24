import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const LanguageCategories = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/languages.json")
      .then((res) => res.json())
      .then((data) => {
        setLanguages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load languages:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-base-200 rounded-2xl px-4 my-14 md:my-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Explore Languages & Find Your Ideal Tutor
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div
                key={i}
                className="skeleton h-16 bg-base-300 rounded-xl"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-base-200 rounded-2xl px-4 my-14 md:my-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">
          Explore Languages & Find Your Ideal Tutor
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {languages.map((lang, idx) => (
            <Link
              to={`/find-tutors/${lang.name.toLowerCase()}`}
              key={idx}
              className="group"
            >
              <div className="flex items-center justify-between border border-gray-300 rounded-xl px-6 py-4 bg-white hover:bg-rose-50 hover:border-rose-300 transition-all duration-300 cursor-pointer w-full shadow-sm group-hover:shadow-md">
                <div className="flex items-center gap-3">
                  <img
                    src={lang.icon}
                    alt={lang.name}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-semibold text-gray-800 group-hover:text-rose-700 transition-colors">
                    {lang.name}
                  </span>
                </div>
                <IoIosArrowForward
                  size={20}
                  className="text-gray-500 group-hover:text-rose-600 group-hover:translate-x-1 transition-all duration-300"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/find-tutors" className="btn btn-outline btn-lg">
            View All Tutors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LanguageCategories;
