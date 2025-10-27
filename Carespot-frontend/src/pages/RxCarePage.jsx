// src/pages/RxCarePage.jsx

import Hero from "../components/Hero";
import Section from "../components/Section";
import Card from "../components/Card";
import Statistics from "../components/Statistics";

const RxCarePage = ({ navigateTo }) => {
  // Research statistics
  const researchStats = [
    { value: "12+", label: "Months of Data Collection", description: "Systematic seizure occurrence recording" },
    { value: "50+", label: "Literature Reviews", description: "Research papers analyzed and reviewed" },
    { value: "3", label: "Healthcare Facilities", description: "Partner hospitals collecting seizure data" }
  ];

  // Research phases
  const researchPhases = [
    {
      icon: "�",
      title: "Literature Review & Research Foundation",
      description: "Comprehensive review of existing research on neonatal seizure detection, analyzing current methodologies and identifying research gaps.",
      status: "In Progress",
      timeline: "2023-2024"
    },
    {
      icon: "📊",
      title: "Data Collection System Implementation",
      description: "Establishing systematic seizure occurrence recording protocols in partner healthcare facilities to create a robust dataset for research.",
      status: "In Progress", 
      timeline: "2023-2024"
    },
    {
      icon: "🔬",
      title: "Algorithm Development",
      description: "Developing machine learning algorithms for neonatal seizure detection based on collected data and research findings.",
      status: "Upcoming",
      timeline: "2024-2025"
    },
    {
      icon: "🧪",
      title: "Prototype Development & Testing",
      description: "Creating and testing wearable device prototypes using insights from data collection and algorithm development phases.",
      status: "Planned",
      timeline: "2025"
    },
    {
      icon: "�",
      title: "Clinical Validation",
      description: "Conducting clinical trials in partnership with hospitals to validate device effectiveness and safety in real-world settings.",
      status: "Planned",
      timeline: "2025-2026"
    }
  ];

  // Key features of the device
  const deviceFeatures = [
    {
      icon: "⚡",
      title: "Real-time Monitoring",
      description: "Continuous monitoring of vital signs and neurological activity with instant seizure detection."
    },
    {
      icon: "📱",
      title: "Mobile Alerts",
      description: "Immediate notifications to healthcare providers and parents through mobile applications."
    },
    {
      icon: "🔋",
      title: "Long Battery Life",
      description: "Extended battery life ensuring continuous monitoring for up to 72 hours without charging."
    },
    {
      icon: "💧",
      title: "Waterproof Design",
      description: "Safe, comfortable, and waterproof wearable design suitable for newborn skin sensitivity."
    },
    {
      icon: "🤖",
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms trained on thousands of neonatal EEG patterns."
    },
    {
      icon: "☁️",
      title: "Cloud Integration",
      description: "Secure cloud storage and analysis for continuous improvement and remote monitoring capabilities."
    }
  ];

  // Research team members
  const researchTeam = [
    {
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Dr. Abigail Sedinam Doh",
      description: "Lead Researcher & Medical Director. Specializing in neonatal care and biomedical device development.",
      role: "Principal Investigator"
    },
    {
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Dr. Benjamin Tandoh",
      description: "Biomedical Engineer & Technology Lead. Expert in wearable medical devices and signal processing.",
      role: "Technical Director"
    },
    {
      image: "https://images.unsplash.com/photo-1594824388853-d0c2d8e8b6b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Dr. Elizabeth Ameke",
      description: "Clinical Research Coordinator. Overseeing clinical trials and regulatory compliance processes.",
      role: "Clinical Director"
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <Hero
        title="RxCare: Neonatal Seizure Research"
        subtitle="Building the Foundation"
        description="Systematic research into neonatal seizure detection through comprehensive data collection and literature review, laying the groundwork for innovative monitoring solutions."
        backgroundImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        primaryAction={{
          text: "Support Research",
          onClick: () => navigateTo("Donate")
        }}
        secondaryAction={{
          text: "Learn More",
          onClick: () => {
            document.getElementById('about-rxcare').scrollIntoView({ behavior: 'smooth' });
          }
        }}
        backgroundPosition="center 30%"
      />

      {/* Research Statistics */}
      <Statistics
        stats={researchStats}
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        title="Research Impact"
        subtitle="Clinical Results"
      />

      {/* About RxCare Section */}
      <Section
        id="about-rxcare"
        title="About RxCare Research"
        subtitle="Innovation in Neonatal Care"
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in-left">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Neonatal care research"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
          <div className="animate-fade-in-right">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Saving Lives Through Technology
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              RxCare represents our commitment to advancing neonatal healthcare through systematic research 
              and data-driven innovation. We are currently in the foundational phase of developing a 
              comprehensive understanding of neonatal seizure patterns through improved data collection methods.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our research team is actively conducting literature reviews and establishing robust seizure 
              occurrence recording systems in partner healthcare facilities. This critical groundwork will 
              provide the data foundation needed to develop effective detection algorithms and ultimately 
              create accessible monitoring solutions for underserved communities.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">📊</span>
                <p className="text-gray-700">Systematic data collection improving seizure occurrence recording</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">📚</span>
                <p className="text-gray-700">Comprehensive literature review informing research direction</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">🤝</span>
                <p className="text-gray-700">Collaborative research with healthcare facilities in Ghana</p>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">🎯</span>
                <p className="text-gray-700">Building foundation for accessible neonatal monitoring solutions</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Current Research Focus Section */}
      <Section
        id="current-research"
        title="Current Research Focus"
        subtitle="Active Research Areas"
        description="Our research team is currently focused on establishing the foundational elements needed for effective neonatal seizure detection technology."
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            variant="service"
            icon="📊"
            title="Data Collection Protocols"
            description="Implementing systematic seizure occurrence recording systems in partner healthcare facilities to build comprehensive datasets."
            className="animate-fade-in-up"
          />
          <Card
            variant="service"
            icon="📚"
            title="Literature Analysis"
            description="Conducting thorough reviews of existing research on neonatal seizure detection methodologies and technologies."
            className="animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          />
          <Card
            variant="service"
            icon="🏥"
            title="Healthcare Partnerships"
            description="Collaborating with hospitals and clinics to understand current seizure monitoring practices and challenges."
            className="animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          />
          <Card
            variant="service"
            icon="📋"
            title="Research Methodology"
            description="Developing robust research frameworks and protocols for future algorithm development and device testing."
            className="animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          />
          <Card
            variant="service"
            icon="🔍"
            title="Gap Analysis"
            description="Identifying limitations in current neonatal seizure detection methods and opportunities for innovation."
            className="animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          />
          <Card
            variant="service"
            icon="🌍"
            title="Accessibility Research"
            description="Studying healthcare infrastructure in underserved communities to inform accessible technology design."
            className="animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          />
        </div>
      </Section>

      {/* Research Phases Section */}
      <Section
        id="research-phases"
        title="Research Timeline"
        subtitle="Development Phases"
        description="Our comprehensive research and development process ensures safety, efficacy, and accessibility of the RxCare device."
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="space-y-8">
          {researchPhases.map((phase, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl">{phase.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{phase.title}</h3>
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        phase.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        phase.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        phase.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {phase.status}
                      </span>
                      <span className="text-sm text-gray-500">{phase.timeline}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{phase.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Research Team Section */}
      <Section
        id="research-team"
        title="Research Team"
        subtitle="Leading Experts"
        description="Our multidisciplinary team combines medical expertise, engineering innovation, and clinical research experience."
        backgroundColor="bg-white"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {researchTeam.map((member, index) => (
            <Card
              key={index}
              variant="default"
              image={member.image}
              title={member.title}
              description={member.description}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </Section>

      {/* Impact & Future Section */}
      <Section
        id="impact-future"
        title="Global Impact & Future Vision"
        subtitle="Transforming Neonatal Care"
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        overlay="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90"
      >
        <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
          <div className="animate-fade-in-left">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Global Health Impact</h3>
            <div className="space-y-4 text-lg text-white">
              <div className="flex items-start">
                <span className="text-yellow-400 mr-3 text-xl">🌍</span>
                <p>Potential to save thousands of newborn lives globally each year</p>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-400 mr-3 text-xl">🏥</span>
                <p>Reducing healthcare costs through early intervention</p>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-400 mr-3 text-xl">👨‍👩‍👧‍👦</span>
                <p>Supporting families with accessible monitoring technology</p>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-400 mr-3 text-xl">📈</span>
                <p>Improving neonatal care standards in underserved regions</p>
              </div>
            </div>
          </div>
          <div className="animate-fade-in-right">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Future Vision</h3>
            <div className="space-y-4 text-lg text-white">
              <div className="flex items-start">
                <span className="text-green-400 mr-3 text-xl">🚀</span>
                <p>Expanding to detect other neonatal conditions beyond seizures</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-3 text-xl">🤝</span>
                <p>Partnerships with hospitals and clinics worldwide</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-3 text-xl">💡</span>
                <p>Continuous AI improvement through global data collection</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-3 text-xl">🎯</span>
                <p>Making advanced neonatal care accessible to all communities</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Research Progress & Milestones Section */}
      <Section
        id="research-progress"
        title="Research Progress & Milestones"
        subtitle="Current Achievements"
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Literature Review Progress</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800">Neonatal Seizure Detection Methods</h4>
                <p className="text-sm text-gray-600">Comprehensive review of current detection technologies - In Progress</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800">Machine Learning in Medical Devices</h4>
                <p className="text-sm text-gray-600">Analysis of ML applications in neonatal monitoring - In Progress</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800">Healthcare Access in Underserved Communities</h4>
                <p className="text-sm text-gray-600">Research on technology adoption barriers - In Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Data Collection Milestones</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-green-500 mr-3 text-xl">✅</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Recording System Implementation</h4>
                  <p className="text-sm text-gray-600">Established systematic seizure occurrence recording protocols</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-3 text-xl">✅</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Healthcare Partner Recruitment</h4>
                  <p className="text-sm text-gray-600">Secured partnerships with 3 healthcare facilities</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-3 text-xl">🔄</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Data Quality Validation</h4>
                  <p className="text-sm text-gray-600">Ongoing validation of collected seizure occurrence data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Final Call to Action */}
      <Hero
        title="Support Groundbreaking Research"
        subtitle="Join Our Mission"
        description="Help us bring this life-saving technology to newborns worldwide. Your support enables continued research, clinical trials, and global deployment of RxCare devices."
        backgroundImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        height="py-24"
        primaryAction={{
          text: "Fund Research",
          onClick: () => navigateTo("Donate")
        }}
        secondaryAction={{
          text: "Contact Research Team",
          onClick: () => navigateTo("Contact")
        }}
      />
    </main>
  );
};

export default RxCarePage;