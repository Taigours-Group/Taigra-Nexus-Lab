import { useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Brand mark — the exact SVG from logo.html, inlined so it can be recolored.
 * IMPORTANT: each shape carries its own `transform="matrix(...)"` attribute,
 * so animations must never touch shape transforms — we only move the WRAPPER
 * <g> of each shape (it has no authored transform of its own). Variants:
 *   - "dark"  → ink body + royal red tips (for white surfaces)
 *   - "light" → white body + royal red tips (for red/dark surfaces)
 *
 * Animated mode: every piece flies in from off-canvas (stems from below,
 * arms from the sides, wings + red tips from above) and they all slam into
 * their final position at the same instant — like metal parts colliding to
 * forge the mark. A short impact shake on the whole svg sells the hit.
 */
const COLORS = {
  dark: { body: '#101114', accent: '#BC3232' },
  light: { body: '#ffffff', accent: '#BC3232' },
};

// flight time before every piece lands (they all land together = collision)
const IMPACT = 0.55;

/**
 * Synthesized metal-clang impact — Web Audio, no asset file.
 * A burst of filtered noise (the "clash") plus two detuned metallic
 * ring tones that decay fast. Browsers only allow audio after a user
 * gesture, so this silently no-ops if the AudioContext stays suspended.
 */
const playImpactSound = () => {
  // several marks can animate near-simultaneously (loading screen → hero);
  // one clang is enough
  const t = performance.now();
  if (playImpactSound._last && t - playImpactSound._last < 1500) return;
  playImpactSound._last = t;
  try {
    const Ctx = window.AudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
      if (ctx.state === 'suspended') { ctx.close(); return; }
    }
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.5, now);
    master.connect(ctx.destination);

    // clash: short burst of band-passed noise
    const dur = 0.35;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2.5);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 2400;
    bp.Q.value = 0.8;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.9, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    noise.connect(bp).connect(noiseGain).connect(master);
    noise.start(now);

    // ring: two detuned metallic partials decaying fast
    [523, 1244].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      const g = ctx.createGain();
      g.gain.setValueAtTime(i === 0 ? 0.25 : 0.12, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(g).connect(master);
      osc.start(now);
      osc.stop(now + 0.55);
    });

    setTimeout(() => ctx.close().catch(() => {}), 900);
  } catch {
    /* audio unavailable — animation still plays */
  }
};

// where each piece flies in FROM (viewBox units, relative to rest position)
const FROM = [
  { x: 90, y: 260 },   // right stem half  → from bottom-right
  { x: -90, y: 260 },  // left stem half   → from bottom-left
  { x: 320, y: -120 }, // right arm        → from the right
  { x: -320, y: -120 },// left arm         → from the left
  { x: 0, y: -280 },   // upper wings      → from above
  { x: 0, y: -380 },   // red tips         → from high above
];

const LogoShapes = ({ body, accent, animated }) => {
  // Animate only the wrapper <g> translate — the shape's own
  // transform attribute stays exactly as authored.
  const G = animated ? motion.g : 'g';
  const anim = (i) =>
    animated
      ? {
          initial: { opacity: 0, x: FROM[i].x, y: FROM[i].y },
          animate: { opacity: 1, x: 0, y: 0 },
          transition: {
            x: { duration: IMPACT, ease: [0.55, 0, 0.85, 0.45] }, // accelerate in — hard stop
            y: { duration: IMPACT, ease: [0.55, 0, 0.85, 0.45] },
            opacity: { duration: IMPACT * 0.4, ease: 'easeOut' },
          },
        }
      : {};

  return (
    <>
      <G {...anim(0)}>
        <rect width="381.189" height="56.9657" transform="matrix(0 -1 -1 0 417.975 629.583)" fill={body} />
        <path d="M360.297 692.605L418.182 629.879L360.884 595.909L360.297 692.605Z" fill={body} />
      </G>
      <G {...anim(1)}>
        <rect x="275.457" y="629.583" width="381.189" height="56.9657" transform="rotate(-90 275.457 629.583)" fill={body} />
        <path d="M333.135 692.605L275.25 629.879L332.549 595.909L333.135 692.605Z" fill={body} />
      </G>
      <G {...anim(2)}>
        <rect width="236.795" height="60.8997" transform="matrix(-0.915233 0.402925 -0.603646 -0.797252 613.999 201.251)" fill={body} />
        <path d="M612.608 136.317L614.3 201.353L558.011 161.02L612.608 136.317Z" fill={body} />
      </G>
      <G {...anim(3)}>
        <rect width="236.795" height="60.8997" transform="matrix(0.915233 0.402925 0.603646 -0.797252 78.9698 201.251)" fill={body} />
        <path d="M80.3605 136.317L78.6683 201.353L134.958 161.02L80.3605 136.317Z" fill={body} />
      </G>
      <G {...anim(4)}>
        <rect width="282.5" height="57.5929" transform="matrix(-0.910405 0.41372 -0.591457 -0.806337 603.253 112.034)" fill={body} />
        <rect width="282.5" height="57.5929" transform="matrix(0.910405 0.41372 0.591457 -0.806337 89.4654 112.034)" fill={body} />
      </G>
      <G {...anim(5)}>
        <path d="M663.761 22.6239L603.118 112.141L552.962 72.9548L663.761 22.6239Z" fill={accent} />
        <path d="M28.9573 22.6239L89.6008 112.141L139.756 72.9548L28.9573 22.6239Z" fill={accent} />
      </G>
    </>
  );
};

export const LogoMark = ({
  variant = 'dark',
  size = 32,
  animated = false,
  className = '',
  title = 'Taigra Nexus Lab',
}) => {
  const palette = COLORS[variant] || COLORS.dark;
  const Svg = animated ? motion.svg : 'svg';

  // fire the clang exactly when the pieces land
  useEffect(() => {
    if (!animated) return;
    const id = setTimeout(playImpactSound, IMPACT * 1000);
    return () => clearTimeout(id);
  }, [animated]);

  // impact shake — fires exactly when the pieces land
  const shake = animated
    ? {
        initial: { scale: 1 },
        animate: { scale: [1, 1, 1.12, 0.96, 1.02, 1], x: [0, 0, -3, 3, -1, 0] },
        transition: { duration: IMPACT + 0.4, times: [0, IMPACT / (IMPACT + 0.4), 0.62, 0.76, 0.9, 1], ease: 'easeOut' },
      }
    : {};

  return (
    <Svg
      viewBox="0 0 693 713"
      width={size}
      height={size * (713 / 693)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
      style={animated ? { overflow: 'visible' } : undefined}
      {...shake}
    >
      <LogoShapes body={palette.body} accent={palette.accent} animated={animated} />
    </Svg>
  );
};

/** Continuously pulsing mark — used on the loading screen */
export const LogoPulse = ({ variant = 'dark', size = 64, className = '' }) => (
  <motion.div
    animate={{ scale: [1, 1.04, 1] }}
    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    className={className}
  >
    <LogoMark variant={variant} size={size} animated />
  </motion.div>
);

export default LogoMark;
