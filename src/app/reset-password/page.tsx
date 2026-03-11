"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.updateUser({
            password: password,
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
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-200 border border-slate-100">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Setup New Password</h1>
                        <p className="text-slate-500 font-medium">Please enter a new, secure password below.</p>
                    </div>

                    {!success ? (
                        <form onSubmit={handleUpdate} className="space-y-5">
                            <div className="space-y-2">
                                <label className="block text-sm font-black text-slate-700 uppercase tracking-widest ml-1">New Password</label>
                                <input
                                    type="password"
                                    required
                                    minLength={6}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Must be at least 6 characters.</p>
                            </div>

                            {error && (
                                <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm font-bold text-red-600 animate-shake">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || password.length < 6}
                                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : "Save New Password"}
                            </button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-6"
                        >
                            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                                <h3 className="text-lg font-black text-green-800 mb-2">Password Updated!</h3>
                                <p className="text-sm font-bold text-green-600">
                                    Your password has been successfully reset. You can now use your new password to login.
                                </p>
                            </div>

                            <Link
                                href="/dashboard"
                                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/10 transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Go to Dashboard <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
