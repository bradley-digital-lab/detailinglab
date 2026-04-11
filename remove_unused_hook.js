const fs = require('fs');
const path = 'src/app/executive-summary/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// The `isMobile` hook causes TS/ESlint unused variable warnings because I stripped the animations from the components.
// We must remove the state initialization and the effect that sets it.

content = content.replace(/const \[isMobile, setIsMobile\](.*?)\n\n/s, '');

content = content.replaceAll('useEffect(() => {\n    const checkMobile = () => setIsMobile(window.innerWidth < 768);\n    checkMobile();\n    window.addEventListener(\'resize\', checkMobile);\n    return () => window.removeEventListener(\'resize\', checkMobile);\n  }, []);', '');

fs.writeFileSync(path, content, 'utf8');
console.log('Cleaned up unused hydration hooks.');
