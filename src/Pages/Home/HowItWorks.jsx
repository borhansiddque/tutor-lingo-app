import React from "react";
import {
  FaSearch,
  FaCalendarCheck,
  FaVideo,
  FaCertificate,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: FaSearch,
      title: "Find Your Tutor",
      description:
        "Browse through our qualified tutors and find the perfect match for your learning goals.",
      color: "blue",
    },
    {
      icon: FaCalendarCheck,
      title: "Book a Session",
      description:
        "Schedule your lesson at a time that works for you. Flexible timing available.",
      color: "green",
    },
    {
      icon: FaVideo,
      title: "Start Learning",
      description:
        "Join your online lesson and start your personalized language learning journey.",
      color: "purple",
    },
    {
      icon: FaCertificate,
      title: "Track Progress",
      description:
        "Monitor your improvement and get feedback from your tutor after each session.",
      color: "orange",
    },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-base-content mb-4">
            How TutorLingo Works
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Start learning a new language in just 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const colorClasses = {
              blue: {
                bg: "bg-primary/20",
                icon: "text-primary",
                badge: "bg-primary",
              },
              green: {
                bg: "bg-success/20",
                icon: "text-success",
                badge: "bg-success",
              },
              purple: {
                bg: "bg-secondary/20",
                icon: "text-secondary",
                badge: "bg-secondary",
              },
              orange: {
                bg: "bg-warning/20",
                icon: "text-warning",
                badge: "bg-warning",
              },
            };
            const colors = colorClasses[step.color];

            return (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 mx-auto rounded-2xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`text-3xl ${colors.icon}`} />
                  </div>
                  <div
                    className={`absolute -top-2 -right-2 w-8 h-8 ${colors.badge} text-white rounded-full flex items-center justify-center text-sm font-bold`}
                  >
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-base-content mb-3">
                  {step.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-base-200 rounded-full px-6 py-3">
            <span className="text-base-content font-medium">
              Ready to get started?
            </span>
            <a href="/find-tutors" className="ml-4 btn btn-primary btn-sm">
              Find Tutors Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
