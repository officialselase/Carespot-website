// src/pages/CareSpotGhanaPage.jsx

import Hero from "../components/Hero";
import Section from "../components/Section";
import Card from "../components/Card";
import Statistics from "../components/Statistics";

const CareSpotGhanaPage = ({ navigateTo }) => {
  // Ghana-specific statistics
  const ghanaStats = [
    { value: "10", label: "Communities Served", description: "Across Greater Accra and Northern regions" },
    { value: "2050+", label: "Children Helped", description: "Direct beneficiaries in Ghana" },
    { value: "15", label: "Local Partnerships", description: "Collaborations with Ghanaian organizations" }
  ];

  // Ghana-specific programs
  const ghanaPrograms = [
    {
      icon: "🏥",
      title: "Rural Health Outreach",
      description: "Mobile health clinics serving remote villages in Northern Ghana, providing essential healthcare services to underserved populations."
    },
    {
      icon: "🍎",
      title: "Malnutrition Prevention",
      description: "Comprehensive nutrition programs targeting child malnutrition in partnership with local communities and health centers."
    },
    {
      icon: "🩺",
      title: "Sickle Cell Awareness",
      description: "Specialized programs for sickle cell disease awareness, screening, and support, addressing a critical health issue in Ghana."
    },
    {
      icon: "👩‍⚕️",
      title: "Maternal Health Support",
      description: "Supporting expectant mothers with prenatal care, health education, and safe delivery assistance in rural areas."
    },
    {
      icon: "💊",
      title: "Essential Medicines Access",
      description: "Ensuring access to essential medications and medical supplies in communities with limited healthcare infrastructure."
    },
    {
      icon: "📚",
      title: "Health Education Campaigns",
      description: "Community-based health education programs conducted in local languages to improve health literacy and awareness."
    }
  ];

  // Regional focus areas
  const regionalFocus = [
    {
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Greater Accra Region",
      description: "Urban health initiatives focusing on underserved communities in Accra, including orphanages and low-income neighborhoods.",
      communities: "5 Communities",
      beneficiaries: "1,200+ People"
    },
    {
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Northern Region",
      description: "Rural health programs addressing healthcare access challenges in remote villages and farming communities.",
      communities: "3 Communities",
      beneficiaries: "800+ People"
    },
    {
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Ashanti Region",
      description: "Expanding healthcare services to mining communities and rural areas with limited medical infrastructure.",
      communities: "2 Communities",
      beneficiaries: "500+ People"
    }
  ];

  // Local partnerships
  const localPartners = [
    {
      icon: "🏛️",
      title: "Ghana Health Service",
      description: "Official partnership with Ghana's national health service for coordinated healthcare delivery and policy alignment."
    },
    {
      icon: "🎓",
      title: "University of Ghana Medical School",
      description: "Collaboration on research projects and medical student volunteer programs for community health initiatives."
    },
    {
      icon: "🏢",
      title: "Local NGOs",
      description: "Strategic partnerships with Ghanaian non-profit organizations to maximize community impact and cultural sensitivity."
    },
    {
      icon: "⛪",
      title: "Community Leaders",
      description: "Working closely with traditional leaders, chiefs, and religious organizations to ensure community acceptance and participation."
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <Hero
        title="CareSpot Ghana"
        subtitle="Our Home Base"
        description="Exploring CareSpot's dedicated initiatives and transformative impact within Ghana, where our journey began and continues to flourish through community-driven healthcare solutions."
        backgroundImage="/sedi.jpeg"
        primaryAction={{
          text: "Support Ghana Programs",
          onClick: () => navigateTo("Donate")
        }}
        secondaryAction={{
          text: "Volunteer in Ghana",
          onClick: () => navigateTo("Volunteer")
        }}
        backgroundPosition="center 30%"
      />

      {/* Ghana Impact Statistics */}
      <Statistics
        stats={ghanaStats}
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        title="Our Impact in Ghana"
        subtitle="Local Results"
      />

      {/* Why Ghana Section */}
      <Section
        id="why-ghana"
        title="Why Ghana?"
        subtitle="Our Foundation"
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in-left">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Ghana community healthcare"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
          <div className="animate-fade-in-right">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Where It All Began
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Ghana is not just where CareSpot operates—it's where our story began. Founded by Ghanaian
              healthcare professionals who witnessed firsthand the healthcare challenges facing their
              communities, CareSpot was born from a deep understanding of local needs and cultural context.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our founders' intimate knowledge of Ghana's healthcare landscape, combined with their
              international medical training, uniquely positions us to create sustainable, culturally
              appropriate solutions that truly serve the Ghanaian people.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">🇬🇭</span>
                <p className="text-gray-700">Deep cultural understanding and community trust</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">🏥</span>
                <p className="text-gray-700">Addressing specific healthcare challenges in Ghana</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">🤝</span>
                <p className="text-gray-700">Strong partnerships with local institutions</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">🌱</span>
                <p className="text-gray-700">Sustainable, community-driven solutions</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Ghana Programs Section */}
      <Section
        id="ghana-programs"
        title="Programs in Ghana"
        subtitle="Local Initiatives"
        description="Our comprehensive healthcare programs are specifically designed to address the unique health challenges and opportunities within Ghanaian communities."
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ghanaPrograms.map((program, index) => (
            <Card
              key={index}
              variant="service"
              icon={program.icon}
              title={program.title}
              description={program.description}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </Section>

      {/* Regional Focus Section */}
      <Section
        id="regional-focus"
        title="Regional Focus Areas"
        subtitle="Where We Work"
        description="CareSpot operates across multiple regions in Ghana, each with unique healthcare needs and community characteristics."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {regionalFocus.map((region, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={region.image}
                  alt={region.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{region.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{region.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                    {region.communities}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                    {region.beneficiaries}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Local Partnerships Section */}
      <Section
        id="local-partnerships"
        title="Local Partnerships"
        subtitle="Community Collaboration"
        description="Strong partnerships with Ghanaian institutions and community leaders are fundamental to our success and sustainability."
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {localPartners.map((partner, index) => (
            <Card
              key={index}
              variant="service"
              icon={partner.icon}
              title={partner.title}
              description={partner.description}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </Section>

      {/* Cultural Approach Section */}
      <Section
        id="cultural-approach"
        title="Our Cultural Approach"
        subtitle="Respecting Traditions"
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        overlay="absolute inset-0 bg-gradient-to-r from-green-900/90 to-yellow-900/90"
      >
        <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
          <div className="animate-fade-in-left">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Cultural Sensitivity</h3>
            <div className="space-y-4 text-lg text-white">
              <div className="flex items-start">
                <span className="text-yellow-400 mr-3 text-xl">🗣️</span>
                <p>Programs conducted in local languages (Twi, Ga, Dagbani)</p>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-400 mr-3 text-xl">👑</span>
                <p>Collaboration with traditional leaders and chiefs</p>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-400 mr-3 text-xl">🎭</span>
                <p>Respect for traditional healing practices and beliefs</p>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-400 mr-3 text-xl">👥</span>
                <p>Community-led decision making and program design</p>
              </div>
            </div>
          </div>
          <div className="animate-fade-in-right">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Local Empowerment</h3>
            <div className="space-y-4 text-lg text-white">
              <div className="flex items-start">
                <span className="text-green-400 mr-3 text-xl">🎓</span>
                <p>Training local healthcare workers and volunteers</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-3 text-xl">💼</span>
                <p>Creating employment opportunities in communities</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-3 text-xl">🏗️</span>
                <p>Building local capacity for sustainable healthcare</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-3 text-xl">🌱</span>
                <p>Supporting community ownership of health programs</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Success Stories Section */}
      <Section
        id="success-stories"
        title="Success Stories from Ghana"
        subtitle="Real Impact"
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Kumasi Orphanage Transformation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Through our comprehensive health program at the Kumasi orphanage, we've seen a 60% reduction
              in preventable illnesses among children. Regular health screenings, nutrition support, and
              health education have transformed the lives of over 150 children.
            </p>
            <div className="flex items-center text-sm text-gray-600">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold mr-3">
                150+ Children Helped
              </span>
              <span>Kumasi, Ashanti Region</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Northern Region Mobile Clinics</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our mobile health clinics have brought essential healthcare services to remote villages
              in Northern Ghana, serving over 800 people who previously had no access to medical care.
              The program has significantly improved maternal and child health outcomes.
            </p>
            <div className="flex items-center text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold mr-3">
                800+ People Served
              </span>
              <span>Northern Region</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Future Plans Section */}
      <Section
        id="future-plans"
        title="Future Plans for Ghana"
        subtitle="Expanding Our Impact"
        backgroundColor="bg-white"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">2024-2025 Goals</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">🎯</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Expand to 5 New Communities</h4>
                    <p className="text-sm text-gray-600">Reaching underserved areas in Central and Western regions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">🏥</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Establish Permanent Health Posts</h4>
                    <p className="text-sm text-gray-600">Building sustainable healthcare infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">👩‍⚕️</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Train 100 Community Health Workers</h4>
                    <p className="text-sm text-gray-600">Building local capacity for healthcare delivery</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Long-term Vision</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">🌍</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">National Health Impact</h4>
                    <p className="text-sm text-gray-600">Contributing to Ghana's national health goals and SDGs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">🔬</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Research Hub Development</h4>
                    <p className="text-sm text-gray-600">Establishing Ghana as a center for health innovation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">🤝</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Regional Leadership</h4>
                    <p className="text-sm text-gray-600">Becoming a model for West African healthcare initiatives</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Final Call to Action */}
      <Hero
        title="Support Healthcare in Ghana"
        subtitle="Make a Local Impact"
        description="Your support directly benefits Ghanaian communities, helping us expand our programs and reach more people in need of essential healthcare services."
        backgroundImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        height="py-24"
        primaryAction={{
          text: "Donate to Ghana Programs",
          onClick: () => navigateTo("Donate")
        }}
        secondaryAction={{
          text: "Volunteer in Ghana",
          onClick: () => navigateTo("Volunteer")
        }}
      />
    </main>
  );
};

export default CareSpotGhanaPage;
