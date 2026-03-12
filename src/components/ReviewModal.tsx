"use client";

import { useState } from "react";
import { Star, X, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

export default function ReviewModal({ isOpen, onClose, profileId, isVerified, onSuccess }: { isOpen: boolean, onClose: () => void, profileId: string, isVerified?: boolean, onSuccess?: (review: any) => void }) {
    const supabase = createClient();
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0);
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase
                .from("reviews")
                .insert({
                    profile_id: profileId,
                    name,
                    company,
                    rating,
                    comment,
                    status: "approved"
                });

            if (error) throw error;
            
            if (onSuccess) {
                onSuccess({
                    id: Math.random().toString(), // Temp ID
                    name,
                    company,
                    rating,
                    comment,
                    created_at: new Date().toISOString()
                });
            }

            // Send notification email via SMTP route
            fetch("/api/notify-review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ profileId, name, company, comment, rating })
            }).catch((err) => console.error("Failed to send notification:", err));

            setSubmitted(true);
            setTimeout(() => {
                onClose();
                setSubmitted(false);
                setName("");
                setComment("");
                setCompany("");
            }, 2000);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.1)] sm:shadow-2xl overflow-hidden mt-auto sm:my-auto"
                >
                    <div className="w-12 h-1 bg-slate-100 rounded-full mx-auto mt-4 mb-2 sm:hidden" />
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 transition-colors z-10">
                        <X className="h-5 w-5 text-slate-400" />
                    </button>

                    <div className="p-6 sm:p-10 pb-10 sm:pb-12">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">Review Submitted!</h3>
                                <p className="text-slate-500 font-medium">Thank you for your feedback. It is now live on the page.</p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 sm:mb-8 text-center sm:text-left">
                                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight font-poppins">Share Your Feedback</h3>
                                    {isVerified ? (
                                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full w-fit mx-auto sm:mx-0">
                                            <CheckCircle2 className="h-3 w-3 text-blue-600 fill-blue-600/10" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Verified Professional</span>
                                        </div>
                                    ) : (
                                        <p className="text-slate-500 font-medium italic">Your words help build trust and community.</p>
                                    )}
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="flex justify-center sm:justify-start gap-1.5 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <motion.button
                                                key={star}
                                                type="button"
                                                whileHover={{ scale: 1.15, rotate: 5 }}
                                                whileTap={{ scale: 0.85 }}
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHover(star)}
                                                onMouseLeave={() => setHover(0)}
                                                className="p-1 transition-colors"
                                            >
                                                <Star
                                                    className={`h-9 w-9 transition-all duration-300 ${(hover || rating) >= star
                                                        ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                                                        : "text-slate-100"
                                                        }`}
                                                />
                                            </motion.button>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Your Name</label>
                                            <input
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-100 transition-all outline-none"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Company (Optional)</label>
                                            <input
                                                value={company}
                                                onChange={(e) => setCompany(e.target.value)}
                                                className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-100 transition-all outline-none"
                                                placeholder="Tech Corp"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Your Feedback</label>
                                        <textarea
                                            required
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            rows={4}
                                            className="w-full rounded-[2rem] border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-medium text-slate-900 focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-100 transition-all outline-none resize-none"
                                            placeholder="What was your experience like?"
                                        />
                                    </div>

                                    <motion.button
                                        disabled={loading}
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full rounded-[2rem] bg-slate-900 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-slate-900/10 hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
                                    >
                                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Submit Review <span className="text-white/30">→</span></>}
                                    </motion.button>
                                </form>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
