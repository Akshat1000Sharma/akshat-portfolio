'use client';
import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const stats = [
  { num: '2', label: 'Years Experience', suffix: '+' },
  { num: '14', label: 'Projects Delivered', suffix: '+' },
  { num: '8.5', label: 'CGPA', suffix: '' },
  { num: 'NTSE', label: 'Qualified', suffix: '' },
  { num: 'Dean\'s List', label: 'Top 10% Academically', suffix: '' },
  { num: 'Google Certified', label: 'Cybersecurity Professional', suffix: '' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100);
          });
        }
      }), { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={`${styles.content} container`}>
        <div className={`${styles.left} reveal`}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatarRing} />
            <div className={styles.avatar}>
              <span className={styles.avatarInitials}>AS</span>
            </div>
            <div className={styles.floatingBadge}>
              <span>🏆 1st Place</span>
              <small>GDG Hackathon</small>
            </div>
          </div>
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <div key={s.label} className={`${styles.statCard} reveal delay-${i+1}`}>
                <span className={styles.statNum}>{s.num}{s.suffix}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <p className={`section-label reveal`}>About Me</p>
          <h2 className={`section-title reveal delay-1`}>
            Active Developer<br/><span>& Builder</span>
          </h2>
          <div className={styles.bio}>
            <p className={`reveal delay-2`}>
              I&apos;m an actively working developer with <strong>2+ years of professional experience</strong>, currently
              building impactful products at <strong>RecursX Innovations Pvt Ltd</strong>. I have delivered multiple
              successful projects end-to-end, spanning full-stack development and production-grade AI systems.
            </p>
            <p className={`reveal delay-3`}>
              My work spans <strong>LLM applications</strong>, <strong>RAG systems</strong>, and <strong>knowledge graphs</strong>
              — I&apos;ve built and shipped production systems integrating Neo4j, vector databases, and FastAPI backends,
              taking ideas from concept to deployed reality.
            </p>
            <p className={`reveal delay-4`}>
              Alongside my professional work, I hold an <strong>8.5 CGPA</strong> in CS (AIML specialization) at
              Shiv Nadar University, a spot on the Dean&apos;s List, and a
              <strong> Google Cybersecurity Professional Certificate</strong>. I bring both academic depth and
              real-world execution to every project I take on.
            </p>
          </div>
          <div className={`${styles.chips} reveal`} style={{transitionDelay:'0.5s'}}>
            {['RecursX Innovations','2+ Yrs Experience','Full-Stack Dev','AI/ML Systems','Google Cert'].map(c=>(
              <span key={c} className={styles.chip}>{c}</span>
            ))}
          </div>
          <div className={`${styles.cta} reveal`} style={{transitionDelay:'0.6s'}}>
            <a href="mailto:as549@snu.edu.in" className="magnetic-btn">as549@snu.edu.in</a>
          </div>
        </div>
      </div>
    </section>
  );
}