// src/pages/HomePage.jsx

import React from "react";
import AnimatedNumber from "../components/AnimatedNumber"; // Import the AnimatedNumber component

const HomePage = ({ navigateTo }) => {
  // localScrollToSection is used for scrolling to sections *within* the HomePage itself.
  const localScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="pt-20">
      {" "}
      {/* Padding to account for fixed header */}
      {/* Hero Section */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-3/4 h-full bg-blue-100 rounded-bl-[500px] z-0 opacity-70"></div>
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center z-10">
          <div className="text-center md:text-left p-4">
            <p className="text-blue-500 font-semibold text-lg uppercase mb-4">
              'BECAUSE ONLY TOGETHER WE CAN
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-indigo-900 mb-6 font-serif">
              BUILD A WORLD WHERE EVERY CHILD THRIVES—FREE FROM POVERTY, HUNGER,
              POOR HEALTH, AND LACK OF EDUCATION."
            </h1>
          </div>
          <div className="relative flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden group">
              <img
                src="https://placehold.co/700x400/90EE90/333333?text=Dummy+Video"
                alt="Dummy Video Thumbnail"
                className="w-full h-auto object-cover rounded-3xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-3xl cursor-pointer">
                <svg
                  className="w-20 h-20 text-white transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="z-10 mt-12 mb-8">
          <button
            onClick={() => navigateTo("Donate")}
            className="bg-indigo-900 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
          >
            Donate Now
          </button>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our Story
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://placehold.co/600x400/90EE90/333333?text=Child+Learning"
                alt="Children learning"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                The Journey of CareSpot Initiative
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                CareSpot Initiative began with a simple yet powerful vision: to
                create a world where every child, regardless of their
                background, has access to education, healthcare, and a nurturing
                environment. Founded by a group of passionate individuals, we
                started small, reaching out to local communities and identifying
                the most pressing needs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Over the years, our dedication has allowed us to expand our
                reach, touching the lives of thousands of children through
                various programs focused on education, health, and social
                welfare. We believe that by investing in children, we are
                building a stronger, more compassionate future for everyone.
              </p>
            </div>
          </div>

          {/* The Reality We Face - Modified to be text only */}
          <div id="the-reality" className="mt-16 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              The Reality We Face
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Despite progress, millions of children worldwide still face
              immense challenges including poverty, lack of access to quality
              education, malnutrition, and inadequate healthcare. These issues
              not only hinder their personal development but also impact the
              long-term prospects of their communities and nations.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our work is driven by the urgent need to address these
              disparities. We work tirelessly to provide sustainable solutions
              that empower children to break the cycle of poverty and achieve
              their full potential. Every child deserves a chance to dream,
              learn, and grow in a safe and supportive environment.
            </p>
          </div>

          {/* New Section: Support Us */}
          <div className="relative mt-16 py-12 px-4 md:px-0 bg-blue-50 rounded-lg shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-3/4 h-full bg-rose-100 rounded-tr-[500px] z-0 opacity-70"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center md:justify-end">
                <div className="relative w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
                  <img
                    src="https://placehold.co/700x400/FFD1DC/333333?text=Reproductive+Health+Club+Banner"
                    alt="Reproductive Health Club Banner"
                    className="w-full h-auto object-cover rounded-3xl"
                  />
                </div>
              </div>
              <div className="text-center md:text-left p-4">
                <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight text-blue-600 mb-4 font-serif">
                  SUPPORT US AND CHANGE THE COURSE OF A CHILD'S LIFE TODAY!
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Collectively, we have a duty to our society. We are privileged
                  in more ways than one and thus, our social responsibility to
                  leverage this privilege to help the needy and disadvantageous.
                </p>
                {/* --- MODIFIED LINE BELOW --- */}
                <button
                  onClick={() => navigateTo("About")}
                  className="bg-indigo-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-md transform hover:scale-105"
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>

          {/* New Section: Testimonial */}
          <div className="relative mt-16 py-12 px-4 md:px-0 bg-gray-50 rounded-lg shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-3/4 h-full bg-blue-100 rounded-bl-[500px] z-0 opacity-70"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center md:justify-start order-2 md:order-1">
                <div className="relative w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
                  <img
                    src="https://placehold.co/400x400/90EE90/333333?text=Theresa+Ameke"
                    alt="Theresa Ameke"
                    className="w-full h-auto object-cover rounded-3xl"
                  />
                </div>
              </div>
              <div className="text-center md:text-left p-4 order-1 md:order-2">
                <p className="text-3xl text-gray-600 mb-6 font-serif leading-relaxed italic">
                  "I was driven to join CareSpot Initiative by a deep desire to
                  support underprivileged children and individuals in
                  communities across Ghana."
                </p>
                <p className="font-semibold text-gray-800 text-lg">
                  Theresa Ameke
                </p>
                <p className="text-gray-600 text-md">Volunteer & Team Lead</p>
                <p className="text-gray-600 text-md">
                  - Food, Clothing & Logistics Pillar -
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* What We Do Section */}
      <section id="what-we-do" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-12">WHAT WE DO</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center">
              <img
                src="https://placehold.co/300x200/F0FDF4/065F46?text=Find+%26+Fund"
                alt="Find & Fund"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                We Find & Fund
              </h3>
              <p className="text-gray-600">
                We find communities and registered orphanages that are obscure
                and not in the mainstream. Our operations are funded through
                various social media campaigns and personal funds.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center">
              <img
                src="https://placehold.co/300x200/F0FDF4/065F46?text=Build+Networks"
                alt="Build Networks"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                We Build Networks
              </h3>
              <p className="text-gray-600">
                We have a base of committed individuals and volunteers with
                their hearts set upon giving back to their community in any
                manner they can.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center">
              <img
                src="https://placehold.co/300x200/F0FDF4/065F46?text=Strengthen"
                alt="Strengthen"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                We Strengthen
              </h3>
              <p className="text-gray-600">
                We support the system of orphanages and underserved communities
                across the country by helping reinforce their backbone.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center">
              <img
                src="https://placehold.co/300x200/F0FDF4/065F46?text=Educate"
                alt="Educate"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                We Educate
              </h3>
              <p className="text-gray-600">
                Ensuring access to quality education, school supplies, and
                learning resources for all children.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center">
              <img
                src="https://placehold.co/300x200/F0FDF4/065F46?text=Provide+Care"
                alt="Provide Care"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                We Provide Care
              </h3>
              <p className="text-gray-600">
                Offering essential healthcare services, nutrition, and
                psychosocial support to vulnerable children.
              </p>
            </div>
            <div className="hidden md:block"></div>
          </div>
        </div>
      </section>
      {/* Statistics Section */}
      <section id="statistics" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold uppercase text-blue-600 mb-12">
            STATISTICS SO FAR
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-5xl font-extrabold mb-2 text-gray-800">
                <AnimatedNumber target="11880+" />
              </h3>
              <p className="text-xl text-gray-600">Dollars Raised</p>
            </div>
            <div className="p-6">
              <h3 className="text-5xl font-extrabold mb-2 text-gray-800">
                <AnimatedNumber target="10" />
              </h3>
              <p className="text-xl text-gray-600">
                Orphanages / Communities Reached
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-5xl font-extrabold mb-2 text-gray-800">
                <AnimatedNumber target="2050+" />
              </h3>
              <p className="text-xl text-gray-600">Children Helped</p>
            </div>
          </div>
          <div className="mt-12">
            <button className="bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-rose-700 transition-colors duration-300 shadow-md">
              <i className="fas fa-hand-holding-usd mr-2"></i>
              GoFundMe
            </button>
          </div>
        </div>
      </section>
      {/* Founders Section */}
      <section id="founders" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold uppercase text-gray-800 mb-12">
            MEET THE FOUNDERS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col items-center">
              <img
                src="https://placehold.co/150x150/F87171/FFFFFF?text=Derrick"
                alt="Derrick Dwamena"
                className="rounded-xl mx-auto mb-4 w-40 h-40 object-cover shadow-md border-2 border-blue-600"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                Derrick Dwamena
              </h3>
              <p className="text-gray-600 font-medium text-sm mb-3">
                President & Co-founder
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col items-center">
              <img
                src="https://placehold.co/150x150/F87171/FFFFFF?text=Elizabeth"
                alt="Elizabeth Ameke"
                className="rounded-xl mx-auto mb-4 w-40 h-40 object-cover shadow-md border-2 border-blue-600"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                Elizabeth Ameke
              </h3>
              <p className="text-gray-600 font-medium text-sm mb-3">
                Vice-President & Co-founder
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col items-center">
              <img
                src="https://placehold.co/150x150/F87171/FFFFFF?text=Benjamin"
                alt="Benjamin Tandoh"
                className="rounded-xl mx-auto mb-4 w-40 h-40 object-cover shadow-md border-2 border-blue-600"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                Benjamin Tandoh
              </h3>
              <p className="text-gray-600 font-medium text-sm mb-3">
                Chief Project Officer (CPO)
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Partners Section */}
      <section id="partners" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold uppercase text-blue-600 mb-12">
            OUR PARTNERS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center">
            <img
              src="https://placehold.co/200x100/F0FDF4/065F46?text=AMEKE+STUDIOS"
              alt="AMEKE STUDIOS Logo"
              className="w-60 mx-auto rounded-lg shadow-md"
            />
            <img
              src="https://placehold.co/200x100/F0FDF4/065F46?text=A-ENSONGA+Hearts"
              alt="A-ENSONGA Hearts Logo"
              className="w-60 mx-auto rounded-lg shadow-md"
            />
            <img
              src="https://placehold.co/200x100/F0FDF4/065F46?text=TSR+Foundation"
              alt="TSR Foundation Logo"
              className="w-60 mx-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
      {/* New Section: Touch A Life Today (Banner before Footer) */}
      <section
        className="relative py-24 bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x400/000000/FFFFFF?text=Touch+A+Life+Today')",
        }}
      >
        <div className="absolute inset-0 bg-indigo-900 opacity-60"></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            TOUCH A LIFE TODAY
          </h2>
          <p className="text-lg md:text-xl mb-8">
            No Poverty, Zero Hunger, Good Health & Well-Being
          </p>
          <button
            onClick={() => navigateTo("Donate")}
            className="bg-rose-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-rose-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
          >
            Donate Now !
          </button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
