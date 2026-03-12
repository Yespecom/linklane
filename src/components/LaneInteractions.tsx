"use client";

import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

interface InteractionProps {
    laneId: string;
    isAuthenticated: boolean;
}

export default function LaneInteractions({ laneId, isAuthenticated }: InteractionProps) {
    const [showPrompt, setShowPrompt] = useState(false);

    const handleAction = () => {
        if (!isAuthenticated) {
            setShowPrompt(true);
        } else {
            // Future: Implement actual like/comment/bookmark logic
            alert("Action logged! We're building the full notification system for this soon. 🚀");
        }
    };

    return (
        <>
            <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="flex items-center gap-8">
                    <button onClick={handleAction} className="flex flex-col items-center gap-1 group">
                        <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-rose-500 shadow-sm border border-slate-100 transition-all group-active:scale-90">
                            <Heart className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-poppins">Lane It</span>
                    </button>
                    <button onClick={handleAction} className="flex flex-col items-center gap-1 group">
                        <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-blue-500 shadow-sm border border-slate-100 transition-all group-active:scale-90">
                            <MessageCircle className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-poppins">Comment</span>
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={handleAction} className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-amber-500 shadow-sm border border-slate-100 transition-all">
                        <Bookmark className="h-5 w-5" />
                    </button>
                    <button onClick={() => {
                        if (navigator.share) {
                            navigator.share({
                                title: "Read this Lane on Linklane",
                                url: window.location.href
                            });
                        } else {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Link copied! 🚀");
                        }
                    }} className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-green-500 shadow-sm border border-slate-100 transition-all">
                        <Share2 className="h-5 w-5" />
                    </button>
                </div>
            </div>

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
                                <Heart className="h-10 w-10 text-blue-600 fill-blue-600/10" />
                            </div>
                            
                            <h3 className="text-2xl font-black text-slate-900 mb-4 font-poppins tracking-tight leading-tight">Join the Linklane Community</h3>
                            <p className="text-slate-500 font-medium mb-10 leading-relaxed italic">
                                Create your own Lane to like, comment, or save posts and interact with creators.
                            </p>
                            
                            <div className="flex flex-col gap-3">
                                <Link href="/claim" className="w-full py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
                                    Create My Lane
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
