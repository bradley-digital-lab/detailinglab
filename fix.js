const fs = require('fs');
const path = 'src/app/executive-summary/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Revert previous naive replace
['div', 'section', 'h1', 'p', 'svg'].forEach(tag => {
  const badStr = `<motion.${tag} style={{ willChange: "transform, opacity" }} className="transform-gpu" `;
  content = content.replaceAll(badStr, `<motion.${tag} `);
});

const badPath = `<motion.path style={{ willChange: "stroke-dashoffset" }} className="transform-gpu" `;
content = content.replaceAll(badPath, `<motion.path `);

// Revert the path-animation
content = content.replaceAll('className="path-animation transform-gpu" style={{ willChange: "stroke-dashoffset" }}', 'className="path-animation"');

// Save reverted
fs.writeFileSync(path, content, 'utf8');
console.log('Reverted successfully');
