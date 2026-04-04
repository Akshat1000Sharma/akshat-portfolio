'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Projects.module.css';

const projects = [
  {
    title: 'Mediflow — Healthcare Mobile App',
    desc: 'Cross-platform healthcare app for medical workflow management, available on both the App Store (iOS) and Google Play Store (Android). Built with React Native, featuring patient management, appointment scheduling, and real-time notifications.',
    tags: ['React Native', 'iOS', 'Android', 'App Store', 'Play Store'],
    cat: 'Mobile',
    year: '2025',
    link: 'https://play.google.com/store/apps/details?id=com.mediaidmedicalapp',
    featured: true,
    color: '#8B5CF6',
    emoji: '🏥',
  },
  {
    title: 'GraphRAG Social Intelligence System',
    desc: 'End-to-end GraphRAG pipeline for social intelligence that converts unstructured text into structured knowledge graphs and enables multi-hop reasoning via LLMs. Includes indexing workflows, entity-relationship extraction, and flexible querying (global/local/chat) over graph memory for context-aware insights.',
    tags: ['GraphRAG', 'Neo4j', 'LLMs', 'FastAPI', 'Knowledge Graphs'],
    cat: 'AI / ML',
    year: '2026',
    link: 'https://github.com/Akshat1000Sharma/GraphRAG-Social-Intelligence-System',
    featured: true,
    color: '#8B5CF6',
    emoji: '🌐',
  },
  {
    title: 'Real-Time KAG for Node Classification & Link Prediction',
    desc: 'Production-style Knowledge-Augmented Graph system integrating GNN-based node classification and link prediction with real-time graph updates. Features hybrid pipelines combining graph embeddings, LLM reasoning, and API-driven workflows for dynamic inference on evolving graph data.',
    tags: ['GNN', 'PyTorch', 'Neo4j', 'FastAPI', 'Graph ML', 'KAG'],
    cat: 'AI / ML',
    year: '2026',
    link: 'https://github.com/Akshat1000Sharma/Real-Time-KAG-for-Node-Classification-Link-Prediction',
    featured: true,
    color: '#10B981',
    emoji: '🔗',
  },
  {
    title: 'NOAA COOPS Interactive AI Chatbot',
    desc: 'Open-source AI chatbot querying oceanographic datasets with natural language. RAG pipeline combining vector search and structured API queries over NOAA sensor data.',
    tags: ['Graph RAG', 'FastAPI', 'Vector DB', 'Python'],
    cat: 'AI / ML',
    year: '2026',
    link: 'https://github.com/Akshat1000Sharma/noaa-coops-interactive-chatbot',
    featured: true,
    color: '#8B5CF6',
    emoji: '🌊',
  },
  {
    title: 'Dynamic Database AI Chatbot',
    desc: 'AI assistant enabling natural language queries over arbitrary databases. Integrates Qdrant for semantic search and contextual retrieval with secure architecture.',
    tags: ['FastAPI', 'Qdrant', 'LLMs', 'Python'],
    cat: 'AI / ML',
    year: '2025',
    link: 'https://github.com/hemantfealty/demo-ai',
    featured: true,
    color: '#10B981',
    emoji: '💬',
  },
  {
    title: 'CryptoBank — Web3 Banking System',
    desc: 'Decentralised banking prototype with Solidity smart contracts, FastAPI backend, and Next.js frontend. Implements deposit/withdrawal via Ethereum and Hardhat.',
    tags: ['Solidity', 'Hardhat', 'Next.js', 'FastAPI'],
    cat: 'Blockchain',
    year: '2025',
    link: 'https://github.com/Akshat1000Sharma/CryptoBank',
    color: '#F59E0B',
    emoji: '₿',
  },
  {
    title: 'NotesMania — College Notes Platform',
    desc: 'Centralised notes-sharing platform built with Angular frontend and FastAPI backend. Includes user authentication and a clean, community-focused UI.',
    tags: ['Angular', 'FastAPI', 'Auth', 'Full-Stack', 'SQL'],
    cat: 'Full-Stack',
    year: '2024',
    link: 'https://notesmania.co.in/',
    color: '#E8A838',
    emoji: '📚',
  },
  {
    title: 'TaxiAdda — Real-Time Cab Booking',
    desc: 'Next.js frontend with Firebase Realtime DB for live driver locations and bookings. Deployed demo with realtime tracking functionality using Firebase (GMaps API).',
    tags: ['Next.js', 'Firebase', 'Realtime DB'],
    cat: 'Firebase',
    year: '2024',
    link: 'https://github.com/Akshat1000Sharma/mytaxiadda/',
    color: '#EF4444',
    emoji: '🚕',
  },
  {
    title: 'Phishing Website Detection',
    desc: 'Extracted lexical and domain features; trained a random forest classifier wrapped in a Django demo. Hackathon 1st-place winning prototype.',
    tags: ['Django', 'scikit-learn', 'Python', 'ML'],
    cat: 'AI / ML',
    year: '2023',
    link: 'https://github.com/lalitm1004/phishNet',
    color: '#EC4899',
    emoji: '🔒',
  },
  // {
  //   title: 'Generative AI Chatbot',
  //   desc: 'LLM with conversation memory, image & voice plugins, and API connectors. Multi-turn dialogue with contextual recall, image/voice input support.',
  //   tags: ['LangChain', 'Python', 'Multimodal'],
  //   cat: 'AI / ML',
  //   year: '2024',
  //   link: 'https://github.com/Akshat1000Sharma/GenAI-Chatbot',
  //   color: '#06B6D4',
  //   emoji: '🤖',
  // },
  // {
  //   title: 'Low-cost IoT & ML Assistant System',
  //   desc: 'Commodity sensors with lightweight edge ML inference and control. Working prototype demonstrating assistant tasks with low compute overhead.',
  //   tags: ['Arduino', 'Raspberry Pi', 'Edge ML'],
  //   cat: 'Embedded',
  //   year: '2025',
  //   link: 'https://github.com/Akshat1000Sharma/Low-cost-IoT-ML-Assistant',
  //   color: '#3B82F6',
  //   emoji: '🔧',
  // },
  // {
  //   title: 'Neuromorphic Computing Sensor System',
  //   desc: 'Neuromorphic-inspired processing pipeline with simulations and Bash automation. Reduced simulated latency estimates; manuscript in preparation.',
  //   tags: ['Python', 'Bash', 'Simulation'],
  //   cat: 'Research',
  //   year: '2025',
  //   link: 'https://github.com/Akshat1000Sharma/Neuromorphic-Sensor-System',
  //   color: '#8B5CF6',
  //   emoji: '⚡',
  // },
  {
    title: 'KNN Credit Card Case Study',
    desc: 'Full preprocessing pipeline, feature engineering, and KNN with cross-validation for credit approval prediction. Deployable inference API included.',
    tags: ['Python', 'scikit-learn', 'ML'],
    cat: 'AI / ML',
    year: '2024',
    link: 'https://github.com/Akshat1000Sharma/Credit-Card-Customer-Churn-Prediction-through-KNN',
    color: '#10B981',
    emoji: '💳',
  },
];

