const ContactUs = () => {
  return (
    <section className="py-16 px-4 bg-base-200 rounded-2xl min-h-screen my-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left: Contact Info */}
        <div>
          <h2 className="text-4xl font-bold text-rose-600 mb-4">
            Get in Touch
          </h2>
          <p className="mb-6">
            We'd love to hear from you. Whether you have a question, feedback,
            or want to work with us — feel free to reach out!
          </p>

          <ul className="space-y-4">
            <li>
              📧 <span className="font-semibold">Email:</span>{" "}
              support@tutorlingo.com
            </li>
            <li>
              📞 <span className="font-semibold">Phone:</span> +880 1234-567890
            </li>
            <li>
              📍 <span className="font-semibold">Address:</span> Dhaka,
              Bangladesh
            </li>
          </ul>
        </div>

        {/* Right: Contact Form */}
        <div>
          <form className="bg-white p-8 rounded-xl shadow-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-rose-500 text-rose-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-rose-500 text-rose-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Your message..."
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-rose-500 text-rose-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-rose-700 transition cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
