'use client';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className={styles.logo}>AS</span>
          <p>Built with Next.js, Three.js & passion.</p>
        </div>
        <div className={styles.center}>
          {['home','about','skills','experience','projects','contact'].map(l => (
            <a key={l} href={`#${l}`} className={styles.link} style={{textTransform:'capitalize'}}>{l}</a>
          ))}
        </div>
        <p className={styles.copy}>© 2026 Akshat Sharma. All rights reserved.</p>
      </div>
    </footer>
  );
}
