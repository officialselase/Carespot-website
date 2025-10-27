// src/pages/HomePage.jsx


import Hero from "../components/Hero";
import Section from "../components/Section";
import Card from "../components/Card";
import Statistics from "../components/Statistics";
import SwipeableCarousel from "../components/atoms/SwipeableCarousel/SwipeableCarousel";
import PullToRefresh from "../components/molecules/PullToRefresh/PullToRefresh";

const HomePage = ({ navigateTo }) => {
  // Statistics data
  const statsData = [
    { value: "11880+", label: "Dollars Raised", description: "Supporting communities across Ghana" },
    { value: "10", label: "Communities Reached", description: "Orphanages and underserved areas" },
    { value: "2050+", label: "Children Helped", description: "Lives transformed through our programs" }
  ];

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    // Simulate content refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In a real app, this would fetch new data
    console.log('Content refreshed');
  };

  // Services data
  const servicesData = [
    {
      icon: "🏥",
      title: "Health Screenings & Outreach",
      description: "Free or subsidized health screenings and outreach programs to detect and prevent diseases early in underserved communities."
    },
    {
      icon: "🍎",
      title: "Nutritional Support & Counseling",
      description: "Vital nutritional support and counseling, especially for vulnerable children and mothers to combat malnutrition."
    },
    {
      icon: "📚",
      title: "Health Literacy Campaigns",
      description: "Impactful health literacy campaigns and workshops to empower communities with vital health knowledge and awareness."
    },
    {
      icon: "🔗",
      title: "Medical Referral Coordination",
      description: "Coordinating medical referrals to ensure individuals receive necessary follow-up care and specialized treatment."
    },
    {
      icon: "🏕️",
      title: "Community Pop-up Clinics",
      description: "Establishing rural and urban community pop-up clinics to bring essential healthcare services directly to underserved areas."
    },
    {
      icon: "📢",
      title: "Awareness Campaigns",
      description: "Conducting vital awareness campaigns on prevalent public health issues like sickle cell disease and hypertension."
    }
  ];

  // Research projects data
  const researchData = [
    {
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "RxCare: Neonatal Seizure Detection",
      description: "Groundbreaking research into wearable devices for early detection of neonatal seizures, potentially saving countless newborn lives through innovative technology."
    },
    {
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Community Health Analytics",
      description: "Data-driven approaches to understanding health patterns in underserved communities, enabling targeted interventions and resource allocation."
    },
    {
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Maternal Health Innovation",
      description: "Developing accessible solutions for maternal health monitoring in rural areas, reducing maternal mortality through technology and education."
    }
  ];

  return (
    <PullToRefresh onRefresh={handleRefresh} className="min-h-screen">
      <main className="pt-20 touch-scroll">
        {/* Hero Section */}
        <Hero
        title="Transforming Lives Through Healthcare"
        subtitle="Compassion in Action"
        description="We are a community-driven health initiative focused on improving access to healthcare, promoting health literacy, and supporting nutrition for underserved populations across Ghana and beyond."
        backgroundImage="/sedi.jpeg"
        primaryAction={{
          text: "Donate Now",
          onClick: () => navigateTo("Donate")
        }}
        secondaryAction={{
          text: "Learn More",
          onClick: () => navigateTo("About")
        }}
        backgroundPosition="center 30%"
      >
        {/* Swipeable Image Showcase */}
        <div className="mt-12 max-w-4xl mx-auto">
          <SwipeableCarousel
            items={[
              'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
            ]}
            autoPlay={true}
            autoPlayInterval={4000}
            showDots={true}
            showArrows={true}
            infinite={true}
            className="rounded-3xl shadow-2xl overflow-hidden"
            renderItem={(item, index) => (
              <div className="relative bg-white overflow-hidden group touch-manipulation">
                <img
                  src={item}
                  alt={`CareSpot Healthcare Initiative ${index + 1}`}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer touch-target">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 touch-active">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            onSlideChange={(index) => console.log('Slide changed to:', index)}
          />
        </div>
      </Hero>
      {/* Our Story Section */}
      <Section
        id="about"
        title="Our Story"
        subtitle="Making a Difference"
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in-left">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Children in healthcare program"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
          <div className="animate-fade-in-right">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              The Journey of CareSpot Initiative
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              CareSpot Initiative began with a simple yet powerful vision: to create a world where every child, 
              regardless of their background, has access to healthcare, nutrition, and a nurturing environment.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              Founded by passionate healthcare professionals and community advocates, we started by identifying 
              the most pressing health needs in underserved communities across Ghana.
            </p>
            <button
              onClick={() => navigateTo("About")}
              className="btn-primary"
            >
              Learn More About Us
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Support Us and Change Lives Today
          </h3>
          <p className="text-xl mb-8 text-red-100">
            Every donation helps us reach more communities and save more lives through healthcare access and education.
          </p>
          <button
            onClick={() => navigateTo("Donate")}
            className="bg-color-bg-primary text-color-interactive-primary hover:bg-color-bg-secondary font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Make a Donation
          </button>
        </div>
      </Section>

      {/* Testimonial Section */}
      <Section
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        overlay="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-red-900/90"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Theresa Ameke"
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
            />
          </div>
          <div className="order-1 md:order-2 text-center md:text-left">
            <blockquote className="text-2xl md:text-3xl font-light italic mb-8 leading-relaxed">
              "I was driven to join CareSpot Initiative by a deep desire to support underprivileged 
              children and individuals in communities across Ghana."
            </blockquote>
            <div>
              <p className="font-bold text-xl mb-2">Theresa Ameke</p>
              <p className="text-blue-200 text-lg">Volunteer & Team Lead</p>
              <p className="text-blue-200">Food, Clothing & Logistics Pillar</p>
            </div>
          </div>
        </div>
      </Section>
      {/* What We Do Section */}
      <Section
        id="what-we-do"
        title="What We Do"
        subtitle="Our Services"
        description="Comprehensive healthcare services designed to reach underserved communities and create lasting impact."
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <Card
              key={index}
              variant="service"
              icon={service.icon}
              title={service.title}
              description={service.description}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </Section>

      {/* Research & Innovation Section */}
      <Section
        id="research"
        title="Research & Innovation"
        subtitle="Advancing Healthcare"
        description="Leading groundbreaking research to develop innovative solutions for healthcare challenges in underserved communities."
        backgroundColor="bg-color-bg-secondary"
      >
        {/* Research & Innovation Carousel */}
        <SwipeableCarousel
          items={researchData}
          itemsPerView={window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1}
          gap={24}
          showDots={true}
          showArrows={window.innerWidth >= 768}
          infinite={true}
          className="mb-8"
          renderItem={(project, index) => (
            <Card
              key={index}
              variant="project"
              image={project.image}
              title={project.title}
              description={project.description}
              action={{
                text: "Learn More",
                onClick: () => navigateTo("Projects"),
                variant: "primary"
              }}
              className="h-full touch-manipulation touch-active"
            />
          )}
        />
        
        <div className="text-center mt-12">
          <button
            onClick={() => navigateTo("Projects")}
            className="btn-secondary text-lg px-8 py-4"
          >
            View All Research Projects
          </button>
        </div>
      </Section>
      {/* Statistics Section */}
      <Statistics
        stats={statsData}
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        title="Our Impact"
        subtitle="Statistics So Far"
      />
      {/* Founders Section */}
      <Section
        id="founders"
        title="Meet Our Leadership"
        subtitle="The Founders"
        description="Passionate healthcare professionals and community advocates leading the charge for healthcare equity."
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <Card
            variant="default"
            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            title="Abigail Sedinam Doh MD"
            description="President & Co-founder. Leading healthcare professional with extensive experience in community health initiatives and medical research."
            className="text-center"
          />
          <Card
            variant="default"
            image="https://images.unsplash.com/photo-1594824388853-d0c2d8e8b6b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            title="Elizabeth Ameke"
            description="Vice-President & Co-founder. Community advocate with deep expertise in program development and volunteer coordination."
            className="text-center"
          />
          <Card
            variant="default"
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            title="Benjamin Tandoh"
            description="Chief Project Officer (CPO). Strategic leader focused on project implementation and community partnership development."
            className="text-center"
          />
        </div>
      </Section>
      {/* Partners Section */}
      <Section
        id="partners"
        title="Our Partners"
        subtitle="Collaboration"
        description="Working together with organizations that share our vision for healthcare equity and community empowerment."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg">AS</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">AMEKE STUDIOS</h3>
            <p className="text-gray-600 mt-2">Creative & Media Partner</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg">AH</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">A-ENSONGA Hearts</h3>
            <p className="text-gray-600 mt-2">Community Outreach Partner</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg">TSR</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">TSR Foundation</h3>
            <p className="text-gray-600 mt-2">Research & Development Partner</p>
          </div>
        </div>
      </Section>

      {/* Final Call to Action */}
      <Hero
        title="Touch a Life Today"
        subtitle="Make a Difference"
        description="No Poverty, Zero Hunger, Good Health & Well-Being. Your support helps us achieve the UN Sustainable Development Goals in communities across Ghana."
        backgroundImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        height="py-24"
        primaryAction={{
          text: "Donate Now",
          onClick: () => navigateTo("Donate")
        }}
        secondaryAction={{
          text: "Volunteer With Us",
          onClick: () => navigateTo("Contact")
        }}
      />
      </main>
    </PullToRefresh>
  );
};

export default HomePage;
