"use client";

import { motion } from "framer-motion";
import UsernameInput from "@/components/UsernameInput";
import LinktreeNavbar from "@/components/LinktreeNavbar";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ClaimPage() {
    const [userCount, setUserCount] = useState<number | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchUserCount = async () => {
            const { count } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true });
            if (count !== null) setUserCount(count);
        };
        fetchUserCount();
    }, [supabase]);
    return (
        <div className="min-h-screen bg-slate-50 text-black selection:bg-blue-100 selection:text-blue-600 overflow-hidden relative">
            <LinktreeNavbar />

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/40 rounded-full blur-[120px]" />
            </div>

            <main className="mx-auto max-w-4xl px-8 pt-40 lg:pt-64 pb-32 relative">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors mb-12 group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>

                <div className="flex flex-col gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 flex items-center gap-2">
                                <Sparkles className="h-3.5 w-3.5" /> Start Your Journey
                            </div>
                        </div>
                        <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] text-slate-900 mb-6">
                            Claim your <br />
                            unique handle.
                        </h1>
                        <p className="text-xl font-bold text-slate-400 leading-relaxed max-w-lg mb-4">
                            Your username is your digital home. Choose it wisely, claim it fast, and build your professional empire.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full bg-white p-10 lg:p-14 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100"
                    >
                        <div className="mb-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 block mb-2">Availability Check</span>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Enter your desired username</h2>
                        </div>
                        <UsernameInput variant="cta" />

                        <div className="mt-12 flex flex-col sm:flex-row items-center gap-8 pt-10 border-t border-slate-50">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-10 w-10 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 123}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-bold text-slate-400">
                                <span className="text-slate-900">{userCount !== null ? userCount.toLocaleString() : "..."} creators</span> already claimed theirs.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Footer Minimal */}
            <footer className="mx-auto max-w-7xl px-8 py-12 flex justify-between items-center opacity-40">
                <span className="text-[10px] font-black uppercase tracking-widest">Linklane — Reserved 2024</span>
                <div className="flex gap-6">
                    <span className="text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-black transition-colors">Privacy</span>
                    <span className="text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-black transition-colors">Terms</span>
                </div>
            </footer>
        </div>
    );
}
