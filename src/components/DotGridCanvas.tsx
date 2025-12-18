import { useEffect, useRef } from 'react';

interface DotGridCanvasProps {
  width?: number;
  height?: number;
  className?: string;
}

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function DotGridCanvas({ 
  width = 64, 
  height = 64, 
  className = '' 
}: DotGridCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const dotsRef = useRef<Dot[]>([]);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const w = width;
    const h = height;

    // Create grid of dots
    const spacing = 12;
    const cols = Math.floor(w / spacing);
    const rows = Math.floor(h / spacing);
    const offsetX = (w - (cols - 1) * spacing) / 2;
    const offsetY = (h - (rows - 1) * spacing) / 2;

    const dots: Dot[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          x: offsetX + col * spacing,
          y: offsetY + row * spacing,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
        });
      }
    }
    dotsRef.current = dots;

    let time = 0;
    const maxDistance = 60;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.01;

      const dots = dotsRef.current;

      // Draw connecting lines
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.15)'; // green-500 with opacity
      ctx.lineWidth = 1;

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            // Calculate opacity based on distance (closer = more opaque)
            const opacity = (1 - distance / maxDistance) * 0.3;
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`;
            
            // Subtle pulsing animation
            const pulse = Math.sin(time * 2 + i + j) * 0.1 + 0.9;
            ctx.globalAlpha = opacity * pulse;

            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      // Draw dots
      ctx.fillStyle = '#22c55e'; // green-500
      const mousePos = mousePosRef.current;
      
      for (const dot of dots) {
        // Subtle base movement
        dot.x += dot.vx * Math.sin(time);
        dot.y += dot.vy * Math.cos(time);

        // Mouse attraction
        if (mousePos) {
          const dx = mousePos.x - dot.x;
          const dy = mousePos.y - dot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0) {
            // Attraction strength decreases with distance
            const attractionStrength = Math.max(0, (100 - distance) / 100) * 0.3;
            dot.x += (dx / distance) * attractionStrength;
            dot.y += (dy / distance) * attractionStrength;
          }
        }

        // Keep dots within bounds
        if (dot.x < 0 || dot.x > w) dot.vx *= -1;
        if (dot.y < 0 || dot.y > h) dot.vy *= -1;
        dot.x = Math.max(0, Math.min(w, dot.x));
        dot.y = Math.max(0, Math.min(h, dot.y));

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [width, height]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);

  const keySize = Math.min(width, height) * 0.3;

  return (
    <div className="relative inline-block" style={{ width: `${width}px`, height: `${height}px` }}>
      <canvas
        ref={canvasRef}
        className={className}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        width={keySize}
        height={keySize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.936l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.546-.288.936-.22a6.75 6.75 0 007.906-6.651 6.75 6.75 0 00-6.651-6.651zM12.53 12.53a.75.75 0 01-1.06 0l-1.72-1.72a.75.75 0 011.06-1.06l1.72 1.72a.75.75 0 010 1.06z"
          fill="rgba(34, 197, 94, 0.5)"
          stroke="rgba(34, 197, 94, 0.5)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

