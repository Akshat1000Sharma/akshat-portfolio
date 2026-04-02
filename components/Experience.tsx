'use client';
import { useEffect, useRef } from 'react';
import styles from './Experience.module.css';

const timeline = [
  {
    role: 'Backend AI Intern',
    company: 'Fealty Technologies Pvt. Ltd.',
    period: 'May – Aug 2025',
    type: 'Internship',
    tags: ['FastAPI', 'RAG', 'LLMs', 'Neo4j', 'Vector DBs'],
    bullets: [
      'Built production-grade RAG applications and AI-driven knowledge graph systems.',
      'Integrated Qdrant / Weaviate vector databases for semantic retrieval pipelines.',
      'Deployed LLM-based tools for querying structured and unstructured data.',
    ],
    color: '#06B6D4',
  },
  {
    role: 'Full-Stack & Backend Intern',
    company: 'Fealty Technologies Pvt. Ltd.',
    period: 'May – Jul 2024',
    type: 'Internship',
    tags: ['Angular', 'Django', 'Docker', 'REST APIs'],
    bullets: [
      'Developed full-stack enterprise apps with Angular frontend and Django backend.',
      'Containerised services using Docker and deployed to cloud environments.',
      'Worked on backend services and API design for production systems.',
    ],
    color: '#E8A838',
  },
  {
    role: 'Teaching Assistant',
    company: 'Shiv Nadar University',
    period: '2025 – 2026',
    type: 'Academic',
    tags: ['Intro to Computing', 'Probability & Statistics'],
    bullets: [
      'TA for Introduction to Computing (2025) and Probability & Statistics (2026).',
      'Mentored students, held office hours, and assisted in grading and course material.',
    ],
    color: '#8B5CF6',
  },
  {
    role: 'Research Assistant',
    company: 'Mechanical Dept., SNU',
    period: '2025',
    type: 'Research',
    tags: ['Python', 'Bash', 'Simulation', 'Data Analysis'],
    bullets: [
      'Conducted lattice-based molecular simulations across diverse structural configurations to analyze system behavior and performance',
      'Developed Bash automation scripts for bookkeeping and workflow management, streamlining data handling and preprocessing.',
    ],
    color: '#10B981',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 120);
          });
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" className={styles.exp} ref={sectionRef}>
      <div className={`container ${styles.inner}`}>
        <p className="section-label reveal">Career</p>
        <h2 className="section-title reveal delay-1">Work <span>Experience</span></h2>
        <div className={styles.timeline}>
          {timeline.map((item, i) => (
            <div key={i} className={`${styles.item} reveal`} style={{transitionDelay: `${0.15+i*0.12}s`}}>
              <div className={styles.connector}>
                <div className={styles.dot} style={{background: item.color, boxShadow: `0 0 12px ${item.color}88`}} />
                {i < timeline.length - 1 && <div className={styles.line} />}
              </div>
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <div>
                    <span className={styles.typeTag} style={{color: item.color, background: `${item.color}18`}}>{item.type}</span>
                    <h3 className={styles.role}>{item.role}</h3>
                    <p className={styles.company}>{item.company}</p>
                  </div>
                  <span className={styles.period}>{item.period}</span>
                </div>
                <ul className={styles.bullets}>
                  {item.bullets.map((b,j) => <li key={j}>{b}</li>)}
                </ul>
                <div className={styles.tags}>
                  {item.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.achievementsRow} reveal`}>
          {[
            { icon: '🏆', text: '1st Place — GDG Hackathon 2023' },
            { icon: '🔒', text: 'Google Cybersecurity Professional Cert' },
            { icon: '✈️', text: 'Aeronautics & Astronautics Club' },
            { icon: '🍳', text: 'Logistics Lead — Sigree Cooking Club' },
          ].map(a => (
            <div key={a.text} className={styles.ach}>
              <span className={styles.achIcon}>{a.icon}</span>
              <span>{a.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
