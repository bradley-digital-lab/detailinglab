const fs = require('fs');
let text = fs.readFileSync('src/app/page.tsx', 'utf8');
text = text.replace(/setIsBookingModalOpen\(true\)/g, 'openBookingModalWithPackage()');
text = text.replace('<PricingEstimator onBook={() => openBookingModalWithPackage()} />', '<PricingEstimator onBook={(pkg) => openBookingModalWithPackage(pkg)} />');
fs.writeFileSync('src/app/page.tsx', text);
console.log('wired up all booking modal opens');

