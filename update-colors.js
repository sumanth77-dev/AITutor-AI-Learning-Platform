const fs = require('fs');
const path = 'src/pages/landingpage.tsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/59,130,246/g, '99,102,241');
content = content.replace(/203,213,225/g, '226,232,240');
fs.writeFileSync(path, content);
console.log('Colors updated successfully!');
