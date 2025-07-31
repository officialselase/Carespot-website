// src/pages/CareSpotGhanaPage.jsx

import React from "react";

const CareSpotGhanaPage = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col bg-gray-50">
      {/* Hero Section for CareSpot – Ghana Page */}
      <section
        className="relative py-24 bg-cover bg-center text-white flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/sedi.jpeg')", // Consistent image
        }}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-70 z-0"></div>{" "}
        {/* Dark blue overlay */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            CareSpot – Ghana
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Exploring CareSpot's dedicated initiatives and impact within Ghana.
          </p>
        </div>
      </section>

      {/* Main Content Area for CareSpot – Ghana */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
          <p className="text-gray-700 text-lg">
            This page highlights CareSpot's specific initiatives and impact
            within Ghana.
          </p>
          {/* Add specific content related to Ghana operations here */}
        </div>
      </div>
    </div>
  );
};

export default CareSpotGhanaPage;
