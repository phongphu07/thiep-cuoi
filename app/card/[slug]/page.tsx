import { notFound } from 'next/navigation';
import { getCardData } from '@/lib/api';
import LuxuryTemplate from '@/templates/LuxuryTemplate';
import RusticTemplate from '@/templates/RusticTemplate';

export default async function WeddingCard({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const cardData = await getCardData(slug);

    if (!cardData) {
        return notFound();
    }

    if (cardData.theme === 'rustic') {
        return <RusticTemplate cardData={cardData} slug={slug} />;
    }

    // Default to luxury theme
    return <LuxuryTemplate cardData={cardData} slug={slug} />;
}