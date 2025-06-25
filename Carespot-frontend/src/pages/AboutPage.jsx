// src/pages/AboutPage.jsx

import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Who We Are</h1>
        <p className="text-gray-700 text-lg mb-4">
          Welcome to the "Who We Are" page! This is where you'll find
          comprehensive information about CareSpot.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Our **Mission** is to [Insert your mission statement here].
        </p>
        <p className="text-gray-700 text-lg mb-8">
          Our **Vision** is to [Insert your vision statement here].
        </p>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Our Volunteers
        </h2>
        <p className="text-gray-700 text-lg">
          Our dedicated team of volunteers is the heart of CareSpot. They bring
          passion and commitment to every initiative, working tirelessly to
          support children and communities across Ghana. We believe in
          empowering individuals to make a tangible difference.
        </p>
        {/* Add more specific content for your About Us and Volunteers here */}
        <div className="mt-8">
          <img
            src="https://placehold.co/600x300/ADD8E6/000000?text=Volunteer+Team"
            alt="Volunteer Team"
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
