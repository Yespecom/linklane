import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Linklane Support | We are Here to Help',
    description: 'Reach out to the Linklane team for assistance, business inquiries, or technical support. Connecting you to the alpha.',
    keywords: ['contact', 'support', 'help desk', 'linklane support', 'inquiries'],
    openGraph: {
        title: 'Contact Linklane Support | We are Here to Help',
        description: 'Reach out to the Linklane team for assistance, business inquiries, or technical support. Connecting you to the alpha.',
        url: 'https://linklane.in/contact',
        siteName: 'Linklane',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Linklane Support | We are Here to Help',
        description: 'Reach out to the Linklane team for assistance, business inquiries, or technical support. Connecting you to the alpha.',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
