import { notFound } from 'next/navigation';
import { getCardData } from '@/lib/api';
import LuxuryTemplate from '@/templates/LuxuryTemplate';
import RusticTemplate from '@/templates/RusticTemplate';
import TraditionalTemplate from '@/templates/TraditionalTemplate';
import NavyTemplate from '@/templates/NavyTemplate';

export default async function WeddingCard({ 
    params, 
    searchParams 
}: { 
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { slug } = await params;
    const resolvedSearchParams = await searchParams;
    const isPreview = resolvedSearchParams.preview === 'true';

    const cardData = await getCardData(slug);

    if (!cardData) {
        return notFound();
    }

    if (cardData.theme === 'traditional-navy') {
        return <NavyTemplate cardData={cardData} slug={slug} isPreview={isPreview} />;
    }

    if (slug === 'hoang-anh-minh-thu' || cardData.theme === 'traditional' || cardData.theme?.startsWith('traditional-')) {
        return <TraditionalTemplate cardData={cardData} slug={slug} isPreview={isPreview} />;
    }

    if (cardData.theme === 'rustic') {
        return <RusticTemplate cardData={cardData} slug={slug} isPreview={isPreview} />;
    }

    // Default to luxury theme
    return <LuxuryTemplate cardData={cardData} slug={slug} isPreview={isPreview} />;
}