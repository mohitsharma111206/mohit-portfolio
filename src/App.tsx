import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Timeline from "./components/Timeline";
import Stats from "./components/Stats";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Hobbies from "./components/Hobbies";
import Contact from "./components/Contact";
import SpaceBackground from "./components/SpaceBackground";

export default function App() {
  return (
    <div className="min-h-screen bg-transparent text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased overflow-x-hidden relative">
      
      {/* Cinematic Deep Space Background */}
      <SpaceBackground />
      
      {/* Background Ambient Glows (Optimized soft glows complementing nebula clouds) */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-[400px] right-[-100px] w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[1500px] overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-[400px] left-[-100px] w-96 h-96 bg-cyan-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Floating navigation bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Portfolio Sections Flow */}
      <main className="relative z-20 bg-transparent">
        
        {/* Profile story bio */}
        <About />

        {/* Academic timeline */}
        <Education />

        {/* Professional internship experience */}
        <Timeline />

        {/* Professional Highlights statistics */}
        <Stats />

        {/* Technical skillset core */}
        <Skills />

        {/* Credentials & Accomplishments */}
        <Certifications />

        {/* Personality & Creativity showcase */}
        <Hobbies />

        {/* Contact form & CTA */}
        <Contact />

      </main>

    </div>
  );
}
