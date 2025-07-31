// src/pages/AboutPage.jsx

import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col bg-gray-50">
      {/* Hero Section for About Page - Consistent with other secondary pages */}
      <section
        className="relative py-24 bg-cover bg-center text-white flex items-center justify-center"
        style={{
          backgroundImage: "url('/sedi.jpeg')", // Using a consistent image for secondary page heroes
        }}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-70 z-0"></div>{" "}
        {/* Dark blue overlay */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Who We Are
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Learn about CareSpot's mission, vision, and the passionate team
            driving change.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16">
        {/* CareSpot Description Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-12 text-center">
          <p className="text-gray-700 text-lg leading-relaxed">
            CareSpot is a community-driven health initiative focused on
            improving access to healthcare, promoting health literacy, and
            supporting nutrition for underserved populations. Inspired by SDG 3
            (Good Health and Well-being) and SDG 2 (Zero Hunger), we provide
            health education, screenings, and wellness outreach to empower
            individuals and families—ensuring that quality care and knowledge
            reach every corner of our communities.
          </p>
        </section>

        {/* Mission and Vision Section - With background image */}
        <section
          className="relative py-12 px-8 rounded-lg shadow-xl overflow-hidden mb-12 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-indigo-900 opacity-70 z-0"></div>{" "}
          {/* Dark overlay */}
          <div className="relative z-10 grid md:grid-cols-2 gap-8 text-white">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="leading-relaxed">
                To bridge gaps in healthcare access, education, and support for
                underserved communities by promoting preventive care, nutrition,
                and patient empowerment — with a special focus on vulnerable
                populations in Ghana and beyond.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="leading-relaxed">
                A world where every individual, regardless of background or
                location, has access to the basic tools, knowledge, and support
                they need to live a healthy, nourished, and dignified life.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section - With background image */}
        <section
          className="relative py-12 px-8 rounded-lg shadow-xl overflow-hidden mb-12 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-white opacity-80 z-0"></div>{" "}
          {/* Lighter overlay */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "Compassion",
                "Community Empowerment",
                "Equity in Health",
                "Accountability",
                "Cultural Sensitivity",
                "Education Before Intervention",
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-blue-50 p-4 rounded-lg shadow-sm flex items-center justify-center text-center"
                >
                  <p className="text-blue-700 font-semibold text-lg">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Comprehensive Services Section - With background image */}
        <section
          className="relative py-12 px-8 rounded-lg shadow-xl overflow-hidden mb-12 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-blue-900 opacity-70 z-0"></div>{" "}
          {/* Dark overlay */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Our Comprehensive Services
            </h2>
            <ul className="list-disc list-inside text-left text-white text-lg space-y-3">
              <li>Free or subsidized health screenings and outreach.</li>
              <li>
                Nutritional support and counseling for children and mothers.
              </li>
              <li>Health literacy campaigns and workshops.</li>
              <li>Medical referral coordination.</li>
              <li>Rural and urban community pop-up clinics.</li>
              <li>Awareness campaigns (sickle cell, hypertension, etc.).</li>
            </ul>
          </div>
        </section>

        {/* Our Core Goals Section - With background image */}
        <section
          className="relative py-12 px-8 rounded-lg shadow-xl overflow-hidden mb-12 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg2.jpg')", // Using the same background for consistency
          }}
        >
          <div className="absolute inset-0 bg-white opacity-80 z-0"></div>{" "}
          {/* Lighter overlay */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Our Core Goals
            </h2>
            <div className="text-left text-gray-700 text-lg space-y-4">
              <div>
                <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                  1. Advance Health Equity
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    Provide health screenings, education, and referrals to
                    improve early detection and prevention of disease.
                  </li>
                  <li>
                    Advocate for and facilitate access to essential medications,
                    vaccinations, and care.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                  2. Promote Nutrition and Wellness
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    Address malnutrition and food insecurity through education,
                    meal support, and partnerships with local food initiatives.
                  </li>
                  <li>
                    Encourage healthy lifestyle practices starting from
                    childhood.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                  3. Empower Through Health Literacy
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    Simplify medical information for local communities, using
                    relatable, multilingual tools.
                  </li>
                  <li>
                    Run awareness campaigns and workshops on public health
                    issues (e.g. sickle cell, hypertension, reproductive
                    health).
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                  4. Support Sustainable Development Goals
                </h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    SDG 3: Ensure healthy lives and promote well-being for all.
                  </li>
                  <li>
                    SDG 2: End hunger, achieve food security, improve nutrition,
                    and promote sustainable agriculture.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Our Impact (Why CareSpot Exists) Section - With background image */}
        <section
          className="relative py-12 px-8 rounded-lg shadow-xl overflow-hidden mb-12 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-rose-900 opacity-70 z-0"></div>{" "}
          {/* Dark rose overlay */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Our Impact (Why CareSpot Exists)
            </h2>
            <ul className="list-disc list-inside text-left text-white text-lg space-y-3">
              <li>Lack of early screening in rural areas.</li>
              <li>High rates of malnutrition in children.</li>
              <li>Low understanding of chronic diseases.</li>
              <li>Inaccessibility of medications or health info.</li>
            </ul>
          </div>
        </section>

        {/* Target Groups / Beneficiaries Section - With background image */}
        <section
          className="relative py-12 px-8 rounded-lg shadow-xl overflow-hidden mb-12 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-blue-900 opacity-70 z-0"></div>{" "}
          {/* Dark blue overlay */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Our Target Groups / Beneficiaries
            </h2>
            <ul className="list-disc list-inside text-left text-white text-lg space-y-3">
              <li>Mothers and children.</li>
              <li>Youth and adolescents.</li>
              <li>Underserved communities (urban poor, rural).</li>
              <li>
                Persons living with chronic conditions (e.g., sickle cell).
              </li>
            </ul>
          </div>
        </section>

        {/* Partnerships & Collaborations Section - With background image */}
        <section
          className="relative py-12 px-8 rounded-lg shadow-xl overflow-hidden mb-12 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-white opacity-80 z-0"></div>{" "}
          {/* Lighter overlay */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Partnerships & Collaborations
            </h2>
            <p className="text-gray-700 text-lg mb-4 leading-relaxed text-center">
              We are always open to collaboration and actively seek partnerships
              with:
            </p>
            <ul className="list-disc list-inside text-left text-gray-700 text-lg space-y-3 max-w-xl mx-auto">
              <li>Local clinics and hospitals.</li>
              <li>Nutrition and food banks.</li>
              <li>Educational institutions.</li>
              <li>Public health bodies.</li>
              <li>NGOs and international health organizations.</li>
            </ul>
          </div>
        </section>

        {/* Our Volunteers Section - With background image */}
        <section
          className="relative py-12 px-8 rounded-lg shadow-xl overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/bg2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-rose-900 opacity-70 z-0"></div>{" "}
          {/* Dark rose overlay */}
          <div className="relative z-10 text-white">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Our Volunteers
            </h2>
            <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
              Our dedicated team of volunteers is the heart of CareSpot. They
              bring passion and commitment to every initiative, working
              tirelessly to support children and communities across Ghana. We
              believe in empowering individuals to make a tangible difference.
            </p>
            <div className="mt-8 flex justify-center">
              <img
                src="https://placehold.co/600x300/ADD8E6/000000?text=Volunteer+Team"
                alt="Volunteer Team"
                className="rounded-lg shadow-md w-full max-w-xl h-auto"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
