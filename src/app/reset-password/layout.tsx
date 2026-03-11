import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reset Password | Linklane',
    description: 'Create a new password for your Linklane account.',
    keywords: ['reset password', 'change password', 'linklane security'],
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
