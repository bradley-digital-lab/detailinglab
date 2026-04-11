const fs = require('fs');
const path = 'src/app/executive-summary/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// The boolean "false" bypass works natively in Framer but fails strict TypeScript typing for NextJS build.
// We replace the boolean with explicit identical static states for mobile, preventing any visual transition.

// Reverting the "false" syntax
content = content.replaceAll('initial={isMobile ? false : { opacity: 0, y: 20 }}', 'initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}');
content = content.replaceAll('whileInView={isMobile ? false : { opacity: 1, y: 0 }}', 'whileInView={{ opacity: 1, y: 0 }}');

content = content.replaceAll('initial={isMobile ? false : { opacity: 0, y: 30 }}', 'initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}');

fs.writeFileSync(path, content, 'utf8');
console.log('TypeScript Types correctly mapped for static framer bounds');
