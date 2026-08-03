import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  color: string;
  depth: number;
  phase: number;
  repelX: number;
  repelY: number;
  renderX?: number;
  renderY?: number;
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
  repelX: number;
  repelY: number;
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

export interface SpaceBackgroundProps {
  hoverPositionRef?: React.MutableRefObject<{ x: number; y: number } | null>;
  hoverRadius?: number;
}

export default function SpaceBackground({ hoverPositionRef, hoverRadius = 160 }: SpaceBackgroundProps) {
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

    // Warm, colorful galaxy stars
    const starColors = [
      "rgba(254, 240, 138, ", // warm yellow
      "rgba(253, 164, 175, ", // rose pink
      "rgba(167, 139, 250, ", // warm purple
      "rgba(94, 234, 212, ",  // bright cyan
      "rgba(255, 255, 255, ", // pure white
      "rgba(216, 180, 254, ", // light lilac
    ];

    const bokehColors = [
      "rgba(236, 72, 153, 0.05)",  // Pink
      "rgba(139, 92, 246, 0.05)",  // Purple
      "rgba(14, 165, 233, 0.04)",  // Light Blue
      "rgba(244, 114, 182, 0.04)", // Soft Pink
    ];

    let stars: Star[] = [];
    let dust: DustParticle[] = [];
    let bokeh: BokehLight[] = [];
    let shootingStar: ShootingStar = {
      x: 0, y: 0, dx: 0, dy: 0, length: 0, opacity: 0, active: false, speed: 0,
    };

    const initElements = () => {
      stars = [];
      const totalStars = Math.floor((width * height) / 6000); // Slightly denser
      const cappedStars = Math.min(Math.max(totalStars, 150), 350);

      for (let i = 0; i < cappedStars; i++) {
        const depth = Math.random();
        const baseOpacity = depth < 0.3 ? 0.3 + Math.random() * 0.3 : 0.5 + Math.random() * 0.5;
        const size = depth < 0.3 ? 1.5 + Math.random() * 1.5 : 1.0 + Math.random() * 1.5;
        
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
          repelX: 0,
          repelY: 0,
        });
      }

      dust = [];
      for (let i = 0; i < 25; i++) {
        dust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 1.5 + Math.random() * 3,
          opacity: 0.05 + Math.random() * 0.08,
          color: Math.random() > 0.5 ? "rgba(244, 114, 182, " : "rgba(167, 139, 250, ", // pink or purple
          speedX: (Math.random() - 0.5) * 0.04,
          speedY: (Math.random() - 0.5) * 0.04 - 0.01,
          driftRange: 10 + Math.random() * 20,
          driftSpeed: 0.001 + Math.random() * 0.002,
          angle: Math.random() * Math.PI * 2,
          repelX: 0,
          repelY: 0,
        });
      }

      bokeh = [];
      const numBokeh = 5;
      for (let i = 0; i < numBokeh; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        bokeh.push({
          x,
          y,
          radius: 200 + Math.random() * 250,
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

    let lastShootingStarTime = Date.now();
    const triggerShootingStar = () => {
      if (shootingStar.active) return;
      const startX = Math.random() * (width * 0.7) + width * 0.1;
      const startY = Math.random() * (height * 0.4);
      const angle = (Math.PI / 6) + Math.random() * (Math.PI / 12);
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

    const render = () => {
      // Warm, deep galaxy background
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, "#080614");   // Deep dark purple-blue
      baseGrad.addColorStop(0.5, "#140e2b"); // Warm dark violet
      baseGrad.addColorStop(1, "#05060f");   // Deep space black
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      const sY = scrollYRef.current;

      bokeh.forEach((b) => {
        b.angle += 0.0003;
        const driftX = Math.cos(b.angle) * b.orbitRadius;
        const driftY = Math.sin(b.angle) * b.orbitRadius;
        const currentX = b.baseX + driftX;
        const currentY = b.baseY + driftY - sY * 0.02;

        const grad = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, b.radius);
        grad.addColorStop(0, b.color);
        grad.addColorStop(0.5, b.color.replace("0.05", "0.02").replace("0.04", "0.01"));
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(currentX, currentY, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render colorful glowing stars
      stars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const sinWave = Math.sin(star.phase);
        
        const parallaxFactor = 0.06 + star.depth * 0.09;
        const renderedY = (star.y - sY * parallaxFactor) % height;
        const finalY = renderedY < 0 ? height + renderedY : renderedY;

        let targetRepelX = 0;
        let targetRepelY = 0;
        let brightnessBoost = 0;

        if (hoverPositionRef?.current) {
           const hx = hoverPositionRef.current.x;
           const hy = hoverPositionRef.current.y;
           const distX = star.x - hx;
           const distY = finalY - hy;
           const distance = Math.sqrt(distX * distX + distY * distY);
           
           if (distance < hoverRadius) {
             const force = (hoverRadius - distance) / hoverRadius;
             targetRepelX = (distX / distance) * force * 40 * star.depth;
             targetRepelY = (distY / distance) * force * 40 * star.depth;
             brightnessBoost = force * 0.8;
           }
        }

        star.repelX += (targetRepelX - star.repelX) * 0.08;
        star.repelY += (targetRepelY - star.repelY) * 0.08;
        star.opacity = Math.max(0.1, Math.min(1, star.baseOpacity + sinWave * 0.4 + brightnessBoost));
        
        const renderX = star.x + star.repelX;
        const renderY = finalY + star.repelY;

        // Draw pronounced glowing halo for every star
        ctx.beginPath();
        const starGlow = ctx.createRadialGradient(renderX, renderY, 0, renderX, renderY, star.size * 3);
        starGlow.addColorStop(0, `${star.color}${star.opacity.toFixed(2)})`);
        starGlow.addColorStop(0.3, `${star.color}${(star.opacity * 0.5).toFixed(2)})`);
        starGlow.addColorStop(1, `${star.color}0)`);
        
        ctx.fillStyle = starGlow;
        ctx.arc(renderX, renderY, star.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Solid core
        ctx.beginPath();
        ctx.fillStyle = `${star.color}${(star.opacity * 0.8).toFixed(2)})`;
        ctx.arc(renderX, renderY, star.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      dust.forEach((d) => {
        d.angle += d.driftSpeed;
        let targetRepelX = 0;
        let targetRepelY = 0;
        
        const renderedY = (d.y - sY * 0.04) % height;
        const finalY = renderedY < 0 ? height + renderedY : renderedY;

        if (hoverPositionRef?.current) {
           const hx = hoverPositionRef.current.x;
           const hy = hoverPositionRef.current.y;
           const distX = d.x - hx;
           const distY = finalY - hy;
           const distance = Math.sqrt(distX * distX + distY * distY);
           
           if (distance < hoverRadius) {
             const force = (hoverRadius - distance) / hoverRadius;
             targetRepelX = (distX / distance) * force * 50;
             targetRepelY = (distY / distance) * force * 50;
           }
        }

        d.repelX += (targetRepelX - d.repelX) * 0.08;
        d.repelY += (targetRepelY - d.repelY) * 0.08;
        d.x += d.speedX + Math.sin(d.angle) * 0.01;
        d.y += d.speedY;

        if (d.x < -100) d.x = width + 100;
        if (d.x > width + 100) d.x = -100;
        if (d.y < -100) d.y = height + 100;
        if (d.y > height + 100) d.y = -100;

        const renderX = d.x + d.repelX;
        const renderY = finalY + d.repelY;

        ctx.beginPath();
        const glow = ctx.createRadialGradient(renderX, renderY, 0, renderX, renderY, d.size * 2);
        glow.addColorStop(0, `${d.color}${d.opacity.toFixed(2)})`);
        glow.addColorStop(0.5, `${d.color}${(d.opacity * 0.4).toFixed(2)})`);
        glow.addColorStop(1, `${d.color}0)`);
        
        ctx.fillStyle = glow;
        ctx.arc(renderX, renderY, d.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      if (shootingStar.active) {
        shootingStar.x += shootingStar.dx;
        shootingStar.y += shootingStar.dy;
        shootingStar.opacity -= 0.025;

        if (shootingStar.opacity <= 0 || shootingStar.x < -100 || shootingStar.x > width + 100 || shootingStar.y > height + 100) {
          shootingStar.active = false;
          lastShootingStarTime = Date.now();
        } else {
          const tailGrad = ctx.createLinearGradient(
            shootingStar.x, shootingStar.y,
            shootingStar.x - shootingStar.dx * 1.5, shootingStar.y - shootingStar.dy * 1.5
          );
          tailGrad.addColorStop(0, `rgba(236, 72, 153, ${shootingStar.opacity})`); // pink tail
          tailGrad.addColorStop(0.3, `rgba(167, 139, 250, ${shootingStar.opacity * 0.6})`); // purple
          tailGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.beginPath();
          ctx.strokeStyle = tailGrad;
          ctx.lineWidth = 1.2;
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(shootingStar.x - shootingStar.dx * 1.2, shootingStar.y - shootingStar.dy * 1.2);
          ctx.stroke();
        }
      } else {
        const now = Date.now();
        if (now - lastShootingStarTime > 25000) {
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
