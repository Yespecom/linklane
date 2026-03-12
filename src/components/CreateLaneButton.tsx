"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";

export default function CreateLaneButton({ isAuthenticated }: { isAuthenticated: boolean }) {
    const [showPrompt, setShowPrompt] = useState(false);

    if (isAuthenticated) {
        return (
            <Link href="/dashboard/lanes" className="shrink-0 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" /> Create Lane
            </Link>
        );
    }

    return (
        <>
            <button 
                onClick={() => setShowPrompt(true)}
                className="shrink-0 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
                <Plus className="h-4 w-4" /> Create Lane
            </button>

            <AnimatePresence>
                {showPrompt && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPrompt(false)}
                            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 text-center border border-slate-200"
                        >
                            <button onClick={() => setShowPrompt(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                            
                            <div className="h-20 w-20 rounded-3xl bg-blue-50 flex items-center justify-center mx-auto mb-8 border border-blue-100">
                                <Zap className="h-10 w-10 text-blue-600 fill-blue-600/10" />
                            </div>
                            
                            <h3 className="text-2xl font-black text-slate-900 mb-4 font-poppins tracking-tight leading-tight">Share Your Insight</h3>
                            <p className="text-slate-500 font-medium mb-10 leading-relaxed italic">
                                Create your Lane to share case studies, ideas, and insights with the Linklane community.
                            </p>
                            
                            <div className="flex flex-col gap-3">
                                <Link href="/claim" className="w-full py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
                                    Sign Up to Create
                                </Link>
                                <Link href="/login" className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                                    Sign In
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
