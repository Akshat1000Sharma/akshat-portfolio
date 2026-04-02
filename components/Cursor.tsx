'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
      // Spark on move
      if (Math.random() > 0.82) createSpark(e.clientX, e.clientY);
    };

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      frameRef.current = requestAnimationFrame(animateRing);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .magnetic-btn, .card-hover')) {
        ringRef.current?.classList.add('hovering');
      } else {
        ringRef.current?.classList.remove('hovering');
      }
    };

    const createSpark = (x: number, y: number) => {
      const spark = document.createElement('div');
      spark.className = 'spark';
      const size = Math.random() * 5 + 2;
      const dx = (Math.random() - 0.5) * 60;
      const dy = (Math.random() - 0.5) * 60;
      const colors = ['#E8A838', '#D64C2E', '#06B6D4', '#8B5CF6', '#fff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      spark.style.cssText = `
        width:${size}px; height:${size}px;
        left:${x}px; top:${y}px;
        background:${color};
        --dx:${dx}px; --dy:${dy}px;
      `;
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 700);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    frameRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
