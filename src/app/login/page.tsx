"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/dashboard");
            router.refresh();
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
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 group font-bold text-sm"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to home
                </Link>

                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-200 border border-slate-100">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-slate-500 font-medium">Login to manage your Linklane page.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
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
                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="block text-sm font-black text-slate-700 uppercase tracking-widest">Password</label>
                                <Link href="/forgot-password" className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest transition-colors mb-2 block">
                                    Forgot Password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            {loading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : "Sign In to Dashboard"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500 font-medium">
                        Don't have an account?{" "}
                        <Link href="/claim" className="text-blue-600 font-black hover:underline">
                            Create account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
