const UserContact = () => {
  return (
    <div className=" text-white p-12">
      <div className="max-w-6xl mx-auto">
        {/* Contact Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Our Address</h2>
              <p>
                JD Restaurant
                <br />
                123 Sushi Avenue
                <br />
                Tokyo, Japan
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Phone</h2>
              <p>+81 123-456-7890</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Email</h2>
              <p>contact@jdrestaurant.jp</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Opening Hours</h2>
              <p>
                Monday - Friday: 10:00 AM - 10:00 PM
                <br />
                Saturday - Sunday: 11:00 AM - 11:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-black">
              Get in Touch
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:outline-none"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:outline-none"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#F1B3B4] hover:bg-[#e19b9c] text-white py-2 rounded-lg transition ease-in-out"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserContact;
