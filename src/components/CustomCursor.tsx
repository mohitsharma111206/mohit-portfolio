import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop devices (non-touch)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Recursively check if the target or its parents are clickable
      let currentElement: HTMLElement | null = target;
      let clickable = false;
      
      while (currentElement) {
        if (
          window.getComputedStyle(currentElement).cursor === 'pointer' ||
          currentElement.tagName.toLowerCase() === 'a' ||
          currentElement.tagName.toLowerCase() === 'button'
        ) {
          clickable = true;
          break;
        }
        currentElement = currentElement.parentElement;
      }
      
      setIsHovering(clickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Hide default cursor globally when this script runs
    document.body.style.cursor = 'none';
    
    // Ensure all standard interactable elements also have no cursor natively 
    // so our custom cursor doesn't compete with the browser's hand pointer
    const style = document.createElement('style');
    style.innerHTML = `
      * { cursor: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Don't render anything if the mouse hasn't moved yet
  if (mousePosition.x === -100) return null;

  return (
    <>
      {/* The solid inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-cyan-400 rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 10px rgba(34, 211, 238, 0.5)"
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 2000, damping: 28, mass: 0.1 }}
      />
      {/* The outer ring that slightly lags and scales up on hover */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-cyan-400/80 rounded-full pointer-events-none z-[9998]"
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? "rgba(34, 211, 238, 0.15)" : "rgba(34, 211, 238, 0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
      />
    </>
  );
}
