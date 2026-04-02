'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './DarkModeTransition.module.css';

/* Stars generated client-side only to avoid SSR/hydration mismatch */
type Star = {
  left: string; top: string;
  width: string; height: string;
  delay: string; duration: string;
};

function useClientStars(count: number): Star[] {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    const s: Star[] = Array.from({ length: count }, () => ({
      left:     `${(Math.random() * 100).toFixed(3)}%`,
      top:      `${(Math.random() * 100).toFixed(3)}%`,
      width:    `${(Math.random() * 3 + 1).toFixed(2)}px`,
      height:   `${(Math.random() * 3 + 1).toFixed(2)}px`,
      delay:    `${(Math.random() * 3).toFixed(3)}s`,
      duration: `${(Math.random() * 2 + 1).toFixed(3)}s`,
    }));
    setStars(s);
  }, [count]);
  return stars;
}

export default function DarkModeTransition({
  onEnterDark, onExitDark,
}: {
  onEnterDark: () => void;
  onExitDark:  () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const entered = useRef(false);
  const stars = useClientStars(50);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !entered.current) {
          entered.current = true;
          onEnterDark();
        } else if (!entry.isIntersecting && entered.current) {
          if (entry.boundingClientRect.top > 0) {
            entered.current = false;
            onExitDark();
          }
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [onEnterDark, onExitDark]);

  return (
    <div ref={ref} className={styles.trigger}>
      {/* Stars rendered only after mount — no SSR mismatch */}
      <div className={styles.starLayer} aria-hidden>
        {stars.map((s, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left: s.left, top: s.top,
              width: s.width, height: s.height,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.moonIcon}>🌙</div>
        <p className={styles.label}>Night Mode Activated</p>
        <p className={styles.sub}>You&apos;ve entered the dark side of the portfolio</p>
      </div>
    </div>
  );
}
