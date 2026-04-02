'use client';
import { useEffect, useRef } from 'react';
import styles from './Skills.module.css';

/* Each skill group has a list of technologies with their Simple Icons slugs */
const skillGroups = [
  {
    icon: '💻',
    title: 'Core Languages',
    color: '#E8A838',
    detail: `My foundation is strongest in Python, JavaScript/TypeScript, and C/C++. I use Python daily for ML pipelines, scripting, and data processing. TypeScript powers all my full-stack projects with strong type safety. My C/C++ background gives me confidence working close to the metal — including embedded systems and performance-critical applications. I also write Solidity for smart contracts and Bash for DevOps automation.`,
    techs: [
      { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'C++',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'C',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
      { name: 'Java',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Bash',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
    ],
  },
  {
    icon: '🌐',
    title: 'Frontend Development',
    color: '#06B6D4',
    detail: `I build polished, production-grade UIs across React, Next.js, and Angular ecosystems. I'm comfortable with complex state management, SSR/SSG with Next.js, component architecture, and CSS animation. I've built everything from animated portfolio sites to enterprise Angular applications at Fealty Technologies, always focusing on accessibility, performance, and smooth user experience.`,
    techs: [
      { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Angular',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
      { name: 'HTML5',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Three.js',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
    ],
  },
  {
    icon: '📱',
    title: 'Mobile Development',
    color: '#8B5CF6',
    featured: true,
    featuredApp: {
      name: 'Mediflow',
      desc: 'Healthcare workflow app — live on App Store & Play Store',
      icon: '🏥',
    },
    detail: `I develop cross-platform mobile applications using React Native and Flutter. My most notable app is Mediflow — a healthcare mobile application available on both the iOS App Store and Google Play Store. It streamlines medical workflows and patient management with real-world users across both platforms. I handle the full pipeline: UI design, API integration, push notifications, and release deployment to both stores.`,
    techs: [
      { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Flutter',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'Dart',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
      { name: 'iOS',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg' },
      { name: 'Android',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
    ],
  },
  {
    icon: '⚙️',
    title: 'Backend & APIs',
    color: '#10B981',
    detail: `Backend is where I'm most productive at scale. I've built production FastAPI services handling vector DB lookups, LLM orchestration, and knowledge graph queries at Fealty Technologies. I've also built Django REST apps with authentication, file handling, and admin dashboards. I design APIs with security, versioning, and performance in mind — always documented with OpenAPI/Swagger specs.`,
    techs: [
      { name: 'FastAPI',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'Django',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Flask',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
    ],
  },
  {
    icon: '🧠',
    title: 'AI / ML & LLMs',
    color: '#EF4444',
    detail: `AI/ML is my primary research and professional focus. I've built production RAG pipelines, Knowledge-Augmented Generation systems with Neo4j + GNNs, and LLM-based chatbots with multimodal capabilities. At Fealty Technologies, I integrated vector databases (Qdrant, Weaviate) with FastAPI backends for semantic search systems. Academic work spans LSTM forecasting, classifiers, and neuromorphic computing research.`,
    techs: [
      { name: 'PyTorch',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'TensorFlow',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'scikit-learn', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
      { name: 'Pandas',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
      { name: 'NumPy',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
      { name: 'Jupyter',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
    ],
  },
  {
    icon: '🗄️',
    title: 'Databases & Storage',
    color: '#F59E0B',
    detail: `I work across relational, document, graph, and vector databases. For AI applications I reach for Qdrant or Weaviate for semantic search. For relationship-heavy data and knowledge graphs, Neo4j with Cypher is my go-to. Everyday apps use PostgreSQL or MongoDB. I use Firebase Realtime Database and Firestore for real-time mobile and web applications.`,
    techs: [
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Firebase',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Neo4j',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg' },
      { name: 'Redis',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    ],
  },
  {
    icon: '🔗',
    title: 'Blockchain & Web3',
    color: '#3B82F6',
    detail: `I've designed and deployed Ethereum smart contracts using Solidity and Hardhat covering DeFi patterns — escrow, deposits/withdrawals, and reentrancy guards. My CryptoBank project combines Solidity contracts with a FastAPI backend and Next.js frontend into a full decentralised banking prototype. I also built a blockchain-based document protection system using on-chain hashing and permissioned access control.`,
    techs: [
      { name: 'Solidity',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg' },
      { name: 'Ethereum',   icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/ethereum.svg' },
      { name: 'Web3.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/web3js/web3js-original.svg' },
      { name: 'Hardhat',    icon: '/logo/hardhat.png' },
    ],
  },
  {
    icon: '🔧',
    title: 'DevOps & Embedded',
    color: '#EC4899',
    detail: `I containerise all backend services with Docker and have worked with Kubernetes for orchestration. Proficient in Linux administration and Bash scripting for automation. On the embedded side, I've built IoT prototypes with Arduino, Raspberry Pi, and STM32 — integrating sensors, edge ML inference, and control loops. I also participated in an RC Craft/UAV challenge with custom flight control software.`,
    techs: [
      { name: 'Docker',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Kubernetes',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
      { name: 'Linux',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      { name: 'Git',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Arduino',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg' },
      { name: 'Raspberry Pi', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg' },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 55);
          });
        }
      });
    }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <div className="container">
        <p className="section-label reveal">Expertise</p>
        <h2 className="section-title reveal delay-1">Technical <span>Skills</span></h2>
        <p className={`${styles.intro} reveal delay-2`}>
          Eight domains, production experience — here&apos;s a detailed look at what I build with and how.
        </p>

        <div className={styles.grid}>
          {skillGroups.map((g, i) => (
            <div
              key={g.title}
              className={`${styles.card} ${g.featured ? styles.featuredCard : ''} reveal`}
              style={{ transitionDelay: `${0.07 * (i % 4)}s`, '--card-color': g.color } as React.CSSProperties}
            >
              {/* Top accent line */}
              <div className={styles.cardAccent} style={{ background: g.color }} />

              {/* Header */}
              <div className={styles.cardTop}>
                <span className={styles.cardIcon}>{g.icon}</span>
                <div>
                  <div className={styles.cardTitleRow}>
                    <h3 className={styles.cardTitle}>{g.title}</h3>
                    {g.featured && <span className={styles.featuredBadge}>⭐ Featured</span>}
                  </div>
                </div>
              </div>

              {/* Mediflow app banner */}
              {g.featured && g.featuredApp && (
                <div className={styles.appBanner}>
                  <span className={styles.appIcon}>{g.featuredApp.icon}</span>
                  <div className={styles.appInfo}>
                    <strong className={styles.appName}>{g.featuredApp.name}</strong>
                    <p className={styles.appDesc}>{g.featuredApp.desc}</p>
                  </div>
                  <div className={styles.storeBadges}>
                    <span className={styles.storeBadge}>
                      <AppleIcon /> App Store
                    </span>
                    <span className={styles.storeBadge} style={{ background:'rgba(61,220,132,0.1)', borderColor:'rgba(61,220,132,0.3)', color:'#3DDC84' }}>
                      <AndroidIcon /> Play Store
                    </span>
                  </div>
                </div>
              )}

              {/* Description */}
              <p className={styles.detail}>{g.detail}</p>

              {/* Tech icons grid */}
              <div className={styles.techGrid}>
                {g.techs.map(t => (
                  <div key={t.name} className={styles.techItem} title={t.name}>
                    <div className={styles.techIconWrap}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={t.icon}
                        alt={t.name}
                        className={styles.techIcon}
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <span className={styles.techName}>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppleIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.341c-.482 0-.873-.396-.873-.884s.391-.884.873-.884.873.396.873.884-.391.884-.873.884m-11.046 0c-.482 0-.873-.396-.873-.884s.391-.884.873-.884.873.396.873.884-.391.884-.873.884m11.404-6.671l1.747-3.054a.363.363 0 0 0-.131-.496.358.358 0 0 0-.492.132l-1.77 3.09A10.65 10.65 0 0 0 12 7.625c-1.61 0-3.137.37-4.495 1.031L5.735 5.252a.358.358 0 0 0-.492-.132.363.363 0 0 0-.131.496l1.747 3.054C4.154 9.909 2.5 12.141 2.5 14.75h19c0-2.609-1.654-4.841-4.619-6.08"/>
    </svg>
  );
}
