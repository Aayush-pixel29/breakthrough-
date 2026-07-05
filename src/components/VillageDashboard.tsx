import { useState, useEffect } from "react";
import { MdArrowOutward, MdHome, MdMap, MdFileDownload, MdEmail, MdPerson, MdCheck, MdRadioButtonUnchecked, MdDescription } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useGameStore } from "../store/useGameStore";
import clsx from "clsx";

export default function VillageDashboard() {
  const {
    phase,
    activeSection,
    completedChallenges,
    skipMode,
    enterZone,
    toggleSkipMode,
  } = useGameStore();

  const [dialogueText, setDialogueText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter effect for dialogue
  const typeDialogue = (text: string) => {
    setIsTyping(true);
    setDialogueText("");
    let i = 0;
    const interval = setInterval(() => {
      setDialogueText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
  };

  useEffect(() => {
    if (phase === "PLAYING") {
      let msg = "";
      switch (activeSection) {
        case "overview":
          msg = "Greetings, Recruiter! I am the Village Manager. Feel free to explore Aayush's portfolio by visiting the Cottage, Windmill, or Workshop.";
          break;
        case "about":
          msg = "Ah, the Cozy Cottage! Here you can learn all about Aayush's journey and background.";
          break;
        case "projects":
          msg = "The bustling Workshop! This is where Aayush builds amazing applications and tools.";
          break;
        case "contact":
          msg = "The Mail Windmill! Drop a letter here to get in touch with Aayush.";
          break;
        default:
          msg = "Welcome to the village!";
      }
      typeDialogue(msg);
    }
  }, [activeSection, phase]);

  if (phase === "SKIP_MODE" || skipMode) {
    return (
      <div className="absolute inset-0 bg-stone-100 z-50 overflow-y-auto font-serif text-stone-800">
        <div className="max-w-4xl mx-auto p-8 lg:p-16">
          <div className="flex justify-between items-center mb-12 border-b-2 border-stone-300 pb-6">
            <h1 className="text-4xl font-bold text-emerald-800">Aayush Shelar</h1>
            <button
              onClick={toggleSkipMode}
              className="px-6 py-2 bg-emerald-600 text-white rounded shadow hover:bg-emerald-700 transition"
            >
              Return to Village
            </button>
          </div>

          <div className="flex gap-4 mb-10">
            <a href="/resume.pdf" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white rounded shadow hover:bg-stone-900 transition">
              <MdDescription /> Download Resume
            </a>
            <a href="https://github.com/Aayush-pixel29" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white rounded shadow hover:bg-stone-900 transition">
              <FaGithub /> GitHub Profile
            </a>
          </div>
          
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-stone-600 mb-4 flex items-center gap-2"><MdPerson /> About Me</h2>
              <p className="text-lg leading-relaxed">
                I am a passionate software developer specializing in building beautiful, interactive, and performant web applications. 
                With a strong background in modern JavaScript frameworks and a keen eye for design, I strive to create memorable digital experiences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-600 mb-4 flex items-center gap-2"><MdMap /> Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded shadow-sm border border-stone-200">
                  <h3 className="text-xl font-bold text-emerald-700 mb-2">Interactive 3D Portfolio</h3>
                  <p className="text-stone-600 mb-4">A gamified, interactive 3D world built with React Three Fiber.</p>
                  <a href="#" className="text-emerald-600 font-semibold hover:underline flex items-center gap-1">View Project <MdArrowOutward /></a>
                </div>
                <div className="p-6 bg-white rounded shadow-sm border border-stone-200">
                  <h3 className="text-xl font-bold text-emerald-700 mb-2">E-Commerce Platform</h3>
                  <p className="text-stone-600 mb-4">A full-stack e-commerce solution with real-time inventory.</p>
                  <a href="#" className="text-emerald-600 font-semibold hover:underline flex items-center gap-1">View Project <MdArrowOutward /></a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-600 mb-4 flex items-center gap-2"><MdEmail /> Contact</h2>
              <p className="text-lg mb-4">Interested in working together? Let's connect!</p>
              <a href="mailto:contact@example.com" className="inline-flex items-center gap-2 px-6 py-3 bg-stone-800 text-white rounded shadow hover:bg-stone-900 transition">
                Send an Email
              </a>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">
      {/* Top HUD: Navigation & Skip */}
      <div className="p-6 flex justify-between items-start">
        <div className="pointer-events-auto flex gap-4">
          <button 
            onClick={() => enterZone('overview')}
            className={clsx(
              "px-4 py-2 rounded-full font-bold shadow-md transition flex items-center gap-2",
              activeSection === 'overview' ? "bg-amber-400 text-amber-900" : "bg-white/90 text-stone-600 hover:bg-white"
            )}
          >
            <MdHome className="text-xl" /> Village Map
          </button>
          
          <button 
             onClick={toggleSkipMode}
             className="px-4 py-2 bg-stone-800/80 backdrop-blur text-white rounded-full font-bold shadow-md hover:bg-stone-900 transition flex items-center gap-2 pointer-events-auto"
          >
            <MdFileDownload /> Skip & Read CV
          </button>
          <a 
            href="/resume.pdf" target="_blank"
            className="px-4 py-2 bg-stone-800/80 backdrop-blur text-white rounded-full font-bold shadow-md hover:bg-stone-900 transition flex items-center gap-2 pointer-events-auto"
          >
            <MdDescription /> Resume
          </a>
          <a 
            href="https://github.com/Aayush-pixel29" target="_blank"
            className="px-4 py-2 bg-stone-800/80 backdrop-blur text-white rounded-full font-bold shadow-md hover:bg-stone-900 transition flex items-center gap-2 pointer-events-auto"
          >
            <FaGithub /> GitHub
          </a>
        </div>

        {/* Quest Diary (Right Column) */}
        <div className="pointer-events-auto w-72 bg-amber-50/95 backdrop-blur border-4 border-amber-700 rounded-lg shadow-xl p-4 font-serif text-amber-900">
          <h3 className="text-xl font-bold text-center border-b-2 border-amber-700/30 pb-2 mb-3">Quest Diary</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              {completedChallenges.includes('about') ? <MdCheck className="text-green-600 mt-1" /> : <MdRadioButtonUnchecked className="text-amber-700 mt-1" />}
              <span className={clsx(completedChallenges.includes('about') && "line-through opacity-70")}>Visit the Cottage (About)</span>
            </li>
            <li className="flex items-start gap-2">
              {completedChallenges.includes('projects') ? <MdCheck className="text-green-600 mt-1" /> : <MdRadioButtonUnchecked className="text-amber-700 mt-1" />}
              <span className={clsx(completedChallenges.includes('projects') && "line-through opacity-70")}>Inspect the Workshop (Projects)</span>
            </li>
            <li className="flex items-start gap-2">
              {completedChallenges.includes('contact') ? <MdCheck className="text-green-600 mt-1" /> : <MdRadioButtonUnchecked className="text-amber-700 mt-1" />}
              <span className={clsx(completedChallenges.includes('contact') && "line-through opacity-70")}>Check the Windmill (Contact)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom HUD: RPG Dialogue Box */}
      <div className="p-8 flex justify-center pb-12">
        <div className="pointer-events-auto w-full max-w-4xl bg-[#f4e4bc] border-8 border-amber-800 rounded-xl shadow-2xl p-6 relative flex gap-6 items-center">
          {/* NPC Avatar placeholder */}
          <div className="w-24 h-24 bg-blue-900 rounded-full border-4 border-white shadow-inner flex-shrink-0 flex items-center justify-center overflow-hidden">
             <div className="w-16 h-16 bg-blue-700 rounded-t-full mt-8 flex flex-col items-center">
                <div className="w-8 h-8 bg-[#ffdbac] rounded-full -mt-4 z-10"></div>
                <div className="w-4 h-12 bg-red-600 mt-1"></div>
             </div>
          </div>
          
          <div className="flex-1 font-serif">
            <h4 className="text-amber-900 font-bold text-xl mb-1 uppercase tracking-wider">Hiring Manager</h4>
            <p className="text-amber-950 text-lg leading-relaxed min-h-[3rem]">
              {dialogueText}
              {isTyping && <span className="inline-block w-2 h-5 bg-amber-900 ml-1 animate-pulse"></span>}
            </p>
          </div>
          
          {activeSection !== 'overview' && (
            <button 
              onClick={() => enterZone('overview')}
              className="absolute -top-5 -right-5 w-12 h-12 bg-red-500 text-white rounded-full border-4 border-amber-800 shadow-lg flex items-center justify-center font-bold hover:bg-red-600 transition hover:scale-110"
              title="Close and return to village"
            >
              X
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
