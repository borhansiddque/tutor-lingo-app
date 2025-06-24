import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const StudentTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Lee",
      comment:
        "TutorLingo completely changed the way I learn languages. My tutor is patient, friendly, and super helpful!",
      country: "USA",
    },
    {
      name: "Carlos Martín",
      comment:
        "I improved my English speaking in just 2 months. The tutors are amazing!",
      country: "Spain",
    },
    {
      name: "Amina Khan",
      comment:
        "The tutors are professional and the platform is easy to use. Highly recommend!",
      country: "UAE",
    },
    {
      name: "Liam Walker",
      comment:
        "I love how flexible the lesson scheduling is. Perfect for my busy life.",
      country: "UK",
    },
    {
      name: "Yuki Tanaka",
      comment:
        "Learning French was always hard for me, but TutorLingo made it fun and effective!",
      country: "Japan",
    },
    {
      name: "Mohammed Al-Sayed",
      comment: "A very helpful platform with expert tutors. I’m learning fast!",
      country: "Qatar",
    },
  ];

  return (
    <section className="bg-base-300 py-12 px-4 rounded-2xl mb-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Students Say</h2>

        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx} className="mb-10">
              <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col justify-between">
                <p className="text-gray-700 mb-4">&ldquo;{t.comment}&rdquo;</p>
                <div className="text-sm font-semibold text-rose-600 mt-4">
                  — {t.name}, {t.country}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default StudentTestimonials;
