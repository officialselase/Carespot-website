// src/pages/ContactPage.jsx

import Hero from "../components/Hero";
import Section from "../components/Section";
import Card from "../components/Card";

const ContactPage = ({ navigateTo }) => {
  // Contact methods
  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      description: "Send us a message and we'll respond within 24 hours.",
      details: "info@carespot.org",
      action: "mailto:info@carespot.org"
    },
    {
      icon: "📱",
      title: "Call Us",
      description: "Speak directly with our team during business hours.",
      details: "+233 XX XXX XXXX",
      action: "tel:+233XXXXXXXXX"
    },
    {
      icon: "📍",
      title: "Visit Us",
      description: "Come see our work firsthand at our main office.",
      details: "Accra, Ghana",
      action: null
    },
    {
      icon: "💬",
      title: "Social Media",
      description: "Follow us and send messages on our social platforms.",
      details: "@CareSpotGhana",
      action: null
    }
  ];

  // Contact reasons
  const contactReasons = [
    {
      icon: "🤝",
      title: "Partnership Opportunities",
      description: "Explore collaboration opportunities with CareSpot Initiative for greater community impact."
    },
    {
      icon: "🙋‍♀️",
      title: "Volunteer Inquiries",
      description: "Learn about volunteer opportunities and how you can contribute your skills to our mission."
    },
    {
      icon: "💝",
      title: "Donation Questions",
      description: "Get information about donation options, tax receipts, and how your contribution makes a difference."
    },
    {
      icon: "📰",
      title: "Media & Press",
      description: "Media inquiries, interview requests, and press kit information for journalists and bloggers."
    },
    {
      icon: "🏥",
      title: "Program Information",
      description: "Learn more about our healthcare programs, eligibility criteria, and how to access our services."
    },
    {
      icon: "💼",
      title: "Corporate Partnerships",
      description: "Discuss corporate social responsibility partnerships and employee volunteer programs."
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <Hero
        title="Get In Touch"
        subtitle="Contact Us"
        description="We'd love to hear from you. Reach out with any questions, collaboration ideas, or to learn more about how you can support our mission."
        backgroundImage="/sedi.jpeg"
        primaryAction={{
          text: "Send Message",
          onClick: () => {
            document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
          }
        }}
        secondaryAction={{
          text: "View Our Work",
          onClick: () => navigateTo("Projects")
        }}
        backgroundPosition="center 30%"
      />

      {/* Contact Methods Section */}
      <Section
        id="contact-methods"
        title="Ways to Reach Us"
        subtitle="Get Connected"
        description="Choose the method that works best for you to get in touch with our team."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => method.action && window.open(method.action, '_blank')}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">{method.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{method.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{method.description}</p>
              <p className="text-blue-600 font-semibold">{method.details}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Contact Us Section */}
      <Section
        id="contact-reasons"
        title="Why Contact Us?"
        subtitle="We're Here to Help"
        description="Whether you're interested in volunteering, partnerships, or learning more about our work, we're here to assist you."
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactReasons.map((reason, index) => (
            <Card
              key={index}
              variant="service"
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </Section>

      {/* Contact Form Section */}
      <Section
        id="contact-form"
        title="Send Us a Message"
        subtitle="Get in Touch"
        description="Fill out the form below and we'll get back to you within 24 hours."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <form>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="contactName" className="block text-gray-700 text-sm font-bold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="contactPhone" className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>
                <div>
                  <label htmlFor="contactOrganization" className="block text-gray-700 text-sm font-bold mb-2">
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    id="contactOrganization"
                    name="contactOrganization"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your organization name"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="contactSubject" className="block text-gray-700 text-sm font-bold mb-2">
                  Subject *
                </label>
                <select
                  id="contactSubject"
                  name="contactSubject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="volunteer">Volunteer Opportunities</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="donation">Donation Questions</option>
                  <option value="media">Media & Press</option>
                  <option value="program">Program Information</option>
                  <option value="corporate">Corporate Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-8">
                <label htmlFor="contactMessage" className="block text-gray-700 text-sm font-bold mb-2">
                  Message *
                </label>
                <textarea
                  id="contactMessage"
                  name="contactMessage"
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Tell us more about your inquiry, questions, or how you'd like to get involved..."
                  required
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="flex items-start cursor-pointer">
                  <input type="checkbox" className="mr-3 mt-1" required />
                  <span className="text-sm text-gray-600">
                    I agree to be contacted by CareSpot Initiative regarding my inquiry and consent to the processing of my personal data in accordance with the privacy policy. *
                  </span>
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary text-lg px-12 py-4"
                >
                  Send Message
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  We'll respond to your message within 24 hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </Section>

      {/* Office Hours & Location Section */}
      <Section
        id="office-info"
        title="Office Information"
        subtitle="Visit Us"
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Office Hours</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700">Monday - Friday</span>
                <span className="font-semibold text-gray-800">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700">Saturday</span>
                <span className="font-semibold text-gray-800">10:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700">Sunday</span>
                <span className="font-semibold text-gray-800">Closed</span>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-bold text-gray-800 mb-3">Emergency Contact</h4>
              <p className="text-gray-700">
                For urgent matters outside office hours, please email us at 
                <a href="mailto:emergency@carespot.org" className="text-blue-600 hover:underline ml-1">
                  emergency@carespot.org
                </a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Location</h3>
            <div className="bg-gray-100 rounded-2xl p-6">
              <div className="flex items-start mb-4">
                <span className="text-red-600 mr-3 text-xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-800">CareSpot Initiative</p>
                  <p className="text-gray-700">Main Office</p>
                  <p className="text-gray-700">Accra, Ghana</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-4">
                  We welcome visitors by appointment. Please contact us in advance to schedule a visit 
                  and learn more about our work firsthand.
                </p>
                <button
                  onClick={() => {
                    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-outline text-sm"
                >
                  Schedule a Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section
        id="faq"
        title="Frequently Asked Questions"
        subtitle="Quick Answers"
        description="Find answers to common questions about our work, volunteering, and partnerships."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3">How can I volunteer with CareSpot?</h3>
              <p className="text-gray-700">
                Visit our Volunteer page to learn about opportunities and fill out an application. We offer various roles 
                from healthcare assistance to administrative support, with full training provided.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Are donations tax-deductible?</h3>
              <p className="text-gray-700">
                Yes, CareSpot Initiative is a registered non-profit organization. We provide receipts for all donations 
                and annual giving statements for tax purposes.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3">How do you ensure transparency in your programs?</h3>
              <p className="text-gray-700">
                We provide regular impact reports, financial transparency, and welcome visits to our project sites. 
                All donors receive updates on how their contributions are being used.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Can organizations partner with CareSpot?</h3>
              <p className="text-gray-700">
                Absolutely! We welcome partnerships with healthcare institutions, NGOs, corporations, and community 
                organizations. Contact us to discuss collaboration opportunities.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Final Call to Action */}
      <Hero
        title="Let's Work Together"
        subtitle="Join Our Mission"
        description="Whether you're interested in volunteering, partnering, or supporting our work, we're excited to hear from you and explore how we can create positive change together."
        backgroundImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        height="py-24"
        primaryAction={{
          text: "Send Message",
          onClick: () => {
            document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
          }
        }}
        secondaryAction={{
          text: "Learn About Us",
          onClick: () => navigateTo("About")
        }}
      />
    </main>
  );
};

export default ContactPage;
