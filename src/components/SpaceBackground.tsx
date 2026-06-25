import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  color: string;
  depth: number; // 0 (far/blurred) to 1 (near/sharp)
  phase: number;
}

interface DustParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  speedX: number;
  speedY: number;
  driftRange: number;
  driftSpeed: number;
  angle: number;
}

interface BokehLight {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  baseX: number;
  baseY: number;
  angle: number;
  orbitRadius: number;
}

interface ShootingStar {
  x: number;
  y: number;
  dx: number;
  dy: number;
  length: number;
  opacity: number;
  active: boolean;
  speed: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color definitions
    const starColors = [
      "rgba(224, 242, 254, ", // cool white/blue (sky-100)
      "rgba(254, 243, 199, ", // warm white (amber-100)
      "rgba(186, 230, 253, ", // light blue (sky-200)
      "rgba(255, 255, 255, ", // pure white
      "rgba(192, 132, 252, ", // purple tint
    ];

    const bokehColors = [
      "rgba(6, 182, 212, 0.05)",  // Cyan
      "rgba(147, 51, 234, 0.05)", // Purple
      "rgba(59, 130, 246, 0.04)",  // Blue
      "rgba(168, 85, 247, 0.04)",  // Violet
    ];

    // Initialize layers
    let stars: Star[] = [];
    let dust: DustParticle[] = [];
    let bokeh: BokehLight[] = [];
    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      length: 0,
      opacity: 0,
      active: false,
      speed: 0,
    };

    const initElements = () => {
      // 1. Create Stars (approx. 220 stars for elegant sparse spacing)
      stars = [];
      const totalStars = Math.floor((width * height) / 8000);
      const cappedStars = Math.min(Math.max(totalStars, 120), 280);

      for (let i = 0; i < cappedStars; i++) {
        const depth = Math.random(); // random depth layer
        const baseOpacity = depth < 0.3 ? 0.15 + Math.random() * 0.25 : 0.4 + Math.random() * 0.5;
        const size = depth < 0.3 ? 2.0 + Math.random() * 0.8 : 0.8 + Math.random() * 1.0; // Distant are slightly larger but very faint (imitating blur)
        
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          opacity: baseOpacity,
          baseOpacity,
          twinkleSpeed: 0.005 + Math.random() * 0.015,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          depth,
          phase: Math.random() * Math.PI * 2,
        });
      }

      // 2. Create Glowing Dust (approx. 15 very faint particles)
      dust = [];
      for (let i = 0; i < 18; i++) {
        dust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 1.5 + Math.random() * 2,
          opacity: 0.03 + Math.random() * 0.06,
          color: Math.random() > 0.5 ? "rgba(34, 211, 238, " : "rgba(168, 85, 247, ", // cyan or purple
          speedX: (Math.random() - 0.5) * 0.04,
          speedY: (Math.random() - 0.5) * 0.04 - 0.01, // drift slightly upwards
          driftRange: 10 + Math.random() * 20,
          driftSpeed: 0.001 + Math.random() * 0.002,
          angle: Math.random() * Math.PI * 2,
        });
      }

      // 3. Create 4 Large Bokeh Lights
      bokeh = [];
      const numBokeh = 4;
      for (let i = 0; i < numBokeh; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        bokeh.push({
          x,
          y,
          radius: 200 + Math.random() * 200,
          color: bokehColors[i % bokehColors.length],
          speedX: (Math.random() - 0.5) * 0.05,
          speedY: (Math.random() - 0.5) * 0.05,
          baseX: x,
          baseY: y,
          angle: Math.random() * Math.PI * 2,
          orbitRadius: 30 + Math.random() * 50,
        });
      }
    };

    initElements();

    // Trigger occasional shooting stars (every 22-30s)
    let lastShootingStarTime = Date.now();
    const triggerShootingStar = () => {
      if (shootingStar.active) return;
      
      const startX = Math.random() * (width * 0.7) + width * 0.1;
      const startY = Math.random() * (height * 0.4);
      const angle = (Math.PI / 6) + Math.random() * (Math.PI / 12); // subtle diagonal angle
      const speed = 12 + Math.random() * 10;

      shootingStar = {
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length: 60 + Math.random() * 60,
        opacity: 0.9,
        active: true,
        speed,
      };
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    const render = () => {
      // 1. Clear with Deep Space Base Gradient (Avoid Pure Black)
      // Top: #030712 (very deep grey blue)
      // Middle: #071221 (cinematic dark navy)
      // Bottom: #02040b (extremely deep space charcoal)
      const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
      baseGrad.addColorStop(0, "#030712");
      baseGrad.addColorStop(0.5, "#071221");
      baseGrad.addColorStop(1, "#02040b");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      const sY = scrollYRef.current;

      // 2. Render Nebulas / Large Bokeh Lights (Moving Extremely Slower -> Parallax 0.01)
      bokeh.forEach((b) => {
        // Slow orbital drift animation
        b.angle += 0.0003;
        const driftX = Math.cos(b.angle) * b.orbitRadius;
        const driftY = Math.sin(b.angle) * b.orbitRadius;
        const currentX = b.baseX + driftX;
        // Parallax scroll calculation (very slow scroll speed 0.02)
        const currentY = b.baseY + driftY - sY * 0.02;

        const grad = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          b.radius
        );
        grad.addColorStop(0, b.color);
        grad.addColorStop(0.5, b.color.replace("0.05", "0.02").replace("0.04", "0.01"));
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(currentX, currentY, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Render Stars (twinkling and drifting with parallax)
      stars.forEach((star) => {
        // Twinkle update
        star.phase += star.twinkleSpeed;
        const sinWave = Math.sin(star.phase);
        // Vary opacity around its base opacity
        star.opacity = Math.max(0.1, star.baseOpacity + sinWave * 0.25);

        // Parallax scroll factor based on its depth
        // Sharp stars (near, depth near 1) scroll slightly faster than distant blurred stars (depth near 0)
        // Stars scroll offset is in range [0.06 to 0.15]
        const parallaxFactor = 0.06 + star.depth * 0.09;
        const renderedY = (star.y - sY * parallaxFactor) % height;
        const finalY = renderedY < 0 ? height + renderedY : renderedY;

        ctx.beginPath();
        ctx.fillStyle = `${star.color}${star.opacity.toFixed(2)})`;
        
        // Draw standard stars or blurred stars based on depth
        if (star.depth < 0.25) {
          // Distant, soft blurred star
          const softGrad = ctx.createRadialGradient(
            star.x, finalY, 0,
            star.x, finalY, star.size
          );
          softGrad.addColorStop(0, `${star.color}${star.opacity.toFixed(2)})`);
          softGrad.addColorStop(1, `${star.color}0)`);
          ctx.fillStyle = softGrad;
          ctx.arc(star.x, finalY, star.size, 0, Math.PI * 2);
        } else {
          // Sharp near star
          ctx.arc(star.x, finalY, star.size, 0, Math.PI * 2);
        }
        
        ctx.fill();
      });

      // 4. Render Glowing Dust (Sparse, drifting, moving at parallax 0.04)
      dust.forEach((d) => {
        d.angle += d.driftSpeed;
        // Slowly drift horizontally and vertically
        d.x += d.speedX + Math.sin(d.angle) * 0.01;
        d.y += d.speedY;

        // Wrap around edges
        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        const renderedY = (d.y - sY * 0.04) % height;
        const finalY = renderedY < 0 ? height + renderedY : renderedY;

        ctx.beginPath();
        const glow = ctx.createRadialGradient(
          d.x, finalY, 0,
          d.x, finalY, d.size * 2
        );
        glow.addColorStop(0, `${d.color}${d.opacity.toFixed(2)})`);
        glow.addColorStop(0.5, `${d.color}${(d.opacity * 0.4).toFixed(2)})`);
        glow.addColorStop(1, `${d.color}0)`);
        
        ctx.fillStyle = glow;
        ctx.arc(d.x, finalY, d.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Render Shooting Star (subtle, quick diagonal lines)
      if (shootingStar.active) {
        shootingStar.x += shootingStar.dx;
        shootingStar.y += shootingStar.dy;
        shootingStar.opacity -= 0.025; // fade out quickly

        if (
          shootingStar.opacity <= 0 ||
          shootingStar.x < -100 ||
          shootingStar.x > width + 100 ||
          shootingStar.y > height + 100
        ) {
          shootingStar.active = false;
          lastShootingStarTime = Date.now();
        } else {
          // Draw the shooting star line with gradient tail
          const tailGrad = ctx.createLinearGradient(
            shootingStar.x,
            shootingStar.y,
            shootingStar.x - shootingStar.dx * 1.5,
            shootingStar.y - shootingStar.dy * 1.5
          );
          tailGrad.addColorStop(0, `rgba(186, 230, 253, ${shootingStar.opacity})`);
          tailGrad.addColorStop(0.3, `rgba(147, 197, 253, ${shootingStar.opacity * 0.6})`);
          tailGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.beginPath();
          ctx.strokeStyle = tailGrad;
          ctx.lineWidth = 1.2;
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(
            shootingStar.x - shootingStar.dx * 1.2,
            shootingStar.y - shootingStar.dy * 1.2
          );
          ctx.stroke();
        }
      } else {
        // Trigger check
        const now = Date.now();
        if (now - lastShootingStarTime > 25000) {
          // Random chance after minimum time
          if (Math.random() < 0.002) {
            triggerShootingStar();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
