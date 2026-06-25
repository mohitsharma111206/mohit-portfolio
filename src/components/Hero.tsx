import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, Cpu, Database, ArrowRight, Download, Sparkles, 
  Terminal, Shield, Network, Mail, Compass, Play, Server, RefreshCw,
  Linkedin, Github, Instagram
} from "lucide-react";
import { personalInfo } from "../types";

export default function Hero() {
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [sysTime, setSysTime] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isCursive, setIsCursive] = useState(false);

  // Toggle cursive state for name morphing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsCursive((prev) => !prev);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const subtitles = [
    "Machine Learning Enthusiast",
    "Data Scientist",
    "Web Developer",
    "Problem Solver"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSysTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const triggerResumeDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Resume - Mohit Sharma</title>
              <style>
                body { font-family: 'Courier New', Courier, monospace; color: #1e293b; padding: 40px; line-height: 1.6; }
                h1 { color: #0f172a; border-bottom: 2px solid #06b6d4; padding-bottom: 10px; margin-bottom: 5px; }
                .subtitle { color: #475569; font-size: 1.1rem; font-weight: bold; margin-bottom: 20px; }
                .section-title { font-size: 1.2rem; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; margin-top: 30px; margin-bottom: 15px; color: #0f172a; }
                .job { margin-bottom: 20px; }
                .job-header { display: flex; justify-content: space-between; font-weight: bold; color: #1e293b; }
                .skills-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 5px; }
                .skill-tag { background: #f1f5f9; padding: 3px 8px; font-size: 0.8rem; border-radius: 4px; border: 1px solid #e2e8f0; }
                ul { padding-left: 20px; margin-top: 5px; }
                li { margin-bottom: 4px; }
                .meta { display: flex; gap: 20px; color: #64748b; font-size: 0.9rem; margin-bottom: 30px; }
              </style>
            </head>
            <body>
              <h1>MOHIT SHARMA</h1>
              <div class="subtitle">AI & Data Science Specialist | Future Machine Learning Engineer</div>
              <div class="meta">
                <span>Location: Rajasthan, India</span>
                <span>Email: ${personalInfo.email}</span>
                <span>GitHub: ${personalInfo.github.replace("https://", "")}</span>
              </div>
              
              <div class="section-title">Professional Summary</div>
              <p>${personalInfo.story}</p>
              
              <div class="section-title">Education</div>
              <div class="job">
                <div class="job-header">
                  <span>Bachelor of Technology (B.Tech) - Artificial Intelligence & Data Science</span>
                  <span>2025 - 2029</span>
                </div>
                <div>Government Engineering College, Bikaner</div>
                <ul>
                  <li>Focusing on machine learning pipelines, deep learning foundations, advanced mathematics, and system optimization.</li>
                  <li>Applying core Python, C++, and statistics to construct predictive algorithms.</li>
                </ul>
              </div>

              <div class="section-title">Experience</div>
              <div class="job">
                <div class="job-header">
                  <span>Data Science Intern</span>
                  <span>Feb 2026</span>
                </div>
                <div>ShadowFox</div>
                <ul>
                  <li>Engineered exploratory data analysis (EDA) processes using Pandas and NumPy.</li>
                  <li>Created robust dashboards and plots via Matplotlib and Seaborn for automated reporting.</li>
                  <li>Maintained project architecture in Jupyter Notebooks and structured GitHub versioning.</li>
                </ul>
              </div>
              <div class="job">
                <div class="job-header">
                  <span>Web Development & Designing Intern</span>
                  <span>Ongoing</span>
                </div>
                <div>Tranqli</div>
                <ul>
                  <li>Crafted optimized, mobile-first responsive web solutions using advanced UI/UX principles.</li>
                  <li>Integrated interactive elements, decreasing latency and improving visual rhythm.</li>
                </ul>
              </div>

              <div class="section-title">Core Skills</div>
              <div class="skills-list">
                <span class="skill-tag">Python</span>
                <span class="skill-tag">C++</span>
                <span class="skill-tag">Pandas</span>
                <span class="skill-tag">Matplotlib</span>
                <span class="skill-tag">Seaborn</span>
                <span class="skill-tag">Generative AI</span>
                <span class="skill-tag">Prompt Engineering</span>
                <span class="skill-tag">n8n Workflow Automation</span>
                <span class="skill-tag">GitHub</span>
                <span class="skill-tag">UI/UX Design</span>
              </div>

              <script>
                window.onload = function() {
                  window.print();
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
      setDownloading(false);
    }, 1000);
  };

  return (
    <section 
      id="hero-section" 
      className="relative w-full min-h-screen bg-transparent flex flex-col items-center justify-center pt-28 pb-20 px-6 sm:px-12 md:px-16 overflow-hidden z-10"
    >
      {/* Sci-Fi Ambient Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0f1d_1px,transparent_1px),linear-gradient(to_bottom,#0c0f1d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-35" />

      {/* Cyber ambient spotlights */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse [animation-duration:8s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Outer Wrapper */}
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center text-center gap-6">
        
        {/* Left Side: Rich Bio Introduction */}
        <div className="flex flex-col items-center gap-6 text-center">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/20 border border-blue-500/30 text-cyan-400 font-mono text-[10px] tracking-widest uppercase shadow-[0_0_15px_rgba(34,211,238,0.1)]"
          >
            <Brain size={12} className="text-cyan-400 animate-pulse" />
            <span>AI & DATA SCIENCE</span>
          </motion.div>

          {/* Primary Name Display */}
          <div className="flex flex-col gap-2 items-center w-full">
            <div className="relative w-full flex items-center justify-center min-h-[50px] sm:min-h-[70px] md:min-h-[90px] overflow-visible">
              <AnimatePresence mode="popLayout">
                {!isCursive ? (
                  <motion.h1 
                    key="sans"
                    initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white leading-none font-sans whitespace-nowrap drop-shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                  >
                    Mohit{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                      Sharma
                    </span>
                  </motion.h1>
                ) : (
                  <motion.h1 
                    key="cursive"
                    initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="text-4xl sm:text-5xl md:text-7xl font-normal text-white leading-none font-cursive whitespace-nowrap drop-shadow-[0_0_30px_rgba(168,85,247,0.2)] py-1.5"
                  >
                    Mohit{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                      Sharma
                    </span>
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            {/* Rotating Role Description */}
            <div className="h-8 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeSubtitleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-base sm:text-lg md:text-xl font-mono text-slate-300 font-semibold tracking-wider flex items-center gap-2 justify-center"
                >
                  <Sparkles size={16} className="text-indigo-400 shrink-0" />
                  {subtitles[activeSubtitleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Core Introduction */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-sans text-center"
          >
            I build intelligent machine learning systems, analyze complex datasets to extract key insights, and engineer high-performance web applications that bridge AI models with beautiful UX.
          </motion.p>

          {/* Core Stats / Quick Facts Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-3 gap-3 w-full max-w-md my-2"
          >
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-center items-center">
              <span className="text-lg md:text-xl font-black text-blue-400 leading-tight">1000+</span>
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider mt-0.5 text-center">LinkedIn Connections</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-center items-center">
              <span className="text-lg md:text-xl font-black text-indigo-400 leading-tight">2+</span>
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider mt-0.5 text-center">Industry Internships</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-center items-center">
              <span className="text-lg md:text-xl font-black text-cyan-400 leading-tight">4+</span>
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider mt-0.5 text-center">Professional Certs</span>
            </div>
          </motion.div>

          {/* Button Call To Action Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3.5 mt-2"
          >
            <button 
              onClick={() => scrollToSection("experience-section")}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono text-xs font-bold tracking-wider uppercase hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer group hover:scale-[1.02]"
            >
              View Experience 
              <ArrowRight size={13} className="text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={triggerResumeDownload}
              disabled={downloading}
              className="px-5 py-2.5 rounded-xl bg-white/[0.03] border border-slate-800 hover:border-slate-500 text-slate-200 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:bg-white/[0.06]"
            >
              <Download size={13} className={downloading ? "animate-bounce" : ""} />
              {downloading ? "Formatting..." : "Download Resume"}
            </button>

            <button 
              onClick={() => scrollToSection("contact-section")}
              className="px-5 py-2.5 rounded-xl border border-dashed border-indigo-500/40 hover:border-indigo-400 text-indigo-300 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:bg-indigo-500/5"
            >
              <Mail size={13} />
              Let's Talk
            </button>
          </motion.div>
        </div>

      </div>

      {/* Futuristic Row of Social Links Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative mt-12 md:mt-16 flex items-center justify-center gap-4 z-20"
      >
        <a
          href="https://www.linkedin.com/in/mohit-sharma-ba0585386/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-xl bg-white/[0.02] border border-slate-800/80 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.03)] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          title="LinkedIn"
        >
          <Linkedin size={18} />
        </a>

        <a
          href="https://github.com/mohitsharma111206"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-xl bg-white/[0.02] border border-slate-800/80 hover:border-purple-500/50 hover:bg-purple-500/10 text-slate-400 hover:text-purple-400 hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.03)] hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          title="GitHub"
        >
          <Github size={18} />
        </a>

        <a
          href="https://instagram.com/mohit.avx"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-xl bg-white/[0.02] border border-slate-800/80 hover:border-pink-500/50 hover:bg-pink-500/10 text-slate-400 hover:text-pink-400 hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.03)] hover:shadow-[0_0_20px_rgba(236,72,153,0.2)]"
          title="Instagram"
        >
          <Instagram size={18} />
        </a>

        <a
          href="mailto:mohitsharma.111206@gmail.com"
          className="p-3.5 rounded-xl bg-white/[0.02] border border-slate-800/80 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.03)] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          title="Gmail"
        >
          <Mail size={18} />
        </a>
      </motion.div>

    </section>
  );
}
