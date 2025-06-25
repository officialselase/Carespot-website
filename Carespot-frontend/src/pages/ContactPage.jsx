// src/pages/ContactPage.jsx

import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Get In Touch</h1>
        <p className="text-gray-700 text-lg mb-6">
          Have questions or want to collaborate? Reach out to us using the form below or our contact details.
        </p>
        <form>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 text-left">Name</label>
              <input type="text" id="name" name="name" className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Name" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 text-left">Email</label>
              <input type="email" id="email" name="email" className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Email" required />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2 text-left">Subject</label>
            <input type="text" id="subject" name="subject" className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Subject of your message" required />
          </div>
          <div className="mb-8">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2 text-left">Message</label>
            <textarea id="message" name="message" rows="6" className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Message" required></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105">
              Send Message
            </button>
          </div>
        </form>
        <div className="mt-8 text-left">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Our Contact Details:</h3>
            <ul className="space-y-1 text-gray-600">
                <li>Kwashiebu, Snowdrop St.</li>
                <li>Accra-Ghana</li>
                <li>+233 50 154 4087</li>
                <li>+233 55 902 2161</li>
                <li>carespotinitiative@gmail.com</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;