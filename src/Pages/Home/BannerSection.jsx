import React from "react";
import { Link } from "react-router";
import { FaPlay, FaStar, FaUsers, FaGlobe } from "react-icons/fa";

const BannerSection = () => {
  return (
    <section className="relative bg-base-100 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center bg-rose-50 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FaStar className="mr-2" />
              Trusted by 10,000+ Students Worldwide
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content leading-tight mb-6">
              Learn Languages with
              <span className="text-rose-700 animate-pulse">
                {" "}
                Expert Tutors
              </span>
            </h1>

            <p className="text-xl text-base-content/70 mb-8 max-w-2xl">
              Connect with certified language tutors for personalized 1-on-1
              lessons. Learn at your pace, anywhere, anytime.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/find-tutors"
                className="btn text-white bg-rose-700 border-none btn-lg px-8"
              >
                <FaUsers className="mr-2" />
                Find Your Tutor
              </Link>
              <button className="btn btn-outline btn-lg px-8 border-2 hover:border-rose-600">
                <FaPlay className="mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-base-content/70">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-base-100"
                    src="https://randomuser.me/api/portraits/women/1.jpg"
                    alt=""
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-base-100"
                    src="https://randomuser.me/api/portraits/men/2.jpg"
                    alt=""
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-base-100"
                    src="https://randomuser.me/api/portraits/women/3.jpg"
                    alt=""
                  />
                </div>
                <span>1000+ Happy Students</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-warning">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} />
                  ))}
                </div>
                <span>4.9/5 Average Rating</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                alt="Language Learning"
                className="rounded-2xl shadow-2xl"
              />

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-base-100 rounded-xl shadow-lg p-4 border border-base-300">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                    <FaGlobe className="text-success" />
                  </div>
                  <div>
                    <div className="font-semibold text-base-content">
                      50+ Languages
                    </div>
                    <div className="text-sm text-base-content/70">
                      Available to learn
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-base-100 rounded-xl shadow-lg p-4 border border-base-300">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <FaUsers className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-base-content">
                      500+ Tutors
                    </div>
                    <div className="text-sm text-base-content/70">
                      Certified professionals
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-rose-400/20 rounded-2xl transform rotate-3 scale-105 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
