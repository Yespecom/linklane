"use client";

import {
    ExternalLink,
    ChevronRight,
    Star,
    MessageSquarePlus,
    MapPin,
    Share2,
    Phone,
    Mail,
    Zap,
    ArrowRight,
    UserPlus
} from "lucide-react";
import ProfileQRCode from "@/components/ProfileQRCode";
import BrandIcon from "@/components/BrandIcon";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ReviewModal from "@/components/ReviewModal";
import VerifiedBadge from "@/components/VerifiedBadge";
import { createClient } from "@/utils/supabase/client";

export default function LinklaneTemplate({ profile, services, products, links, reviews: initialReviews, username }: any) {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [localReviews, setLocalReviews] = useState(initialReviews || []);
    const supabase = createClient();

    const handleNewReview = (newReview: any) => {
        setLocalReviews((prev: any) => [newReview, ...prev]);
    };

    useEffect(() => {
        if (!profile?.id) return;

        // Subscribing to Realtime reviews
        const channel = supabase
            .channel(`public:reviews:profile_id=eq.${profile.id}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'reviews',
                    filter: `profile_id=eq.${profile.id}`
                },
                (payload) => {
                    if (payload.new.status === 'approved') {
                        setLocalReviews((prev: any) => {
                            // Avoid duplicates if added via optimistic UI
                            if (prev.find((r: any) => r.id === payload.new.id || (r.comment === payload.new.comment && r.name === payload.new.name))) return prev;
                            return [payload.new, ...prev];
                        });
                    }
                }
            )
            .subscribe();

        const trackView = async () => {
            try {
                let sessionKey = sessionStorage.getItem(`ll_session_${profile.id}_view`);
                if (!sessionKey) {
                    sessionKey = Math.random().toString(36).substring(2, 15);
                    sessionStorage.setItem(`ll_session_${profile.id}_view`, sessionKey);
                    await supabase.from('leads').insert({
                        profile_id: profile.id,
                        type: 'view',
                        target: 'Profile Page',
                        session_key: sessionKey
                    });
                }
            } catch (e) {
                // Silently ignore tracking errors for users
            }
        };
        trackView();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [profile?.id, supabase]);

    const trackClick = async (target: string, type: string = 'click') => {
        if (!profile?.id) return;
        try {
            let sessionKey = sessionStorage.getItem(`ll_session_${profile.id}_${target}`);
            if (!sessionKey) {
                sessionKey = Math.random().toString(36).substring(2, 15);
                sessionStorage.setItem(`ll_session_${profile.id}_${target}`, sessionKey);
                await supabase.from('leads').insert({
                    profile_id: profile.id,
                    type,
                    target,
                    session_key: sessionKey
                });
            }
        } catch (e) {
            // Silently ignore
        }
    };

    const averageRating = localReviews?.length > 0
        ? (localReviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) / localReviews.length).toFixed(1)
        : null;

    const saveContact = () => {
        trackClick("Save Contact", "click");
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.display_name}
TITLE:${profile.title || ""}
${profile.company ? `ORG:${profile.company}` : ""}
${profile.contact_email ? `EMAIL;TYPE=INTERNET:${profile.contact_email}` : ""}
${profile.phone ? `TEL;TYPE=CELL:${profile.phone}` : ""}
${profile.location ? `ADR;TYPE=WORK:;;;${profile.location}` : ""}
URL:https://linklane.in/${username}
END:VCARD`;

        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${profile.display_name}.vcf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const shareProfile = async () => {
        trackClick("Share Profile", "click");
        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share({
                    title: profile.display_name,
                    text: `Check out ${profile.display_name} on Linklane!`,
                    url: typeof window !== 'undefined' ? window.location.href : '',
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else if (typeof navigator !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard! 🚀");
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pb-10 px-4 selection:bg-blue-50 selection:text-blue-600 font-inter">
            {/* MOBILE CONTAINER (Max 440px) */}
            <div className="w-full max-w-[440px] space-y-10">

                {/* 1. PROFILE HEADER (CREATOR STYLE) */}
                <header className="flex flex-col items-center text-center space-y-4 pt-0">
                    <div className="-mx-4 w-[calc(100%+2rem)] h-40 bg-slate-50 overflow-hidden relative shadow-sm border-b border-slate-100 flex items-center justify-center">
                        {profile.banner_url && (
                            <img src={profile.banner_url} className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />

                        {/* Share Trigger */}
                        <div className="absolute top-6 right-6 z-30">
                            <button
                                onClick={shareProfile}
                                className="h-10 w-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/50 text-slate-900 hover:scale-110 active:scale-95 transition-all"
                            >
                                <Share2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative -mt-16"
                    >
                        <div className={`h-28 w-28 ${profile.profile_shape || "rounded-[2rem]"} bg-slate-50 flex items-center justify-center p-1 shadow-xl border border-slate-100 relative z-10 overflow-hidden`}>
                            {profile.avatar_url ? (
                                <img
                                    src={profile.avatar_url}
                                    alt={profile.display_name}
                                    className={`h-full w-full object-cover ${profile.profile_shape || "rounded-[1.7rem]"}`}
                                />
                            ) : (
                                <span className="text-2xl font-black text-slate-200 uppercase">{profile.display_name?.charAt(0)}</span>
                            )}
                        </div>
                        {profile.is_verified && (
                            <div className="absolute bottom-0 right-0 z-20">
                                <VerifiedBadge size="md" />
                            </div>
                        )}
                    </motion.div>

                    <div className="space-y-3">
                        <h1 className="text-xl font-black text-slate-900 tracking-tight font-poppins">
                            {profile.display_name}
                        </h1>
                        <div className="flex flex-col items-center gap-1">
                            {profile.title && (
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    {profile.title} {profile.company && `• ${profile.company}`} {profile.category && `• ${profile.category}`}
                                </span>
                            )}
                            {profile.location && (
                                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                                    <MapPin className="h-3 w-3" /> {profile.location}
                                </div>
                            )}
                        </div>
                        {profile.bio && (
                            <p className="text-sm font-medium text-slate-600 leading-relaxed px-4">
                                {profile.bio}
                            </p>
                        )}

                        {averageRating && (
                            <div className="flex flex-col items-center gap-3 pt-1">
                                <div className="flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity" onClick={() => { trackClick("View Reviews", "click"); document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }) }}>
                                    <div className="flex text-amber-400">
                                        <Star className="h-3.5 w-3.5 fill-current" />
                                    </div>
                                    <span className="text-xs font-black text-slate-900">{averageRating}</span>
                                    <span className="text-xs font-bold text-slate-300">({localReviews.length} reviews)</span>
                                </div>
                                <button
                                    onClick={() => { trackClick("Click Write Review Button", "click"); setIsReviewModalOpen(true) }}
                                    className="px-6 py-2 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-blue-50/50 transition-all active:scale-95"
                                    style={{ color: profile.accent_color || "#3B82F6" }}
                                >
                                    Write a Review
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* 2. PRIMARY ACTION BUTTONS */}
                <section className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={saveContact}
                            className="w-full py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <UserPlus className="h-3.5 w-3.5" /> Save
                        </button>
                        <button
                            onClick={shareProfile}
                            className="w-full py-4 bg-white border border-slate-100 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Share2 className="h-3.5 w-3.5" style={{ color: profile.accent_color || "#3B82F6" }} /> Share
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-poppins">
                        <a
                            href={`tel:${profile.phone}`}
                            onClick={() => trackClick("Phone Call", "call")}
                            className="flex flex-col items-center justify-center py-4 bg-white border border-slate-100 rounded-xl text-slate-900 shadow-sm hover:bg-slate-50 transition-all active:scale-95 gap-1.5"
                        >
                            <Phone className="h-4 w-4 text-slate-950" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Call</span>
                        </a>
                        <a
                            href={`mailto:${profile.contact_email}`}
                            onClick={() => trackClick("Email Contact", "email")}
                            className="flex flex-col items-center justify-center py-4 bg-white border border-slate-100 rounded-xl text-slate-900 shadow-sm hover:bg-slate-50 transition-all active:scale-95 gap-1.5"
                        >
                            <Mail className="h-4 w-4 text-slate-950" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Email</span>
                        </a>
                    </div>
                </section>

                {/* 3. LINKS SECTION (MODERN GRID FLOW) */}
                {links?.length > 0 && (
                    <section className="space-y-4">
                        <div className="flex flex-col gap-1 ml-1 mb-2">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 font-poppins">Social Connections</h2>
                            <p className="text-[9px] font-bold text-slate-200 uppercase tracking-widest">Connect & Follow Across Platforms</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            {links.map((link: any) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    onClick={() => trackClick(`Link: ${link.title}`, "click_link")}
                                    className="group relative overflow-hidden p-5 bg-white border border-slate-100 rounded-[1.5rem] flex items-center justify-between transition-all hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/40 active:scale-[0.98]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100 shrink-0 relative z-10 transition-transform group-hover:scale-110">
                                            {link.icon_url ? (
                                                <img src={link.icon_url} className="w-full h-full object-cover" />
                                            ) : (
                                                <BrandIcon url={link.url} className="h-4 w-4 opacity-100 transition-opacity" />
                                            )}
                                        </div>
                                        <div className="flex flex-col min-w-0 relative z-10">
                                            <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 font-poppins truncate">{link.title}</span>
                                            <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest truncate">Follow Connection</span>
                                        </div>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                        <ChevronRight className="h-4 w-4" />
                                    </div>
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none"
                                        style={{ backgroundColor: profile.accent_color || "#3B82F6" }}
                                    />
                                </a>
                            ))}
                        </div>
                    </section>
                )}


                {/* 3. SERVICES SECTION */}
                {services?.length > 0 && (
                    <section className="space-y-6">
                        <div className="flex flex-col gap-1 ml-1">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 font-poppins">Offerings</h2>
                            <p className="text-[9px] font-bold text-slate-200 uppercase tracking-widest">Premium Specialized Services</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {services.map((service: any) => (
                                <div
                                    key={service.id}
                                    className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-5 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="space-y-1.5 flex-1">
                                            <h3 className="text-base font-black text-slate-900 font-poppins leading-tight">{service.title}</h3>
                                            <p className="text-xs font-medium text-slate-500 leading-relaxed line-clamp-2 italic opacity-80 group-hover:opacity-100 transition-opacity">
                                                {service.description}
                                            </p>
                                        </div>
                                        <div className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl shadow-sm shrink-0">
                                            <span className="text-sm font-black text-slate-900">{service.price ? `₹${service.price}` : "Quote"}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            trackClick(`Service Inquiry: ${service.title}`, "click_service");
                                            window.location.href = `mailto:${profile.contact_email}?subject=Inquiry: ${service.title}`;
                                        }}
                                        className="w-full py-3 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
                                        style={{
                                            backgroundColor: profile.accent_color || "#0f172a",
                                            boxShadow: `0 10px 15px -3px ${profile.accent_color}20`
                                        }}
                                    >
                                        Initiate Inquiry <ArrowRight className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 5. PRODUCTS SECTION */}
                {products?.length > 0 && (
                    <section className="space-y-6">
                        <div className="flex flex-col gap-1 ml-1">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 font-poppins">Digital Goods</h2>
                            <p className="text-[9px] font-bold text-slate-200 uppercase tracking-widest">Exclusive Assets & Downloads</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {products.map((product: any) => (
                                <div
                                    key={product.id}
                                    className={`bg-white border border-slate-100 ${profile.profile_shape || "rounded-[2rem]"} overflow-hidden shadow-sm hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/40 transition-all group`}
                                >
                                    {product.image_url && (
                                        <div className="h-64 w-full overflow-hidden">
                                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        </div>
                                    )}
                                    <div className="p-6 space-y-4">
                                        <div className="space-y-1.5">
                                            <h3 className="text-lg font-black text-slate-900 font-poppins">{product.name}</h3>
                                            <p className="text-xs font-medium text-slate-500 leading-relaxed line-clamp-2 italic opacity-80 group-hover:opacity-100 transition-opacity">{product.description}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            <span className="text-2xl font-black text-slate-900 font-poppins">₹{product.price}</span>
                                            <a
                                                href={product.buy_url}
                                                target="_blank"
                                                onClick={() => trackClick(`Product: ${product.name}`, "click_product")}
                                                className="px-8 py-3 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg"
                                                style={{
                                                    backgroundColor: profile.accent_color || "#0f172a",
                                                    boxShadow: `0 10px 15px -3px ${profile.accent_color}20`
                                                }}
                                            >
                                                Get Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}



                {/* 8. REVIEWS SECTION (LAST POSITION) */}
                <section id="reviews" className="space-y-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex flex-col">
                            <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 font-poppins">Reviews</h2>
                            {averageRating && (
                                <div className="flex items-center gap-1.5 mt-1.5 px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg w-fit">
                                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                    <span className="text-[10px] font-black text-slate-900">{averageRating}</span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => { trackClick("Click Write Review Button", "click"); setIsReviewModalOpen(true); }}
                            className="text-[9px] font-black uppercase tracking-widest hover:underline font-poppins"
                            style={{ color: profile.accent_color || "#3B82F6" }}
                        >
                            + Review
                        </button>
                    </div>

                    <div className="space-y-4">
                        {localReviews.slice(0, 5).map((review: any) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={review.id} 
                                className="bg-white p-5 rounded-xl border border-slate-100 space-y-3 shadow-sm"
                            >
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3 w-3 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-100"}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm font-bold text-slate-600 leading-relaxed italic">&quot;{review.comment}&quot;</p>
                                <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 font-black text-[10px]">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-900 font-poppins">{review.name}</span>
                                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{review.company || "Guest"}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <button
                        onClick={() => { trackClick("Write a Review Button", "click"); setIsReviewModalOpen(true); }}
                        className="w-full py-4 bg-white border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all font-poppins"
                        style={{ color: profile.accent_color || "#3B82F6" }}
                    >
                        Write a Review
                    </button>
                </section>

                <footer className="pt-20 pb-12 flex flex-col items-center space-y-8 opacity-60 hover:opacity-100 transition-all duration-700">
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <ProfileQRCode url={`https://linklane.in/${username}`} size={140} />
                    </div>
                    <div className="flex flex-col items-center gap-4 group">
                        <Link href="/claim" onClick={() => trackClick("Create your Linklane Button", "click")} className="px-8 py-3.5 bg-slate-900 border border-slate-800 text-white rounded-xl shadow-lg shadow-black/10 flex items-center gap-3 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 active:scale-95">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Create your Linklane</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/" onClick={() => trackClick("Linklane Footer Logo", "click")} className="flex items-center gap-2 mt-2 opacity-70 hover:opacity-100 transition-opacity">
                            <Zap className="h-3 w-3 fill-slate-950 text-slate-950" />
                            <span className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-950">Powered by Linklane</span>
                        </Link>
                    </div>
                </footer>
            </div>

            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                profileId={profile.id}
                isVerified={profile.is_verified}
                onSuccess={handleNewReview}
            />
        </div>
    );
}
