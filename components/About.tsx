'use client';
import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const stats = [
  { num: '8.5', label: 'CGPA', suffix: '' },
  { num: '3', label: 'Internships', suffix: '+' },
  { num: '14', label: 'Projects', suffix: '+' },
  { num: '1st', label: 'Hackathon', suffix: '' },
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
            CS + AIML Student<br/><span>& Builder</span>
          </h2>
          <div className={styles.bio}>
            <p className={`reveal delay-2`}>
              I&apos;m a third-year B.Tech student at <strong>Shiv Nadar University</strong> in Computer Science (AIML), 
              with a CGPA of 8.5 and a spot on the Dean&apos;s List. I build intelligent, full-stack systems 
              that solve real problems.
            </p>
            <p className={`reveal delay-3`}>
              My work spans <strong>LLM applications</strong>, <strong>RAG systems</strong>, and <strong>knowledge graphs</strong>
              — I&apos;ve built production-grade AI systems integrating Neo4j, vector databases, and FastAPI backends 
              during internships at Fealty Technologies.
            </p>
            <p className={`reveal delay-4`}>
              I&apos;m also a <strong>Teaching Assistant</strong> for Intro to Computing and Probability & Statistics, 
              an active research contributor, and a logistics lead in student clubs. I hold a 
              <strong> Google Cybersecurity Professional Certificate</strong>.
            </p>
          </div>
          <div className={`${styles.chips} reveal`} style={{transitionDelay:'0.5s'}}>
            {['Shiv Nadar University','AIML B.Tech','TA × 2 Courses','Google Cert','Research Assistant'].map(c=>(
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