const categories = ['All', 'Mobile', 'AI / ML', 'Full-Stack', 'Blockchain', 'Firebase'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.cat === activeFilter || p.cat.includes(activeFilter));

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80);
          });
        }
      });
    }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (isInView) {
      sectionRef.current.querySelectorAll('.reveal:not(.visible)').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
    }
  }, [activeFilter]);

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className={`container`}>
        <p className="section-label reveal">Portfolio</p>
        <h2 className="section-title reveal delay-1">Selected <span>Projects</span></h2>
        <p className={`${styles.sub} reveal delay-2`}>
          A collection of production-grade builds, research prototypes, and open-source contributions.
        </p>

        <div className={`${styles.filters} reveal`} style={{transitionDelay:'0.3s'}}>
          {categories.map(c => (
            <button
              key={c}
              className={`${styles.filter} ${activeFilter === c ? styles.activeFilter : ''}`}
              onClick={() => setActiveFilter(c)}
            >{c}</button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((p, i) => (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className={`${styles.card} ${p.featured ? styles.featured : ''} reveal card-hover`}
              style={{transitionDelay: `${0.05 * (i % 6)}s`}}
            >
              <div className={styles.cardGlow} style={{background: `radial-gradient(circle at 50% 0%, ${p.color}22, transparent 70%)`}} />
              <div className={styles.cardHeader}>
                <span className={styles.emoji}>{p.emoji}</span>
                <div className={styles.cardMeta}>
                  <span className={styles.catBadge} style={{color: p.color, background: `${p.color}18`}}>{p.cat}</span>
                  <span className={styles.year}>{p.year}</span>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
              <div className={styles.cardTags}>
                {p.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
              <div className={styles.cardArrow}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
