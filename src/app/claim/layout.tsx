import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Claim Your Linklane | Reserve Your Digital Identity',
    description: 'Secure your unique Linklane handle today. Consolidate your digital presence and start growing your professional network.',
    keywords: ['claim', 'reserve name', 'linklane', 'handle', 'portfolio', 'link in bio'],
    openGraph: {
        title: 'Claim Your Linklane | Reserve Your Digital Identity',
        description: 'Secure your unique Linklane handle today. Consolidate your digital presence and start growing your professional network.',
        url: 'https://linklane.in/claim',
        siteName: 'Linklane',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Claim Your Linklane | Reserve Your Digital Identity',
        description: 'Secure your unique Linklane handle today. Consolidate your digital presence and start growing your professional network.',
    },
};

export default function ClaimLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
