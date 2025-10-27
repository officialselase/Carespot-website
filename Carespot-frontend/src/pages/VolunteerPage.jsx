// src/pages/VolunteerPage.jsx

import Hero from "../components/Hero";
import Section from "../components/Section";
import Card from "../components/Card";

const VolunteerPage = ({ navigateTo }) => {
  // Volunteer opportunities data
  const opportunitiesData = [
    {
      icon: "🏥",
      title: "Health Screening Assistant",
      description: "Help conduct health screenings and basic medical assessments in underserved communities. No medical background required - training provided."
    },
    {
      icon: "📚",
      title: "Health Education Facilitator",
      description: "Lead workshops and awareness campaigns on health literacy, nutrition, and disease prevention in local communities."
    },
    {
      icon: "🍎",
      title: "Nutrition Program Coordinator",
      description: "Support our nutritional counseling programs and help distribute food supplies to vulnerable families and children."
    },
    {
      icon: "📋",
      title: "Administrative Support",
      description: "Assist with data collection, patient registration, and program coordination to ensure smooth operations."
    },
    {
      icon: "🚗",
      title: "Community Outreach Driver",
      description: "Help transport medical supplies and volunteers to remote communities. Valid driver's license required."
    },
    {
      icon: "📱",
      title: "Digital Communications",
      description: "Support our social media presence, create content, and help spread awareness about our programs online."
    }
  ];

  // Volunteer testimonials
  const testimonialsData = [
    {
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Sarah Mensah",
      description: "\"Volunteering with CareSpot has been incredibly rewarding. Seeing the direct impact we make in children's lives motivates me every day.\"",
      role: "Health Education Volunteer"
    },
    {
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Kwame Asante",
      description: "\"The training and support provided by CareSpot made me confident in helping with health screenings. It's amazing what we can achieve together.\"",
      role: "Community Outreach Volunteer"
    },
    {
      image: "https://images.unsplash.com/photo-1594824388853-d0c2d8e8b6b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Grace Osei",
      description: "\"Being part of CareSpot's nutrition program has taught me so much about community health. Every child we help makes it worthwhile.\"",
      role: "Nutrition Program Volunteer"
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <Hero
        title="Join Our Mission"
        subtitle="Volunteer With Us"
        description="Make a lasting impact in underserved communities across Ghana. Your time, skills, and passion can help transform lives through healthcare access and education."
        backgroundImage="/sedi.jpeg"
        primaryAction={{
          text: "Apply Now",
          onClick: () => {
            // Scroll to application form
            document.getElementById('volunteer-form').scrollIntoView({ behavior: 'smooth' });
          }
        }}
        secondaryAction={{
          text: "Learn More",
          onClick: () => {
            document.getElementById('opportunities').scrollIntoView({ behavior: 'smooth' });
          }
        }}
        backgroundPosition="center 30%"
      />

      {/* Why Volunteer Section */}
      <Section
        id="why-volunteer"
        title="Why Volunteer With CareSpot?"
        subtitle="Make a Difference"
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in-left">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Volunteers helping children"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
          <div className="animate-fade-in-right">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Transform Lives, Including Your Own
            </h3>
            <div className="space-y-4 text-lg text-gray-700">
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">✓</span>
                <p>Gain hands-on experience in community health and development</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">✓</span>
                <p>Develop leadership and communication skills</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">✓</span>
                <p>Build meaningful connections with like-minded individuals</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">✓</span>
                <p>Receive comprehensive training and ongoing support</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">✓</span>
                <p>Make a direct, measurable impact in underserved communities</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Volunteer Opportunities Section */}
      <Section
        id="opportunities"
        title="Volunteer Opportunities"
        subtitle="Find Your Role"
        description="Choose from various volunteer positions that match your skills, interests, and availability."
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunitiesData.map((opportunity, index) => (
            <Card
              key={index}
              variant="service"
              icon={opportunity.icon}
              title={opportunity.title}
              description={opportunity.description}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </Section>

      {/* Volunteer Testimonials Section */}
      <Section
        id="testimonials"
        title="Hear From Our Volunteers"
        subtitle="Success Stories"
        description="Discover how volunteering with CareSpot has impacted both our volunteers and the communities we serve."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <Card
              key={index}
              variant="testimonial"
              image={testimonial.image}
              title={testimonial.title}
              description={testimonial.description}
              className="animate-fade-in-up text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </Section>

      {/* Requirements Section */}
      <Section
        id="requirements"
        title="Volunteer Requirements"
        subtitle="Getting Started"
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Basic Requirements</h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                Minimum age of 18 years (16-17 with parental consent)
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                Commitment to at least 3 months of service
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                Ability to communicate in English or local languages
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                Passion for community service and healthcare
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                Reliable transportation or willingness to travel
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">What We Provide</h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✓</span>
                Comprehensive orientation and training
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✓</span>
                Ongoing mentorship and support
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✓</span>
                Transportation reimbursement for field work
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✓</span>
                Certificate of service upon completion
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3">✓</span>
                Networking opportunities with healthcare professionals
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Application Form Section */}
      <Section
        id="volunteer-form"
        title="Apply to Volunteer"
        subtitle="Join Our Team"
        description="Ready to make a difference? Fill out our application form and we'll get back to you within 48 hours."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="max-w-4xl mx-auto">
          <form className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Your first name"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="+233 XX XXX XXXX"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
                Age *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="16"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Your age"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="interests" className="block text-gray-700 text-sm font-bold mb-2">
                Areas of Interest *
              </label>
              <select
                id="interests"
                name="interests"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">Select your preferred area</option>
                <option value="health-screening">Health Screening Assistant</option>
                <option value="health-education">Health Education Facilitator</option>
                <option value="nutrition">Nutrition Program Coordinator</option>
                <option value="admin">Administrative Support</option>
                <option value="outreach">Community Outreach Driver</option>
                <option value="digital">Digital Communications</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="availability" className="block text-gray-700 text-sm font-bold mb-2">
                Availability *
              </label>
              <select
                id="availability"
                name="availability"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">Select your availability</option>
                <option value="weekends">Weekends only</option>
                <option value="weekdays">Weekdays only</option>
                <option value="flexible">Flexible schedule</option>
                <option value="full-time">Full-time commitment</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">
                Relevant Experience
              </label>
              <textarea
                id="experience"
                name="experience"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Tell us about any relevant experience in healthcare, community service, or related fields..."
              ></textarea>
            </div>

            <div className="mb-8">
              <label htmlFor="motivation" className="block text-gray-700 text-sm font-bold mb-2">
                Why do you want to volunteer with CareSpot? *
              </label>
              <textarea
                id="motivation"
                name="motivation"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Share your motivation and what you hope to achieve through volunteering..."
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn-primary text-lg px-12 py-4"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </Section>

      {/* Final Call to Action */}
      <Hero
        title="Ready to Change Lives?"
        subtitle="Start Your Journey"
        description="Join hundreds of volunteers who are making a real difference in communities across Ghana. Your journey of impact starts here."
        backgroundImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        height="py-24"
        primaryAction={{
          text: "Apply Now",
          onClick: () => {
            document.getElementById('volunteer-form').scrollIntoView({ behavior: 'smooth' });
          }
        }}
        secondaryAction={{
          text: "Contact Us",
          onClick: () => navigateTo("Contact")
        }}
      />
    </main>
  );
};

export default VolunteerPage;