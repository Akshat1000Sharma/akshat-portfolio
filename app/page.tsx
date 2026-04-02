'use client';
import { useState, useEffect, useCallback } from 'react';
import Cursor from '../components/Cursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import DarkModeTransition from '../components/DarkModeTransition';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);

  const handleEnterDark = useCallback(() => {
    setTheme('dark');
  }, []);

  const handleExitDark = useCallback(() => {
    setTheme('light');
  }, []);

  return (
    <main>
      <Cursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <About />
      <Skills />
      <Experience />
      <DarkModeTransition onEnterDark={handleEnterDark} onExitDark={handleExitDark} />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
