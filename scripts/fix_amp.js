const fs = require('fs');
let content = fs.readFileSync('templates/NavyTemplate.tsx', 'utf8');
content = content.replace(/>&</g, '>{"&"}<');
fs.writeFileSync('templates/NavyTemplate.tsx', content);
