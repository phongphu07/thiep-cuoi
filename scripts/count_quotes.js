const fs = require('fs');
let content = fs.readFileSync('templates/TraditionalTemplate.tsx', 'utf8');
let sqCount = 0;
let dqCount = 0;
for(let char of content) {
    if (char === "'") sqCount++;
    if (char === '"') dqCount++;
}
console.log('Single quotes Traditional:', sqCount);
console.log('Double quotes Traditional:', dqCount);
