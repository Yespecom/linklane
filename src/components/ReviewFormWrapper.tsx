"use client";

import { useState } from "react";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

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
                    status: "pending"
                });

            if (error) throw error;
            setSubmitted(true);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Thank You!</h3>
                <p className="text-slate-500 font-medium">Your review has been submitted for approval.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-1 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className="p-1 transition-transform active:scale-95"
                    >
                        <Star
                            className={`h-10 w-10 transition-colors ${(hover || rating) >= star
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-slate-200"
                                }`}
                        />
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
                        placeholder="e.g. Rahul K."
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Company / Project (Optional)</label>
                    <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
                        placeholder="e.g. Acme Studio"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Feedback</label>
                    <textarea
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={5}
                        className="w-full rounded-3xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-900 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none resize-none"
                        placeholder="Write your experience here..."
                    />
                </div>
            </div>

            <button
                disabled={loading}
                type="submit"
                className="w-full rounded-[2rem] bg-slate-900 py-5 text-sm font-black text-white shadow-xl hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit Review"}
            </button>
        </form>
    );
}
