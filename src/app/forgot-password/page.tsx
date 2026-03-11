"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const supabase = createClient();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 group font-bold text-sm"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Login
                </Link>

                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-200 border border-slate-100">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Forgot Password</h1>
                        <p className="text-slate-500 font-medium">Enter your email and we'll send a reset link.</p>
                    </div>

                    {!success ? (
                        <form onSubmit={handleReset} className="space-y-5">
                            <div className="space-y-2">
                                <label className="block text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {error && (
                                <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm font-bold text-red-600 animate-shake">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : "Send Reset Link"}
                            </button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center space-y-3"
                        >
                            <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MailCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-black text-green-800">Check Your Inbox</h3>
                            <p className="text-sm font-bold text-green-600">
                                We've sent a password reset link to <span className="text-green-900">{email}</span>. Click the link to set a new password.
                            </p>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
