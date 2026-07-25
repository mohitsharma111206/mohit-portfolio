import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Wait for the minimal "Welcome" animation to play out, then trigger the fade out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Wait for the exit animation to finish before unmounting from App.tsx
      setTimeout(onComplete, 1000); 
    }, 2500); // 2.5 seconds total screen time

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#030712] flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Minimalist, elegant typography fade */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="text-2xl md:text-3xl font-light tracking-[0.3em] text-white/80 font-sans uppercase"
          >
            Welcome
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
