import { Link } from "react-router";
import { FiAlertTriangle } from "react-icons/fi";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="text-center max-w-md">
        <FiAlertTriangle size={60} className="mx-auto text-rose-600 mb-4" />
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
