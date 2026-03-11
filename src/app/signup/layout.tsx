import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up for Linklane | Create Your Free Account',
    description: 'Join Linklane and build a single, powerful digital destination for your professional presence, links, services, and products.',
    keywords: ['signup', 'register', 'create account', 'link in bio', 'linklane new user'],
    openGraph: {
        title: 'Sign Up for Linklane | Create Your Free Account',
        description: 'Join Linklane and build a single, powerful digital destination for your professional presence, links, services, and products.',
        url: 'https://linklane.in/signup',
        siteName: 'Linklane',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sign Up for Linklane | Create Your Free Account',
        description: 'Join Linklane and build a single, powerful digital destination for your professional presence, links, services, and products.',
    },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
