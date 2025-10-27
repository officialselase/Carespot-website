// src/pages/AboutPage.jsx

import Hero from "../components/Hero";
import Section from "../components/Section";
import Card from "../components/Card";
import Statistics from "../components/Statistics";

const AboutPage = ({ navigateTo }) => {
  // Our impact statistics
  const impactStats = [
    { value: "11880+", label: "Dollars Raised", description: "Supporting communities across Ghana" },
    { value: "10", label: "Communities Reached", description: "Orphanages and underserved areas" },
    { value: "2050+", label: "Children Helped", description: "Lives transformed through our programs" }
  ];

  // Core values data
  const coreValues = [
    {
      icon: "❤️",
      title: "Compassion",
      description: "We approach every interaction with empathy, understanding, and genuine care for the wellbeing of others."
    },
    {
      icon: "🤝",
      title: "Community Empowerment",
      description: "We believe in strengthening communities by providing tools, knowledge, and resources for self-sufficiency."
    },
    {
      icon: "⚖️",
      title: "Equity in Health",
      description: "Everyone deserves access to quality healthcare regardless of their economic status or geographic location."
    },
    {
      icon: "📊",
      title: "Accountability",
      description: "We maintain transparency in our operations and are responsible stewards of the resources entrusted to us."
    },
    {
      icon: "🌍",
      title: "Cultural Sensitivity",
      description: "We respect and honor local customs, traditions, and beliefs in all our program implementations."
    },
    {
      icon: "📚",
      title: "Education Before Intervention",
      description: "We prioritize health literacy and education as the foundation for sustainable health improvements."
    }
  ];

  // Leadership team data
  const leadershipTeam = [
    {
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Abigail Sedinam Doh MD",
      description: "President & Co-founder. Leading healthcare professional with extensive experience in community health initiatives and medical research.",
      role: "President & Co-founder"
    },
    {
      image: "https://images.unsplash.com/photo-1594824388853-d0c2d8e8b6b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Elizabeth Ameke",
      description: "Vice-President & Co-founder. Community advocate with deep expertise in program development and volunteer coordination.",
      role: "Vice-President & Co-founder"
    },
    {
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Benjamin Tandoh",
      description: "Chief Project Officer (CPO). Strategic leader focused on project implementation and community partnership development.",
      role: "Chief Project Officer"
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <Hero
        title="Who We Are"
        subtitle="Our Story"
        description="Learn about CareSpot's mission, vision, and the passionate team driving change in communities across Ghana and beyond."
        backgroundImage="/sedi.jpeg"
        primaryAction={{
          text: "Join Our Mission",
          onClick: () => navigateTo("Volunteer")
        }}
        secondaryAction={{
          text: "Support Us",
          onClick: () => navigateTo("Donate")
        }}
        backgroundPosition="center 30%"
      />

      {/* Our Story Section */}
      <Section
        id="our-story"
        title="The Journey of CareSpot Initiative"
        subtitle="Our Beginning"
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in-left">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="CareSpot community work"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
          <div className="animate-fade-in-right">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              CareSpot is a community-driven health initiative focused on improving access to healthcare,
              promoting health literacy, and supporting nutrition for underserved populations. Inspired by
              SDG 3 (Good Health and Well-being) and SDG 2 (Zero Hunger), we provide health education,
              screenings, and wellness outreach to empower individuals and families.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Founded by passionate healthcare professionals and community advocates, we started by identifying
              the most pressing health needs in underserved communities across Ghana, ensuring that quality
              care and knowledge reach every corner of our communities.
            </p>
            <button
              onClick={() => navigateTo("Projects")}
              className="btn-primary"
            >
              See Our Projects
            </button>
          </div>
        </div>
      </Section>

      {/* Mission and Vision Section */}
      <Section
        id="mission-vision"
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        overlay="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-red-900/90"
      >
        <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
          <div className="animate-fade-in-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-lg text-white leading-relaxed">
              To bridge gaps in healthcare access, education, and support for underserved communities
              by promoting preventive care, nutrition, and patient empowerment — with a special focus
              on vulnerable populations in Ghana and beyond.
            </p>
          </div>
          <div className="animate-fade-in-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Our Vision</h2>
            <p className="text-lg text-white leading-relaxed">
              A world where every individual, regardless of background or location, has access to the
              basic tools, knowledge, and support they need to live a healthy, nourished, and dignified life.
            </p>
          </div>
        </div>
      </Section>

      {/* Core Values Section */}
      <Section
        id="core-values"
        title="Our Core Values"
        subtitle="What Drives Us"
        description="These fundamental principles guide every decision we make and every program we implement."
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <Card
              key={index}
              variant="service"
              icon={value.icon}
              title={value.title}
              description={value.description}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </Section>

      {/* Our Impact Statistics */}
      <Statistics
        stats={impactStats}
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        title="Our Impact So Far"
        subtitle="Making a Difference"
        navigateTo={navigateTo}
      />

      {/* Our Comprehensive Services Section */}
      <Section
        id="services"
        title="Our Comprehensive Services"
        subtitle="What We Do"
        description="We provide a wide range of healthcare services designed to address the most pressing needs in underserved communities."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start">
              <span className="text-red-600 mr-4 text-2xl">🏥</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Health Screenings & Outreach</h3>
                <p className="text-gray-700">Free or subsidized health screenings and outreach programs to detect and prevent diseases early.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-red-600 mr-4 text-2xl">🍎</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Nutritional Support</h3>
                <p className="text-gray-700">Nutritional support and counseling for children and mothers to combat malnutrition.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-red-600 mr-4 text-2xl">📚</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Health Literacy Campaigns</h3>
                <p className="text-gray-700">Health literacy campaigns and workshops to empower communities with vital health knowledge.</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start">
              <span className="text-blue-600 mr-4 text-2xl">🔗</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Medical Referral Coordination</h3>
                <p className="text-gray-700">Coordinating medical referrals to ensure individuals receive necessary follow-up care.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-4 text-2xl">🏕️</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Community Pop-up Clinics</h3>
                <p className="text-gray-700">Establishing rural and urban community pop-up clinics to bring healthcare directly to underserved areas.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-4 text-2xl">📢</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Awareness Campaigns</h3>
                <p className="text-gray-700">Conducting vital awareness campaigns on prevalent public health issues like sickle cell disease and hypertension.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Why CareSpot Exists Section */}
      <Section
        id="why-we-exist"
        title="Why CareSpot Exists"
        subtitle="The Challenge"
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">The Problems We Address</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">•</span>
                <p className="text-lg text-gray-700">Lack of early screening in rural areas</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">•</span>
                <p className="text-lg text-gray-700">High rates of malnutrition in children</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">•</span>
                <p className="text-lg text-gray-700">Low understanding of chronic diseases</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">•</span>
                <p className="text-lg text-gray-700">Inaccessibility of medications or health information</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Who We Serve</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">👩‍👧‍👦</span>
                <p className="text-lg text-gray-700">Mothers and children</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">👨‍👩‍👧‍👦</span>
                <p className="text-lg text-gray-700">Youth and adolescents</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">🏘️</span>
                <p className="text-lg text-gray-700">Underserved communities (urban poor, rural)</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">🩺</span>
                <p className="text-lg text-gray-700">Persons living with chronic conditions (e.g., sickle cell)</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Leadership Team Section */}
      <Section
        id="leadership"
        title="Meet Our Leadership"
        subtitle="The Founders"
        description="Passionate healthcare professionals and community advocates leading the charge for healthcare equity."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {leadershipTeam.map((leader, index) => (
            <Card
              key={index}
              variant="default"
              image={leader.image}
              title={leader.title}
              description={leader.description}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </Section>

      {/* Partnerships Section */}
      <Section
        id="partnerships"
        title="Partnerships & Collaborations"
        subtitle="Working Together"
        description="We are always open to collaboration and actively seek partnerships with organizations that share our vision."
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">We Partner With:</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-blue-600 mr-3 text-xl">🏥</span>
                <p className="text-lg text-gray-700">Local clinics and hospitals</p>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 mr-3 text-xl">🍎</span>
                <p className="text-lg text-gray-700">Nutrition and food banks</p>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 mr-3 text-xl">🎓</span>
                <p className="text-lg text-gray-700">Educational institutions</p>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 mr-3 text-xl">🏛️</span>
                <p className="text-lg text-gray-700">Public health bodies</p>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 mr-3 text-xl">🌍</span>
                <p className="text-lg text-gray-700">NGOs and international health organizations</p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Partnership collaboration"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </Section>

      {/* Final Call to Action */}
      <Hero
        title="Join Our Mission Today"
        subtitle="Be Part of the Change"
        description="Whether through volunteering, donating, or partnering with us, you can help transform lives and build healthier communities across Ghana."
        backgroundImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        height="py-24"
        primaryAction={{
          text: "Volunteer With Us",
          onClick: () => navigateTo("Volunteer")
        }}
        secondaryAction={{
          text: "Make a Donation",
          onClick: () => navigateTo("Donate")
        }}
      />
    </main>
  );
};

export default AboutPage;
