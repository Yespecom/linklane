import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login to Linklane | Access Your Dashboard',
    description: 'Login to your Linklane account to manage your profile, customize your design, and view powerful analytics.',
    keywords: ['login', 'sign in', 'linklane login', 'dashboard access', 'account'],
    openGraph: {
        title: 'Login to Linklane | Access Your Dashboard',
        description: 'Login to your Linklane account to manage your profile, customize your design, and view powerful analytics.',
        url: 'https://linklane.in/login',
        siteName: 'Linklane',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Login to Linklane | Access Your Dashboard',
        description: 'Login to your Linklane account to manage your profile, customize your design, and view powerful analytics.',
    },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
