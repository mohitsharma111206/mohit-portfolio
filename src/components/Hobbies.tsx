import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PenTool, Music, Mic, BookOpen, Code, Palette, Sparkles } from "lucide-react";
import { hobbiesList, Hobby } from "../types";

const hobbyIcons: Record<string, React.ReactNode> = {
  "PenTool": <PenTool size={20} className="text-pink-400 group-hover:rotate-12 transition-transform duration-300" />,
  "Music": <Music size={20} className="text-amber-400 group-hover:scale-110 transition-transform duration-300" />,
  "Mic": <Mic size={20} className="text-purple-400 group-hover:-translate-y-0.5 transition-transform duration-300" />,
  "BookOpen": <BookOpen size={20} className="text-cyan-400 group-hover:rotate-6 transition-transform duration-300" />,
  "Code": <Code size={20} className="text-emerald-400 group-hover:translate-x-0.5 transition-transform duration-300" />
};

const hobbyGradients: Record<string, string> = {
  "Sketching": "from-pink-500/10 via-rose-500/5 to-transparent border-pink-500/20 hover:border-pink-500/30 text-pink-400",
  "Playing Guitar": "from-amber-500/10 via-orange-500/5 to-transparent border-amber-500/20 hover:border-amber-500/30 text-amber-400",
  "Singing": "from-purple-500/10 via-violet-500/5 to-transparent border-purple-500/20 hover:border-purple-500/30 text-purple-400",
  "Reading Books": "from-cyan-500/10 via-blue-500/5 to-transparent border-cyan-500/20 hover:border-cyan-500/30 text-cyan-400",
  "Coding": "from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-500/20 hover:border-emerald-500/30 text-emerald-400"
};

const floatingNotes = [
  { char: "♪", left: "15%", delay: 0, duration: 2.5, size: "text-lg", xOffset: -15 },
  { char: "♫", left: "45%", delay: 0.3, duration: 2.8, size: "text-2xl", xOffset: 20 },
  { char: "♬", left: "70%", delay: 0.1, duration: 2.2, size: "text-xl", xOffset: -10 },
  { char: "♩", left: "30%", delay: 0.6, duration: 2.6, size: "text-lg", xOffset: 15 },
  { char: "🎵", left: "60%", delay: 0.4, duration: 3.0, size: "text-xl", xOffset: -20 },
  { char: "🎶", left: "85%", delay: 0.8, duration: 2.4, size: "text-lg", xOffset: 25 },
  { char: "♫", left: "25%", delay: 1.1, duration: 2.7, size: "text-xl", xOffset: 12 },
  { char: "♬", left: "55%", delay: 1.3, duration: 2.9, size: "text-2xl", xOffset: -18 },
];

const codingLines = [
  {
    indent: 0,
    tokens: [
      { text: "def ", type: "keyword" },
      { text: "optimize_system", type: "function" },
      { text: "(", type: "punctuation" },
      { text: "data", type: "parameter" },
      { text: "):", type: "punctuation" }
    ]
  },
  {
    indent: 1,
    tokens: [
      { text: "model ", type: "variable" },
      { text: "= ", type: "operator" },
      { text: "NeuralNet", type: "function" },
      { text: "()", type: "punctuation" }
    ]
  },
  {
    indent: 1,
    tokens: [
      { text: "model", type: "variable" },
      { text: ".", type: "punctuation" },
      { text: "optimize", type: "method" },
      { text: "(", type: "punctuation" },
      { text: "data", type: "parameter" },
      { text: ")", type: "punctuation" }
    ]
  },
  {
    indent: 1,
    tokens: [
      { text: "return ", type: "keyword" },
      { text: "model", type: "variable" }
    ]
  }
];

