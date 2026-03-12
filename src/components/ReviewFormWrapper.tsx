"use client";

import { useState } from "react";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewFormWrapper({ profileId }: { profileId: string }) {
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

            // Send notification email via SMTP route
            fetch("/api/notify-review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ profileId, name, company, comment, rating })
            }).catch((err) => console.error("Failed to send notification:", err));

            setSubmitted(true);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-6 text-center"
            >
                <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mb-6"
                >
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                </motion.div>
                <h3 className="text-3xl font-black text-slate-900 mb-2 font-poppins tracking-tight">Success!</h3>
                <p className="text-slate-500 font-medium">Your recommendation has been shared. Thanks for the support!</p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
            <div className="flex flex-col items-center gap-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Rate your experience</p>
                <div className="flex justify-center gap-2 sm:gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                            key={star}
                            type="button"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            className="p-1 transition-all duration-300"
                        >
                            <Star
                                className={`h-10 w-10 sm:h-14 sm:w-14 transition-all duration-500 ${(hover || rating) >= star
                                    ? "fill-blue-600 text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                    : "text-slate-100"
                                    }`}
                            />
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Your Name</label>
                        <input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-[1.8rem] border border-slate-100 bg-slate-50/50 px-8 py-5 text-sm font-bold text-slate-900 focus:ring-8 focus:ring-blue-500/5 focus:bg-white focus:border-blue-200 transition-all outline-none"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Company (Optional)</label>
                        <input
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full rounded-[1.8rem] border border-slate-100 bg-slate-50/50 px-8 py-5 text-sm font-bold text-slate-900 focus:ring-8 focus:ring-blue-500/5 focus:bg-white focus:border-blue-200 transition-all outline-none"
                            placeholder="Acme Inc."
                        />
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Your Message</label>
                    <textarea
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={6}
                        className="w-full rounded-[2.5rem] border border-slate-100 bg-slate-50/50 px-8 py-7 text-sm font-medium text-slate-900 focus:ring-8 focus:ring-blue-500/5 focus:bg-white focus:border-blue-200 transition-all outline-none resize-none leading-relaxed"
                        placeholder="Tell others about your experience..."
                    />
                </div>
            </div>

            <motion.button
                disabled={loading}
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-[2rem] sm:rounded-[2.8rem] bg-blue-600 py-6 sm:py-7 text-xs font-black uppercase tracking-[0.25em] text-white shadow-2xl shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-4 mt-4"
            >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <>Send Recommendation <span className="opacity-40">→</span></>}
            </motion.button>
        </form>
    );
}
