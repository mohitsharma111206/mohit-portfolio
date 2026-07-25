import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { PenTool, Music, Mic, BookOpen, Code, Sparkles } from "lucide-react";
import { hobbiesList, Hobby } from "../types";

// --- MICRO-INTERACTION CONTROLLER ---
const AnimatedIcon = ({ name, isActive, prefersReducedMotion }: { name: string, isActive: boolean, prefersReducedMotion: boolean | null }) => {
  const controls = useAnimation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    let isMounted = true;
    
    const scheduleNext = () => {
      if (!isMounted) return;
      if (isActive) return; 
      
      const delay = 5000 + Math.random() * 5000;
      timeoutRef.current = setTimeout(async () => {
        if (!isMounted || isActive) return;
        await controls.start("action");
        await controls.start("rest");
        scheduleNext();
      }, delay);
    };
    
    scheduleNext();
    
    return () => {
      isMounted = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isActive, controls, prefersReducedMotion]);

  const icons: Record<string, JSX.Element> = {
    "PenTool": <PenTool size={24} className="text-pink-400/90" />,
    "Music": <Music size={24} className="text-amber-400/90" />,
    "Mic": <Mic size={24} className="text-purple-400/90" />,
    "BookOpen": <BookOpen size={24} className="text-cyan-400/90" />,
    "Code": <Code size={24} className="text-emerald-400/90" />
  };

  const variants = {
    "PenTool": {
      rest: { rotate: 0 },
      action: { rotate: [0, 15, -5, 0], transition: { duration: 0.6, ease: "easeInOut" } }
    },
    "Music": {
      rest: { y: 0, scale: 1 },
      action: { y: [0, -5, 0], scale: [1, 1.1, 1], transition: { duration: 0.5, ease: "easeOut" } }
    },
    "Mic": {
      rest: { scale: 1 },
      action: { scale: [1, 1.15, 1], transition: { duration: 0.4, ease: "easeInOut" } }
    },
    "BookOpen": {
      rest: { rotateY: 0 },
      action: { rotateY: [0, -15, 0], transition: { duration: 0.5, ease: "easeInOut" } }
    },
    "Code": {
      rest: { opacity: 1 },
      action: { opacity: [1, 0.4, 1], transition: { duration: 0.4, ease: "linear" } }
    }
  };

  if (prefersReducedMotion) return icons[name];

  return (
    <motion.div 
      initial="rest"
      animate={controls}
      variants={variants[name as keyof typeof variants]} 
      className="origin-center relative z-10"
      style={{ transformStyle: "preserve-3d" }}
    >
      {icons[name]}
    </motion.div>
  );
};

// --- DATA ---
const hobbyThemes: Record<string, { rgb: string, hex: string }> = {
  "Sketching": { rgb: "236, 72, 153", hex: "#ec4899" },
  "Playing Guitar": { rgb: "245, 158, 11", hex: "#f59e0b" },
  "Singing": { rgb: "168, 85, 247", hex: "#a855f7" },
  "Reading Books": { rgb: "6, 182, 212", hex: "#06b6d4" },
  "Coding": { rgb: "16, 185, 129", hex: "#10b981" }
};

// --- COMPONENTS ---
interface BentoCardProps {
  hobby: Hobby;
  idx: number;
  isHovered: boolean;
  isAnotherHovered: boolean;
  onEnter: () => void;
  hoverPositionRef?: React.MutableRefObject<{ x: number; y: number } | null>;
}

