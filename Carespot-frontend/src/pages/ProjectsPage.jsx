// src/pages/ProjectsPage.jsx

import React from "react";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col bg-gray-50">
      {/* Hero Section for Projects Page */}
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
            Our Projects
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover the initiatives and impact CareSpot is making in
            communities.
          </p>
        </div>
      </section>

      {/* Main Content Area for Projects */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
          <p className="text-gray-700 text-lg">
            Details about our ongoing and completed projects will be displayed
            here.
          </p>
          {/* Add more specific content for your Projects page here */}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
