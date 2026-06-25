import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Linkedin, Github, Send, MapPin, Sparkles, CheckCircle, Terminal } from "lucide-react";
import { personalInfo } from "../types";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.subject || !formState.message) {
      setStatus("error");
      setTerminalLogs(["[ERROR] Validation failed. Missing required system input parameters."]);
      return;
    }

    setStatus("submitting");
    setTerminalLogs([
      "[SYSTEM] Initializing instant email dispatch protocol...",
      "[SYS] Routing payload via FormSubmit.co SMTP relay gateway...",
      "[SYS] Compiling payload packets with recaptcha disabled...",
      "[SYS] Establishing handshake with m1mohitsharma1@gmail.com relay..."
    ]);

    try {
      const response = await fetch("https://formsubmit.co/ajax/m1mohitsharma1@gmail.com", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject || "Portfolio Contact",
          message: formState.message,
          _captcha: "false"
        })
      });

      const result = await response.json();

      if (response.ok && (result.success === "true" || result.success === true)) {
        setStatus("success");
        setTerminalLogs(prev => [
          ...prev,
          "[OK] Payload received successfully by SMTP relay.",
          "[OK] Message successfully queued for m1mohitsharma1@gmail.com.",
          "[INFO] Note for Mohit: If this is the first submission on this site, FormSubmit will send you a one-time activation link to m1mohitsharma1@gmail.com. Please check your inbox/spam folder and click 'Activate Form' to start receiving messages directly.",
          "[SYSTEM] Signal fully transmitted. Closing socket connection."
        ]);
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.message || "Relay rejected transmission.");
      }
    } catch (error: any) {
      setStatus("error");
      setTerminalLogs(prev => [
        ...prev,
        `[ERROR] Payload delivery failed: ${error?.message || "Relay connection timeout."}`,
        "[SYSTEM] Unable to auto-route message to SMTP gateway.",
        "[SYSTEM] Please try submitting again or email directly to m1mohitsharma1@gmail.com"
      ]);
    }
  };

  return (
    <section 
      id="contact-section" 
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden border-t border-white/5"
    >
      {/* Intense futuristic background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-gradient-to-tr from-cyan-500/5 via-purple-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Prominent CTA Title */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
            <Mail size={14} /> Communications Core
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight max-w-3xl">
            Let's Build Something <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Amazing Together</span>
          </h2>
          
          <p className="text-slate-400 text-sm md:text-base max-w-xl mt-1">
            Whether you are a recruiter, startup founder, or fellow explorer, let's synchronize our efforts to engineer outstanding intelligent products.
          </p>
        </div>

        {/* Contact Form Container - Centered */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-xl relative overflow-hidden">
              
              {status === "success" ? (
                /* Success screen */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <CheckCircle size={28} />
                  </div>
                  <h3 className="text-white font-extrabold text-xl tracking-tight">
                    Transmission Dispatched!
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-sm">
                    Thank you! Your transmission has successfully bypassed firewall filters and arrived in Mohit's core routing node.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setTerminalLogs([]);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition mt-4"
                  >
                    Send Another Packet
                  </button>
                </motion.div>
              ) : (
                /* Active Form */
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name input */}
                    <div className="flex flex-col gap-1.5">
                      <motion.label
                        htmlFor="name"
                        className="text-[10px] font-mono uppercase tracking-widest font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent inline-block cursor-default select-none origin-left"
                        animate={{
                          backgroundPosition: ["0% center", "200% center"],
                        }}
                        style={{ backgroundSize: "200% auto" }}
                        transition={{
                          duration: 4,
                          ease: "linear",
                          repeat: Infinity,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        Identifier / Name *
                      </motion.label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Jane Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder-slate-700 font-mono"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-1.5">
                      <motion.label
                        htmlFor="email"
                        className="text-[10px] font-mono uppercase tracking-widest font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent inline-block cursor-default select-none origin-left"
                        animate={{
                          backgroundPosition: ["0% center", "200% center"],
                        }}
                        style={{ backgroundSize: "200% auto" }}
                        transition={{
                          duration: 4,
                          ease: "linear",
                          repeat: Infinity,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        Routing Address / Email *
                      </motion.label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="e.g., explorer@galaxy.io"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder-slate-700 font-mono"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <motion.label
                      htmlFor="subject"
                      className="text-[10px] font-mono uppercase tracking-widest font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent inline-block cursor-default select-none origin-left"
                      animate={{
                        backgroundPosition: ["0% center", "200% center"],
                      }}
                      style={{ backgroundSize: "200% auto" }}
                      transition={{
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Subject *
                    </motion.label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      value={formState.subject}
                      onChange={handleInputChange}
                      placeholder="e.g., Dynamic Internship / Collaboration opportunity"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder-slate-700 font-mono"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <motion.label
                      htmlFor="message"
                      className="text-[10px] font-mono uppercase tracking-widest font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent inline-block cursor-default select-none origin-left"
                      animate={{
                        backgroundPosition: ["0% center", "200% center"],
                      }}
                      style={{ backgroundSize: "200% auto" }}
                      transition={{
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Message *
                    </motion.label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Input your instructions or collaboration specifications here..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder-slate-700 font-mono resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-black font-black font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer select-none hover:brightness-110 active:brightness-95"
                    >
                      {status === "submitting" ? "Sending..." : "Send"}
                    </button>
                  </div>

                  {/* Terminal Log Output */}
                  {terminalLogs.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-black/50 border border-white/5 font-mono text-[10px] text-slate-400 space-y-1 max-h-40 overflow-y-auto"
                    >
                      <div className="flex items-center gap-2 text-white/50 border-b border-white/5 pb-1.5 mb-1.5">
                        <Terminal size={12} className="text-cyan-400 animate-pulse" />
                        <span>TRANSMISSION_STATUS_STREAM</span>
                      </div>
                      {terminalLogs.map((log, index) => (
                        <div key={index} className={log.startsWith("[ERROR]") ? "text-rose-400" : log.startsWith("[OK]") ? "text-emerald-400" : log.startsWith("[SYS") ? "text-cyan-400/80" : "text-slate-400"}>
                          {log}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </form>
              )}

            </div>
          </div>

        {/* Footer info block */}
        <div className="border-t border-white/5 mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-[10px] font-mono">
          <div>
            &copy; 2026 {personalInfo.name}. All rights reserved. Built with React & Tailwind.
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-500">SYSTEM_READY</span>
            <span>SEC_LEVEL_01_PASS</span>
          </div>
        </div>

      </div>
    </section>
  );
}
