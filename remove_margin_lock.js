const fs = require('fs');
const path = 'src/app/executive-summary/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace all margin: "-50px" which causes framer motion stall on iOS
content = content.replaceAll('margin: "-50px"', 'amount: 0.1');

// Simplify transitions for mobile devices (remove delay on arsenal boxes)
// The arsenal mapping is at: transition={{ duration: 0.4, delay: i * 0.1 }}
// On mobile, large staggering causes freezing/apparent crashes. We'll halve it or strip it.
content = content.replaceAll('delay: i * 0.1', 'delay: i * 0.05');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed iOS viewport locks and mobile stagger delay');