function BentoCard({ hobby, idx, isHovered, isAnotherHovered, onEnter, hoverPositionRef }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = hobbyThemes[hobby.name] || hobbyThemes["Coding"];
  const prefersReducedMotion = useReducedMotion();

  // Determine grid span based on index
  // 0, 1, 2 go top row (col-span-2)
  // 3, 4 go bottom row (col-span-3)
  let spanClass = "col-span-1 md:col-span-2 lg:col-span-2";
  if (idx === 2) {
    spanClass = "col-span-1 md:col-span-4 lg:col-span-2"; // Singing spans full width on tablet
  } else if (idx === 3 || idx === 4) {
    spanClass = "col-span-1 md:col-span-2 lg:col-span-3"; // Bottom row spans half on desktop
  }

  const handleEnter = () => {
    onEnter();
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerEnter={handleEnter}
      animate={{
        scale: isHovered ? 1.02 : 1,
        y: isHovered ? -4 : 0,
        filter: isHovered 
          ? "brightness(1.1) drop-shadow(0 25px 35px rgba(0,0,0,0.4))" 
          : isAnotherHovered 
            ? "brightness(0.7) grayscale(0.2) drop-shadow(0 0px 0px rgba(0,0,0,0))" 
            : "brightness(1) drop-shadow(0 4px 10px rgba(0,0,0,0.1))"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        zIndex: isHovered ? 50 : 10,
        borderColor: isHovered ? `rgba(${theme.rgb}, 0.5)` : 'rgba(255,255,255,0.08)'
      }}
      className={`relative group rounded-3xl overflow-hidden cursor-default transition-colors duration-500 will-change-transform select-none ${spanClass} min-h-[220px] md:min-h-[280px] bg-white/[0.02] border backdrop-blur-[24px]`}
    >
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' }} 
      />

      {/* Thematic Tint */}
      <div 
        className="absolute inset-0 mix-blend-overlay transition-opacity duration-500 pointer-events-none" 
        style={{ backgroundColor: theme.hex, opacity: isHovered ? 0.15 : 0.05 }} 
      />

      {/* Top Glass Edge Highlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Internal Content */}
      <div className="relative h-full w-full p-8 md:p-10 flex flex-col justify-between z-10 pointer-events-none">
        {/* Icon & Glow Container */}
        <div className="relative w-14 h-14 rounded-[18px] bg-white/[0.05] border border-white/10 flex items-center justify-center shadow-[inset_0.5px_0.5px_1px_rgba(255,255,255,0.15)] mb-6">
          <AnimatedIcon name={hobby.iconName} isActive={isHovered} prefersReducedMotion={prefersReducedMotion} />
          {/* Internal orb glow */}
          <div 
            className="absolute inset-0 rounded-[18px] blur-md transition-opacity duration-500"
            style={{ backgroundColor: theme.hex, opacity: isHovered ? 0.4 : 0 }}
          />
        </div>
        
        {/* Text Details */}
        <div>
          <h3 className="text-white font-bold text-xl tracking-tight mb-2 flex items-center gap-2">
            {hobby.name}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
            {hobby.description}
          </p>
        </div>
      </div>
      
      {/* Corner Glow overlay (subtle radial gradient inside card) */}
      <div 
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[60px] pointer-events-none transition-opacity duration-700"
        style={{ backgroundColor: theme.hex, opacity: isHovered ? 0.25 : 0 }}
      />
    </motion.div>
  );
}

interface HobbiesProps {
  hoverPositionRef?: React.MutableRefObject<{ x: number; y: number } | null>;
}

export default function Hobbies({ hoverPositionRef }: HobbiesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 500, y: 300 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handlePointerLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section id="hobbies-section" className="relative py-32 px-6 md:px-12 overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center gap-3 mb-20">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400/80 uppercase">
          <Sparkles size={12} /> The Big Picture
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none">
          Creative Assembly
        </h2>
        <p className="text-slate-400/80 text-sm md:text-base max-w-lg mt-2 font-light">
          Understanding the builder behind the terminal. These interlocking pursuits fuel my logic, balance my routine, and complete the whole.
        </p>
      </div>
      
      {/* Bento Grid Container */}
      <div 
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative max-w-5xl mx-auto"
      >
        {/* Shared Ambient Cursor Light (Illuminates grid from behind) */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 hidden md:block"
          style={{
            background: hoveredIndex !== null ? `rgba(${hobbyThemes[hobbiesList[hoveredIndex].name].rgb}, 0.2)` : 'transparent',
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
            zIndex: 0
          }}
        />

        {/* CSS Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {hobbiesList.map((hobby, idx) => (
            <BentoCard 
              key={hobby.name}
              hobby={hobby}
              idx={idx}
              isHovered={hoveredIndex === idx}
              isAnotherHovered={hoveredIndex !== null && hoveredIndex !== idx}
              onEnter={() => setHoveredIndex(idx)}
              hoverPositionRef={hoverPositionRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
