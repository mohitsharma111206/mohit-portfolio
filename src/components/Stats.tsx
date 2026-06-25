import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Users, Briefcase, Award, Brain, Sparkles } from "lucide-react";
import { statistics } from "../types";

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      id="highlights-section"
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
            <Sparkles size={14} className="text-cyan-400 animate-pulse" /> Milestones
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none">
            Professional Highlights
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mt-1">
            Real-world achievements, engineering credentials, and academic focal points in AI and Machine Learning.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, idx) => {
            const isSpecialCard = stat.value === "AI & DS";
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between min-h-[220px] shadow-lg group relative overflow-hidden"
              >
                {/* Decorative subtle ambient lights */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors duration-300" />

                {/* Card Header: Icon */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {idx === 0 && <Users size={20} />}
                    {idx === 1 && <Briefcase size={20} className="text-purple-400 group-hover:text-purple-300" />}
                    {idx === 2 && <Award size={20} className="text-pink-400 group-hover:text-pink-300" />}
                    {idx === 3 && <Brain size={20} className="text-emerald-400 group-hover:text-emerald-300" />}
                  </div>
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest font-semibold">
                    Coordinate {idx + 1}
                  </span>
                </div>

                {/* Card Body: Dynamic text / counter */}
                <div className="flex-1 flex flex-col justify-end">
                  {isSpecialCard ? (
                    <div className="flex flex-col text-left items-start">
                      <span className="text-lg md:text-xl font-extrabold text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text tracking-tight font-sans">
                        AI & Data Science Student
                      </span>
                    </div>
                  ) : (
                    <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-sans text-left">
                      <Counter 
                        target={stat.targetNumber} 
                        trigger={isInView} 
                        suffix={stat.value.includes("+") ? "+" : ""} 
                      />
                    </div>
                  )}

                  {/* Title / Label */}
                  <div className="text-xs md:text-sm font-sans font-bold text-slate-200 mt-2 text-left tracking-wide group-hover:text-cyan-400 transition-colors">
                    {isSpecialCard ? "Building Intelligent Systems" : stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-[11px] text-slate-400 mt-1.5 leading-relaxed text-left max-w-xs font-mono">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

interface CounterProps {
  target: number;
  trigger: boolean;
  suffix: string;
}

function Counter({ target, trigger, suffix }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    if (isNaN(Number(target)) || target === 0) {
      return;
    }

    let start = 0;
    const end = target;
    const duration = 1500; // 1.5 seconds total animation
    const steps = duration / 16;
    const increment = Math.ceil(end / steps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [trigger, target]);

  return (
    <span className="bg-gradient-to-r from-white via-cyan-100 to-slate-300 bg-clip-text text-transparent font-black">
      {count}{suffix}
    </span>
  );
}
