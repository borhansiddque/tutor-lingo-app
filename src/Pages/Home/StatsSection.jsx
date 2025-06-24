import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const StatsSection = () => {
  const [stats, setStats] = useState({
    tutors: 0,
    reviews: 0,
    languages: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(
        "https://tutor-lingo-server.vercel.app/api/stats"
      );
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      // Use default values if API fails
      setStats({
        tutors: 50,
        reviews: 120,
        languages: 9,
        users: 85,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-14 md:my-20">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center space-y-1 bg-rose-600 p-5 rounded-2xl text-white"
          >
            <div className="skeleton w-16 h-8 bg-rose-400"></div>
            <div className="skeleton w-24 h-6 bg-rose-400"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-14 md:my-20">
      <div className="flex flex-col items-center justify-center space-y-1 bg-rose-600 p-5 rounded-2xl text-white">
        <div className="flex items-center text-3xl font-bold">
          <CountUp end={stats.tutors} enableScrollSpy />
          <p className="">+</p>
        </div>
        <p className="text-2xl text-center">All Tutors</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-1 bg-rose-600 p-5 rounded-2xl text-white">
        <div className="flex items-center text-3xl font-bold">
          <CountUp end={stats.reviews} enableScrollSpy />
          <p className="">+</p>
        </div>
        <p className="text-2xl">Tutor Reviews</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-1 bg-rose-600 p-5 rounded-2xl text-white">
        <div className="flex items-center text-3xl font-bold">
          <CountUp end={stats.languages} enableScrollSpy />
          <p className="">+</p>
        </div>
        <p className="text-2xl">Languages</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-1 bg-rose-600 p-5 rounded-2xl text-white">
        <div className="flex items-center text-3xl font-bold">
          <CountUp end={stats.users} enableScrollSpy />
          <p className="">+</p>
        </div>
        <p className="text-2xl">Active Learners</p>
      </div>
    </div>
  );
};

export default StatsSection;
