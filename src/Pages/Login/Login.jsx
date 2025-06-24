import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lotties/login.json";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then((result) => {
        const user = result.user;
        navigate(`${location.state ? location.state : "/"}`);
        toast.success(`You Login Successfully | Welcome ${user.displayName}`);
      })
      .catch((error) => {
        const msg = error?.message || "Login failed due to unknown error";
        setError(
          "Your Login Information is invalid - Please Check Email or Password"
        );
        toast.error(msg);
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
    <div className="flex items-center justify-center min-h-[75vh] gap-5 flex-col-reverse sm:flex-row">
      <div className="">
        <form
          onSubmit={handleLogin}
          className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 space-y-4"
        >
          <h2 className="text-4xl font-semibold text-center">Log in</h2>

          {/* Login With Email */}
          <div className="">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
          </div>

          <div className="">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            type="submit"
            className="btn bg-rose-700 hover:bg-rose-600 text-white"
          >
            Login
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
          Don't Have an Account?{" "}
          <Link className="text-rose-600 font-semibold" to={"/register"}>
            Register
          </Link>{" "}
        </p>
      </div>
      <div className="">
        <Lottie
          animationData={loginLottie}
          loop={true}
          style={{ width: "300px" }}
        />
      </div>
    </div>
  );
};

export default Login;
