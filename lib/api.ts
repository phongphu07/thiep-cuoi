import fs from 'fs';
import path from 'path';

export async function getCardData(slug: string) {
    try {
        const filePath = path.join(process.cwd(), 'data', 'cards', `${slug}.json`);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error(`Error loading card data for slug ${slug}:`, error);
        return null;
    }
}
