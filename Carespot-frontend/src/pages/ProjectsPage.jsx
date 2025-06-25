// src/pages/ProjectsPage.jsx

import React from "react";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Our Projects</h1>
        <p className="text-gray-700 text-lg">
          Details about our ongoing and completed projects will be displayed
          here.
        </p>
        {/* Add more specific content for your Projects page here */}
      </div>
    </div>
  );
};

export default ProjectsPage;
