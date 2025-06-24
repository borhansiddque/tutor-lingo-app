import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router";
import registerLottie from "../../assets/lotties/register.json";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { registerUser, updateUser, setUser, googleLogin } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const regExUpperCase = /(?=.*[A-Z])/;
    const regExLowerCase = /(?=.*[a-z])/;
    const regExLength = /.{6,}/;
    if (!regExUpperCase.test(password)) {
      setError("Password must have at least one uppercase letter (A-Z)");
      return;
    }
    if (!regExLowerCase.test(password)) {
      setError("Password must have at least one uppercase letter (a-z)");
      return;
    }
    if (!regExLength.test(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }
    registerUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
            toast.success("Create Account Successfully");
          })
          .catch((error) => {
            toast.error(error.message);
            setUser(user);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        navigate(`${location.state ? location.state : "/"}`);
        toast.success(`Welcome ${user.displayName} | You Login Successfully`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-[75vh] gap-5 flex-col-reverse sm:flex-row my-10">
      <div className="">
        <form
          onSubmit={handleRegister}
          className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 space-y-2"
        >
          <h2 className="text-4xl font-semibold text-center">Register Now!</h2>

          <div className="">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="">
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input"
              placeholder="Photo URL"
            />
          </div>
          <div className="">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              required
            />
          </div>

          <div className="">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="btn bg-rose-700 hover:bg-rose-600 text-white"
          >
            Register
          </button>
        </form>
        <div className="divider mt-4 mb-0">OR</div>
        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border-[#e5e5e5] my-4 w-full"
        >
          <FcGoogle size={24} />
          Login with Google
        </button>
        <p className="">
          Already Have an Account?{" "}
          <Link className="text-rose-600 font-semibold" to={"/login"}>
            Login
          </Link>{" "}
        </p>
      </div>
      <div className="">
        <Lottie
          animationData={registerLottie}
          loop={true}
          style={{ width: "300px" }}
        />
      </div>
    </div>
  );
};

export default Register;
