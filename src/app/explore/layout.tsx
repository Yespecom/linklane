import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Explore Professionals | Linklane',
    description: 'Discover and connect with top-rated professionals, creators, and experts on Linklane.',
    keywords: ['professionals', 'creators', 'experts', 'linklane', 'portfolio', 'discover'],
    openGraph: {
        title: 'Explore Professionals | Linklane',
        description: 'Discover and connect with top-rated professionals, creators, and experts on Linklane.',
        url: 'https://linklane.in/explore',
        siteName: 'Linklane',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Explore Professionals | Linklane',
        description: 'Discover and connect with top-rated professionals, creators, and experts on Linklane.',
    },
};

export default function ExploreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
