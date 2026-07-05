import { useState, useEffect } from "react";
import { MdArrowOutward, MdCopyright, MdHome, MdMap } from "react-icons/md";
import { FaHome, FaTree, FaWind, FaHammer } from "react-icons/fa";
import TechStack from "./TechStack";
import VillageScene from "../canvas/VillageScene";
import Cursor from "./Cursor";
import SocialIcons from "./SocialIcons";
import "./styles/Village.css";

const projectTelemetry = [
  {
    title: "MAITRI AI Companion",
    category: "Edge AI / Medical Robotics",
    description: "Offline Multimodal AI for therapeutic astronaut support engineered for ISRO criteria.",
    tools: "Python, PyTorch, Llama.cpp, Speech Recognition",
    link: "https://github.com/Aayush-pixel29/MAITRI",
    image: "/maitri.jpg",
  },
  {
    title: "AI Traffic Flow Analyzer",
    category: "Computer Vision / Smart Cities",
    description: "Computer vision engine streaming predictive real-time congestion tracing via YOLOv8.",
    tools: "Python, YOLOv8, OpenCV, FastAPI, React",
    link: "https://github.com/Aayush-pixel29/AI-Traffic-Flow-Analyzer",
    image: "/traffic.jpg",
  },
  {
    title: "Sign Language & Emotion Engine",
    category: "Deep Learning / Assistive Tech",
    description: "Dual-input neural network parsing hand gestures and facial sentiments concurrently.",
    tools: "Python, TensorFlow, MediaPipe, Keras, Flask",
    link: "https://github.com/Aayush-pixel29/Real-Time-AI-Sign-Language-Emotion-Detector",
    image: "/sign-language.png",
  },
  {
    title: "IoT Underground Cable Diagnostics",
    category: "Embedded Systems / IoT",
    description: "ATmega integrated hardware stack locating precise impedance faults automatically.",
    tools: "Embedded C, AVR MCUs, Proteus, GSM Modules, IoT",
    link: "https://drive.google.com/drive/folders/1brQHI2ju_9VCsWMrJ1aiuH4VE-EFXqwR?usp=sharing",
    image: "/cable-fault.jpg",
  },
  {
    title: "Recon AI Surveillance",
    category: "Edge Computing / CV",
    description: "Intelligent edge deployment optimizing tracking vectors across low-visibility streams.",
    tools: "Python, YOLOv5, PyTorch, NVIDIA Jetson, RTSP",
    link: "https://github.com/Aayush-pixel29/Recon-AI-Prototype",
    image: "/recon-ai.jpg",
  },
  {
    title: "Aura Wellness Matrix",
    category: "Machine Learning / Mobile Health",
    description: "Local machine-learning wrapper classifying user daily tracking logs and anomalies safely.",
    tools: "Python, Scikit-learn, FastAPI, React Native",
    link: "https://github.com/Aayush-pixel29/aura-app",
    image: "/aura-app.jpg",
  },
];

