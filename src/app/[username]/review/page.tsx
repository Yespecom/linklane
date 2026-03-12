"use client";

import { createClient } from "@/utils/supabase/client";
import { notFound } from "next/navigation";
import ReviewFormWrapper from "@/components/ReviewFormWrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function ReviewRequestPage({ params }: { params: Promise<{ username: string }> }) {
    const resolvedParams = use(params);
    const username = resolvedParams.username;
    const supabase = createClient();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("username", username)
                .single();
            
            if (error || !data) {
                setProfile(null);
            } else {
                setProfile(data);
            }
            setLoading(false);
        };
        fetchProfile();
    }, [username, supabase]);

    if (loading) return null;
    if (!profile) notFound();

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-black selection:bg-blue-600 selection:text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            {/* Ambient Animated Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-50/50 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[40%] -right-[20%] w-[70%] h-[70%] bg-indigo-50/30 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 left-1/4 w-[50%] h-[30%] bg-slate-50 rounded-full blur-[100px]" />
            </div>

            {/* Platform Logo */}
            <div className="fixed top-6 left-6 sm:top-10 sm:left-10 z-[100]">
                <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform group">
                    <div className="h-10 w-10 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl shadow-slate-900/10 group-hover:rotate-6 transition-transform">
                        <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_#fff]" />
                    </div>
                </Link>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl relative z-10 py-20 flex flex-col items-center"
            >
                <div className="flex flex-col items-center mb-12 text-center w-full">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative group mb-10"
                    >
                        <div className="absolute inset-0 rounded-[2.5rem] bg-blue-600/10 blur-2xl group-hover:blur-3xl transition-all duration-500 scale-150 opacity-50" />
                        <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-[2.8rem] bg-white p-1 shadow-2xl relative z-10 border border-slate-50 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3">
                            <img
                                src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                                className="h-full w-full object-cover rounded-[2.5rem]"
                                alt={profile.display_name}
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-2xl shadow-xl shadow-blue-600/20 z-20 border-4 border-white">
                            <Zap className="h-4 w-4 fill-white" />
                        </div>
                    </motion.div>

                    <div className="space-y-4 px-6">
                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
                        >
                            Review {profile.display_name}
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-sm sm:text-base font-medium text-slate-400 max-w-md mx-auto leading-relaxed"
                        >
                            Help {profile.display_name.split(' ')[0]} grow their professional presence by sharing your experience working together.
                        </motion.p>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full bg-white border border-slate-100/50 rounded-[3rem] sm:rounded-[4rem] p-8 sm:p-14 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.06)] backdrop-blur-3xl overflow-hidden"
                >
                    <ReviewFormWrapper profileId={profile.id} />
                </motion.div>

                {/* Footer Section: "Get your Linklane" */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-24 sm:mt-32 w-full max-w-sm px-6"
                >
                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-center relative overflow-hidden group shadow-2xl shadow-slate-900/20">
                        {/* Decorative background circle */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                        
                        <h2 className="text-xl font-black text-white mb-2 relative z-10">Want your own?</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8 relative z-10">Create your digital hub in seconds</p>
                        
                        <Link 
                            href="/claim" 
                            className="w-full inline-flex items-center justify-center gap-3 bg-white text-slate-900 py-4.5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 group/btn"
                        >
                            Get Started Free
                            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    
                    <div className="mt-10 flex items-center justify-center gap-3 opacity-20 hover:opacity-100 transition-opacity">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-950">Powered by Linklane.in</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
