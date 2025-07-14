'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Github, Mail, Menu, X, Sun, Moon, Facebook } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const titles = useMemo(() => ['Full Stack Developer', 'Mathematician', 'Chill Guy'], []);

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
              <button onClick={() => scrollToSection('skills')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Skills
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
                <button onClick={() => scrollToSection('skills')} className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Skills
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
                    Hi, I&rsquo;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-300">UTH Rathana</span>
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
          <div className="absolute top-10 right-10 w-80 h-80 border-2 border-sky-400/20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 border-2 border-cyan-400/25 rounded-full animate-spin-reverse"></div>
          <div className="absolute top-1/4 left-1/3 w-32 h-32 border-2 border-sky-300/30 rounded-full animate-bounce"></div>
          
          {/* Floating code symbols */}
          <div className="absolute top-16 left-16 text-sky-400/30 text-2xl animate-float font-mono">&lt;/&gt;</div>
          <div className="absolute top-32 right-24 text-cyan-400/30 text-xl animate-float-delay font-mono">{ }</div>
          <div className="absolute bottom-24 left-32 text-sky-300/30 text-lg animate-float-delay-2 font-mono">[ ]</div>
          <div className="absolute bottom-40 right-40 text-cyan-300/30 text-xl animate-float font-mono">( )</div>
          <div className="absolute top-1/2 left-8 text-sky-400/30 text-2xl animate-float-delay-3 font-mono">;</div>
          <div className="absolute top-2/3 right-8 text-cyan-400/30 text-lg animate-float-delay font-mono">//</div>
          
          {/* Binary rain effect */}
          <div className="absolute top-0 left-1/6 text-sky-400/20 text-xs font-mono leading-3 animate-pulse">
            1010101<br/>0101010<br/>1100110<br/>0011001<br/>1111000<br/>0000111
          </div>
          <div className="absolute top-0 right-1/6 text-cyan-400/20 text-xs font-mono leading-3 animate-pulse delay-1000">
            1001101<br/>0110010<br/>1010101<br/>0101010<br/>1100001<br/>0011110
          </div>
          
          {/* Diagonal lines */}
          <div className="absolute top-0 right-1/4 w-1 h-80 bg-gradient-to-b from-sky-400/30 to-transparent rotate-45 origin-top animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-1 h-96 bg-gradient-to-t from-cyan-400/30 to-transparent rotate-45 origin-bottom animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-0 w-1 h-64 bg-gradient-to-b from-sky-300/30 to-transparent rotate-45 origin-top animate-pulse delay-1000"></div>
          
          {/* Square elements */}
          <div className="absolute top-20 left-20 w-6 h-6 bg-sky-400/40 animate-spin"></div>
          <div className="absolute top-28 left-28 w-4 h-4 bg-cyan-300/30 animate-spin delay-300"></div>
          <div className="absolute bottom-32 right-32 w-8 h-8 bg-sky-300/35 animate-spin delay-700"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-cyan-400/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-sky-400/25 rotate-12 animate-pulse"></div>
          
          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-800/15 via-transparent to-cyan-800/15"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-800/15 via-transparent to-sky-800/15"></div>
          
          {/* Animated elements */}
          <div className="absolute top-1/3 left-1/4 w-24 h-24 border border-sky-300/25 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-28 h-28 border border-cyan-300/30 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              About Me
              <span className="ml-2 text-sky-400 animate-bounce">💻</span>
            </h2>
            <p className="text-lg text-sky-200 max-w-2xl mx-auto animate-fade-in">
              My educational journey and academic achievements
            </p>
          </div>

          {/* Education Timeline */}
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline Line with pulsing effect - Hidden on mobile */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-sky-400/50 via-cyan-400/50 to-sky-400/50 rounded-full hidden md:block">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-sky-400/70 via-cyan-400/70 to-sky-400/70 rounded-full animate-pulse"></div>
              </div>
              
              {/* Timeline Items */}
              <div className="space-y-8 md:space-y-16">
                {/* École Polytechnique */}
                <div className="relative flex flex-col md:flex-row items-center animate-slide-in-left">
                  {/* Mobile: Timeline Node at top */}
                  <div className="md:hidden mb-6">
                    <div className="w-24 h-24 border-4 border-sky-400/50 rounded-full bg-gray-800/80 backdrop-blur-sm hover:border-sky-400/80 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-sky-400/30 group cursor-pointer transform hover:scale-110 mx-auto">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-400/20 to-cyan-400/20 flex items-center justify-center group-hover:from-sky-400/30 group-hover:to-cyan-400/30 transition-all duration-300 ease-out relative overflow-hidden">
                        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center relative z-10 group-hover:bg-white transition-colors duration-300 ease-out p-2">
                          <Image
                            src="/ecole_logo.png"
                            alt="École Polytechnique"
                            width={60}
                            height={60}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Orbiting elements */}
                        <div className="absolute top-1 left-1 w-2 h-2 bg-sky-400/60 rounded-full animate-spin"></div>
                        <div className="absolute bottom-1 right-1 w-1 h-1 bg-cyan-400/60 rounded-full animate-spin delay-500"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 w-full md:pr-8 text-center md:text-right relative">
                    <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-sky-400/30 hover:border-sky-400/60 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-sky-400/20 group mx-auto max-w-md md:max-w-none relative hover:z-10 transform-gpu hover:scale-[1.02] hover:-rotate-1 origin-center">
                      {/* Glowing effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-400/5 to-cyan-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-sky-200 transition-colors duration-300 ease-out flex items-center justify-center md:justify-end">
                          <span className="mr-2 text-xl md:text-2xl animate-bounce">🎓</span>
                          École Polytechnique
                        </h3>
                        <p className="text-sky-200 font-medium mb-1 text-sm md:text-base">Concourse IP-Paris 2025</p>
                        <p className="text-gray-300 text-xs md:text-sm">Preparing for admission to one of France's most prestigious engineering schools</p>
                        
                        {/* Tech stack badges */}
                        <div className="flex flex-wrap justify-center md:justify-end gap-2 mt-3">
                          <span className="px-2 py-1 text-xs bg-sky-500/20 text-sky-200 rounded-full border border-sky-400/30 group-hover:bg-sky-500/30 transition-colors duration-300">Mathematics</span>
                          <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-200 rounded-full border border-cyan-400/30 group-hover:bg-cyan-500/30 transition-colors duration-300">Physics</span>
                          <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-200 rounded-full border border-purple-400/30 group-hover:bg-purple-500/30 transition-colors duration-300">Engineering</span>
                        </div>

                        {/* Expandable section (fixed layout shift) */}
                        <div className="absolute left-0 top-full mt-2 w-full z-20 hidden group-hover:block">
                          <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl border border-sky-400/30 p-4 shadow-xl">
                            <div className="border-t border-sky-400/20 pt-3">
                              <p className="text-xs text-sky-300 mb-2">Additional Information:</p>
                              <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Competitive entrance examination</li>
                                <li>• Focus on mathematics and physics</li>
                                <li>• Leading engineering institution in France</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating particles */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-sky-400/50 rounded-full animate-ping"></div>
                      <div className="absolute bottom-2 left-2 w-1 h-1 bg-cyan-400/50 rounded-full animate-ping delay-1000"></div>
                    </div>
                  </div>
                  
                  {/* Desktop Timeline Node */}
                  <div className="relative z-10 flex-shrink-0 hidden md:block">
                    <div className="w-32 h-32 border-4 border-sky-400/50 rounded-full bg-gray-800/80 backdrop-blur-sm hover:border-sky-400/80 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-sky-400/30 group cursor-pointer transform hover:scale-110">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-400/20 to-cyan-400/20 flex items-center justify-center group-hover:from-sky-400/30 group-hover:to-cyan-400/30 transition-all duration-300 ease-out relative overflow-hidden">
                        
                        <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center relative z-10 group-hover:bg-white transition-colors duration-300 ease-out p-3">
                          <Image
                            src="/ecole_logo.png"
                            alt="École Polytechnique"
                            width={80}
                            height={80}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Orbiting elements */}
                        <div className="absolute top-2 left-2 w-3 h-3 bg-sky-400/60 rounded-full animate-spin"></div>
                        <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-400/60 rounded-full animate-spin delay-500"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 pl-8 hidden md:block">
                    <div className="opacity-0"></div>
                  </div>
                </div>

                {/* Institute of Technology of Cambodia */}
                <div className="relative flex flex-col md:flex-row items-center animate-slide-in-right">
                  {/* Mobile: Timeline Node at top */}
                  <div className="md:hidden mb-6">
                    <div className="w-24 h-24 border-4 border-cyan-400/50 rounded-full bg-gray-800/80 backdrop-blur-sm hover:border-cyan-400/80 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-cyan-400/30 group cursor-pointer transform hover:scale-110 mx-auto">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400/20 to-sky-400/20 flex items-center justify-center group-hover:from-cyan-400/30 group-hover:to-sky-400/30 transition-all duration-300 ease-out relative overflow-hidden">
                        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center relative z-10 group-hover:bg-white transition-colors duration-300 ease-out p-2">
                          <Image
                            src="/itc_logo.png"
                            alt="Institute of Technology of Cambodia"
                            width={60}
                            height={60}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Orbiting elements */}
                        <div className="absolute top-1 right-1 w-2 h-2 bg-cyan-400/60 rounded-full animate-spin"></div>
                        <div className="absolute bottom-1 left-1 w-1 h-1 bg-sky-400/60 rounded-full animate-spin delay-300"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 pr-8 hidden md:block">
                    <div className="opacity-0"></div>
                  </div>
                  
                  {/* Desktop Timeline Node */}
                  <div className="relative z-10 flex-shrink-0 hidden md:block">
                    <div className="w-32 h-32 border-4 border-cyan-400/50 rounded-full bg-gray-800/80 backdrop-blur-sm hover:border-cyan-400/80 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-cyan-400/30 group cursor-pointer transform hover:scale-110">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400/20 to-sky-400/20 flex items-center justify-center group-hover:from-cyan-400/30 group-hover:to-sky-400/30 transition-all duration-300 ease-out relative overflow-hidden">
                        
                        <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center relative z-10 group-hover:bg-white transition-colors duration-300 ease-out p-3">
                          <Image
                            src="/itc_logo.png"
                            alt="Institute of Technology of Cambodia"
                            width={80}
                            height={80}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Orbiting elements */}
                        <div className="absolute top-2 right-2 w-3 h-3 bg-cyan-400/60 rounded-full animate-spin"></div>
                        <div className="absolute bottom-2 left-2 w-2 h-2 bg-sky-400/60 rounded-full animate-spin delay-300"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 w-full md:pl-8 text-center md:text-left relative">
                    <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-cyan-400/20 group mx-auto max-w-md md:max-w-none relative hover:z-10 transform-gpu hover:scale-[1.02] hover:rotate-1 origin-center">
                      {/* Glowing effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-sky-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors duration-300 ease-out flex items-center justify-center md:justify-start">
                          <span className="mr-2 text-xl md:text-2xl animate-bounce">🎯</span>
                          Institute of Technology of Cambodia
                        </h3>
                        <p className="text-cyan-200 font-medium mb-1 text-sm md:text-base">Year1: 2022-2023</p>
                        <p className="text-cyan-200 font-medium mb-2 text-sm md:text-base">Year2: 2023-2024</p>
                        <p className="text-gray-300 text-xs md:text-sm">Pursuing higher education in technology and engineering</p>
                        
                        {/* Tech stack badges */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                          <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-200 rounded-full border border-cyan-400/30 group-hover:bg-cyan-500/30 transition-colors duration-300">Technology</span>
                          <span className="px-2 py-1 text-xs bg-sky-500/20 text-sky-200 rounded-full border border-sky-400/30 group-hover:bg-sky-500/30 transition-colors duration-300">Engineering</span>
                          <span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-200 rounded-full border border-emerald-400/30 group-hover:bg-emerald-500/30 transition-colors duration-300">Innovation</span>
                        </div>

                        {/* Expandable section (fixed layout shift) */}
                        <div className="absolute left-0 top-full mt-2 w-full z-20 hidden group-hover:block">
                          <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl border border-cyan-400/30 p-4 shadow-xl">
                            <div className="border-t border-cyan-400/20 pt-3">
                              <p className="text-xs text-cyan-300 mb-2">Achievements & Skills:</p>
                              <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Advanced programming concepts</li>
                                <li>• Software development projects</li>
                                <li>• Database management systems</li>
                                <li>• Web development fundamentals</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                      </div>
                      
                      {/* Floating particles */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400/50 rounded-full animate-ping"></div>
                      <div className="absolute bottom-2 left-2 w-1 h-1 bg-sky-400/50 rounded-full animate-ping delay-500"></div>
                    </div>
                  </div>
                </div>

                {/* Angsdok High School */}
                <div className="relative flex flex-col md:flex-row items-center animate-slide-in-left">
                  {/* Mobile: Timeline Node at top */}
                  <div className="md:hidden mb-6">
                    <div className="w-24 h-24 border-4 border-sky-400/50 rounded-full bg-gray-800/80 backdrop-blur-sm hover:border-sky-400/80 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-sky-400/30 group cursor-pointer transform hover:scale-110 mx-auto">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-400/20 to-cyan-400/20 flex items-center justify-center group-hover:from-sky-400/30 group-hover:to-cyan-400/30 transition-all duration-300 ease-out relative overflow-hidden">
                        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center relative z-10 group-hover:bg-white transition-colors duration-300 ease-out">
                          <svg className="w-12 h-12 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                          </svg>
                        </div>
                        
                        {/* Orbiting elements */}
                        <div className="absolute top-1 left-1 w-2 h-2 bg-sky-400/60 rounded-full animate-spin"></div>
                        <div className="absolute bottom-1 right-1 w-1 h-1 bg-cyan-400/60 rounded-full animate-spin delay-500"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 w-full md:pr-8 text-center md:text-right relative">
                    <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-sky-400/30 hover:border-sky-400/60 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-sky-400/20 group mx-auto max-w-md md:max-w-none relative hover:z-10 transform-gpu hover:scale-[1.02] hover:-rotate-1 origin-center">
                      {/* Glowing effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-400/5 to-cyan-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-sky-200 transition-colors duration-300 ease-out flex items-center justify-center md:justify-end">
                          <span className="mr-2 text-xl md:text-2xl animate-bounce">🎓</span>
                          Angsdok High School
                        </h3>
                        <p className="text-sky-200 font-medium mb-1 text-sm md:text-base">Finished BacII 2022</p>
                        <p className="text-sky-200 font-medium mb-2 text-sm md:text-base flex items-center justify-center md:justify-end">
                          <span className="mr-1 text-yellow-400">⭐</span>
                          Grade A
                        </p>
                        
                        {/* Achievement badges */}
                        <div className="flex flex-wrap justify-center md:justify-end gap-2 mt-3">
                          <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-200 rounded-full border border-yellow-400/30 group-hover:bg-yellow-500/30 transition-colors duration-300">Excellence</span>
                          <span className="px-2 py-1 text-xs bg-green-500/20 text-green-200 rounded-full border border-green-400/30 group-hover:bg-green-500/30 transition-colors duration-300">Achievement</span>
                          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-200 rounded-full border border-blue-400/30 group-hover:bg-blue-500/30 transition-colors duration-300">Foundation</span>
                        </div>

                        {/* Expandable section */}
                        <div className="mt-4 group-hover:block hidden">
                          <div className="border-t border-sky-400/20 pt-3">
                            <p className="text-xs text-sky-300 mb-2">Academic Foundation:</p>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Strong mathematical foundation</li>
                              <li>• Scientific methodology</li>
                              <li>• Critical thinking skills</li>
                              <li>• Academic excellence recognition</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating particles */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-sky-400/50 rounded-full animate-ping"></div>
                      <div className="absolute bottom-2 left-2 w-1 h-1 bg-cyan-400/50 rounded-full animate-ping delay-1000"></div>
                    </div>
                  </div>
                  
                  {/* Desktop Timeline Node */}
                  <div className="relative z-10 flex-shrink-0 hidden md:block">
                    <div className="w-32 h-32 border-4 border-sky-400/50 rounded-full bg-gray-800/80 backdrop-blur-sm hover:border-sky-400/80 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-sky-400/30 group cursor-pointer transform hover:scale-110">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-400/20 to-cyan-400/20 flex items-center justify-center group-hover:from-sky-400/30 group-hover:to-cyan-400/30 transition-all duration-300 ease-out relative overflow-hidden">
                        
                        <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center relative z-10 group-hover:bg-white transition-colors duration-300 ease-out p-3">
                          <svg className="w-16 h-16 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                          </svg>
                        </div>
                        
                        {/* Orbiting elements */}
                        <div className="absolute top-2 left-2 w-3 h-3 bg-sky-400/60 rounded-full animate-spin"></div>
                        <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-400/60 rounded-full animate-spin delay-500"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 pl-8 hidden md:block">
                    <div className="opacity-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating tech icons */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="text-3xl animate-float hover:scale-125 transition-transform cursor-pointer">⚡</div>
            <div className="text-3xl animate-float-delay hover:scale-125 transition-transform cursor-pointer">🚀</div>
            <div className="text-3xl animate-float-delay-2 hover:scale-125 transition-transform cursor-pointer">🔧</div>
            <div className="text-3xl animate-float-delay-3 hover:scale-125 transition-transform cursor-pointer">📡</div>
          </div>
          
          {/* Achievement Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-sky-400 animate-count-up">3+</div>
              <div className="text-sm text-sky-200 mt-1">Years Learning</div>
              <div className="text-2xl mt-2 animate-bounce">📚</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 animate-count-up delay-200">8+</div>
              <div className="text-sm text-cyan-200 mt-1">Technologies</div>
              <div className="text-2xl mt-2 animate-bounce delay-200">⚡</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 animate-count-up delay-400">5+</div>
              <div className="text-sm text-emerald-200 mt-1">Projects</div>
              <div className="text-2xl mt-2 animate-bounce delay-400">🚀</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 animate-count-up delay-600">∞</div>
              <div className="text-sm text-purple-200 mt-1">Passion</div>
              <div className="text-2xl mt-2 animate-bounce delay-600">💖</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 bg-gray-950 relative overflow-hidden">
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
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Skills</h2>
            <p className="text-lg text-sky-200 max-w-2xl mx-auto">
              Here are the technologies and programming languages I work with
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-4">
              {/* Java */}
              <div className="transition-all duration-300 hover:transform hover:scale-102">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4 hover:bg-orange-500/30 transition-all duration-300 animate-pulse hover:animate-bounce">
                    <svg className="w-8 h-8 text-orange-500 hover:text-orange-400 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-orange-400 transition-colors duration-300">Java</h3>
                    <div className="w-full bg-gray-700 rounded-full h-4 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-4 rounded-full transition-all duration-1000 ease-out hover:from-orange-400 hover:to-orange-300" style={{width: '70%'}}></div>
                    </div>
                    <p className="text-orange-400 text-sm mt-3 font-medium">70%</p>
                  </div>
                </div>
              </div>

              {/* C/C++ */}
              <div className="transition-all duration-300 hover:transform hover:scale-102">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4 hover:bg-blue-500/30 transition-all duration-300 animate-pulse hover:animate-spin-slow">
                    <svg className="w-8 h-8 text-blue-500 hover:text-blue-400 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.339.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.109c-3.92 0-7.109-3.189-7.109-7.109S8.08 4.891 12 4.891 19.109 8.08 19.109 12s-3.189 7.109-7.109 7.109z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors duration-300">C/C++</h3>
                    <div className="w-full bg-gray-700 rounded-full h-4 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-4 rounded-full transition-all duration-1000 ease-out hover:from-blue-400 hover:to-blue-300" style={{width: '86%'}}></div>
                    </div>
                    <p className="text-blue-400 text-sm mt-3 font-medium">86%</p>
                  </div>
                </div>
              </div>

              {/* Python */}
              <div className="transition-all duration-300 hover:transform hover:scale-102">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-4 hover:bg-yellow-500/30 transition-all duration-300 animate-pulse hover:animate-wiggle">
                    <svg className="w-8 h-8 text-yellow-500 hover:text-yellow-400 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25.26.31.23.38.2.44.18.51.15.58.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33.22-.41.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14.104.05.123-.06 1.23-.16 1.04-.24.87-.32.71-.36.57-.4.44-.42.33-.42.24.4.16.36.1.32.05.24.02.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-yellow-400 transition-colors duration-300">Python</h3>
                    <div className="w-full bg-gray-700 rounded-full h-4 hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300">
                      <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-4 rounded-full transition-all duration-1000 ease-out hover:from-yellow-400 hover:to-yellow-300" style={{width: '60%'}}></div>
                    </div>
                    <p className="text-yellow-400 text-sm mt-3 font-medium">60%</p>
                  </div>
                </div>
              </div>

              {/* HTML */}
              <div className="transition-all duration-300 hover:transform hover:scale-102">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mr-4 hover:bg-red-500/30 transition-all duration-300 animate-pulse hover:animate-heartbeat">
                    <svg className="w-8 h-8 text-red-500 hover:text-red-400 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-red-400 transition-colors duration-300">HTML</h3>
                    <div className="w-full bg-gray-700 rounded-full h-4 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300">
                      <div className="bg-gradient-to-r from-red-500 to-red-400 h-4 rounded-full transition-all duration-1000 ease-out hover:from-red-400 hover:to-red-300" style={{width: '70%'}}></div>
                    </div>
                    <p className="text-red-400 text-sm mt-3 font-medium">70%</p>
                  </div>
                </div>
              </div>

              {/* CSS */}
              <div className="transition-all duration-300 hover:transform hover:scale-102">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4 hover:bg-blue-600/30 transition-all duration-300 animate-pulse hover:animate-float">
                    <svg className="w-8 h-8 text-blue-600 hover:text-blue-500 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-500 transition-colors duration-300">CSS</h3>
                    <div className="w-full bg-gray-700 rounded-full h-4 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-4 rounded-full transition-all duration-1000 ease-out hover:from-blue-500 hover:to-blue-400" style={{width: '40%'}}></div>
                    </div>
                    <p className="text-blue-500 text-sm mt-3 font-medium">40%</p>
                  </div>
                </div>
              </div>

              {/* JavaScript */}
              <div className="transition-all duration-300 hover:transform hover:scale-102">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mr-4 hover:bg-yellow-400/30 transition-all duration-300 animate-pulse hover:animate-tada">
                    <svg className="w-8 h-8 text-yellow-400 hover:text-yellow-300 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-yellow-300 transition-colors duration-300">JavaScript</h3>
                    <div className="w-full bg-gray-700 rounded-full h-4 hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-4 rounded-full transition-all duration-1000 ease-out hover:from-yellow-300 hover:to-yellow-200" style={{width: '35%'}}></div>
                    </div>
                    <p className="text-yellow-300 text-sm mt-3 font-medium">35%</p>
                  </div>
                </div>
              </div>

              {/* MySQL */}
              <div className="transition-all duration-300 hover:transform hover:scale-102">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4 hover:bg-orange-500/30 transition-all duration-300 animate-pulse hover:animate-bounce">
                    <svg className="w-8 h-8 text-orange-500 hover:text-orange-400 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4zM4 14v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z"/>                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-orange-400 transition-colors duration-300">MySQL</h3>
                    <div className="w-full bg-gray-700 rounded-full h-4 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-4 rounded-full transition-all duration-1000 ease-out hover:from-orange-400 hover:to-orange-300" style={{width: '70%'}}></div>
                    </div>
                    <p className="text-orange-400 text-sm mt-3 font-medium">70%</p>
                  </div>
                </div>
              </div>

              {/* React */}
              <div className="transition-all duration-300 hover:transform hover:scale-102">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4 hover:bg-cyan-500/30 transition-all duration-300 animate-pulse hover:animate-none">
                    <svg className="w-8 h-8 text-cyan-500 hover:text-cyan-400 transition-colors duration-300 animate-spin-3d hover:animate-spin-3d-fast" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.471 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.202.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.992-1.36-1.56z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors duration-300">React</h3>
                    <div className="w-full bg-gray-700 rounded-full h-4 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
                      <div className="bg-gradient-to-r from-cyan-400 to-cyan-300 h-4 rounded-full transition-all duration-1000 ease-out hover:from-cyan-300 hover:to-cyan-200" style={{width: '40%'}}></div>
                    </div>
                    <p className="text-cyan-300 text-sm mt-3 font-medium">40%</p>
                  </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              My Projects
            </h2>
            <p className="text-lg text-sky-200 max-w-2xl mx-auto">
              Here are some of the projects I&rsquo;ve worked on. Each one represents a unique challenge and learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Project 1 - Automata Theory */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-sky-400/20 hover:border-sky-400/40">
              <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">🔄</div>
                  <div className="text-lg font-bold">Finite Automata</div>
                  <div className="text-sm opacity-80">Manager</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Finite Automata Manager</h3>
                <p className="text-gray-300 mb-4">
                  A web-based visual tool to design, test, and convert Finite Automata. Supports both DFA and NFA with features like string validation, NFA to DFA conversion, and DFA minimization.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-200 rounded-full border border-yellow-400/30">JavaScript</span>
                  <span className="px-3 py-1 text-xs bg-red-500/20 text-red-200 rounded-full border border-red-400/30">HTML</span>
                  <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-200 rounded-full border border-blue-400/30">CSS</span>
                  <span className="px-3 py-1 text-xs bg-purple-500/20 text-purple-200 rounded-full border border-purple-400/30">Automata Theory</span>
                </div>
                <div className="flex space-x-4">
                  <a href="https://github.com/mocha2222/automata-project" target="_blank" rel="noopener noreferrer" className="flex items-center text-sky-300 hover:text-sky-200 transition-colors">
                    <Github className="mr-1" size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 - Clothes Information Management */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-sky-400/20 hover:border-sky-400/40">
              <div className="h-48 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">👕</div>
                  <div className="text-lg font-bold">Clothes Info</div>
                  <div className="text-sm opacity-80">Management</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Clothes Information Management</h3>
                <p className="text-gray-300 mb-4">
                  A comprehensive C++ application for managing clothing inventory and information. Features include item tracking, categorization, and data management for retail or personal wardrobe organization.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-200 rounded-full border border-blue-400/30">C++</span>
                  <span className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-200 rounded-full border border-emerald-400/30">Data Management</span>
                  <span className="px-3 py-1 text-xs bg-teal-500/20 text-teal-200 rounded-full border border-teal-400/30">Inventory</span>
                </div>
                <div className="flex space-x-4">
                  <a href="https://github.com/RtzzTheOne/Clothes-information-management" target="_blank" rel="noopener noreferrer" className="flex items-center text-sky-300 hover:text-sky-200 transition-colors">
                    <Github className="mr-1" size={16} />
                    Code
                  </a>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-sky-200 max-w-2xl mx-auto">
              I&rsquo;m always open to discussing new opportunities, interesting projects, or just having a chat about technology.
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
              <a href="https://www.facebook.com/uth.rathana" className="text-sky-300 hover:text-sky-200 transition-colors">
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
