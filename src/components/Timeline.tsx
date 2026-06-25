import React from "react";
import { motion } from "motion/react";
import { Briefcase, Calendar, FolderGit, Cpu, Layers, ExternalLink, Globe } from "lucide-react";
import { internships } from "../types";

export default function Timeline() {
  return (
    <section 
      id="experience-section" 
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden border-t border-white/5"
    >
      {/* Visual neon backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
            <Briefcase size={14} /> Career Diagnostics
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mt-1">
            Bridging conceptual machine learning models and dynamic interfaces through real-world industry apprenticeships.
          </p>
        </div>

        {/* Internships Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {internships.map((job, idx) => {
            const isShadowFox = job.company === "ShadowFox";
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-3xl p-6 bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-cyan-500/30 flex flex-col justify-between transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.4)] group overflow-hidden`}
              >
                {/* Glowing subtle corner light */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${isShadowFox ? 'from-cyan-500/5' : 'from-purple-500/5'} to-transparent rounded-full blur-2xl pointer-events-none`} />

                {/* Card Core Content */}
                <div>
                  
                  {/* Company & Duration Bar */}
                  <div className="flex justify-between items-start gap-4 mb-5">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-wider font-semibold text-slate-300 uppercase">
                        {isShadowFox ? <Cpu size={12} className="text-cyan-400" /> : <Layers size={12} className="text-purple-400" />}
                        {job.company}
                      </div>
                      <h3 className="text-white font-extrabold text-xl tracking-tight mt-3 group-hover:text-cyan-300 transition-colors">
                        {job.role}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                      <Calendar size={12} className="text-slate-500" /> {job.duration}
                    </div>
                  </div>

                  {/* Responsibility Bullet Points */}
                  <div className="flex flex-col gap-3 mb-6">
                    {job.description.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex gap-2.5 text-xs text-slate-300 leading-relaxed">
                        <span className={`text-sm leading-none font-bold ${isShadowFox ? 'text-cyan-400' : 'text-purple-400'}`}>
                          ›
                        </span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Skills/Tags Footer */}
                <div className="border-t border-white/5 pt-5">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
                    Tech Stack & Concepts
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className={`px-2.5 py-1 rounded bg-white/5 border ${
                          isShadowFox 
                            ? 'border-cyan-500/20 text-cyan-400 hover:border-cyan-500/40' 
                            : 'border-purple-500/20 text-purple-400 hover:border-purple-500/40'
                        } font-mono text-[9px] tracking-wide rounded-md transition-all`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Graphic indicators */}
                <div className="absolute bottom-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  {isShadowFox ? <FolderGit size={100} /> : <Globe size={100} />}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
