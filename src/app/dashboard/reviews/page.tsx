"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
    Star,
    CheckCircle2,
    XCircle,
    Trash2,
    MessageSquare,
    Loader2,
    Copy,
    Share2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewsPage() {
    const supabase = createClient();
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        fetchProfileAndReviews();
    }, []);

    async function fetchProfileAndReviews() {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        setProfile(profile);

        const { data } = await supabase
            .from("reviews")
            .select("*")
            .eq("profile_id", user.id)
            .order("created_at", { ascending: false });

        setReviews(data || []);
        setLoading(false);
    }

    async function updateStatus(id: string, status: string) {
        const { error } = await supabase
            .from("reviews")
            .update({ status })
            .eq("id", id);

        if (!error) {
            setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
        }
    }

    async function deleteReview(id: string) {
        if (!confirm("Are you sure you want to delete this review?")) return;
        const { error } = await supabase
            .from("reviews")
            .delete()
            .eq("id", id);

        if (!error) {
            setReviews(reviews.filter(r => r.id !== id));
        }
    }

    const copyReviewLink = () => {
        const link = `https://linklane.app/${profile?.username}/review`;
        navigator.clipboard.writeText(link);
        alert("Review request link copied!");
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Reviews</h1>
                    <p className="text-slate-500 font-medium">Manage your reputation and approve client feedback.</p>
                </div>
                <button
                    onClick={copyReviewLink}
                    className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 whitespace-nowrap"
                >
                    <Share2 className="h-4 w-4" /> Copy Review Link
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            ) : reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-slate-100 text-center px-6">
                    <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                        <MessageSquare className="h-10 w-10 text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">No reviews yet</h3>
                    <p className="text-slate-500 max-w-sm font-medium">Send your review link to clients after a successful project to start building your reputation.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence mode="popLayout">
                        {reviews.map((review) => (
                            <motion.div
                                key={review.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 md:items-center justify-between"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star key={s} className={`h-4 w-4 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`} />
                                            ))}
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${review.status === 'approved' ? 'bg-green-50 text-green-600' :
                                                review.status === 'rejected' ? 'bg-red-50 text-red-600' :
                                                    'bg-blue-50 text-blue-600'
                                            }`}>
                                            {review.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-1">{review.name}</h3>
                                    {review.company && (
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{review.company}</p>
                                    )}
                                    <p className="text-slate-600 font-medium leading-relaxed italic">"{review.comment}"</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    {review.status !== 'approved' && (
                                        <button
                                            onClick={() => updateStatus(review.id, 'approved')}
                                            className="h-12 w-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors shadow-sm"
                                            title="Approve"
                                        >
                                            <CheckCircle2 className="h-6 w-6" />
                                        </button>
                                    )}
                                    {review.status !== 'rejected' && (
                                        <button
                                            onClick={() => updateStatus(review.id, 'rejected')}
                                            className="h-12 w-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors shadow-sm"
                                            title="Reject"
                                        >
                                            <XCircle className="h-6 w-6" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteReview(review.id)}
                                        className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-red-500 transition-colors shadow-sm"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-6 w-6" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
