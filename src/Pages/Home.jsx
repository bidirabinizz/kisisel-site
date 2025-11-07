import React, { useState, useEffect } from 'react';
import { personalInfo, skills, projects, socialMedia, experiences } from '../data/mock';
import { Github, Linkedin, Twitter, Mail, ExternalLink, Sun, Moon } from 'lucide-react';

const iconMap = {
  Github,
  Linkedin,
  Twitter,
  Mail
};

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true); // Varsayılan koyu tema
  const fullText = 'I love building web applications.';
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);

  // Tema değiştirme fonksiyonu
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Tema renkleri
  const themeColors = {
    dark: {
      bg: '#1a1c1b',
      text: '#ffffff',
      secondaryText: '#888680',
      accent: '#d9fb06',
      cardBg: '#302f2c',
      border: '#3f4816'
    },
    light: {
      bg: '#f8f9fa',
      text: '#1a1c1b',
      secondaryText: '#6c757d',
      accent: '#007bff',
      cardBg: '#ffffff',
      border: '#dee2e6'
    }
  };

  const colors = isDarkMode ? themeColors.dark : themeColors.light;

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {/* Tema Değiştirme Butonu */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: colors.accent,
          color: colors.bg
        }}
        aria-label={isDarkMode ? "Light mode" : "Dark mode"}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        
        {/* Hero Section */}
        <section className="mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: colors.text }}>
            Hi, I'm {personalInfo.name.split(' ')[0]}.
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 font-normal" style={{ color: colors.secondaryText }}>
            {personalInfo.title}
          </h2>
          <p className="text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: colors.secondaryText }}>
            {personalInfo.bio}
          </p>
          <p className="text-xl font-medium mb-8" style={{ color: colors.accent }}>
            {typedText}<span className="animate-pulse">|</span>
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            {socialMedia.map((social, index) => {
              const IconComponent = iconMap[social.icon];
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center transition-all duration-300 border hover:scale-110"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: `${colors.border}/50`,
                    color: colors.text
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.accent;
                    e.currentTarget.style.color = colors.bg;
                    e.currentTarget.style.borderColor = colors.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardBg;
                    e.currentTarget.style.color = colors.text;
                    e.currentTarget.style.borderColor = `${colors.border}/50`;
                  }}
                  aria-label={social.platform}
                >
                  {IconComponent && <IconComponent size={20} />}
                </a>
              );
            })}
          </div>
          
          {/* Profile Picture */}
          <div className="relative w-32 h-32 group">
            <div className="w-full h-full rounded-full overflow-hidden border-2 transition-all duration-300 group-hover:border-[#d9fb06]"
              style={{
                borderColor: colors.border,
              }}
            >
              <img 
                src="/images/bahadir.jpg" 
                alt={personalInfo.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                  // Placeholder'ı göster
                  const placeholder = e.target.parentElement.querySelector('.profile-placeholder');
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              
              {/* Fallback Placeholder */}
              <div 
                className="profile-placeholder hidden w-full h-full items-center justify-center rounded-full"
                style={{
                  backgroundColor: colors.cardBg,
                  color: colors.secondaryText
                }}
              >
                <span className="text-3xl font-bold">
                  {personalInfo.name.charAt(0)}{personalInfo.name.split(' ')[1]?.charAt(0)}
                </span>
              </div>
            </div>
            
            {/* Hover efekti */}
            <div className="absolute inset-0 rounded-full bg-[#d9fb06] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold mb-8" style={{ color: colors.text }}>Experience</h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="border-l-2 pl-6 transition-colors duration-300 hover:border-l-4"
                style={{ 
                  borderLeftColor: colors.border,
                  borderLeftWidth: '2px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeftColor = colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeftColor = colors.border;
                }}
              >
                <div className="flex items-start gap-4 mb-2">
                  <div 
                    className="w-12 h-12 flex items-center justify-center text-xs font-bold border flex-shrink-0"
                    style={{
                      backgroundColor: colors.cardBg,
                      borderColor: colors.border,
                      color: colors.accent
                    }}
                  >
                    {exp.company.substring(0, 2)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold" style={{ color: colors.text }}>{exp.company}</h4>
                    <p className="font-medium" style={{ color: colors.accent }}>{exp.position}</p>
                    <p className="text-sm mt-1" style={{ color: colors.secondaryText }}>{exp.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold mb-8" style={{ color: colors.text }}>Projects</h3>
          <div className="space-y-6">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="p-6 border transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: `${colors.border}/50`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${colors.accent}/50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${colors.border}/50`;
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-semibold" style={{ color: colors.text }}>{project.title}</h4>
                  <span className="text-sm" style={{ color: colors.secondaryText }}>{project.year}</span>
                </div>
                <p className="mb-4 leading-relaxed" style={{ color: colors.secondaryText }}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="text-xs px-3 py-1 border"
                      style={{
                        backgroundColor: colors.bg,
                        borderColor: colors.border,
                        color: colors.accent
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold mb-8" style={{ color: colors.text }}>Technology Stack</h3>
          <div className="space-y-6">
            <div>
              <p className="mb-4 leading-relaxed" style={{ color: colors.secondaryText }}>
                I'm currently focused on <span className="font-medium" style={{ color: colors.accent }}>React</span>, <span className="font-medium" style={{ color: colors.accent }}>Node.js</span>, and <span className="font-medium" style={{ color: colors.accent }}>MongoDB</span>.
              </p>
              <p className="mb-4 leading-relaxed" style={{ color: colors.secondaryText }}>
                I have knowledge of <span style={{ color: colors.text }}>FastAPI</span>, <span style={{ color: colors.text }}>TypeScript</span>, <span style={{ color: colors.text }}>Next.js</span>, and <span style={{ color: colors.text }}>Redux</span>.
              </p>
              <p className="mb-6 leading-relaxed" style={{ color: colors.secondaryText }}>
                Additionally, I enjoy building interfaces using <span style={{ color: colors.text }}>Tailwind CSS</span> and modern design systems.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[...skills.frontend, ...skills.backend].map((skill, index) => (
                <span 
                  key={index}
                  className="text-sm px-4 py-2 border transition-colors duration-300"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.border,
                    color: colors.accent
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t" style={{ borderColor: `${colors.border}/50` }}>
          <p className="text-sm text-center" style={{ color: colors.secondaryText }}>
            © 2024 {personalInfo.name}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;