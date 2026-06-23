const fs = require('fs');

let content = fs.readFileSync('templates/TraditionalTemplate.tsx', 'utf8');

const themeConfigStr = `
export const THEME_CONFIGS: Record<string, any> = {
    'traditional-red': {
        bgMain: 'bg-[#800000]',
        bgLight: 'bg-[#f8f9fa]',
        bgBank: 'bg-[#eaddce]',
        textMain: 'text-[#800000]',
        textAccent: 'text-[#d4af37]',
        textInverse: 'text-white',
        borderAccent: 'border-[#d4af37]',
        icon: '囍'
    },
    'traditional-navy': {
        bgMain: 'bg-[#002147]',
        bgLight: 'bg-[#f4f6f8]',
        bgBank: 'bg-[#e5e4e2]',
        textMain: 'text-[#002147]',
        textAccent: 'text-[#d4af37]',
        textInverse: 'text-[#d4af37]',
        borderAccent: 'border-[#d4af37]',
        icon: '&'
    },
    'traditional-minimal': {
        bgMain: 'bg-[#ffffff]',
        bgLight: 'bg-[#fafafa]',
        bgBank: 'bg-[#f0f0f0]',
        textMain: 'text-[#111111]',
        textAccent: 'text-[#111111]',
        textInverse: 'text-[#111111]',
        borderAccent: 'border-[#111111]',
        icon: '♡'
    },
    'traditional-pastel': {
        bgMain: 'bg-[#fdf0ed]',
        bgLight: 'bg-[#fef9f8]',
        bgBank: 'bg-[#ffffff]',
        textMain: 'text-[#5a4a42]',
        textAccent: 'text-[#5a4a42]',
        textInverse: 'text-[#5a4a42]',
        borderAccent: 'border-[#5a4a42]',
        icon: '❀'
    }
};
`;

// Insert THEME_CONFIGS after imports
const importRegex = /(import .*;\n)+/;
content = content.replace(importRegex, match => match + '\n' + themeConfigStr + '\n');

// 1. FloatingHy Component
content = content.replace(
    /const FloatingHy = \(\{ isOpened \}: \{ isOpened: boolean \}\) => \{/g, 
    'const FloatingHy = ({ isOpened, theme }: { isOpened: boolean, theme: any }) => {'
);
content = content.replace(/text-\[\#800000\] opacity-10/g, '${theme.textMain} opacity-10');
content = content.replace(/text-\[\#8a0000\] opacity-20/g, '${theme.textMain} opacity-20');
content = content.replace(/囍/g, '{theme.icon}');

// 2. TraditionalBankPopup
content = content.replace(
    /const TraditionalBankPopup = \(\{ banks, onClose \}: \{ banks: any\[\], onClose: \(\) => void \}\) => \{/g, 
    'const TraditionalBankPopup = ({ banks, onClose, theme }: { banks: any[], onClose: () => void, theme: any }) => {'
);
content = content.replace(/bg-\[\#eaddce\]/g, '${theme.bgBank}');
content = content.replace(/bg-\[\#800000\]/g, '${theme.bgMain}');
content = content.replace(/text-\[\#800000\]/g, '${theme.textMain}');

// 3. Main Component Signature
content = content.replace(
    /export default function TraditionalTemplate\(\{ cardData, slug, isPreview = false \}: \{ cardData: any, slug: string, isPreview\?: boolean \}\) \{/g, 
    'export default function TraditionalTemplate({ cardData, slug, isPreview = false }: { cardData: any, slug: string, isPreview?: boolean }) {\n    const theme = THEME_CONFIGS[cardData?.theme] || THEME_CONFIGS[\'traditional-red\'];'
);

// 4. Update prop passing
content = content.replace(/<FloatingHy isOpened=\{isOpened\} \/>/g, '<FloatingHy isOpened={isOpened} theme={theme} />');
content = content.replace(
    /<TraditionalBankPopup banks=\{cardData\.banks\} onClose=\{\(\) => setShowBankDetails\(false\)\} \/>/g, 
    '<TraditionalBankPopup banks={cardData.banks} onClose={() => setShowBankDetails(false)} theme={theme} />'
);

// 5. Replace tailwind string literals with template literals if they are inside strings
// For example: className="... bg-[#800000] ..." -> className={`... ${theme.bgMain} ...`}
// Because this is a complex AST transformation, it's safer to use regex to find className="..." and replace it with className={`...`}

// Regex to convert className="str" to className={`str`}
content = content.replace(/className="([^"]*?)"/g, (match, p1) => {
    if (p1.includes('#800000') || p1.includes('#f8f9fa') || p1.includes('#d4af37') || p1.includes('#8a0000')) {
        let newStr = p1
            .replace(/bg-\[\#800000\]/g, '${theme.bgMain}')
            .replace(/bg-\[\#f8f9fa\]/g, '${theme.bgLight}')
            .replace(/text-\[\#d4af37\]/g, '${theme.textAccent}')
            .replace(/border-\[\#d4af37\]/g, '${theme.borderAccent}')
            .replace(/border-t-\[\#d4af37\]/g, '${theme.borderAccent.replace("border-", "border-t-")}')
            .replace(/border-b-\[\#d4af37\]/g, '${theme.borderAccent.replace("border-", "border-b-")}')
            .replace(/text-\[\#800000\]/g, '${theme.textMain}')
            .replace(/text-white/g, '${theme.textInverse}');
        
        return `className={\`${newStr}\`}`;
    }
    return match;
});

// For existing className={`...`} we just do normal string replacements
content = content.replace(/className=\{`([^`]*?)`\}/g, (match, p1) => {
    let newStr = p1
            .replace(/bg-\[\#800000\]/g, '${theme.bgMain}')
            .replace(/bg-\[\#f8f9fa\]/g, '${theme.bgLight}')
            .replace(/text-\[\#d4af37\]/g, '${theme.textAccent}')
            .replace(/border-\[\#d4af37\]/g, '${theme.borderAccent}')
            .replace(/text-\[\#800000\]/g, '${theme.textMain}')
            .replace(/text-white/g, '${theme.textInverse}');
    return `className={\`${newStr}\`}`;
});

fs.writeFileSync('templates/TraditionalTemplate.tsx', content);
console.log('Successfully parameterized TraditionalTemplate.tsx');
