const fs = require('fs');

const path = 'src/app/executive-summary/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Global replacement of motion elements to force hardware acceleration on mobile
content = content.replace(/<motion\.div /g, '<motion.div style={{ willChange: "transform, opacity" }} className="transform-gpu" ');
content = content.replace(/<motion\.section /g, '<motion.section style={{ willChange: "transform, opacity" }} className="transform-gpu" ');
content = content.replace(/<motion\.h1 /g, '<motion.h1 style={{ willChange: "transform, opacity" }} className="transform-gpu" ');
content = content.replace(/<motion\.p /g, '<motion.p style={{ willChange: "transform, opacity" }} className="transform-gpu" ');
content = content.replace(/<motion\.svg /g, '<motion.svg style={{ willChange: "transform, opacity" }} className="transform-gpu" ');
content = content.replace(/<motion\.path /g, '<motion.path style={{ willChange: "stroke-dashoffset" }} className="transform-gpu" ');

// Remove excessive backdrop-blur causing lag on mobile Safari
// content = content.replace(/backdrop-blur-md/g, 'backdrop-blur-sm');

// Fix signature path specific animation that might lag
content = content.replace(/className="path-animation"/g, 'className="path-animation transform-gpu" style={{ willChange: "stroke-dashoffset" }}');

fs.writeFileSync(path, content, 'utf8');
console.log('Optimized page animations successfully');
