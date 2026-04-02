'use client';
import { useEffect, useRef } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100);
          });
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <div className={styles.glow} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <p className="section-label reveal">Get in Touch</p>
          <h2 className="section-title reveal delay-1">
            Let&apos;s Build<br/><span>Something Great</span>
          </h2>
          <p className={`${styles.sub} reveal delay-2`}>
            Whether it&apos;s a collaboration, research opportunity, internship, or just a conversation about tech — I&apos;m always open. Reach out any time.
          </p>
          <div className={`${styles.contactItems} reveal delay-3`}>
            <ContactItem icon="📧" label="Email" value="as549@snu.edu.in" href="mailto:as549@snu.edu.in" />
            <ContactItem icon="📞" label="Phone" value="+91 7067466990" href="tel:+917067466990" />
            <ContactItem icon="📍" label="Location" value="Greater Noida, India" />
          </div>
          <div className={`${styles.socials} reveal`} style={{transitionDelay:'0.4s'}}>
            <SocialLink href="https://github.com/Akshat1000Sharma" label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/akshat-sharma-37b94829b" label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </SocialLink>
            <SocialLink href="https://www.instagram.com/myselfakshatsharma/" label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
            </SocialLink>
          </div>
        </div>
        <div className={`${styles.right} reveal delay-2`}>
          <div className={styles.card3d}>
            <div className={styles.cardInner}>
              <div className={styles.profileEmoji}>👨‍💻</div>
              <h3 className={styles.profileName}>Akshat Sharma</h3>
              <p className={styles.profileTitle}>ML & AI Systems Developer</p>
              <div className={styles.profileDivider} />
              <div className={styles.profileDetail}><span>🎓</span> Shiv Nadar University, B.Tech AIML</div>
              <div className={styles.profileDetail}><span>📊</span> CGPA: 8.5 — Dean&apos;s List</div>
              <div className={styles.profileDetail}><span>🏆</span> GDG Hackathon 1st Place</div>
              <div className={styles.profileDetail}><span>🔬</span> Research Assistant</div>
              <div className={styles.profileDetail}><span>🌍</span> Greater Noida, India</div>
              <a href="mailto:as549@snu.edu.in" className={`magnetic-btn filled ${styles.contactBtn}`}>
                Say Hello 👋
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag href={href} className={styles.contactItem}>
      <span className={styles.contactIcon}>{icon}</span>
      <div>
        <div className={styles.contactLabel}>{label}</div>
        <div className={styles.contactValue}>{value}</div>
      </div>
    </Tag>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={styles.socialLink} aria-label={label}>
      <svg width="22" height="22">{children}</svg>
      <span>{label}</span>
    </a>
  );
}