export default function VillageDashboard() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [selectedProject, setSelectedProject] = useState<number>(0);
  const [questTitle, setQuestTitle] = useState<string>("Active Quest: Explore the Village");

  useEffect(() => {
    switch (activeSection) {
      case "overview":
        setQuestTitle("Quest log: Explore the Village");
        break;
      case "about":
        setQuestTitle("Quest: Investigate Cottage Core");
        break;
      case "tech":
        setQuestTitle("Quest: Traverse the Skill Orchard");
        break;
      case "experience":
        setQuestTitle("Quest: Scale the Windmill Logs");
        break;
      case "projects":
        setQuestTitle("Quest: Browse Workshop Blueprint Archives");
        break;
      default:
        setQuestTitle("Quest: Walk the Pathway");
    }
  }, [activeSection]);

  return (
    <div className="village-main">
      <Cursor />
      <SocialIcons />
      <VillageScene activeSection={activeSection} />

      {/* Retro RPG HUD Status Header */}
      <header className="village-header">
        <div className="hud-quest" data-cursor="disable">
          <MdHome className="rpg-header-icon" />
          <span>{questTitle}</span>
        </div>
        <div className="hud-player-status" data-cursor="disable">
          <span>HP [██████████] 100%</span>
          <span>LVL [99] ARCHITECT</span>
        </div>
        <a href="mailto:shelaraayush535@gmail.com" className="hud-mail-btn" data-cursor="disable">
          Drop a Letter
        </a>
      </header>

      {/* Rustic Village Signpost Menu */}
      <nav className="village-signpost">
        <div className="sign-board-top">VILLAGE MAP</div>
        <ul>
          <li className={activeSection === "overview" ? "active" : ""}>
            <button onClick={() => setActiveSection("overview")} data-cursor="disable">
              <MdMap className="sign-icon" />
              <span>[0] VILLAGE SQUARE</span>
            </button>
          </li>
          <li className={activeSection === "about" ? "active" : ""}>
            <button onClick={() => setActiveSection("about")} data-cursor="disable">
              <FaHome className="sign-icon" />
              <span>[1] COZY COTTAGE</span>
            </button>
          </li>
          <li className={activeSection === "tech" ? "active" : ""}>
            <button onClick={() => setActiveSection("tech")} data-cursor="disable">
              <FaTree className="sign-icon" />
              <span>[2] SKILL ORCHARD</span>
            </button>
          </li>
          <li className={activeSection === "experience" ? "active" : ""}>
            <button onClick={() => setActiveSection("experience")} data-cursor="disable">
              <FaWind className="sign-icon" />
              <span>[3] WINDMILL LOGS</span>
            </button>
          </li>
          <li className={activeSection === "projects" ? "active" : ""}>
            <button onClick={() => setActiveSection("projects")} data-cursor="disable">
              <FaHammer className="sign-icon" />
              <span>[4] WORKSHOP BLUEPRINTS</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* RPG Dialog Parchment Paper Terminal */}
      <main className="village-terminal">
        {activeSection === "overview" && (
          <div className="parchment-panel fade-in">
            <h2>VILLAGE PLAZA</h2>
            <div className="divider-gold"></div>
            <div className="parchment-body">
              <p className="rpg-desc">
                Welcome, traveler! Guide the Explorer along the brown dirt paths. Use the signpost navigation or click the sector logs to explore Aayush Shelar's professional milestones.
              </p>
              <div className="quest-log-box">
                <h4>EXPLORER LOGS:</h4>
                <ul>
                  <li>🏡 <strong>Cottage (About)</strong>: Systems bio data & profile specs</li>
                  <li>🌲 <strong>Orchard (Skills)</strong>: Staggered physics tech-stack arrays</li>
                  <li>💨 <strong>Windmill (History)</strong>: Internship logs at SEDEMAC 2026</li>
                  <li>🔨 <strong>Workshop (Work)</strong>: 6 major engineering projects & links</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeSection === "about" && (
          <div className="parchment-panel fade-in">
            <h2>THE COTTAGE</h2>
            <p className="rpg-subtitle">Cottage occupant: Aayush Shelar</p>
            <div className="divider-gold"></div>
            <div className="parchment-body">
              <p className="rpg-para">
                I am an Electronic & Computer Engineering student who loves bridging the gap between hardware systems and intelligent software.
                I specialize in building real-time computer vision engines, offline multimodal neural models, and integrated microcontroller firmware.
              </p>
              <div className="rpg-stat-grid">
                <div className="rpg-stat-card">
                  <span>GPA SPECS</span>
                  <h3>6.73 / 10</h3>
                </div>
                <div className="rpg-stat-card">
                  <span>OUTREACH</span>
                  <h3>1000+ Eng</h3>
                </div>
                <div className="rpg-stat-card">
                  <span>MAJORS</span>
                  <h3>Embedded / AI</h3>
                </div>
              </div>
              <p className="rpg-para-sm">
                Optimizing firmware structures utilizing C++, Python, and Embedded C to coordinate physical mechatronic products.
              </p>
            </div>
          </div>
        )}

        {activeSection === "tech" && (
          <div className="parchment-panel fade-in panel-wide">
            <h2>SKILL ORCHARD</h2>
            <p className="rpg-subtitle">Interactive Physics Forest</p>
            <div className="divider-gold"></div>
            <div className="parchment-body orchard-body">
              <div className="orchard-canvas-frame">
                <TechStack />
              </div>
              <p className="rpg-para-sm" style={{ marginTop: "12px", textAlign: "center" }}>
                Hover or grab the skill bubbles to disperse the nodes and watch them float.
              </p>
            </div>
          </div>
        )}

        {activeSection === "experience" && (
          <div className="parchment-panel fade-in">
            <h2>WINDMILL LOGS</h2>
            <p className="rpg-subtitle">Chronological History Registry</p>
            <div className="divider-gold"></div>
            <div className="parchment-body scroll-parchment">
              <div className="rpg-timeline">
                <div className="rpg-timeline-item">
                  <div className="item-header">
                    <span className="year">2026</span>
                    <span className="badge badge-active">ACTIVE</span>
                  </div>
                  <h4>Product Support Engineer Intern</h4>
                  <h5>SEDEMAC Mechatronics Ltd.</h5>
                  <p>
                    Assisted in testing and validating automotive electronic products, troubleshooting technical issues, preparing technical documentation, and supporting engineering teams. Gained hands-on experience with embedded automotive systems, quality assurance processes, and cross-functional collaboration in a fast-paced manufacturing environment.
                  </p>
                </div>

                <div className="rpg-timeline-item">
                  <div className="item-header">
                    <span className="year">2024 - 2025</span>
                    <span className="badge">TERMINATED</span>
                  </div>
                  <h4>Community Event Head</h4>
                  <h5>ECESA</h5>
                  <p>
                    Choreographed campus-wide technical events and workshops, introducing code syntax practices and embedded architectures to over 1000 engineering students.
                  </p>
                </div>

                <div className="rpg-timeline-item">
                  <div className="item-header">
                    <span className="year">2024</span>
                    <span className="badge">TERMINATED</span>
                  </div>
                  <h4>Student Developer (Intern)</h4>
                  <h5>Rapid System</h5>
                  <p>
                    Assisted in optimizing firmware for microcontroller-based industrial machinery and serviced electronics, developing firmware optimizations and hardware servicing loops.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "projects" && (
          <div className="parchment-panel fade-in panel-extra-wide">
            <h2>WORKSHOP BLUEPRINTS</h2>
            <p className="rpg-subtitle">Engineering Telemetries Archive</p>
            <div className="divider-gold"></div>
            <div className="parchment-body workshop-body">
              {/* Left Selector signboards */}
              <div className="workshop-menu">
                <ul>
                  {projectTelemetry.map((project, index) => (
                    <li key={index} className={selectedProject === index ? "selected" : ""}>
                      <button onClick={() => setSelectedProject(index)} data-cursor="disable">
                        📄 BLUEPRINT 0{index + 1}
                        <div>{project.title}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right parchment detail layout */}
              <div className="blueprint-detail">
                <h3>{projectTelemetry[selectedProject].title}</h3>
                <span className="cat-lbl">{projectTelemetry[selectedProject].category}</span>
                
                <div className="blueprint-img-border">
                  <img
                    src={projectTelemetry[selectedProject].image}
                    alt={projectTelemetry[selectedProject].title}
                  />
                </div>

                <div className="blueprint-desc">
                  <h5>SPECS:</h5>
                  <p className="tools-spec">{projectTelemetry[selectedProject].tools}</p>
                  <p className="description-spec">{projectTelemetry[selectedProject].description}</p>
                </div>

                <a
                  href={projectTelemetry[selectedProject].link}
                  target="_blank"
                  rel="noreferrer"
                  className="blueprint-link"
                  data-cursor="disable"
                >
                  DECRYPT BLUEPRINT SOURCE <MdArrowOutward />
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mailbox contact Dialog Box */}
      <footer className="village-footer">
        <span className="footer-left"><MdCopyright /> 2026 Aayush Shelar</span>
        <span className="footer-right">ALL VILLAGE PATHS OPERATIONAL // LVL 99</span>
      </footer>
    </div>
  );
}
