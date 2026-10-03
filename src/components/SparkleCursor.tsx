import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  rotation: number;
  rotSpeed: number;
}

interface Props {
  enabled?: boolean;
}

export const SparkleCursor: React.FC<Props> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    // Don't activate on touch-only devices to save battery
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#f59e0b', '#ef4444', '#fde047', '#38bdf8', '#ffffff'];

    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - lastPosRef.current.x, e.clientY - lastPosRef.current.y);
      if (dist < 10) return; // throttle

      lastPosRef.current = { x: e.clientX, y: e.clientY };

      // Spawn 2-3 stardust particles
      for (let i = 0; i < 2; i++) {
        if (particlesRef.current.length > 50) break;
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * 1.2 - 0.5,
          size: Math.random() * 4 + 2,
          alpha: 0.9,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Draw 4-point anime sparkle star
    const drawStar = (x: number, y: number, size: number, angle: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;

      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(0, 0, size, 0);
      ctx.quadraticCurveTo(0, 0, 0, size);
      ctx.quadraticCurveTo(0, 0, -size, 0);
      ctx.quadraticCurveTo(0, 0, 0, -size);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const activeParticles: Particle[] = [];
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha -= 0.024;
        p.size *= 0.96;

        if (p.alpha > 0.05 && p.size > 0.5) {
          drawStar(p.x, p.y, p.size, p.rotation, p.color, p.alpha);
          activeParticles.push(p);
        }
      }

      particlesRef.current = activeParticles;
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 select-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
