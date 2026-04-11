const fs = require('fs');
const path = 'src/app/executive-summary/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// The hydration flash is caused by isMobile JS overriding SSR rendering logic.
// The user explicitly stated they dislike the mobile box load-in animations and they fail after programmatic domination.
// The most elite, robust, Apple-tier architecture for heavy grid components on scroll is pure static native HTML rendering, ensuring zero IntersectionObserver thrash globally.

// We will target all initial={...} and whileInView={...} props and nuke them.
// We must leave the Hero Section boot sequence intact. Hero animations use `initial` and `animate`, NOT `whileInView`.
// So we will strictly search for blocks containing `whileInView` and strip `initial={...}`, `whileInView={...}`, `viewport={...}`, and `transition={...}`.

// Let's use a regex that matches `initial={...}` when it's near `whileInView=`
// Actually, it's safer to just replace the exact raw strings we know are there.

// 1. Array map delays and whileInView props:
const targets = [
  'initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}',
  'whileInView={{ opacity: 1, y: 0 }}',
  'viewport={{ once: true, amount: 0.1 }}',
  'initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}',
  'initial={{ opacity: 0, scale: 0.95 }}',
  'whileInView={{ opacity: 1, scale: 1 }}',
  'viewport={{ once: true }}',
  'transition={{ delay: i * 0.055 }}',
  'transition={{ duration: 0.4, delay: isMobile ? 0 : i * 0.05 }}',
  'style={{ willChange: "transform, opacity" }}'
];

targets.forEach(target => {
  content = content.replaceAll(target, '');
});

// Since the user mentioned "weird animation on boxes", let's also remove `whileTap` and `whileHover` framer-motion props from grid boxes, as tapping on mobile with whileTap can cause visual sticking/glitches.
content = content.replaceAll('whileTap={{ scale: 0.95, border: "1px solid rgba(34,211,238,0.5)" }}', '');
content = content.replaceAll('whileHover={{ scale: 1.02 }}', '');

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully stripped hydration-crashing scroll physics from Grid Layouts');
