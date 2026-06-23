const fs = require('fs');
let content = fs.readFileSync('templates/TraditionalTemplate.tsx', 'utf8');

// Find all className="something ${theme...} something" and convert to className={`something ${theme...} something`}
content = content.replace(/className="([^"]*?\$\{theme\.[^}]+}[^"]*?)"/g, (match, p1) => {
    return 'className={`' + p1 + '`}';
});

// also fix any instances of just className=${theme.bgMain} which might be invalid jsx
// Wait, looking at the previous file content, they were className="${theme.bgMain} ..."

fs.writeFileSync('templates/TraditionalTemplate.tsx', content);
console.log('Fixed className template literals');
