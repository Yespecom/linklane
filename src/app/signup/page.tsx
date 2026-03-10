"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const supabase = createClient();

    const [step, setStep] = useState(1);
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const userParam = searchParams.get("username");
        if (userParam) {
            setUsername(userParam);
        }
    }, [searchParams]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
                data: {
                    username: username || null,
                    display_name: displayName,
                }
            },
        });

        if (error) {
            if (error.message.toLowerCase().includes("already registered") || error.message.toLowerCase().includes("already exists")) {
                setError("This email is already registered. Please login instead.");
            } else {
                setError(error.message);
            }
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback?username=${username}`,
            }
        });
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
                    {success ? (
                        <div className="text-center py-6">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 mb-6 border border-green-100">
                                <CheckCircle2 className="h-10 w-10 text-green-600" />
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Check your email</h1>
                            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                                We've sent a confirmation link to <span className="text-slate-900 font-black">{email}</span>.
                                Please click it to activate your account and claim <span className="text-blue-600 font-black">linklane.app/{username}</span>.
                            </p>
                            <Link href="/login" className="inline-flex items-center justify-center w-full bg-blue-600 text-white rounded-2xl py-4 text-sm font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
                                Go to Login
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8 text-center sm:text-left">
                                <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                                    {step === 1 ? "What's your name?" : "Protect your lane"}
                                </h1>
                                {username && (
                                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-xs font-black text-blue-600 mb-4 uppercase tracking-tighter">
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                                        linklane.app/{username} is reserved
                                    </div>
                                )}
                                <p className="text-slate-500 font-medium text-sm">
                                    {step === 1 ? "We'll use this to set up your public profile." : "Create your secure login credentials."}
                                </p>
                            </div>

                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                autoFocus
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-lg"
                                                placeholder="e.g. John Doe"
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && displayName.length > 2 && setStep(2)}
                                            />
                                        </div>
                                        <button
                                            onClick={() => setStep(2)}
                                            disabled={displayName.length < 2}
                                            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-black text-white shadow-xl transition-all hover:bg-black hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                                        >
                                            Continue to Credentials
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <div className="space-y-4 mb-8">
                                            <button
                                                onClick={handleGoogleLogin}
                                                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-900 transition-all hover:bg-slate-50 hover:shadow-md active:scale-95"
                                            >
                                                <img src="https://www.gstatic.com/lamda/images/google_favicon_v2.svg" alt="Google" className="h-5 w-5" />
                                                Continue with Google
                                            </button>
                                            <div className="flex items-center gap-4 py-2">
                                                <div className="h-[1px] flex-1 bg-slate-100" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">OR</span>
                                                <div className="h-[1px] flex-1 bg-slate-100" />
                                            </div>
                                        </div>

                                        <form onSubmit={handleSignup} className="space-y-5">
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
                                                <label className="block text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Password</label>
                                                <input
                                                    type="password"
                                                    required
                                                    minLength={6}
                                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold"
                                                    placeholder="Create a password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>

                                            {error && (
                                                <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm font-bold text-red-600 animate-shake text-center">
                                                    {error}
                                                </div>
                                            )}

                                            <div className="flex flex-col gap-3">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {loading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : "Create Account & Claim Page"}
                                                </button>
                                                <button
                                                    onClick={() => setStep(1)}
                                                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors py-2"
                                                >
                                                    ← Change Name
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <p className="mt-8 text-center text-sm text-slate-500 font-medium">
                                Already have an account?{" "}
                                <Link href="/login" className="text-blue-600 font-black hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
