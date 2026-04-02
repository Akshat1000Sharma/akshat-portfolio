'use client';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

const links = ['Home','About','Skills','Experience','Projects','Contact'];

export default function Navbar({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    setActive(id);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo} onClick={() => scrollTo('home')}>
        <span className={styles.logoMark}>AS</span>
        <span className={styles.logoText}>Akshat Sharma</span>
      </div>
      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {links.map(l => (
          <li key={l}>
            <button
              className={`${styles.link} ${active === l ? styles.activeLink : ''}`}
              onClick={() => scrollTo(l)}
            >{l}</button>
          </li>
        ))}
      </ul>
      <div className={styles.right}>
        <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  );
}
