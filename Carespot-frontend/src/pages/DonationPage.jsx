// src/pages/DonationPage.jsx

import Hero from "../components/Hero";
import Section from "../components/Section";
import Card from "../components/Card";
import Statistics from "../components/Statistics";

const DonationPage = ({ navigateTo }) => {
  // Impact statistics
  const impactStats = [
    { value: "$50", label: "Provides Health Screening", description: "For 5 children in underserved communities" },
    { value: "$100", label: "Nutrition Support", description: "One month of meals for a vulnerable family" },
    { value: "$250", label: "Medical Supplies", description: "Essential supplies for community clinic" }
  ];

  // Donation options
  const donationOptions = [
    {
      title: "One-Time Donation",
      description: "Make a single contribution to support our immediate needs and ongoing programs.",
      icon: "💝",
      amounts: ["$25", "$50", "$100", "$250", "$500"]
    },
    {
      title: "Monthly Giving",
      description: "Become a sustaining donor with monthly contributions that provide consistent support.",
      icon: "🔄",
      amounts: ["$10/mo", "$25/mo", "$50/mo", "$100/mo", "$200/mo"]
    },
    {
      title: "Corporate Partnership",
      description: "Partner with us for larger impact through corporate social responsibility programs.",
      icon: "🏢",
      amounts: ["Contact Us", "Custom Amount"]
    }
  ];

  // Impact stories
  const impactStories = [
    {
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Akosua's Health Journey",
      description: "Thanks to donor support, 8-year-old Akosua received early screening that detected and treated a serious condition, giving her a healthy future."
    },
    {
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Community Clinic Success",
      description: "Your donations helped establish a pop-up clinic in Kumasi that has served over 500 families with essential healthcare services."
    },
    {
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Nutrition Program Impact",
      description: "Monthly donors have enabled us to provide nutritional support to 200+ children, reducing malnutrition rates by 40% in target communities."
    }
  ];

  // Ways to give
  const waysToGive = [
    {
      icon: "💳",
      title: "Online Donation",
      description: "Secure online giving through our website using credit card, debit card, or bank transfer."
    },
    {
      icon: "📱",
      title: "Mobile Money",
      description: "Donate using MTN Mobile Money, Vodafone Cash, or AirtelTigo Money for convenient local giving."
    },
    {
      icon: "🏦",
      title: "Bank Transfer",
      description: "Direct bank transfers for larger donations or corporate partnerships. Contact us for details."
    },
    {
      icon: "🎁",
      title: "In-Kind Donations",
      description: "Donate medical supplies, educational materials, or other resources needed for our programs."
    },
    {
      icon: "⏰",
      title: "Legacy Giving",
      description: "Include CareSpot in your will or estate planning to create a lasting impact for future generations."
    },
    {
      icon: "🎉",
      title: "Fundraising Events",
      description: "Organize or participate in fundraising events, charity runs, or community drives to support our cause."
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <Hero
        title="Transform Lives Through Giving"
        subtitle="Make a Donation"
        description="Your generous contribution directly impacts underserved communities across Ghana, providing essential healthcare, nutrition, and hope to those who need it most."
        backgroundImage="/sedi.jpeg"
        primaryAction={{
          text: "Donate Now",
          onClick: () => {
            document.getElementById('donation-form').scrollIntoView({ behavior: 'smooth' });
          }
        }}
        secondaryAction={{
          text: "See Our Impact",
          onClick: () => {
            document.getElementById('impact-stories').scrollIntoView({ behavior: 'smooth' });
          }
        }}
        backgroundPosition="center 30%"
      />

      {/* Impact Statistics */}
      <Statistics
        stats={impactStats}
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        title="Your Impact"
        subtitle="Every Dollar Counts"
      />

      {/* Why Donate Section */}
      <Section
        id="why-donate"
        title="Why Your Donation Matters"
        subtitle="Creating Change"
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in-left">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Children receiving healthcare"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
          <div className="animate-fade-in-right">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Direct Impact on Communities
            </h3>
            <div className="space-y-4 text-lg text-gray-700">
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">✓</span>
                <p>100% of donations go directly to program implementation</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">✓</span>
                <p>Transparent reporting on how your money is used</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">✓</span>
                <p>Immediate impact in underserved communities</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">✓</span>
                <p>Sustainable programs that create lasting change</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">✓</span>
                <p>Regular updates on program progress and outcomes</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Donation Options Section */}
      <Section
        id="donation-options"
        title="Choose Your Giving Style"
        subtitle="Donation Options"
        description="Select the donation method that works best for you and your commitment to our cause."
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {donationOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                <div className="text-white text-2xl">
                  {option.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{option.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
              <div className="space-y-2">
                {option.amounts.map((amount, amountIndex) => (
                  <button
                    key={amountIndex}
                    className="w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors duration-200"
                    onClick={() => {
                      if (amount === "Contact Us") {
                        navigateTo("Contact");
                      } else {
                        document.getElementById('donation-form').scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Ways to Give Section */}
      <Section
        id="ways-to-give"
        title="Ways to Give"
        subtitle="Multiple Options"
        description="Choose from various convenient and secure methods to make your donation."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {waysToGive.map((way, index) => (
            <Card
              key={index}
              variant="service"
              icon={way.icon}
              title={way.title}
              description={way.description}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </Section>

      {/* Impact Stories Section */}
      <Section
        id="impact-stories"
        title="Stories of Impact"
        subtitle="Real Change"
        description="See how your donations are creating real, lasting change in the lives of individuals and communities."
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {impactStories.map((story, index) => (
            <Card
              key={index}
              variant="project"
              image={story.image}
              title={story.title}
              description={story.description}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </Section>

      {/* Donation Form Section */}
      <Section
        id="donation-form"
        title="Make Your Donation"
        subtitle="Secure Giving"
        description="Complete your donation using our secure payment system. All transactions are encrypted and protected."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Donation Amount Selection */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Donation Amount</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {["$25", "$50", "$100", "$250", "$500", "$1000"].map((amount) => (
                  <button
                    key={amount}
                    className="py-3 px-4 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors duration-200 font-semibold"
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <span className="text-gray-600 mr-3">Custom Amount:</span>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Donation Type */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Donation Type</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="donationType" value="one-time" className="mr-3" defaultChecked />
                  <span className="text-lg">One-time donation</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="donationType" value="monthly" className="mr-3" />
                  <span className="text-lg">Monthly recurring</span>
                </label>
              </div>
            </div>

            {/* Donor Information */}
            <form>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Donor Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="donorFirstName" className="block text-gray-700 text-sm font-bold mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="donorFirstName"
                    name="donorFirstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your first name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="donorLastName" className="block text-gray-700 text-sm font-bold mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="donorLastName"
                    name="donorLastName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your last name"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="donorEmail" className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="donorEmail"
                    name="donorEmail"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="donorPhone" className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="donorPhone"
                    name="donorPhone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <label className="flex items-center cursor-pointer p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <input type="radio" name="paymentMethod" value="card" className="mr-3" defaultChecked />
                    <span>💳 Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center cursor-pointer p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <input type="radio" name="paymentMethod" value="mobile-money" className="mr-3" />
                    <span>📱 Mobile Money</span>
                  </label>
                  <label className="flex items-center cursor-pointer p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <input type="radio" name="paymentMethod" value="bank-transfer" className="mr-3" />
                    <span>🏦 Bank Transfer</span>
                  </label>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mb-8">
                <label htmlFor="specialInstructions" className="block text-gray-700 text-sm font-bold mb-2">
                  Special Instructions or Dedication (Optional)
                </label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Dedicate this donation in memory/honor of someone, or provide special instructions..."
                ></textarea>
              </div>

              {/* Privacy Options */}
              <div className="mb-8 space-y-3">
                <label className="flex items-start cursor-pointer">
                  <input type="checkbox" className="mr-3 mt-1" defaultChecked />
                  <span className="text-sm text-gray-600">I would like to receive updates about CareSpot's programs and impact</span>
                </label>
                <label className="flex items-start cursor-pointer">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span className="text-sm text-gray-600">I wish to remain anonymous in any public recognition</span>
                </label>
                <label className="flex items-start cursor-pointer">
                  <input type="checkbox" className="mr-3 mt-1" required />
                  <span className="text-sm text-gray-600">I agree to the terms and conditions and privacy policy *</span>
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary text-lg px-12 py-4"
                >
                  Complete Donation
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  🔒 Your payment information is secure and encrypted
                </p>
              </div>
            </form>
          </div>
        </div>
      </Section>

      {/* Tax Information */}
      <Section
        id="tax-info"
        title="Tax Information"
        subtitle="Important Details"
        backgroundColor="bg-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Tax Deductible Donations</h3>
            <p className="text-lg text-blue-700 mb-4">
              CareSpot Initiative is a registered non-profit organization. Your donations may be tax-deductible 
              to the extent allowed by law.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-bold text-blue-800 mb-2">For Individual Donors:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Receipt provided for all donations</li>
                  <li>• Consult your tax advisor for deductibility</li>
                  <li>• Annual giving statements available</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-blue-800 mb-2">For Corporate Donors:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• CSR partnership opportunities</li>
                  <li>• Detailed impact reporting</li>
                  <li>• Custom donation agreements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Final Call to Action */}
      <Hero
        title="Every Donation Creates Hope"
        subtitle="Join Our Mission"
        description="Together, we can ensure that every child in Ghana has access to healthcare, nutrition, and the opportunity for a healthy future. Your generosity makes it possible."
        backgroundImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        height="py-24"
        primaryAction={{
          text: "Donate Now",
          onClick: () => {
            document.getElementById('donation-form').scrollIntoView({ behavior: 'smooth' });
          }
        }}
        secondaryAction={{
          text: "Learn More",
          onClick: () => navigateTo("About")
        }}
      />
    </main>
  );
};

export default DonationPage;