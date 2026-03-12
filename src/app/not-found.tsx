"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-50/50 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50/30 rounded-full blur-[100px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center max-w-lg z-10"
            >
                {/* Logo Section */}
                <div className="mb-12">
                    <div className="h-20 w-20 rounded-[2.5rem] bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-8 mx-auto relative group">
                        <div className="absolute inset-0 rounded-[2.5rem] bg-blue-600 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="h-4 w-4 rounded-full bg-white shadow-[0_0_15px_#fff] relative z-10" />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-black tracking-tighter text-slate-900 leading-tight">Linklane</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600/60 leading-none mt-1">Professional Hub</span>
                    </div>
                </div>

                {/* 404 Text */}
                <div className="space-y-4 mb-12">
                    <h1 className="text-8xl font-black text-slate-900 tracking-tighter opacity-10">404</h1>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">Lost in the lane?</h2>
                    <p className="text-slate-500 font-medium">The page you're looking for doesn't exist or has been moved.</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Link 
                        href="/"
                        className="flex-1 flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl shadow-slate-900/10"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Link>
                    <Link 
                        href="/claim"
                        className="flex-1 flex items-center justify-center gap-3 bg-white border border-slate-100 text-slate-900 px-8 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                    >
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        Claim Handle
                    </Link>
                </div>
            </motion.div>

            {/* Subtle Footer */}
            <div className="absolute bottom-12 flex items-center gap-2 opacity-20">
                <div className="h-1 w-1 rounded-full bg-slate-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">Linklane.in</span>
                <div className="h-1 w-1 rounded-full bg-slate-400" />
            </div>
        </div>
    );
}
