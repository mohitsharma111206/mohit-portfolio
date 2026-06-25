import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code, Brain, Database, Workflow, Terminal, Layout, Star } from "lucide-react";
import { skillsList } from "../types";

const categoryIcons: Record<string, React.ReactNode> = {
  "Programming": <Code size={18} className="text-blue-400" />,
  "Data Science": <Database size={18} className="text-cyan-400" />,
  "Artificial Intelligence": <Brain size={18} className="text-purple-400" />,
  "Web Development": <Layout size={18} className="text-pink-400" />,
  "Automation": <Workflow size={18} className="text-emerald-400" />,
  "Tools": <Terminal size={18} className="text-amber-400" />
};

const categoryDescriptions: Record<string, string> = {
  "Programming": "Writing clean, high-performance computational logic and algorithms.",
  "Data Science": "Extracting intelligence, analyzing distributions, and crafting interactive insights.",
  "Artificial Intelligence": "Harnessing foundation models, cognitive agents, and intelligent prompting.",
  "Web Development": "Designing responsive, highly accessible, and aesthetic user interfaces.",
  "Automation": "Connecting application programming interfaces (APIs) to optimize manual flows.",
  "Tools": "Version control, modern execution kernels, and rapid staging platforms."
};

const categoryColors: Record<string, { tag: string; border: string; glow: string; text: string }> = {
  "Programming": {
    tag: "bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20",
    border: "group-hover:border-blue-500/30",
    glow: "from-blue-500/5",
    text: "text-blue-400"
  },
  "Data Science": {
    tag: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500/20",
    border: "group-hover:border-cyan-500/30",
    glow: "from-cyan-500/5",
    text: "text-cyan-400"
  },
  "Artificial Intelligence": {
    tag: "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20",
    border: "group-hover:border-purple-500/30",
    glow: "from-purple-500/5",
    text: "text-purple-400"
  },
  "Web Development": {
    tag: "bg-pink-500/10 text-pink-300 border-pink-500/20 hover:bg-pink-500/20",
    border: "group-hover:border-pink-500/30",
    glow: "from-pink-500/5",
    text: "text-pink-400"
  },
  "Automation": {
    tag: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20",
    border: "group-hover:border-emerald-500/30",
    glow: "from-emerald-500/5",
    text: "text-emerald-400"
  },
  "Tools": {
    tag: "bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20",
    border: "group-hover:border-amber-500/30",
    glow: "from-amber-500/5",
    text: "text-amber-400"
  }
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Artificial Intelligence", "Data Science", "Programming", "Web Development", "Automation", "Tools"];

  // Unique categories list for grouping
  const activeCategories = selectedCategory === "All"
    ? Object.keys(categoryDescriptions)
    : [selectedCategory];

  return (
    <section 
      id="skills-section" 
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden border-t border-white/5"
    >
      {/* Background glowing effects */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-purple-400 uppercase">
            <Brain size={14} /> System Core Matrix
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none">
            Technical Skillset
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mt-1">
            An ecosystem of modern programming languages, data science frameworks, machine learning systems, and workflow automation tools.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wide transition-all duration-300 border flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    : "bg-white/[0.03] border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20"
                }`}
              >
                {cat === "All" ? <Star size={12} /> : categoryIcons[cat]}
                {cat === "Artificial Intelligence" ? "AI" : cat === "Web Development" ? "Web Dev" : cat}
              </button>
            );
          })}
        </div>

        {/* Skills Bento Grid Display */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {activeCategories.map((cat) => {
              const skillsInCat = skillsList.filter(s => s.category === cat);
              const colors = categoryColors[cat] || {
                tag: "bg-slate-500/10 text-slate-300 border-slate-500/20 hover:bg-slate-500/20",
                border: "group-hover:border-slate-500/30",
                glow: "from-slate-500/5",
                text: "text-slate-400"
              };

              return (
                <motion.div
                  key={cat}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className={`rounded-2xl p-6 bg-white/[0.02] border border-white/10 backdrop-blur-xl ${colors.border} transition-all duration-300 flex flex-col justify-between shadow-lg relative overflow-hidden group h-full min-h-[250px]`}
                >
                  {/* Subtle category glow background */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${colors.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div>
                    {/* Card Title & Icon */}
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                        {categoryIcons[cat]}
                      </div>
                      <h3 className="text-white font-bold tracking-tight text-lg">
                        {cat === "Artificial Intelligence" ? "AI & Generative AI" : cat}
                      </h3>
                    </div>

                    {/* Subtitle / Description */}
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed relative z-10">
                      {categoryDescriptions[cat]}
                    </p>
                  </div>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {skillsInCat.map((skill, sIdx) => (
                      <motion.span
                        key={skill.name}
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium font-sans transition-all duration-200 cursor-default ${colors.tag}`}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
