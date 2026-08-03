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
    window.open("/resume.html", "_blank");
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
