const AboutUs = () => {
  return (
    <section className="py-10 md:py-16 px-4 bg-base-200 rounded-2xl my-10">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row gap-10 items-center">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4 text-rose-600">
            About TutorLingo
          </h2>
          <p className="text-lg mb-4">
            At TutorLingo, we believe language learning should be flexible,
            personal, and enjoyable. Our platform connects you with expert
            tutors around the world to help you speak confidently and achieve
            your learning goals.
          </p>
          <p className="">
            Whether you're preparing for exams, traveling, working abroad, or
            just learning for fun — TutorLingo is here to guide you. With
            hundreds of certified tutors and interactive lessons, you're in good
            hands.
          </p>
        </div>

        <div className="text-center flex-1">
          <img
            src="https://img.freepik.com/free-vector/flat-international-mother-language-day-illustration_23-2149219243.jpg?t=st=1751395675~exp=1751399275~hmac=ca1c9e1dae51b709de11feaab5c75a33a4562b9ff247d99c11b2f84eaf01ec61&w=826"
            alt="About TutorLingo"
            className="w-full max-w-md mx-auto rounded-2xl" 
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
