// src/pages/ContactPage.jsx

import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col bg-gray-50">
      {/* Hero Section for Contact Page */}
      <section
        className="relative py-24 bg-cover bg-center text-white flex items-center justify-center"
        style={{
          backgroundImage: "url('/sedi.jpeg')", // Consistent image
        }}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-70 z-0"></div>{" "}
        {/* Dark blue overlay */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            We'd love to hear from you. Reach out with any questions or
            collaboration ideas.
          </p>
        </div>
      </section>

      {/* Main Content Area for Contact */}
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-xl text-center">
          <p className="text-gray-700 text-lg mb-6">
            Have questions or want to collaborate? Reach out to us using the
            form below or our contact details.
          </p>
          <form>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2 text-left"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2 text-left"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Subject of your message"
                required
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
