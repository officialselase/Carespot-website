// src/App.jsx

import React, { useState, useEffect, useRef } from "react";

// Animated Number Component for counting up
const AnimatedNumber = ({ target, duration = 2000 }) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const observer = useRef(null);
  const animationFrameId = useRef(null);
  const hasAnimated = useRef(false); // To prevent re-animation on scroll up/down

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          startCounting();
          hasAnimated.current = true; // Mark as animated
          // Disconnect observer after animation starts
          if (observer.current) {
            observer.current.disconnect();
          }
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [target, duration]);

  const startCounting = () => {
    const start = 0;
    const end = parseInt(target.replace(/[^0-9]/g, ""), 10); // Extract number from string like "11,880+"
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCurrent(Math.floor(start + progress * (end - start)));
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        setCurrent(end);
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);
  };

  // Render the number, keeping the suffix if target had one
  const displayValue =
    typeof current === "number" &&
    target.includes("+") &&
    current === parseInt(target.replace(/[^0-9]/g, ""), 10)
      ? `${current.toLocaleString()}+` // Use toLocaleString for comma formatting
      : typeof current === "number"
      ? current.toLocaleString()
      : current; // For numbers without '+'

  return <span ref={ref}>{displayValue}</span>;
};

// Main App component
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper for scrolling to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close menu on navigation
    }
  };

  return (
    <div className="font-sans antialiased text-gray-800 bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/Carespot logo - IG -.jpg"
              alt="Carespot Logo"
              className="h-12 mr-3 rounded-full"
            />{" "}
            {/* Updated logo src */}
            <span className="text-2xl font-bold text-blue-600">
              CareSpot
            </span>{" "}
            {/* Updated text and color */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
            >
              Home
            </button>
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 focus:outline-none">
                Who We Are <span className="ml-1">&#9662;</span>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-48 py-2 z-10">
                <a
                  href="#about"
                  onClick={() => scrollToSection("about")}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  About Us
                </a>
                <a
                  href="#mission-vision"
                  onClick={() => scrollToSection("mission-vision")}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Mission & Vision
                </a>
              </div>
            </div>
            <button
              onClick={() => scrollToSection("gleechild-ghana")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
            >
              CareSpot – Ghana
            </button>{" "}
            {/* Updated text */}
            <button
              onClick={() => scrollToSection("projects")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
            >
              Projects
            </button>
            {/* Removed contact button here as per user request */}
            <button
              onClick={() => scrollToSection("donate")}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
            >
              Donate
            </button>{" "}
            {/* Updated color */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg py-4">
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="block text-gray-800 hover:text-blue-600 font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block text-gray-800 hover:text-blue-600 font-medium"
              >
                Who We Are
              </button>
              <button
                onClick={() => scrollToSection("gleechild-ghana")}
                className="block text-gray-800 hover:text-blue-600 font-medium"
              >
                CareSpot – Ghana
              </button>{" "}
              {/* Updated text */}
              <button
                onClick={() => scrollToSection("projects")}
                className="block text-gray-800 hover:text-blue-600 font-medium"
              >
                Projects
              </button>
              {/* Removed contact button here as per user request */}
              <button
                onClick={() => scrollToSection("donate")}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
              >
                Donate
              </button>{" "}
              {/* Updated color */}
            </div>
          </div>
        )}
      </header>

      <main className="pt-20">
        {" "}
        {/* Padding to account for fixed header */}
        {/* Hero Section - Updated to match screenshot and new colors */}
        <section
          id="home"
          className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 overflow-hidden"
        >
          {/* Irregular blob background shape - approximated with large rounded div */}
          <div className="absolute top-0 right-0 w-3/4 h-full bg-blue-100 rounded-bl-[500px] z-0 opacity-70"></div>{" "}
          {/* Color updated to blue-100 */}
          <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center z-10">
            {/* Left Column: Text Content */}
            <div className="text-center md:text-left p-4">
              <p className="text-blue-500 font-semibold text-lg uppercase mb-4">
                {" "}
                {/* Color updated to blue-500 */}
                'BECAUSE ONLY TOGETHER WE CAN
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-indigo-900 mb-6 font-serif">
                {" "}
                {/* Color updated to indigo-900 */}
                BUILD A WORLD WHERE EVERY CHILD THRIVES—FREE FROM POVERTY,
                HUNGER, POOR HEALTH, AND LACK OF EDUCATION."
              </h1>
            </div>

            {/* Right Column: Dummy Video */}
            <div className="relative flex items-center justify-center p-4">
              {/* Dummy video container - using an image with play button overlay */}
              <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden group">
                <img
                  src="https://placehold.co/700x400/90EE90/333333?text=Dummy+Video"
                  alt="Dummy Video Thumbnail"
                  className="w-full h-auto object-cover rounded-3xl transition-transform duration-300 group-hover:scale-105"
                />
                {/* Play button overlay */}
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
          {/* Donate Now Button below hero section content */}
          <div className="z-10 mt-12 mb-8">
            <button
              onClick={() => scrollToSection("donate")}
              className="bg-indigo-900 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
            >
              {" "}
              {/* Color updated to indigo-900 */}
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
                </h3>{" "}
                {/* Updated text */}
                <p className="text-gray-700 leading-relaxed mb-4">
                  CareSpot Initiative began with a simple yet powerful vision:
                  to create a world where every child, regardless of their
                  background, has access to education, healthcare, and a
                  nurturing environment. Founded by a group of passionate
                  individuals, we started small, reaching out to local
                  communities and identifying the most pressing needs.
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

            {/* New Section: Support Us - Color updated */}
            <div className="relative mt-16 py-12 px-4 md:px-0 bg-blue-50 rounded-lg shadow-xl overflow-hidden">
              {" "}
              {/* Updated background */}
              <div className="absolute top-0 left-0 w-3/4 h-full bg-rose-100 rounded-tr-[500px] z-0 opacity-70"></div>{" "}
              {/* Updated color to rose-100 */}
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
                    {" "}
                    {/* Updated color to blue-600 */}
                    SUPPORT US AND CHANGE THE COURSE OF A CHILD'S LIFE TODAY!
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Collectively, we have a duty to our society. We are
                    privileged in more ways than one and thus, our social
                    responsibility to leverage this privilege to help the needy
                    and disadvantageous.
                  </p>
                  <button className="bg-indigo-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-md transform hover:scale-105">
                    {" "}
                    {/* Updated color */}
                    Learn more
                  </button>
                </div>
              </div>
            </div>

            {/* New Section: Testimonial - Color updated */}
            <div className="relative mt-16 py-12 px-4 md:px-0 bg-gray-50 rounded-lg shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-3/4 h-full bg-blue-100 rounded-bl-[500px] z-0 opacity-70"></div>{" "}
              {/* Color updated to blue-100 */}
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
                    "I was driven to join CareSpot Initiative by a deep desire
                    to support underprivileged children and individuals in
                    communities across Ghana." {/* Updated text */}
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
          </div>{" "}
          {/* End of container for About section */}
        </section>
        {/* What We Do Section - Color updated */}
        <section id="what-we-do" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-blue-600 mb-12">
              WHAT WE DO
            </h2>{" "}
            {/* Updated color to blue-600 */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Service Card 1: We Find & Fund */}
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
              {/* Service Card 2: We Build Networks */}
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
              {/* Service Card 3: We Strengthen */}
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
                  We support the system of orphanages and underserved
                  communities across the country by helping reinforce their
                  backbone.
                </p>
              </div>
              {/* Service Card 4: We Educate (from previous version, but now as per new screenshot flow) */}
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
              {/* Service Card 5: We Provide Care (from previous version, but now as per new screenshot flow) */}
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
              {/* Added a placeholder card to fill out the grid nicely, if needed by design */}
              <div className="hidden md:block"></div>{" "}
              {/* Optional: for spacing if not exactly 5 cards */}
            </div>
          </div>
        </section>
        {/* Statistics Section - Color updated */}
        <section id="statistics" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl font-semibold uppercase text-blue-600 mb-12">
              STATISTICS SO FAR
            </h2>{" "}
            {/* Updated color to blue-600 */}
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
                {" "}
                {/* Updated color to rose-600 */}
                <i className="fas fa-hand-holding-usd mr-2"></i>{" "}
                {/* Font Awesome icon for GoFundMe */}
                GoFundMe
              </button>
            </div>
          </div>
        </section>
        {/* Founders Section - Color updated */}
        <section id="founders" className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl font-semibold uppercase text-gray-800 mb-12">
              MEET THE FOUNDERS
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Founder 1: Derrick Dwamena */}
              <div className="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <img
                  src="https://placehold.co/150x150/F87171/FFFFFF?text=Derrick"
                  alt="Derrick Dwamena"
                  className="rounded-xl mx-auto mb-4 w-40 h-40 object-cover shadow-md border-2 border-blue-600"
                />{" "}
                {/* Updated border color */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                  Derrick Dwamena
                </h3>
                <p className="text-gray-600 font-medium text-sm mb-3">
                  President & Co-founder
                </p>
              </div>
              {/* Founder 2: Elizabeth Ameke */}
              <div className="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <img
                  src="https://placehold.co/150x150/F87171/FFFFFF?text=Elizabeth"
                  alt="Elizabeth Ameke"
                  className="rounded-xl mx-auto mb-4 w-40 h-40 object-cover shadow-md border-2 border-blue-600"
                />{" "}
                {/* Updated border color */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                  Elizabeth Ameke
                </h3>
                <p className="text-gray-600 font-medium text-sm mb-3">
                  Vice-President & Co-founder
                </p>
              </div>
              {/* Founder 3: Benjamin Tandoh */}
              <div className="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <img
                  src="https://placehold.co/150x150/F87171/FFFFFF?text=Benjamin"
                  alt="Benjamin Tandoh"
                  className="rounded-xl mx-auto mb-4 w-40 h-40 object-cover shadow-md border-2 border-blue-600"
                />{" "}
                {/* Updated border color */}
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
        {/* Partners Section - Color updated */}
        <section id="partners" className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl font-semibold uppercase text-blue-600 mb-12">
              OUR PARTNERS
            </h2>{" "}
            {/* Updated color to blue-600 */}
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
        {/* New Section: Touch A Life Today (Banner before Footer) - Color updated */}
        <section
          className="relative py-24 bg-cover bg-center text-white"
          style={{
            backgroundImage:
              "url('https://placehold.co/1920x400/000000/FFFFFF?text=Touch+A+Life+Today')",
          }}
        >
          <div className="absolute inset-0 bg-indigo-900 opacity-60"></div>{" "}
          {/* Updated overlay color to indigo-900 */}
          <div className="relative z-10 text-center px-4">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              TOUCH A LIFE TODAY
            </h2>
            <p className="text-lg md:text-xl mb-8">
              No Poverty, Zero Hunger, Good Health & Well-Being
            </p>
            <button
              onClick={() => scrollToSection("donate")}
              className="bg-rose-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-rose-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
            >
              {" "}
              {/* Updated color to rose-600 */}
              Donate Now !
            </button>
          </div>
        </section>
        {/* Removed Contact Section entirely */}
        {/* Removed Donate Section (Support Our Cause) entirely */}
      </main>

      {/* Footer - Updated to match screenshot and new colors */}
      <footer className="bg-white text-gray-800 py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          {/* About/Logo Section */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/Carespot logo - IG -.jpg"
                alt="Carespot Logo"
                className="h-12 mr-3 rounded-full"
              />{" "}
              {/* Updated logo src */}
              <span className="text-2xl font-bold text-blue-600">
                CareSpot
              </span>{" "}
              {/* Updated text and color */}
            </div>
            <p className="text-gray-600 font-bold mb-4">
              Compassion In Action...
            </p>{" "}
            {/* Updated text */}
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                {" "}
                {/* Updated hover color */}
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                {" "}
                {/* Updated hover color */}
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                {" "}
                {/* Updated hover color */}
                <i className="fab fa-tiktok text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                {" "}
                {/* Updated hover color */}
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick link</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Home
                </button>
              </li>{" "}
              {/* Updated hover color */}
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Who We Are
                </button>
              </li>{" "}
              {/* Updated hover color */}
              <li>
                <button
                  onClick={() => scrollToSection("gleechild-ghana")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  CareSpot – Ghana
                </button>
              </li>{" "}
              {/* Updated text and hover color */}
              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Projects
                </button>
              </li>{" "}
              {/* Updated hover color */}
              {/* Removed contact link from footer Quick Links */}
              <li>
                <button
                  onClick={() => scrollToSection("donate")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Donate
                </button>
              </li>{" "}
              {/* Updated hover color */}
            </ul>
          </div>

          {/* Contact Info - Content still exists, but no dedicated section for form */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Get in touch
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>Kwashiebu, Snowdrop St.</li>
              <li>Accra-Ghana</li>
              <li>+233 50 154 4087</li>
              <li>+233 55 902 2161</li>
              <li>carespotinitiative@gmail.com</li>{" "}
              {/* Updated email address */}
            </ul>
          </div>

          {/* Newsletter section removed */}
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} CareSpot. All rights reserved.
          </p>{" "}
          {/* Updated copyright text */}
        </div>
      </footer>
    </div>
  );
};

export default App;
