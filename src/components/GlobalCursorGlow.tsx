import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function GlobalCursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);

  // Use springs for ultra-smooth buttery lag
  const springConfig = { damping: 40, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mousePosition.x, springConfig);
  const smoothY = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    // Disable on mobile/touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  useEffect(() => {
    smoothX.set(mousePosition.x);
    smoothY.set(mousePosition.y);
  }, [mousePosition, smoothX, smoothY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-0 mix-blend-screen"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, rgba(147, 51, 234, 0.03) 40%, rgba(0,0,0,0) 70%)",
        filter: "blur(40px)"
      }}
    />
  );
}
