const fs = require('fs');
const path = 'src/app/executive-summary/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add isMobile state
if (!content.includes('const [isMobile, setIsMobile]')) {
  const isMobileHook = `  const [isMobile, setIsMobile] = useState(false);\n  useEffect(() => {\n    const checkMobile = () => setIsMobile(window.innerWidth < 768);\n    checkMobile();\n    window.addEventListener('resize', checkMobile);\n    return () => window.removeEventListener('resize', checkMobile);\n  }, []);\n\n`;
  content = content.replace('const [scrollUnlocked, setScrollUnlocked] = useState(false);', `const [scrollUnlocked, setScrollUnlocked] = useState(false);\n${isMobileHook}`);
}

// 2. Disable initial and whileInView for mobile on the target mapped boxes (opacity: 0, y: 20)
content = content.replaceAll('initial={{ opacity: 0, y: 20 }}', 'initial={isMobile ? false : { opacity: 0, y: 20 }}');
content = content.replaceAll('whileInView={{ opacity: 1, y: 0 }}', 'whileInView={isMobile ? false : { opacity: 1, y: 0 }}');
content = content.replaceAll('initial={{ opacity: 0, y: 30 }}', 'initial={isMobile ? false : { opacity: 0, y: 30 }}');

// 3. Disable the delay staggering on mobile so they don't break when switching
content = content.replaceAll('transition={{ duration: 0.4, delay: i * 0.05 }}', 'transition={{ duration: 0.4, delay: isMobile ? 0 : i * 0.05 }}');

fs.writeFileSync(path, content, 'utf8');
console.log('Mobile scroll animations disabled successfully');
