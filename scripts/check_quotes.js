const fs = require('fs');
let content = fs.readFileSync('templates/NavyTemplate.tsx', 'utf8');

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    let bCount = 0;
    let sCount = 0;
    let dCount = 0;
    for(let char of lines[i]) {
        if (char === String.fromCharCode(96)) bCount++;
        if (char === "'") sCount++;
        if (char === '"') dCount++;
    }
    if (sCount % 2 !== 0 && !lines[i].includes("//")) {
        console.log('Odd single quotes on line', i+1, ':', lines[i].trim());
    }
}
