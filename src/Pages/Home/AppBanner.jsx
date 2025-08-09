import React from "react";
import tutorLingoAppImage from "../../assets/tutorLingo-app.png";

const AppBanner = () => {
  return (
    <div className="flex flex-col-reverse gap-5 items-center justify-between bg-rose-400/20 backdrop-blur-lg rounded-xl py-8 px-6 sm:px-10 mb-20 border border-rose-600">
      <div className="flex-1 text-center sm:w-3/4">
        <h3 className="text-3xl sm:text-4xl font-bold leading-tight">
          The <span className="text-rose-700">TutorLingo App</span> is Launching
          Soon!
        </h3>
        <p className="mt-4 text-lg opacity-80">
          Learn on the go with our upcoming mobile app. Book lessons, chat with
          tutors, and practice anytime, anywhere — all from your phone. Stay
          tuned!
        </p>
      </div>
      <div className="flex-1 flex items-center justify-end">
        <img src={tutorLingoAppImage} alt="" />
      </div>
    </div>
  );
};

export default AppBanner;
