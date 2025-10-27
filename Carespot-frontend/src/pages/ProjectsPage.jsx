// src/pages/ProjectsPage.jsx

import Hero from "../components/Hero";
import Section from "../components/Section";
import Card from "../components/Card";
import Statistics from "../components/Statistics";

const ProjectsPage = ({ navigateTo }) => {
  // Project statistics
  const projectStats = [
    { value: "15+", label: "Active Projects", description: "Ongoing initiatives across Ghana" },
    { value: "25", label: "Communities Served", description: "Rural and urban areas reached" },
    { value: "5000+", label: "Lives Impacted", description: "Direct beneficiaries of our programs" }
  ];

  // Current projects data
  const currentProjects = [
    {
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "RxCare: Neonatal Seizure Detection",
      description: "Groundbreaking research into wearable devices for early detection of neonatal seizures, potentially saving countless newborn lives through innovative technology.",
      status: "Research Phase",
      location: "Accra, Ghana"
    },
    {
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Community Health Analytics",
      description: "Data-driven approaches to understanding health patterns in underserved communities, enabling targeted interventions and resource allocation.",
      status: "Implementation",
      location: "Multiple Communities"
    },
    {
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Maternal Health Innovation",
      description: "Developing accessible solutions for maternal health monitoring in rural areas, reducing maternal mortality through technology and education.",
      status: "Pilot Phase",
      location: "Northern Region"
    },
    {
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Mobile Health Clinics",
      description: "Bringing essential healthcare services directly to remote communities through our fleet of mobile clinics equipped with modern medical equipment.",
      status: "Active",
      location: "Rural Ghana"
    },
    {
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Nutrition Education Program",
      description: "Comprehensive nutrition education and support program targeting mothers and children in underserved communities to combat malnutrition.",
      status: "Expanding",
      location: "10 Communities"
    },
    {
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Health Literacy Campaign",
      description: "Multi-language health education campaign focusing on preventive care, chronic disease management, and health awareness in local communities.",
      status: "Ongoing",
      location: "Greater Accra"
    }
  ];

  // Completed projects
  const completedProjects = [
    {
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Sickle Cell Awareness Drive",
      description: "Successfully conducted awareness campaign reaching over 2,000 individuals, providing education and screening for sickle cell disease.",
      impact: "2,000+ people reached",
      year: "2023"
    },
    {
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Emergency Food Distribution",
      description: "Provided emergency food supplies and nutritional support to 500 families during the COVID-19 pandemic crisis.",
      impact: "500 families supported",
      year: "2022"
    },
    {
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "School Health Screening",
      description: "Comprehensive health screening program in 15 schools, providing early detection and treatment referrals for children.",
      impact: "1,200 children screened",
      year: "2023"
    }
  ];

  // Project categories
  const projectCategories = [
    {
      icon: "🔬",
      title: "Research & Innovation",
      description: "Cutting-edge research projects developing new solutions for healthcare challenges in underserved communities.",
      count: "3 Active Projects"
    },
    {
      icon: "🏥",
      title: "Direct Healthcare Services",
      description: "On-ground healthcare delivery through mobile clinics, screenings, and medical outreach programs.",
      count: "8 Active Projects"
    },
    {
      icon: "📚",
      title: "Health Education",
      description: "Community education and awareness programs focusing on health literacy and disease prevention.",
      count: "4 Active Projects"
    },
    {
      icon: "🍎",
      title: "Nutrition Programs",
      description: "Comprehensive nutrition support and education initiatives targeting malnutrition and food insecurity.",
      count: "2 Active Projects"
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <Hero
        title="Our Projects"
        subtitle="Making Impact"
        description="Discover the initiatives and impact CareSpot is making in communities across Ghana through innovative healthcare solutions and community-driven programs."
        backgroundImage="/sedi.jpeg"
        primaryAction={{
          text: "Support Our Work",
          onClick: () => navigateTo("Donate")
        }}
        secondaryAction={{
          text: "Join Our Team",
          onClick: () => navigateTo("Volunteer")
        }}
        backgroundPosition="center 30%"
      />

      {/* Project Statistics */}
      <Statistics
        stats={projectStats}
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        title="Our Project Impact"
        subtitle="By the Numbers"
      />

      {/* Project Categories Section */}
      <Section
        id="project-categories"
        title="Project Categories"
        subtitle="Our Focus Areas"
        description="We organize our work into key focus areas to maximize impact and ensure comprehensive healthcare coverage."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projectCategories.map((category, index) => (
            <Card
              key={index}
              variant="service"
              icon={category.icon}
              title={category.title}
              description={category.description}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </Section>

      {/* Current Projects Section */}
      <Section
        id="current-projects"
        title="Current Projects"
        subtitle="Active Initiatives"
        description="Our ongoing projects are creating real change in communities across Ghana through innovative healthcare solutions."
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-500">📍 {project.location}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>
                <button className="btn-outline text-sm w-full">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Completed Projects Section */}
      <Section
        id="completed-projects"
        title="Completed Projects"
        subtitle="Success Stories"
        description="Our completed projects demonstrate the tangible impact we've made in communities across Ghana."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {completedProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    Completed {project.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-800 font-semibold text-sm">
                    Impact: {project.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Project Partnership Section */}
      <Section
        id="project-partnerships"
        title="Project Partnerships"
        subtitle="Collaboration"
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Working Together for Greater Impact
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our projects are strengthened through strategic partnerships with local and international 
              organizations, healthcare institutions, and community leaders who share our vision for 
              healthcare equity.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">🤝</span>
                <p className="text-gray-700">Collaborative project design and implementation</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">💡</span>
                <p className="text-gray-700">Shared expertise and resource optimization</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">📈</span>
                <p className="text-gray-700">Amplified impact through coordinated efforts</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">🌍</span>
                <p className="text-gray-700">Sustainable, community-driven solutions</p>
              </div>
            </div>
            <button
              onClick={() => navigateTo("Contact")}
              className="btn-primary mt-6"
            >
              Partner With Us
            </button>
          </div>
          <div className="animate-fade-in-right">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Project partnership"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </Section>

      {/* Get Involved Section */}
      <Section
        id="get-involved"
        title="Get Involved in Our Projects"
        subtitle="Join the Mission"
        description="There are many ways you can contribute to our projects and help us create lasting change in communities across Ghana."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">💝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Fund a Project</h3>
            <p className="text-gray-600 mb-6">Support specific projects that align with your values and see direct impact from your contribution.</p>
            <button
              onClick={() => navigateTo("Donate")}
              className="btn-primary w-full"
            >
              Donate Now
            </button>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">🙋‍♀️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Volunteer</h3>
            <p className="text-gray-600 mb-6">Join our project teams and contribute your skills and time to make a direct difference in communities.</p>
            <button
              onClick={() => navigateTo("Volunteer")}
              className="btn-secondary w-full"
            >
              Volunteer
            </button>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">🤝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Partner</h3>
            <p className="text-gray-600 mb-6">Collaborate with us on projects through organizational partnerships and resource sharing.</p>
            <button
              onClick={() => navigateTo("Contact")}
              className="btn-outline w-full"
            >
              Contact Us
            </button>
          </div>
        </div>
      </Section>

      {/* Final Call to Action */}
      <Hero
        title="Every Project Changes Lives"
        subtitle="Be Part of the Solution"
        description="Our projects are only possible through the generous support of donors, volunteers, and partners who believe in our mission. Join us in creating lasting change."
        backgroundImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        height="py-24"
        primaryAction={{
          text: "Support Our Projects",
          onClick: () => navigateTo("Donate")
        }}
        secondaryAction={{
          text: "Learn About Us",
          onClick: () => navigateTo("About")
        }}
      />
    </main>
  );
};

export default ProjectsPage;
