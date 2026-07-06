import { useState, useEffect } from "react";
import { MdDescription, MdCheck, MdEmail, MdArrowForward } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useGameStore } from "../store/useGameStore";


const TourData: Record<string, { title: string, subtitle: string, text: string, next: string }> = {
  overview: {
    title: "Welcome to My World",
    subtitle: "Aayush's Portfolio",
    text: "Hello there! I'm your virtual guide. I'd love to take you on a cinematic tour of Aayush's portfolio. Are you ready?",
    next: "about"
  },
  about: {
    title: "The Developer's Cottage",
    subtitle: "About Aayush",
    text: "Aayush is a passionate software developer specializing in building beautiful, interactive, and performant web applications. With a strong background in modern frameworks, he turns complex problems into elegant solutions.",
    next: "projects"
  },
  projects: {
    title: "The Workshop of Wonders",
    subtitle: "Featured Projects",
    text: "Welcome to the Workshop! This is where ideas come to life. From interactive 3D portfolios to scalable e-commerce systems, Aayush's code is robust, clean, and highly functional.",
    next: "contact"
  },
  contact: {
    title: "The Final Post",
    subtitle: "Get In Touch",
    text: "We've reached the end of our tour! If you are impressed by what you've seen, drop a letter here. Aayush is always open to discussing new opportunities.",
    next: "overview"
  }
};

export default function TourOverlay() {
  const { activeSection, isTransitioning, setActiveSection, solveChallenge } = useGameStore();
  const [showUI, setShowUI] = useState(false);

  // Smoothly reveal UI only when transition is complete
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setShowUI(true), 300); // Slight delay after camera stops
      return () => clearTimeout(timer);
    } else {
      setShowUI(false);
    }
  }, [isTransitioning, activeSection]);

  const handleNext = () => {
    solveChallenge(activeSection);
    setActiveSection(TourData[activeSection].next);
  };

  const data = TourData[activeSection] || TourData.overview;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between" style={{ zIndex: 10 }}>
      {/* Top Bar - Always visible */}
      <header className="p-6 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/60 shadow-lg">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
            Aayush Shelar
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="/resume.pdf" target="_blank"
            className="flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md text-indigo-700 font-semibold rounded-full shadow border border-white/50 hover:bg-white transition-all"
          >
            <MdDescription size={20} /> Resume
          </a>
          <a 
            href="https://github.com/Aayush-pixel29" target="_blank"
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/90 backdrop-blur-md text-white font-semibold rounded-full shadow border border-slate-700 hover:bg-slate-900 transition-all"
          >
            <FaGithub size={20} /> GitHub
          </a>
        </div>
      </header>

      {/* Main Tour Card - Fades in/out */}
      <div 
        className={`pointer-events-auto transition-all duration-700 ease-out absolute ${
          activeSection === 'overview' ? 'bottom-12 left-1/2 -translate-x-1/2' : 'bottom-12 left-12'
        }`}
        style={{
          opacity: showUI ? 1 : 0,
          transform: showUI ? (activeSection === 'overview' ? 'translate(-50%, 0)' : 'translate(0, 0)') : (activeSection === 'overview' ? 'translate(-50%, 20px)' : 'translate(0, 20px)')
        }}
      >
        <div className="w-[450px] bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-6 border-b border-white/40">
            <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">{data.subtitle}</h3>
            <h2 className="text-2xl font-extrabold text-slate-800">{data.title}</h2>
          </div>
          
          {/* Card Body */}
          <div className="p-6">
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              {data.text}
            </p>

            {/* Custom Content blocks depending on section */}
            {activeSection === 'about' && (
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-slate-700"><MdCheck className="text-green-500" /> React & TypeScript</li>
                <li className="flex items-center gap-2 text-slate-700"><MdCheck className="text-green-500" /> Node.js & Backend</li>
                <li className="flex items-center gap-2 text-slate-700"><MdCheck className="text-green-500" /> 3D Graphics & Animations</li>
              </ul>
            )}

            {activeSection === 'projects' && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="bg-white/60 p-3 rounded-xl border border-white/50 text-center shadow-sm">
                    <div className="font-bold text-indigo-700">Anime UI</div>
                    <div className="text-xs text-slate-500">React + Zustand</div>
                 </div>
                 <div className="bg-white/60 p-3 rounded-xl border border-white/50 text-center shadow-sm">
                    <div className="font-bold text-indigo-700">E-Commerce</div>
                    <div className="text-xs text-slate-500">Full-Stack System</div>
                 </div>
              </div>
            )}

            {activeSection === 'contact' && (
              <div className="flex justify-center mb-6">
                 <a href="mailto:contact@example.com" className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-6 py-2 rounded-full font-bold hover:bg-indigo-200 transition">
                   <MdEmail /> Send Message
                 </a>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end mt-4 pt-4 border-t border-slate-200/60">
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-full shadow-md hover:bg-indigo-700 hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                {activeSection === 'contact' ? 'Finish Tour' : (activeSection === 'overview' ? 'Start Tour' : 'Next Stop')} <MdArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Skip Tour Button */}
      <div 
        className="absolute bottom-6 right-8 pointer-events-auto transition-opacity duration-500"
        style={{ opacity: showUI && activeSection !== 'overview' && activeSection !== 'contact' ? 1 : 0, pointerEvents: showUI && activeSection !== 'overview' && activeSection !== 'contact' ? 'auto' : 'none' }}
      >
        <button 
          onClick={() => setActiveSection('overview')}
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 bg-white/50 backdrop-blur px-4 py-2 rounded-full transition border border-transparent hover:border-white/50"
        >
          Skip Tour
        </button>
      </div>
    </div>
  );
}
