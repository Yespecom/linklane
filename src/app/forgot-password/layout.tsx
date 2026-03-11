import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Forgot Password | Linklane',
    description: 'Reset your Linklane dashboard password.',
    keywords: ['forgot password', 'reset', 'linklane recovery'],
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
