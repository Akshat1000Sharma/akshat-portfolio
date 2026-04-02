'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero({ theme }: { theme: string }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted]       = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    let renderer: any;
    let animId: number;
    let cleanupFn: (() => void) | undefined;

    const init = async () => {
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');

      const canvas = canvasRef.current!;
      const W = () => canvas.clientWidth  || 480;
      const H = () => canvas.clientHeight || 600;

      /* ── Renderer ──────────────────────────────────── */
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // PCFSoftShadowMap is deprecated in r183 — use default PCFShadowMap
      renderer.shadowMap.enabled = true;
      renderer.setSize(W(), H());

      /* ── Scene / Camera ────────────────────────────── */
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, W() / H(), 0.1, 100);
      camera.position.set(0, 1.5, 6);
      camera.lookAt(0, 0.5, 0);

      /* ── Lights ────────────────────────────────────── */
      scene.add(new THREE.AmbientLight(0xffffff, 1.2));

      const keyLight = new THREE.DirectionalLight(0xfff6e0, 2.0);
      keyLight.position.set(4, 8, 6);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xb4d8ff, 0.6);
      fillLight.position.set(-4, 2, 2);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffd080, 0.4);
      rimLight.position.set(0, 4, -5);
      scene.add(rimLight);

      /* ── Ground shadow ─────────────────────────────── */
      const ground = new THREE.Mesh(
        new THREE.CircleGeometry(2.5, 48),
        new THREE.MeshStandardMaterial({ color: 0x000000, transparent: true, opacity: 0.07 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -2.1;
      ground.receiveShadow = true;
      scene.add(ground);

      /* ── Particles ─────────────────────────────────── */
      const particleCount = 180;
      const pPos = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const r     = 2.2 + Math.random() * 2.5;
        pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
        pPos[i * 3 + 2] = r * Math.cos(phi);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ color: 0xE8A838, size: 0.035, transparent: true, opacity: 0.55 });
      const particles = new THREE.Points(pGeo, pMat);
      particles.position.y = 0.2;
      scene.add(particles);

      /* ── Model ─────────────────────────────────────── */
      let model: any     = null;
      let baseScale      = 1;           // set once when model loads — never changed after
      let basePositionY  = 0;           // centre Y after loading — used for idle bob offset
      let mixer: any     = null;

      // Bone references for cursor tracking
      let headBone:  any = null;
      let neckBone:  any = null;
      let spineBone: any = null;

      const findBones = (root: any) => {
        root.traverse((obj: any) => {
          const n: string = obj.name?.toLowerCase() ?? '';
          if (!headBone  && ['head', 'mixamorighead'].some(k => n.includes(k)))  headBone  = obj;
          if (!neckBone  && ['neck', 'mixamorigneck'].some(k => n.includes(k)))  neckBone  = obj;
          if (!spineBone && ['spine', 'mixamorigspine'].some(k => n.includes(k))) spineBone = obj;
        });
      };

      const loader = new GLTFLoader();
      loader.load(
        '/models/fancy-slenderman-ai-untextured/source/model.glb',
        (gltf: any) => {
          model = gltf.scene;

          /* Auto-fit into a 3.5-unit tall bounding box */
          const box3  = new THREE.Box3().setFromObject(model);
          const size  = box3.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          baseScale   = 3.5 / maxDim;

          model.scale.setScalar(baseScale);   // set once, never touch again
          model.position.set(0, 0, 0);

          /* Re-centre after scaling */
          box3.setFromObject(model);
          const centre = box3.getCenter(new THREE.Vector3());
          model.position.sub(centre);
          model.position.y -= 0.4;

          basePositionY = model.position.y;   // remember baseline Y

          model.traverse((child: any) => {
            if (child.isMesh) { child.castShadow = true; child.receiveShadow = true; }
          });

          scene.add(model);
          setModelLoaded(true);
          findBones(model);

          if (gltf.animations?.length > 0) {
            mixer = new THREE.AnimationMixer(model);
            mixer.clipAction(gltf.animations[0]).play();
          }
        },
        undefined,
        (err: any) => console.error('GLB error:', err)
      );

      /* ── Mouse / touch tracking ────────────────────── */
      // Smooth targets
      let bodyRotYTarget  = 0;
      let bodyRotYCurrent = 0;
      let headYTarget     = 0, headYCurrent  = 0;
      let headXTarget     = 0, headXCurrent  = 0;
      let neckYTarget     = 0, neckYCurrent  = 0;
      let neckXTarget     = 0, neckXCurrent  = 0;
      let spineYTarget    = 0, spineYCurrent = 0;
      let spineXTarget    = 0, spineXCurrent = 0;

      const onMouseMove = (e: MouseEvent) => {
        const nx =  (e.clientX / window.innerWidth  - 0.5) * 2;  // -1…1
        const ny = -(e.clientY / window.innerHeight - 0.5) * 2;  // -1…1 (up positive)
        bodyRotYTarget = nx * 0.42;
        headYTarget    = nx * 0.48;  headXTarget  = ny * 0.35;
        neckYTarget    = nx * 0.26;  neckXTarget  = ny * 0.18;
        spineYTarget   = nx * 0.12;  spineXTarget = ny * 0.08;
      };
      const onTouchMove = (e: TouchEvent) => {
        const t  = e.touches[0];
        const nx =  (t.clientX / window.innerWidth  - 0.5) * 2;
        const ny = -(t.clientY / window.innerHeight - 0.5) * 2;
        bodyRotYTarget = nx * 0.42;
        headYTarget    = nx * 0.48;  headXTarget  = ny * 0.35;
        neckYTarget    = nx * 0.26;  neckXTarget  = ny * 0.18;
        spineYTarget   = nx * 0.12;  spineXTarget = ny * 0.08;
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove',  onTouchMove, { passive: true });

      /* ── Clock — use Timer (r183) if available, else fallback ── */
      // THREE.Clock is deprecated in r183; use performance.now() directly
      let prevTime = performance.now();

      /* ── Animate loop ──────────────────────────────── */
      const animate = () => {
        animId = requestAnimationFrame(animate);

        const now   = performance.now();
        const delta = (now - prevTime) / 1000;   // seconds
        prevTime    = now;
        const elapsed = now / 1000;              // total seconds

        if (mixer) mixer.update(delta);

        if (model) {
          /* --- Body Y rotation toward cursor (no scale touched) --- */
          const L = 0.06;
          bodyRotYCurrent += (bodyRotYTarget - bodyRotYCurrent) * L;
          model.rotation.y = bodyRotYCurrent;

          /* --- Idle float: offset from base, no accumulation --- */
          model.position.y = basePositionY + Math.sin(elapsed * 0.9) * 0.035;

          /* --- Bone look-at: smooth independent lerps --- */
          const BL = 0.07;
          if (headBone) {
            headYCurrent  += (headYTarget  - headYCurrent)  * BL;
            headXCurrent  += (headXTarget  - headXCurrent)  * BL;
            headBone.rotation.y = headYCurrent;
            headBone.rotation.x = headXCurrent;
          }
          if (neckBone) {
            neckYCurrent  += (neckYTarget  - neckYCurrent)  * BL;
            neckXCurrent  += (neckXTarget  - neckXCurrent)  * BL;
            neckBone.rotation.y = neckYCurrent;
            neckBone.rotation.x = neckXCurrent;
          }
          if (spineBone) {
            spineYCurrent += (spineYTarget - spineYCurrent) * BL;
            spineXCurrent += (spineXTarget - spineXCurrent) * BL;
            spineBone.rotation.y = spineYCurrent;
            spineBone.rotation.x = spineXCurrent;
          }
        }

        /* Particle slow drift */
        particles.rotation.y = elapsed * 0.022;
        pMat.opacity = 0.38 + Math.sin(elapsed * 0.5) * 0.14;

        renderer.render(scene, camera);
      };
      animate();

      /* ── Resize ────────────────────────────────────── */
      const onResize = () => {
        renderer.setSize(W(), H());
        camera.aspect = W() / H();
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize);

      cleanupFn = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('touchmove',  onTouchMove);
        window.removeEventListener('resize',     onResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      };
    };

    init();
    return () => { cleanupFn?.(); };
  }, []);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.bg}>
        {theme === 'dark' && mounted && <div className={styles.stars} />}
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
      </div>

      <div className={styles.content}>
        <div className={styles.text}>
          <div className={styles.greeting}>Hello, I&apos;m</div>
          <h1 className={styles.name}>
            <span>Akshat</span><br />
            <span className={styles.nameAccent}>Sharma</span>
          </h1>
          <div className={styles.roles}>
            <RolesTyper roles={['ML / AI Developer', 'Full-Stack Engineer', 'Mobile App Developer', 'Research Assistant']} />
          </div>
          <p className={styles.tagline}>
            Building intelligent systems at the intersection of&nbsp;
            <em>machine learning</em>, <em>web engineering</em>, and <em>research</em>.
          </p>
          <div className={styles.ctas}>
            <a href="#projects" className="magnetic-btn filled">View Projects</a>
            <a href="#contact"  className="magnetic-btn">Let&apos;s Talk</a>
          </div>
          <div className={styles.socials}>
            <a href="https://github.com/Akshat1000Sharma" target="_blank" rel="noreferrer" className={styles.social} title="GitHub">
              <GithubIcon />
            </a>
            <a href="https://www.linkedin.com/in/akshat-sharma-37b94829b" target="_blank" rel="noreferrer" className={styles.social} title="LinkedIn">
              <LinkedinIcon />
            </a>
          </div>
        </div>

        <div className={styles.canvasWrap}>
          {!modelLoaded && (
            <div className={styles.loader}>
              <div className={styles.loaderRing} />
              <span>Loading model…</span>
            </div>
          )}
          <canvas ref={canvasRef} className={styles.canvas} />
          <div className={styles.shadow} />
          <div className={styles.canvasGlow} />
        </div>
      </div>

      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}

/* ── Typer ─────────────────────────────────────────── */
function RolesTyper({ roles }: { roles: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let idx = 0, charIdx = 0, deleting = false;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const cur = roles[idx];
      if (!deleting) {
        if (ref.current) ref.current.textContent = cur.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === cur.length) { deleting = true; timeout = setTimeout(tick, 2000); return; }
      } else {
        if (ref.current) ref.current.textContent = cur.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) { deleting = false; idx = (idx + 1) % roles.length; }
      }
      timeout = setTimeout(tick, deleting ? 50 : 90);
    };
    timeout = setTimeout(tick, 800);
    return () => clearTimeout(timeout);
  }, [roles]);

  return (
    <div className={styles.rolesInner}>
      <span className={styles.rolesDash}>— </span>
      <span ref={ref} />
      <span className={styles.cursor} />
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}