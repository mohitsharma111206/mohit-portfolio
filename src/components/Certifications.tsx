import React from "react";
import { motion } from "motion/react";
import { Award, CheckCircle2, Calendar } from "lucide-react";
import { certifications } from "../types";

export default function Certifications() {
  return (
    <section 
      id="certifications-section" 
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden border-t border-white/5"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
            <Award size={14} /> Academic Proof
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none">
            Certifications & Accomplishments
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mt-1">
            Verified proof of specialized training, internships, data analytics fluency, and core AI systems mastery.
          </p>
        </div>

        {/* Categories Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Featured Certificates Column (ShadowFox & Tranqli) - Priority Span 7 */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Featured Credentials
            </div>

            {certifications.filter(c => c.id.includes("shadowfox") || c.id.includes("tranqli")).map((cert) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-300 group shadow-lg flex flex-col justify-between"
              >
                {/* Visual decoration: Neon aura */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />

                <div>
                  {/* Title Header */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[9px] tracking-wider uppercase font-semibold">
                        {cert.organization}
                      </span>
                      <h3 className="text-white font-black text-xl tracking-tight mt-2.5 group-hover:text-cyan-300 transition-colors">
                        {cert.title}
                      </h3>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <CheckCircle2 size={10} /> VERIFIED
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {cert.issued}
                      </span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 my-4">
                    {cert.highlights.map((hl, hlIdx) => (
                      <div key={hlIdx} className="flex gap-2 text-xs text-slate-400">
                        <span className="text-cyan-400">•</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer View Action */}
                <div className="border-t border-white/5 pt-4 mt-2 flex items-center">
                  <span className="text-[10px] font-mono text-slate-500">
                    ID: {cert.id.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Standard Certifications Column (Simplilearn/Google Analytics) - Span 5 */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Professional Accreditations
            </div>

            {certifications.filter(c => !c.id.includes("shadowfox") && !c.id.includes("tranqli")).map((cert) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-purple-500/30 transition-all duration-300 group shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[9px] tracking-wider uppercase font-semibold">
                        {cert.organization}
                      </span>
                      <h3 className="text-white font-bold text-base tracking-tight mt-2 group-hover:text-purple-300 transition-colors">
                        {cert.title}
                      </h3>
                    </div>

                    <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                      <Calendar size={10} /> {cert.issued}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 my-3">
                    {cert.highlights.slice(0, 3).map((hl, hlIdx) => (
                      <div key={hlIdx} className="flex gap-2 text-xs text-slate-400">
                        <span className="text-purple-400">•</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                    {cert.highlights.length > 3 && (
                      <div className="text-[10px] font-mono text-slate-600 pl-4">
                        + {cert.highlights.length - 3} more modules
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3 flex items-center mt-2">
                  <span className="text-[9px] font-mono text-slate-600">
                    ID: {cert.id.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
