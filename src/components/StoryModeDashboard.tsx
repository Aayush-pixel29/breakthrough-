import { useState, useEffect, useRef } from "react";
import { MdDescription, MdVolumeUp, MdVolumeOff, MdCheck, MdMap, MdPerson, MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useGameStore } from "../store/useGameStore";
import "./styles/StoryMode.css";

const StoryData: Record<string, { title: string, text: string }> = {
  overview: {
    title: "Welcome to Aayush's Portfolio",
    text: "Greetings, Recruiter! I am the Hiring Manager. Feel free to explore Aayush's portfolio by selecting a quest on the right."
  },
  about: {
    title: "The Developer's Journey",
    text: "Aayush is a passionate software developer specializing in building beautiful, interactive, and performant web applications. With a strong background in modern JavaScript frameworks and a keen eye for design, he strives to create memorable digital experiences."
  },
  projects: {
    title: "The Workshop of Wonders",
    text: "Here are some of Aayush's top projects! From interactive portfolios to full-stack e-commerce platforms with real-time inventory systems, his code brings ideas to life."
  },
  contact: {
    title: "The Final Quest",
    text: "Impressed? Drop a letter to get in touch with Aayush and discuss potential opportunities!"
  }
};

export default function StoryModeDashboard() {
  const {
    activeSection,
    completedChallenges,
    voiceEnabled,
    setActiveSection,
    solveChallenge,
    toggleVoice
  } = useGameStore();

  const [dialogueText, setDialogueText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const synth = window.speechSynthesis;
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      synth.cancel();
    };
  }, [synth]);

  useEffect(() => {
    const data = StoryData[activeSection] || StoryData.overview;
    const msg = data.text;
    
    setIsTyping(true);
    setDialogueText("");
    
    if (voiceEnabled && synth) {
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.pitch = 1.2;
      utterance.rate = 1.1;
      
      const voices = synth.getVoices();
      const preferredVoice = voices.find(v => v.name.includes("Female") || v.name.includes("Google UK English Female") || v.name.includes("Samantha")) || voices[0];
      if (preferredVoice) utterance.voice = preferredVoice;
      
      currentUtterance.current = utterance;
      synth.speak(utterance);
    }
    
    let i = 0;
    const interval = setInterval(() => {
      setDialogueText((prev) => prev + msg.charAt(i));
      i++;
      if (i >= msg.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [activeSection, voiceEnabled, synth]);

  const handleQuestSelect = (section: string) => {
    if (activeSection !== 'overview' && activeSection !== section) {
      solveChallenge(activeSection);
    }
    setActiveSection(section);
  };

  const handleComplete = () => {
    solveChallenge(activeSection);
    setActiveSection('overview');
  };

  const data = StoryData[activeSection] || StoryData.overview;

  return (
    <div className="story-dashboard-container">
      <div className="story-bg-top"></div>
      <div className="story-bg-glow"></div>
      
      <header className="story-header">
        <h1 className="story-title">Aayush Shelar</h1>
        <div className="story-header-actions">
          <button 
            onClick={toggleVoice}
            className="story-btn-icon"
            title="Toggle Voice"
          >
            {voiceEnabled ? <MdVolumeUp size={24} /> : <MdVolumeOff size={24} />}
          </button>
          <a 
            href="/resume.pdf" target="_blank"
            className="story-btn story-btn-primary"
          >
            <MdDescription size={20} /> Resume
          </a>
          <a 
            href="https://github.com/Aayush-pixel29" target="_blank"
            className="story-btn story-btn-dark"
          >
            <FaGithub size={20} /> GitHub
          </a>
        </div>
      </header>

      <main className="story-main">
        <div className="story-character-panel">
          <div className="character-card">
            <div className="character-avatar">
              <div className="character-hair"></div>
              <div className="character-eye character-eye-left"></div>
              <div className="character-eye character-eye-right"></div>
              <div className="character-mouth"></div>
            </div>
            
            <div className="character-outfit">
               <div className="character-tie"></div>
            </div>
            
            <div className="character-label">
              Hiring Manager
            </div>
          </div>
        </div>

        <div className="story-content-panel">
          <div className={`story-card-content ${activeSection === 'overview' ? 'story-card-hidden' : 'story-card-visible'}`}>
            <div className="content-header">
              <h2 className="content-title">{data.title}</h2>
              <button 
                onClick={() => setActiveSection('overview')}
                className="close-btn"
              >
                ✕
              </button>
            </div>
            
            <div className="content-body">
              {activeSection === 'about' && (
                <div>
                  <p>Aayush is a results-driven full-stack developer with a passion for beautiful UI and scalable backends.</p>
                  <ul>
                    <li>Expertise in React, TypeScript, and Node.js.</li>
                    <li>Strong foundation in responsive, mobile-first design.</li>
                    <li>Experience building complex web applications.</li>
                  </ul>
                </div>
              )}
              {activeSection === 'projects' && (
                <div className="project-grid">
                  <div className="project-card">
                    <h3 className="project-title">Anime Visual Novel OS</h3>
                    <p className="project-desc">A complete portfolio redesign featuring dynamic routing and state management with Zustand.</p>
                    <a href="#" className="project-link">View Source &rarr;</a>
                  </div>
                  <div className="project-card">
                    <h3 className="project-title">E-Commerce Engine</h3>
                    <p className="project-desc">High-performance storefront with optimized cart logic and real-time inventory.</p>
                    <a href="#" className="project-link">Live Demo &rarr;</a>
                  </div>
                </div>
              )}
              {activeSection === 'contact' && (
                <div className="contact-card">
                  <MdEmail className="contact-icon" />
                  <p className="contact-text">Let's build something amazing together.</p>
                  <a href="mailto:contact@example.com" className="story-btn story-btn-primary">
                    Send Email
                  </a>
                </div>
              )}
            </div>

            <div className="content-footer">
               <button 
                 onClick={handleComplete}
                 className="story-btn story-btn-success"
               >
                 <MdCheck size={20} /> Complete Quest
               </button>
            </div>
          </div>

          <div className={`story-menu ${activeSection !== 'overview' ? 'story-menu-hidden' : ''}`}>
            <h3 className="menu-title">Select a Chapter</h3>
            <ul className="menu-list">
              {[
                { id: 'about', label: 'Chapter 1: The Developer', icon: <MdPerson /> },
                { id: 'projects', label: 'Chapter 2: The Workshop', icon: <MdMap /> },
                { id: 'contact', label: 'Chapter 3: Get In Touch', icon: <MdEmail /> }
              ].map(quest => {
                const isActive = activeSection === quest.id;
                const isDone = completedChallenges.includes(quest.id);
                return (
                  <li key={quest.id}>
                    <button
                      onClick={() => handleQuestSelect(quest.id)}
                      className={`menu-item-btn ${isActive ? 'menu-item-active' : ''}`}
                    >
                      <span className="menu-icon">{quest.icon}</span>
                      <span className={`menu-label ${isDone ? 'menu-label-done' : ''}`}>
                        {quest.label}
                      </span>
                      {isDone && <MdCheck className="menu-check" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>

      <footer className="story-dialogue-wrapper">
        <div className="story-dialogue-box">
          <div className="dialogue-nameplate">
            Hiring Manager
          </div>
          <p className="dialogue-text">
            {dialogueText}
            {isTyping && <span className="dialogue-cursor"></span>}
          </p>
          <div className="dialogue-continue">
            Click to continue &#9660;
          </div>
        </div>
      </footer>
    </div>
  );
}
