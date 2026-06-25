import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, GraduationCap, MapPin, Mail, Linkedin, Github, Download, Sparkles, User, FileText, Instagram } from "lucide-react";
import { personalInfo, educationList } from "../types";
import profilePic from "../assets/images/profile.jpg";
export default function About() {
  const [downloading, setDownloading] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  

  // Trigger a professional print/PDF layout download dynamically!
  const triggerResumeDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      // Create a printer friendly resume style window
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
      id="about-section" 
      className="relative min-h-screen py-24 px-6 md:px-12 bg-transparent overflow-hidden flex flex-col justify-center border-t border-white/5"
    >
      {/* Background visual accents */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Profile HUD & Interactive Terminal Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          
          {/* Cyber HUD Identity Core */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            
            {/* Spinning Outer Rings representing AI systems */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-slate-800 border-t-purple-500/40"
            />
            <div className="absolute inset-8 rounded-full bg-white/[0.03] border-2 border-cyan-500/30 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.25)] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950 to-purple-950 flex items-center justify-center text-slate-500 overflow-hidden">
                {profilePic ? (
                  <img 
                    src={profilePic} 
                    alt="Mohit Sharma Profile" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  /* Futuristic wireframe or fallback avatar rendering */
                  <User size={64} className="text-cyan-400 opacity-60 animate-pulse" />
                )}
                
                {/* Tech scan lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                
                {/* HUD Angle indicators over the picture */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
              </div>
            </div>

            {/* Orbiting Tech Nodes */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-2 left-10 p-2 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center gap-1.5"
            >
              <GraduationCap size={14} /> GEC Bikaner
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 right-8 p-2 rounded-xl bg-slate-900/90 border border-purple-500/30 text-purple-400 text-xs font-mono shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center gap-1.5"
            >
              <Sparkles size={12} /> B.Tech 2025-29
            </motion.div>
          </div>

          {/* Social Icons Dock */}
          <div className="flex gap-4 mt-8">
            {[
              { icon: <Linkedin size={18} />, href: personalInfo.linkedin, color: "hover:text-blue-400 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(96,165,250,0.3)]", label: "LinkedIn" },
              { icon: <Github size={18} />, href: personalInfo.github, color: "hover:text-purple-400 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(192,132,252,0.3)]", label: "GitHub" },
              { 
                icon: <Mail size={18} />, 
                href: "#", 
                onClick: (e: React.MouseEvent) => {
                  e.preventDefault();
                  setShowEmail(!showEmail);
                },
                color: "hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]", 
                label: "Email" 
              },
              { icon: <Instagram size={18} />, href: personalInfo.instagram, color: "hover:text-pink-400 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]", label: "Instagram" },
            ].map((soc, idx) => (
              <motion.a
                key={idx}
                href={soc.href}
                onClick={soc.onClick}
                target={soc.href === "#" ? undefined : "_blank"}
                rel={soc.href === "#" ? undefined : "noreferrer"}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-xl text-slate-400 flex items-center justify-center transition-all duration-300 ${soc.color}`}
                aria-label={soc.label}
              >
                {soc.icon}
              </motion.a>
            ))}
          </div>

          {/* Email Reveal Panel */}
          <AnimatePresence>
            {showEmail && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-4 p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between gap-4 w-full max-w-sm overflow-hidden"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-mono text-cyan-500 uppercase tracking-widest">Active Email</span>
                  <span className="font-mono text-xs text-cyan-300 select-all font-bold">{personalInfo.email}</span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(personalInfo.email);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-2.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/20 text-[10px] font-mono rounded-lg transition-all duration-200 cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Bio & Education Timeline */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Identity Header */}
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
              <User size={14} /> Profile Identity Card
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
              Mohit Sharma
            </h1>
            <p className="text-lg md:text-xl font-mono text-slate-300 font-medium">
              AI & Data Science Student & Enthusiast
            </p>
          </div>

          {/* Story Narrative */}
          <div className="text-white/60 text-sm md:text-base leading-relaxed flex flex-col gap-4">
            <p className="border-l-2 border-cyan-500/50 pl-4 py-1 italic bg-cyan-500/5 rounded-r-lg">
              "{personalInfo.intro}"
            </p>
            <p>{personalInfo.story}</p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerResumeDownload}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs tracking-wider uppercase flex items-center gap-2 hover:border-cyan-500/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all cursor-pointer"
            >
              <Download size={14} className={downloading ? "animate-bounce" : ""} />
              {downloading ? "Generating..." : "Resume"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contact = document.getElementById("contact-section");
                if (contact) contact.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-black font-mono text-xs tracking-wider uppercase flex items-center gap-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all cursor-pointer"
            >
              <Mail size={14} /> Hire Me
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
}
