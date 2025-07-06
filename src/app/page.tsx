'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, Download, ExternalLink, Menu, X, Sun, Moon, Facebook } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const titles = ['Full Stack Developer', 'Mathematician', 'Chill Guy'];

  useEffect(() => {
    localStorage.removeItem('theme');
    setIsDarkMode(false);
    document.documentElement.classList.remove('dark');
  }, []);

  // Typing effect
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      // Typing forward
      if (displayedText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
        }, 100); // Typing speed
      } else {
        // Pause before starting to delete
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Pause duration
      }
    } else {
      // Typing backward (deleting)
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50); // Deleting speed
      } else {
        // Move to next title
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, currentTitleIndex, titles]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rtzz</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Projects
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Contact
              </button>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <button onClick={() => scrollToSection('home')} className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  About
                </button>
                <button onClick={() => scrollToSection('projects')} className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Projects
                </button>
                <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large circles - reduced opacity to match other sections */}
          <div className="absolute top-20 left-20 w-96 h-96 border-2 border-sky-400/20 rounded-full"></div>
          <div className="absolute bottom-32 right-32 w-80 h-80 border-2 border-cyan-400/25 rounded-full"></div>
          <div className="absolute top-1/3 right-20 w-32 h-32 border-2 border-sky-300/30 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 border-2 border-cyan-300/35 rounded-full"></div>
          
          {/* Diagonal lines - reduced opacity and extended for continuity */}
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-sky-400/25 via-transparent to-cyan-400/25 rotate-45 origin-top"></div>
          <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-cyan-400/25 via-transparent to-sky-400/25 rotate-45 origin-top"></div>
          <div className="absolute bottom-0 left-1/3 w-1 h-80 bg-gradient-to-t from-sky-300/30 to-transparent rotate-45 origin-bottom"></div>
          <div className="absolute top-1/2 left-0 w-1 h-64 bg-gradient-to-b from-cyan-300/30 to-transparent rotate-45 origin-top"></div>
          <div className="absolute top-0 right-0 w-1 h-96 bg-gradient-to-b from-sky-300/25 to-transparent rotate-45 origin-top"></div>
          
          {/* Square/Rectangle elements - reduced opacity */}
          <div className="absolute top-16 right-16 w-8 h-8 bg-sky-400/45"></div>
          <div className="absolute top-24 right-24 w-6 h-6 bg-sky-300/35"></div>
          <div className="absolute top-32 right-32 w-4 h-4 bg-cyan-300/30"></div>
          <div className="absolute top-40 right-40 w-3 h-3 bg-cyan-200/25"></div>
          <div className="absolute top-48 right-48 w-2 h-2 bg-sky-200/20"></div>
          <div className="absolute bottom-20 left-20 w-10 h-10 bg-cyan-400/40"></div>
          
          {/* More geometric elements */}
          <div className="absolute bottom-40 right-1/4 w-16 h-16 border border-cyan-400/30 rotate-45"></div>
          <div className="absolute top-1/2 left-16 w-20 h-20 border border-sky-400/25 rotate-12"></div>
          <div className="absolute top-1/4 left-1/4 w-18 h-18 border border-sky-400/25 rotate-45"></div>
          
          {/* Gradient overlays - reduced opacity */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-800/15 via-transparent to-cyan-800/15"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-800/15 via-transparent to-sky-800/15"></div>
          
          {/* Animated elements - reduced opacity */}
          <div className="absolute top-1/4 left-1/2 w-32 h-32 border border-sky-300/25 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-24 h-24 border border-cyan-300/30 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-4 relative">
              <div className="w-[32rem] mx-auto mb-4 rounded-lg overflow-hidden relative" style={{ height: '42rem' }}>
                <Image
                  src="/myProfile.png"
                  alt="UTH Rathana"
                  width={512}
                  height={672}
                  className="w-full h-full object-cover"
                />
                {/* Text overlay positioned towards bottom */}
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-end rounded-lg pb-16">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center px-6">
                    Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-300">UTH Rathana</span>
                  </h1>
                  <div className="text-xl md:text-2xl text-sky-200 text-center px-6 mb-4 h-8 flex items-center justify-center">
                    <span>{displayedText}</span>
                    <span className="ml-1 animate-pulse text-sky-300">|</span>
                  </div>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center px-6 py-3 border-2 border-sky-400 text-sky-300 font-medium rounded-lg hover:bg-sky-400/20 hover:text-white transition-all duration-200 transform hover:scale-105"
                  >
                    Contact Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-950 relative overflow-hidden">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large circles */}
          <div className="absolute top-10 right-10 w-80 h-80 border-2 border-sky-400/20 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 border-2 border-cyan-400/25 rounded-full"></div>
          <div className="absolute top-1/4 left-1/3 w-32 h-32 border-2 border-sky-300/30 rounded-full"></div>
          
          {/* Diagonal lines */}
          <div className="absolute top-0 right-1/4 w-1 h-80 bg-gradient-to-b from-sky-400/30 to-transparent rotate-45 origin-top"></div>
          <div className="absolute bottom-0 left-1/4 w-1 h-96 bg-gradient-to-t from-cyan-400/30 to-transparent rotate-45 origin-bottom"></div>
          <div className="absolute top-1/3 right-0 w-1 h-64 bg-gradient-to-b from-sky-300/30 to-transparent rotate-45 origin-top"></div>
          
          {/* Square elements */}
          <div className="absolute top-20 left-20 w-6 h-6 bg-sky-400/40"></div>
          <div className="absolute top-28 left-28 w-4 h-4 bg-cyan-300/30"></div>
          <div className="absolute bottom-32 right-32 w-8 h-8 bg-sky-300/35"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-cyan-400/30 rotate-45"></div>
          <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-sky-400/25 rotate-12"></div>
          
          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-800/15 via-transparent to-cyan-800/15"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-800/15 via-transparent to-sky-800/15"></div>
          
          {/* Animated elements */}
          <div className="absolute top-1/3 left-1/4 w-24 h-24 border border-sky-300/25 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-28 h-28 border border-cyan-300/30 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
            <p className="text-lg text-sky-200 max-w-2xl mx-auto">
              Get to know more about my background and what drives me as a developer.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-sky-400/20 mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  I'm a passionate frontend developer with a love for creating intuitive and engaging user experiences. 
                  My journey in web development started with curiosity and has evolved into a dedication to crafting 
                  clean, efficient, and beautiful code.
                </p>
                <p className="text-lg leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                  or sharing knowledge with the developer community. I believe in continuous learning and staying 
                  updated with the latest trends in web development.
                </p>
                <p className="text-lg leading-relaxed">
                  My goal is to create meaningful digital experiences that solve real problems and make a positive 
                  impact on users' lives. Every project is an opportunity to learn something new and push the 
                  boundaries of what's possible.
                </p>
              </div>
            </div>

            {/* Skills & Technologies Section */}
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">Skills & Technologies</h3>
              <p className="text-lg text-sky-200 max-w-2xl mx-auto">
                Here are the technologies and tools I work with to bring ideas to life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Frontend Technologies */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-sky-400/20">
                <h4 className="text-xl font-bold text-white mb-6">Frontend</h4>
                <div className="space-y-4">
                  {['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'].map((skill) => (
                    <div key={skill} className="bg-gray-700/80 backdrop-blur-sm rounded-lg p-4 border border-sky-400/20 hover:border-sky-400/40 transition-colors">
                      <span className="text-sky-200 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Styling & Design */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-cyan-400/20">
                <h4 className="text-xl font-bold text-white mb-6">Styling & Design</h4>
                <div className="space-y-4">
                  {['Tailwind CSS', 'Sass/SCSS', 'Bootstrap', 'Responsive Design', 'UI/UX Design'].map((skill) => (
                    <div key={skill} className="bg-gray-700/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/20 hover:border-cyan-400/40 transition-colors">
                      <span className="text-cyan-200 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend & Tools */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-sky-400/20">
                <h4 className="text-xl font-bold text-white mb-6">Backend & Tools</h4>
                <div className="space-y-4">
                  {['Node.js', 'Git', 'MongoDB', 'Firebase', 'VS Code'].map((skill) => (
                    <div key={skill} className="bg-gray-700/80 backdrop-blur-sm rounded-lg p-4 border border-sky-400/20 hover:border-sky-400/40 transition-colors">
                      <span className="text-sky-200 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-950 relative overflow-hidden">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large circles */}
          <div className="absolute top-32 left-32 w-96 h-96 border-2 border-cyan-400/20 rounded-full"></div>
          <div className="absolute bottom-16 right-16 w-72 h-72 border-2 border-sky-400/25 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-40 h-40 border-2 border-cyan-300/30 rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/4 w-28 h-28 border-2 border-sky-300/35 rounded-full"></div>
          
          {/* Diagonal lines */}
          <div className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-sky-400/25 via-transparent to-cyan-400/25 rotate-45 origin-top"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-cyan-400/25 via-transparent to-sky-400/25 rotate-45 origin-top"></div>
          <div className="absolute bottom-0 left-1/2 w-1 h-80 bg-gradient-to-t from-sky-300/30 to-transparent rotate-45 origin-bottom"></div>
          
          {/* Square elements */}
          <div className="absolute top-24 right-24 w-8 h-8 bg-sky-400/50"></div>
          <div className="absolute top-32 right-32 w-6 h-6 bg-cyan-300/40"></div>
          <div className="absolute top-40 right-40 w-4 h-4 bg-sky-300/35"></div>
          <div className="absolute bottom-20 left-20 w-10 h-10 bg-cyan-400/45"></div>
          
          {/* More geometric elements */}
          <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-sky-400/30 rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/4 w-20 h-20 border border-cyan-400/25 rotate-12"></div>
          
          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-800/15 via-transparent to-cyan-800/15"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-800/15 via-transparent to-sky-800/15"></div>
          
          {/* Animated elements */}
          <div className="absolute top-1/3 right-1/3 w-32 h-32 border border-sky-300/25 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/3 w-36 h-36 border border-cyan-300/30 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Projects</h2>
            <p className="text-lg text-sky-200 max-w-2xl mx-auto">
              Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-sky-400/20 hover:border-sky-400/40">
              <div className="h-48 bg-gradient-to-r from-sky-400 to-cyan-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">E-Commerce Platform</h3>
                <p className="text-gray-300 mb-4">
                  A full-stack e-commerce solution with modern UI/UX, built with React and Node.js.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs bg-sky-500/20 text-sky-200 rounded-full border border-sky-400/30">React</span>
                  <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-200 rounded-full border border-cyan-400/30">Node.js</span>
                  <span className="px-3 py-1 text-xs bg-sky-500/20 text-sky-200 rounded-full border border-sky-400/30">MongoDB</span>
                </div>
                <div className="flex space-x-4">
                  <button className="flex items-center text-sky-300 hover:text-sky-200 transition-colors">
                    <Github className="mr-1" size={16} />
                    Code
                  </button>
                  <button className="flex items-center text-sky-300 hover:text-sky-200 transition-colors">
                    <ExternalLink className="mr-1" size={16} />
                    Live Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-sky-400/20 hover:border-sky-400/40">
              <div className="h-48 bg-gradient-to-r from-cyan-400 to-sky-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Task Management App</h3>
                <p className="text-gray-300 mb-4">
                  A collaborative task management application with real-time updates and team features.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs bg-sky-500/20 text-sky-200 rounded-full border border-sky-400/30">Next.js</span>
                  <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-200 rounded-full border border-cyan-400/30">TypeScript</span>
                  <span className="px-3 py-1 text-xs bg-sky-500/20 text-sky-200 rounded-full border border-sky-400/30">Firebase</span>
                </div>
                <div className="flex space-x-4">
                  <button className="flex items-center text-sky-300 hover:text-sky-200 transition-colors">
                    <Github className="mr-1" size={16} />
                    Code
                  </button>
                  <button className="flex items-center text-sky-300 hover:text-sky-200 transition-colors">
                    <ExternalLink className="mr-1" size={16} />
                    Live Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-sky-400/20 hover:border-sky-400/40">
              <div className="h-48 bg-gradient-to-r from-sky-500 to-cyan-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Weather Dashboard</h3>
                <p className="text-gray-300 mb-4">
                  A beautiful weather dashboard with location-based forecasts and interactive charts.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs bg-sky-500/20 text-sky-200 rounded-full border border-sky-400/30">React</span>
                  <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-200 rounded-full border border-cyan-400/30">Tailwind</span>
                  <span className="px-3 py-1 text-xs bg-sky-500/20 text-sky-200 rounded-full border border-sky-400/30">API</span>
                </div>
                <div className="flex space-x-4">
                  <button className="flex items-center text-sky-300 hover:text-sky-200 transition-colors">
                    <Github className="mr-1" size={16} />
                    Code
                  </button>
                  <button className="flex items-center text-sky-300 hover:text-sky-200 transition-colors">
                    <ExternalLink className="mr-1" size={16} />
                    Live Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-950 relative overflow-hidden">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large circles */}
          <div className="absolute top-20 left-20 w-80 h-80 border-2 border-sky-400/20 rounded-full"></div>
          <div className="absolute bottom-32 right-32 w-96 h-96 border-2 border-cyan-400/25 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 border-2 border-sky-300/30 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border-2 border-cyan-300/35 rounded-full"></div>
          
          {/* Diagonal lines */}
          <div className="absolute top-0 left-1/4 w-1 h-96 bg-gradient-to-b from-sky-400/30 to-transparent rotate-45 origin-top"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-80 bg-gradient-to-b from-cyan-400/30 to-transparent rotate-45 origin-top"></div>
          <div className="absolute bottom-0 left-1/2 w-1 h-72 bg-gradient-to-t from-sky-300/30 to-transparent rotate-45 origin-bottom"></div>
          <div className="absolute top-1/4 right-0 w-1 h-64 bg-gradient-to-b from-cyan-300/30 to-transparent rotate-45 origin-top"></div>
          
          {/* Square elements */}
          <div className="absolute top-16 right-16 w-8 h-8 bg-sky-400/50"></div>
          <div className="absolute top-24 right-24 w-6 h-6 bg-cyan-300/40"></div>
          <div className="absolute bottom-20 left-20 w-10 h-10 bg-sky-300/45"></div>
          <div className="absolute bottom-28 left-28 w-4 h-4 bg-cyan-400/35"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-1/3 left-1/4 w-18 h-18 border border-sky-400/30 rotate-45"></div>
          <div className="absolute bottom-1/3 right-1/3 w-22 h-22 border border-cyan-400/25 rotate-12"></div>
          
          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-800/15 via-transparent to-cyan-800/15"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-800/15 via-transparent to-sky-800/15"></div>
          
          {/* Animated elements */}
          <div className="absolute top-1/4 right-1/3 w-28 h-28 border border-sky-300/25 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 border border-cyan-300/30 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-lg text-sky-200 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-sky-200 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-sky-400/30 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-gray-800/80 backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-sky-200 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-sky-400/30 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-gray-800/80 backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-sky-200 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-sky-400/30 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-gray-800/80 backdrop-blur-sm text-white placeholder-gray-400"
                  placeholder="Tell me about your project or just say hi!"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 relative overflow-hidden border-t border-sky-400/20">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Small circles */}
          <div className="absolute top-4 left-1/4 w-16 h-16 border border-sky-400/20 rounded-full"></div>
          <div className="absolute bottom-4 right-1/4 w-20 h-20 border border-cyan-400/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-12 h-12 border border-sky-300/25 rounded-full"></div>
          
          {/* Lines */}
          <div className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-transparent via-sky-400/20 to-transparent"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"></div>
          
          {/* Small squares */}
          <div className="absolute top-8 right-8 w-4 h-4 bg-sky-400/30"></div>
          <div className="absolute bottom-8 left-8 w-4 h-4 bg-cyan-400/30"></div>
          
          {/* Gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-sky-800/10 via-transparent to-cyan-800/10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            <div className="flex space-x-6 mb-8">
              <a href="https://facebook.com/uth rathana" className="text-sky-300 hover:text-sky-200 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://github.com/RtzzTheOne" className="text-sky-300 hover:text-sky-200 transition-colors">
                <Github size={24} />
              </a>
              <a href="mailto:crrathana05052005@gmail.com" className="text-sky-300 hover:text-sky-200 transition-colors">
                <Mail size={24} />
              </a>
            </div>
            <p className="text-sky-200 text-center">
              © 2025 Uthrathana. All rights reserved. Built with Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
