import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "../types";

// Animation variants for floating elements staggered entrance
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 25, scale: 0.95 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
  exit: {
    opacity: 0,
    x: 15,
    scale: 0.95,
    transition: {
      duration: 0.15,
    },
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-section");
  const [textIndex, setTextIndex] = useState(0);

  const buttonTexts = ["Collaborate", "Contact"];

  // Cycle the button text every 3 seconds for dynamic sliding effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % buttonTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Monitor scroll behavior for styling
  useEffect(() => {
    const handleScroll = () => {
      // Add background once scrolled past 40px
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section on scroll using IntersectionObserver
  useEffect(() => {
    const sections = [
      "hero-section",
      "about-section",
      "education-section",
      "experience-section",
      "skills-section",
      "certifications-section",
      "hobbies-section",
      "contact-section",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // triggers when section occupies the focus area of screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const navLinks = [
    { name: "Home", target: "hero-section" },
    { name: "About", target: "about-section" },
    { name: "Education", target: "education-section" },
    { name: "Experience", target: "experience-section" },
    { name: "Skills", target: "skills-section" },
    { name: "Credentials", target: "certifications-section" },
    { name: "Hobbies", target: "hobbies-section" },
  ];

  const mobileNavLinks = [
    ...navLinks,
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Floating Header */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl rounded-2xl z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8),_0_0_20px_rgba(6,182,212,0.1)]"
            : "bg-slate-950/40 border border-white/5 backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="px-5 py-3 md:py-3.5 flex items-center justify-between gap-2">
          
          {/* Logo / Brand */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-base shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-transform group-hover:scale-105 active:scale-95">
              <span className="text-white font-black text-xs md:text-sm">M</span>
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none ml-1">
              <span className="text-white font-mono text-xs font-bold tracking-wider uppercase">
                {personalInfo.name}
              </span>
              <span className="text-[8px] text-white/50 font-mono tracking-widest mt-0.5 uppercase italic">
                Portfolio_2026.sys
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 md:gap-1.5 py-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.target;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.target)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-cyan-400 bg-white/5 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Call-To-Action Button for Desktop */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => scrollToSection("contact-section")}
              className="px-4 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs hover:bg-cyan-500 hover:text-slate-950 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 flex items-center justify-center cursor-pointer whitespace-nowrap overflow-hidden h-[34px] w-[145px]"
            >
              <div className="relative h-full w-full overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={textIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className="flex items-center justify-center gap-1.5 absolute inset-0 w-full h-full"
                  >
                    <span>{buttonTexts[textIndex]}</span>
                    <ArrowRight size={12} className="shrink-0" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </button>
          </div>

          {/* Mobile Action Buttons: Collaborate Button + Hamburger Menu Toggle */}
          <div className="flex md:hidden items-center gap-3 z-50">
            <motion.button
              onClick={() => scrollToSection("contact-section")}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-slate-950 font-mono text-xs font-bold tracking-wide flex items-center justify-center cursor-pointer whitespace-nowrap shadow-[0_0_15px_rgba(6,182,212,0.3)] overflow-hidden h-[34px] w-[135px]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative h-full w-full overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={textIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className="flex items-center justify-center gap-1 absolute inset-0 w-full h-full"
                  >
                    <span>{buttonTexts[textIndex]}</span>
                    <ArrowRight size={11} className="shrink-0" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer z-50 relative"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Floating Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-slate-950/25 backdrop-blur-[10px] flex flex-col items-end justify-start pt-28 pb-8 pr-6 sm:pr-8 overflow-y-auto"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col gap-3 items-end w-fit"
              onClick={(e) => e.stopPropagation()}
            >
              {mobileNavLinks.map((link) => {
                const isActive = activeSection === link.target;
                return (
                  <motion.button
                    key={link.name}
                    variants={itemVariants}
                    onClick={() => {
                      scrollToSection(link.target);
                    }}
                    className={`px-5 py-2.5 rounded-[18px] text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap backdrop-blur-md ${
                      isActive
                        ? "bg-cyan-500/10 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(34,211,238,0.25),_inset_0_1px_1px_rgba(255,255,255,0.15)]"
                        : "bg-slate-950/40 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]"
                    }`}
                    whileHover={{ 
                      scale: 1.03, 
                      boxShadow: isActive 
                        ? "0_0_20px_rgba(34,211,238,0.35), inset 0 1px 1px rgba(255,255,255,0.2)" 
                        : "0_0_12px_rgba(34,211,238,0.12), inset 0 1px 1px rgba(255,255,255,0.08)",
                      borderColor: isActive 
                        ? "rgba(34,211,238,0.9)" 
                        : "rgba(34,211,238,0.45)",
                      backgroundColor: isActive
                        ? "rgba(6,182,212,0.15)"
                        : "rgba(255,255,255,0.08)"
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {link.name}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

