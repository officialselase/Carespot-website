import { useState, useEffect } from 'react';
import AnimatedCounter from './atoms/AnimatedCounter/AnimatedCounter';

const Statistics = ({ stats, backgroundImage, title, subtitle, navigateTo }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('impact-stats');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="impact-stats"
      className="relative section-padding bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="section-overlay"></div>
      
      <div className="relative z-10 container-custom text-center text-white">
        {/* Live indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-300 font-medium">Live Impact Data</span>
        </div>

        {title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
            {title}
          </h2>
        )}
        
        {subtitle && (
          <p className="text-xl text-blue-200 mb-12 uppercase tracking-wide font-semibold animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {subtitle}
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              {/* Background card with hover effect */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105"></div>
              
              <div className="relative p-8 text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Icon or visual element */}
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">
                    {index === 0 ? '💰' : index === 1 ? '🏘️' : '👶'}
                  </span>
                </div>

                {/* Animated counter */}
                <div className="mb-4">
                  <AnimatedCounter 
                    target={stat.value} 
                    size="xlarge"
                    color="white"
                    delay={isVisible ? index * 300 : 0}
                    duration={2500}
                  />
                </div>

                {/* Label with enhanced styling */}
                <p className="text-xl text-blue-100 font-bold mb-2">
                  {stat.label}
                </p>

                {/* Description */}
                {stat.description && (
                  <p className="text-sm text-blue-200 opacity-90 leading-relaxed">
                    {stat.description}
                  </p>
                )}

                {/* Progress indicator */}
                <div className="mt-4 w-full bg-white/20 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-red-400 to-blue-400 h-1 rounded-full transition-all duration-2000 ease-out"
                    style={{ 
                      width: isVisible ? '100%' : '0%',
                      transitionDelay: `${index * 300 + 1000}ms`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional impact metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-2xl font-bold text-green-300">
              <AnimatedCounter 
                target={95.8} 
                suffix="%" 
                decimals={1}
                delay={isVisible ? 800 : 0}
                color="white"
              />
            </div>
            <p className="text-sm text-green-200 mt-1">Satisfaction Rate</p>
          </div>
          
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="text-2xl font-bold text-yellow-300">
              <AnimatedCounter 
                target={28} 
                delay={isVisible ? 1000 : 0}
                color="white"
              />
            </div>
            <p className="text-sm text-yellow-200 mt-1">Projects Completed</p>
          </div>
          
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <div className="text-2xl font-bold text-purple-300">
              <AnimatedCounter 
                target={450} 
                delay={isVisible ? 1200 : 0}
                color="white"
              />
            </div>
            <p className="text-sm text-purple-200 mt-1">Active Volunteers</p>
          </div>
          
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
            <div className="text-2xl font-bold text-red-300">
              <AnimatedCounter 
                target={15.2} 
                suffix="%" 
                decimals={1}
                delay={isVisible ? 1400 : 0}
                color="white"
              />
            </div>
            <p className="text-sm text-red-200 mt-1">Monthly Growth</p>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '1.6s' }}>
          <p className="text-lg text-blue-100 mb-6">
            Join us in making an even greater impact
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigateTo && navigateTo('Donate')}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Donate Now
            </button>
            <button 
              onClick={() => navigateTo && navigateTo('Volunteer')}
              className="px-8 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold rounded-lg border border-white/30 transition-all duration-300 transform hover:scale-105"
            >
              Become a Volunteer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;