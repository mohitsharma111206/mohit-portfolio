import React from "react";
import { motion } from "motion/react";
import { GraduationCap, MapPin, Sparkles, BookOpen, Star, Binary } from "lucide-react";
import { educationList } from "../types";

export default function Education() {
  return (
    <section 
      id="education-section" 
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden border-t border-white/5"
    >
      {/* Background glow graphics */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-purple-400 uppercase">
            <GraduationCap size={14} /> Academic Encampment
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none">
            Education Timeline
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mt-1">
            Academic progression and structured foundation in Computer Science and intelligent systems.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative pl-6 sm:pl-8 border-l border-white/10 flex flex-col gap-12">
          {educationList.map((edu, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Pulsing visual node on timeline */}
              <div className="absolute -left-[39px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#050505] border-2 border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.4)] transition-all group-hover:scale-125 group-hover:border-cyan-400 duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>
              
              {/* Premium Card container */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-300 shadow-xl relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-36 h-36 bg-purple-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-colors" />

                {/* Card Title Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-semibold block mb-1">
                      {edu.degree}
                    </span>
                    <h3 className="text-white font-bold text-xl sm:text-2xl tracking-tight group-hover:text-cyan-300 transition-colors">
                      {edu.institution}
                    </h3>
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 font-mono text-xs tracking-wider">
                      {edu.duration}
                    </span>
                  </div>
                </div>

                {/* Subdetails Info */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400 font-mono mb-6">
                  <div className="flex items-center gap-1.5">
                    <Binary size={14} className="text-purple-400" /> Specialization: <span className="text-white font-sans font-semibold">{edu.field}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-slate-500" /> {edu.location}
                  </div>
                </div>

                {/* Coursework & Achievements List */}
                <div className="flex flex-col gap-4">
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-semibold flex items-center gap-1">
                    <Star size={10} className="text-cyan-400" /> KEY SCHOLARSHIPS & CURRICULUM FOCUS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {edu.achievements.map((ach, aIdx) => (
                      <div 
                        key={aIdx} 
                        className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors duration-200 flex gap-3 items-start"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0 animate-pulse" />
                        <span className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
