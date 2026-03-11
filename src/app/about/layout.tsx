import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | Linklane Ecosystem',
    description: 'Learn about Linklane – the universal platform designed to help you own, manage, and monetize your entire digital footprint.',
    keywords: ['about', 'company', 'mission', 'linklane', 'digital identity', 'team'],
    openGraph: {
        title: 'About Us | Linklane Ecosystem',
        description: 'Learn about Linklane – the universal platform designed to help you own, manage, and monetize your entire digital footprint.',
        url: 'https://linklane.in/about',
        siteName: 'Linklane',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Us | Linklane Ecosystem',
        description: 'Learn about Linklane – the universal platform designed to help you own, manage, and monetize your entire digital footprint.',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