function HobbyCard({ hobby, idx }: { hobby: Hobby; idx: number; key?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const styleClass = hobbyGradients[hobby.name] || "from-slate-500/10 to-transparent border-slate-800";
  const isSketching = hobby.name === "Sketching";
  const isGuitar = hobby.name === "Playing Guitar";
  const isSinging = hobby.name === "Singing";
  const isReading = hobby.name === "Reading Books";
  const isCoding = hobby.name === "Coding";

  const isActive = isHovered;

  return (
    <motion.div
      key={hobby.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-2xl p-5 bg-gradient-to-b ${styleClass} bg-white/[0.01] backdrop-blur-sm border flex flex-col justify-between transition-all duration-300 shadow-md group relative overflow-hidden min-h-[220px] ${
        isSketching ? "lg:col-span-2" : ""
      }`}
      style={{ willChange: "transform, opacity" }}
    >
      {/* Micro tech panel grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none opacity-40" />

      {/* Card Top: Icon & Glow orb */}
      <div className="flex justify-between items-start relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner relative z-10">
          {hobbyIcons[hobby.iconName]}
        </div>
        
        {/* Glowing bubble relative to hover */}
        <div className="w-8 h-8 rounded-full bg-current opacity-5 group-hover:scale-[3] transition-transform duration-500 blur-md" />
      </div>

      {/* Animated scenery sketch inside Sketching card */}
      {isSketching && (
        <div 
          className="absolute inset-x-0 bottom-0 top-14 flex items-center justify-center pointer-events-none overflow-hidden opacity-90 z-0 px-2"
          style={{ willChange: "transform, opacity" }}
        >
          <svg
            viewBox="0 0 200 110"
            className="w-full h-full max-h-[140px] text-pink-400/50"
            fill="none"
          >
            {/* Sun */}
            <motion.circle
              cx="100"
              cy="35"
              r="12"
              stroke="currentColor"
              strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
            />
            
            {/* Mountain 1 */}
            <motion.path
              d="M 15 85 L 60 40 L 105 85"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Mountain 2 */}
            <motion.path
              d="M 95 85 L 145 35 L 195 85"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Middle Mountain */}
            <motion.path
              d="M 50 85 L 100 48 L 150 85"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Pine Tree 1 */}
            <motion.path
              d="M 35 85 L 35 70 M 31 77 L 35 73 L 39 77 M 29 82 L 35 76 L 41 82"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
            />

            {/* Pine Tree 2 */}
            <motion.path
              d="M 165 85 L 165 67 M 161 74 L 165 70 L 169 74 M 158 80 L 165 73 L 172 80"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
            />

            {/* Lake Wave 1 */}
            <motion.path
              d="M 20 92 Q 60 89 100 92 T 180 92"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.7 }}
            />

            {/* Lake Wave 2 */}
            <motion.path
              d="M 35 97 Q 80 94 125 97 T 165 97"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 1.0 }}
            />

            {/* Sailboat */}
            <motion.path
              d="M 115 90 L 125 90 L 122 93 Z M 120 90 L 120 83 L 124 90 Z"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
            />

            {/* Birds */}
            <motion.path
              d="M 55 22 Q 58 19 61 22 Q 64 19 67 22"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 1.3 }}
            />
            <motion.path
              d="M 135 18 Q 138 15 141 18 Q 144 15 147 18"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 1.4 }}
            />
          </svg>
        </div>
      )}

      {/* Animated guitar line-art drawing inside Playing Guitar card */}
      {isGuitar && (
        <div 
          className="absolute right-0 bottom-0 w-[110px] h-[155px] pointer-events-none overflow-visible opacity-90 z-0"
          style={{ transform: "rotate(-12deg) translate(8px, 12px)", willChange: "transform, opacity" }}
        >
          <svg
            viewBox="0 0 100 160"
            className="w-full h-full text-amber-400/40"
            fill="none"
          >
            {/* Guitar Body Outline */}
            <motion.path
              d="M 50 145 C 25 145, 15 115, 35 95 C 20 75, 30 55, 50 55 C 70 55, 80 75, 65 95 C 85 115, 75 145, 50 145 Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.1 }}
            />

            {/* Sound hole */}
            <motion.circle
              cx="50"
              cy="80"
              r="8"
              stroke="currentColor"
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Rosette soundhole border */}
            <motion.circle
              cx="50"
              cy="80"
              r="11"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeDasharray="2,2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Neck */}
            <motion.path
              d="M 47 55 L 47 15 L 53 15 L 53 55"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Frets */}
            {[22, 28, 34, 40, 46, 52].map((fretY, fIdx) => (
              <motion.line
                key={`fret-${fIdx}`}
                x1="47"
                y1={fretY}
                x2="53"
                y2={fretY}
                stroke="currentColor"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isActive ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.0, ease: "easeInOut", delay: 0.6 + fIdx * 0.1 }}
              />
            ))}

            {/* Headstock */}
            <motion.path
              d="M 46 15 L 44 5 L 56 5 L 54 15 Z"
              stroke="currentColor"
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.7 }}
            />

            {/* Tuning pegs */}
            {[7, 10, 13].map((pegY, pIdx) => (
              <React.Fragment key={`pegs-${pIdx}`}>
                {/* Left peg */}
                <motion.line
                  x1="45"
                  y1={pegY}
                  x2="41"
                  y2={pegY}
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isActive ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 + pIdx * 0.1 }}
                />
                <motion.circle
                  cx="40"
                  cy={pegY}
                  r="1"
                  fill="currentColor"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isActive ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + pIdx * 0.1 }}
                />
                {/* Right peg */}
                <motion.line
                  x1="55"
                  y1={pegY}
                  x2="59"
                  y2={pegY}
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isActive ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 + pIdx * 0.1 }}
                />
                <motion.circle
                  cx="60"
                  cy={pegY}
                  r="1"
                  fill="currentColor"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isActive ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + pIdx * 0.1 }}
                />
              </React.Fragment>
            ))}

            {/* Bridge */}
            <motion.path
              d="M 38 120 L 62 120"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Strings */}
            {[48, 49.3, 50.7, 52].map((stringX, sIdx) => (
              <motion.line
                key={`string-${sIdx}`}
                x1={stringX}
                y1="120"
                x2={stringX}
                y2="10"
                stroke="currentColor"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isActive ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 2.0, ease: "easeInOut", delay: 1.1 + sIdx * 0.15 }}
              />
            ))}
          </svg>
        </div>
      )}

      {/* Floating music notes inside Singing card */}
      <AnimatePresence>
        {isActive && isSinging && (
          <div 
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
            style={{ willChange: "transform, opacity" }}
          >
            {floatingNotes.map((note, nIdx) => (
              <motion.span
                key={nIdx}
                initial={{ 
                  opacity: 0, 
                  y: 190, 
                  x: 0,
                  scale: 0.5, 
                  rotate: -15 
                }}
                animate={{ 
                  opacity: [0, 0.8, 0.8, 0],
                  y: -40,
                  x: [0, note.xOffset, note.xOffset * -0.5, note.xOffset],
                  scale: [0.5, 1.1, 1.1, 0.6],
                  rotate: [15, -20, 20, -10]
                }}
                transition={{
                  duration: note.duration,
                  delay: note.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`absolute text-purple-400 font-mono select-none ${note.size}`}
                style={{ left: note.left }}
              >
                {note.char}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Animated book opening line-art drawing inside Reading Books card */}
      {isReading && (
        <div 
          className="absolute right-2 bottom-2 w-[110px] h-[110px] pointer-events-none overflow-visible opacity-90 z-0"
          style={{ transform: "rotate(-5deg)", willChange: "transform, opacity" }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-cyan-400/45"
            fill="none"
          >
            {/* Left Cover */}
            <motion.path
              d="M 50 80 C 35 80, 22 76, 18 74 L 18 34 C 22 36, 35 40, 50 40"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0.2, opacity: 0.3 }}
              animate={isActive ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0.2, opacity: 0.3 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {/* Right Cover */}
            <motion.path
              d="M 50 80 C 65 80, 78 76, 82 74 L 82 34 C 78 36, 65 40, 50 40"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0.2, opacity: 0.3 }}
              animate={isActive ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0.2, opacity: 0.3 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
            />

            {/* Spine */}
            <motion.path
              d="M 50 40 L 50 80"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0.5, opacity: 0.3 }}
              animate={isActive ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0.5, opacity: 0.3 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Inner Left Page */}
            <motion.path
              d="M 50 77 C 35 77, 24 73, 20 71 L 20 37 C 24 39, 35 43, 50 43"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut", delay: 0.2 }}
            />

            {/* Inner Right Page */}
            <motion.path
              d="M 50 77 C 65 77, 76 73, 80 71 L 80 37 C 76 39, 65 43, 50 43"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Flipping page line effect */}
            {isActive && (
              <motion.path
                d="M 50 77 C 45 74, 45 46, 50 43"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 50 77 C 45 74, 45 46, 50 43",
                    "M 50 77 C 50 77, 50 43, 50 43",
                    "M 50 77 C 55 74, 55 46, 50 43",
                    "M 50 77 C 50 77, 50 43, 50 43",
                    "M 50 77 C 45 74, 45 46, 50 43"
                  ]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}

            {/* Floating science/philosophical elements when hovered */}
            {isActive && (
              <>
                {/* Floating science & math/code symbols */}
                <motion.g
                  initial={{ opacity: 0, y: 35, x: 50, scale: 0.6 }}
                  animate={{ opacity: [0, 1, 1, 0], y: -5, x: 30, scale: [0.6, 0.9, 0.9, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                >
                  <text x="0" y="0" fill="currentColor" className="text-[7px] font-mono select-none">∑</text>
                </motion.g>

                <motion.g
                  initial={{ opacity: 0, y: 35, x: 50, scale: 0.6 }}
                  animate={{ opacity: [0, 1, 1, 0], y: -15, x: 65, scale: [0.6, 0.9, 0.9, 0.5] }}
                  transition={{ duration: 3.0, repeat: Infinity, delay: 0.8 }}
                >
                  <text x="0" y="0" fill="currentColor" className="text-[6px] font-mono select-none">∞</text>
                </motion.g>

                <motion.g
                  initial={{ opacity: 0, y: 35, x: 50, scale: 0.6 }}
                  animate={{ opacity: [0, 1, 1, 0], y: -25, x: 45, scale: [0.6, 0.8, 0.8, 0.4] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: 1.4 }}
                >
                  <text x="0" y="0" fill="currentColor" className="text-[7px] font-mono select-none">φ</text>
                </motion.g>

                {/* Floating sparkles */}
                <motion.path
                  d="M 35 25 L 37 27 L 35 29 L 33 27 Z"
                  fill="currentColor"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0.4, 1.1, 0.4], y: -12 }}
                  transition={{ duration: 2.0, repeat: Infinity, delay: 0.4 }}
                />

                <motion.path
                  d="M 65 20 L 67 22 L 65 24 L 63 22 Z"
                  fill="currentColor"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0.4, 1.1, 0.4], y: -15 }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: 1.0 }}
                />
              </>
            )}
          </svg>
        </div>
      )}

      {/* Mini VS Code Editor inside Coding card */}
      <AnimatePresence>
        {isActive && isCoding && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-x-2.5 bottom-2.5 top-14 pointer-events-none overflow-hidden z-10 flex flex-col rounded-xl border border-emerald-500/30 bg-[#0c0c0e] shadow-2xl"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Editor Title Bar */}
            <div className="bg-[#141416] px-2.5 py-1.5 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[7.5px] text-slate-500 font-mono tracking-wider">VS Code</span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#0c0c0e] border-t border-x border-white/5 rounded-t text-[8px] text-emerald-400 font-mono tracking-tight">
                <span>main.py</span>
              </div>
            </div>

            {/* Editor Code Area */}
            <div className="p-2.5 flex-1 font-mono text-[9px] leading-relaxed text-slate-300 flex flex-col gap-1 overflow-hidden bg-[#0c0c0e]">
              <div className="flex flex-col gap-0.5">
                {codingLines.map((line, lIdx) => (
                  <div key={lIdx} className="flex items-start gap-1.5">
                    <span className="text-slate-600 select-none text-[8px] w-2 text-right">{lIdx + 1}</span>
                    <div className="flex flex-wrap" style={{ paddingLeft: `${line.indent * 12}px` }}>
                      {line.tokens.map((token, tIdx) => (
                        <motion.span
                          key={tIdx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.15, delay: lIdx * 0.25 + tIdx * 0.04 }}
                          className={
                            token.type === "keyword" ? "text-pink-400 font-semibold" :
                            token.type === "function" ? "text-blue-400" :
                            token.type === "method" ? "text-amber-300" :
                            token.type === "parameter" ? "text-orange-300" :
                            token.type === "variable" ? "text-cyan-300" :
                            token.type === "string" ? "text-green-400" :
                            token.type === "comment" ? "text-slate-500 italic font-light" :
                            token.type === "operator" ? "text-fuchsia-400" :
                            "text-slate-300"
                          }
                        >
                          {token.text}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Blinking cursor at the end */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-1 h-3 bg-emerald-400 ml-5 self-start mt-0.5"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Bottom: Description & Title */}
      <motion.div 
        animate={{ 
          opacity: (isActive && isCoding) ? 0 : 1,
          y: (isActive && isCoding) ? 10 : 0,
          scale: (isActive && isCoding) ? 0.95 : 1
        }}
        transition={{ duration: 0.25 }}
        className="relative z-10 mt-6 bg-[#030712]/30 backdrop-blur-[1px] p-2.5 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors"
      >
        <h3 className="text-white font-extrabold text-base tracking-tight mb-2 flex items-center gap-1">
          {hobby.name} <Sparkles size={10} className="opacity-0 group-hover:opacity-60 transition-opacity" />
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed font-sans">
          {hobby.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Hobbies() {
  return (
    <section 
      id="hobbies-section" 
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
            <Palette size={14} /> Creative Divergence
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none">
            Creative Outlets & Hobbies
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mt-1">
            Understanding the builder behind the terminal. These creative outlets fuel my logic, balance my routine, and inspire novel approaches.
          </p>
        </div>

        {/* Hobbies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {hobbiesList.map((hobby, idx) => (
            <HobbyCard key={hobby.name} hobby={hobby} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
