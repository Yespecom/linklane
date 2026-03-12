"use client";

import {
    Briefcase,
    ShoppingBag,
    ExternalLink,
    ChevronRight,
    Layout,
    Zap,
    Star,
    MessageSquarePlus,
    MapPin,
    Share2,
    Clock,
    User,
    Store,
    BookOpen
} from "lucide-react";
import ContactActions from "@/components/ContactActions";
import ProfileQRCode from "@/components/ProfileQRCode";
import BrandIcon from "@/components/BrandIcon";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import ReviewModal from "@/components/ReviewModal";
import VerifiedBadge from "@/components/VerifiedBadge";

export default function CreatorTemplate({ profile, services, products, links, reviews, username }: any) {
    const accentColor = profile.accent_color || "#F43F5E"; // Vivid Rose/Pink for creators
    const profileShape = profile.profile_shape || "rounded-[3.5rem]";
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const contactRef = useRef<HTMLDivElement>(null);

    const averageRating = reviews?.length > 0
        ? (reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) / reviews.length).toFixed(1)
        : null;

    const scrollToContact = () => {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const getRoleIcon = (role: string) => {
        switch (role?.toLowerCase()) {
            case 'business': return <Store className="h-3 w-3" />;
            case 'individual': return <User className="h-3 w-3" />;
            case 'creator': return <Zap className="h-3 w-3" />;
            case 'personal': return <User className="h-3 w-3" />;
            case 'student': return <BookOpen className="h-3 w-3" />;
            default: return <User className="h-3 w-3" />;
        }
    };

    const role = profile.role || 'Creator';

    return (
        <div className="min-h-screen bg-white relative overflow-x-hidden">
            {/* Creator Nav */}
            <div className="hidden lg:flex fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-white/70 backdrop-blur-2xl border border-slate-100 rounded-full px-8 py-3 shadow-2xl items-center gap-8">
                {[
                    { label: 'Social links', id: 'channels' },
                    { label: 'Services', id: 'collabs' },
                    { label: 'Reviews', id: 'vibes' }
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-rose-500 transition-colors"
                    >
                        {item.label}
                    </button>
                ))}
                <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-rose-500 transition-colors"
                >
                    Review
                </button>
                <button onClick={scrollToContact} className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-900 group flex items-center gap-2">
                    Let's Chat <Clock className="h-3 w-3 group-hover:rotate-12 transition-transform" />
                </button>
            </div>

            {/* Desktop Banner */}
            <div className="hidden lg:block h-[380px] w-full bg-slate-50 relative overflow-hidden">
                <img
                    src={profile.banner_url || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2000"}
                    className="w-full h-full object-cover grayscale opacity-60"
                    alt="Banner"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
            </div>

            {/* Mobile Banner */}
            <div className="lg:hidden relative h-56 w-full bg-slate-100 overflow-hidden">
                <img
                    src={profile.banner_url || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200"}
                    className="w-full h-full object-cover"
                    alt="Banner"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
            </div>

            <main className="mx-auto max-w-7xl px-8 lg:px-12 relative">
                <div className="flex flex-col lg:grid lg:grid-cols-[380px_1fr] gap-16 lg:gap-24 -mt-16 lg:-mt-32 relative z-10">

                    {/* CREATOR IDENTITY CARD - Platform Standard */}
                    <aside className="w-full lg:col-span-2 -mt-24 lg:-mt-40 relative z-20">
                        <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-50 relative overflow-hidden group/card">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 -mt-24 lg:-mt-32 mb-12">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative mx-auto lg:mx-0"
                                >
                                    <div className={`h-40 w-40 lg:h-64 lg:w-64 ${profileShape} bg-white p-2.5 lg:p-3.5 border-[6px] lg:border-[10px] border-white shadow-2xl relative z-10 overflow-hidden`}>
                                        <img
                                            src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                                            alt={profile.display_name}
                                            className="h-full w-full object-cover rounded-[calc(var(--radius,1.5rem)-16px)]"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 h-14 w-14 bg-rose-500 border-[5px] border-white rounded-full flex items-center justify-center text-white shadow-xl z-20 animate-pulse">
                                        <Zap className="h-6 w-6 fill-white" />
                                    </div>
                                </motion.div>

                                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full lg:w-auto">
                                    <button
                                        onClick={scrollToContact}
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-500 hover:scale-[1.02] transition-all shadow-xl shadow-rose-500/10 active:scale-95"
                                    >
                                        Collaborate <Clock className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => setIsReviewModalOpen(true)}
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-white border-2 border-rose-100 text-rose-600 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all active:scale-95"
                                    >
                                        Review <Star className="h-4 w-4 fill-current" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-24 relative z-10">
                                <div className="space-y-8 text-center lg:text-left">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-center lg:justify-start gap-4">
                                            <span className="px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-[9px] font-black uppercase tracking-widest italic border border-rose-100">
                                                {getRoleIcon(role)} {role} Profile
                                            </span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Creator Hub v1.0</span>
                                        </div>
                                        <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.85] flex items-center justify-center lg:justify-start gap-4">
                                            {profile.display_name}
                                            {profile.is_verified && <VerifiedBadge size="lg" className="inline-block" />}
                                        </h1>
                                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                            <span className="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200">
                                                {profile.category || "Visionary"}
                                            </span>
                                            {profile.location && (
                                                <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    <MapPin className="h-4 w-4 text-rose-400" /> {profile.location}
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xl lg:text-3xl font-bold text-slate-500 leading-tight lg:max-w-2xl italic tracking-tight">
                                            {profile.bio || "Sharing my creative journey and vision with the world."}
                                        </p>
                                    </div>

                                    {/* Trust Matrix */}
                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-6 border-t border-slate-50">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-3xl font-black text-slate-900 tracking-tighter">{averageRating || "5.0"}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Vibe Check</span>
                                        </div>
                                        <div className="w-px h-10 bg-slate-100" />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-3xl font-black text-slate-900 tracking-tighter">{reviews?.length || "0"}+</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Endorsements</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-1 rounded-[2.5rem] bg-slate-50 border border-slate-100">
                                        <ContactActions profile={profile} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(`https://linklane.in/${username}`);
                                                alert("Copied!");
                                            }}
                                            className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-100 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all shadow-sm"
                                        >
                                            <Share2 className="h-4 w-4" /> Share
                                        </button>
                                        <button
                                            onClick={() => setIsReviewModalOpen(true)}
                                            className="flex items-center justify-center gap-2 py-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all shadow-sm"
                                        >
                                            Endorse <ChevronRight className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* MAIN CONTENT AREA - Multi-Column Structured */}
                    <div className="w-full lg:col-span-2 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-20">

                        <div className="space-y-20">
                            {/* Collabs / Services */}
                            {services?.length > 0 && (
                                <section id="collabs">
                                    <div className="flex items-center justify-between mb-10 px-2">
                                        <h2 className="text-xl font-black uppercase tracking-[0.3em] text-slate-900 border-l-[6px] border-rose-500 pl-6">Services</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {services.map((service: any, i: number) => (
                                            <motion.div
                                                key={service.id}
                                                initial={{ opacity: 0, y: 15 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 group transition-all hover:bg-white hover:shadow-2xl flex flex-col h-full relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm border border-slate-100 group-hover:bg-rose-500 group-hover:text-white transition-all">
                                                    <Zap className="h-6 w-6 fill-current" />
                                                </div>
                                                <h3 className="font-black text-2xl text-slate-900 mb-2 leading-tight group-hover:text-rose-500 transition-colors">{service.title}</h3>
                                                {service.price && (
                                                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-4 block">
                                                        Starting from ₹{service.price}
                                                    </span>
                                                )}
                                                <p className="text-base font-medium text-slate-500 mb-10 leading-relaxed flex-1 italic">&quot;{service.description}&quot;</p>
                                                <button
                                                    onClick={scrollToContact}
                                                    className="w-full py-5 bg-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-rose-500 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                                                >
                                                    Book Experience
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Creator Lanes */}
                            {(arguments[0] as any).userLanes?.length > 0 && (
                                <section id="lanes">
                                    <div className="flex items-center justify-between mb-10 px-2">
                                        <h2 className="text-xl font-black uppercase tracking-[0.3em] text-slate-900 border-l-[6px] border-rose-500 pl-6">Lanes by {profile.display_name}</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {(arguments[0] as any).userLanes.map((lane: any) => (
                                            <Link
                                                key={lane.id}
                                                href={`/lanes/${lane.slug}`}
                                                className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 group transition-all hover:bg-white hover:border-rose-500 hover:shadow-2xl flex flex-col h-full relative overflow-hidden"
                                            >
                                                <div className="flex items-center justify-between mb-6">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic">{lane.category}</span>
                                                    <ChevronRight className="h-4 w-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <h3 className="font-black text-2xl text-slate-900 mb-4 leading-tight group-hover:text-rose-500 transition-colors">{lane.title}</h3>
                                                <p className="text-base font-medium text-slate-500 mb-8 leading-relaxed flex-1 italic line-clamp-2">&quot;{lane.content}&quot;</p>
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 pt-4 border-t border-slate-100">
                                                    Open Story <Zap className="h-3 w-3 text-rose-500 fill-rose-500" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Vibes / Reviews */}
                            {reviews?.length > 0 && (
                                <section id="vibes">
                                    <div className="flex items-center justify-between mb-10 px-2">
                                        <h2 className="text-xl font-black uppercase tracking-[0.3em] text-slate-900 border-l-[6px] border-rose-500 pl-6">Reviews</h2>
                                    </div>
                                    <div className="columns-1 md:columns-2 gap-6 space-y-6">
                                        {reviews.map((review: any, i: number) => (
                                            <motion.div
                                                key={review.id}
                                                className="break-inside-avoid bg-white rounded-[2rem] p-8 lg:p-10 border border-slate-100 shadow-sm relative overflow-hidden group"
                                            >
                                                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-50 group-hover:bg-rose-500 transition-colors" />
                                                <div className="flex items-center gap-0.5 mb-6">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star key={s} className={`h-3 w-3 ${s <= review.rating ? "fill-rose-500 text-rose-500" : "text-slate-100"}`} />
                                                    ))}
                                                </div>
                                                <p className="text-lg font-bold text-slate-600 mb-8 italic leading-relaxed">&quot;{review.comment}&quot;</p>
                                                <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                                                    <div className="h-10 w-10 rounded-full bg-rose-50 flex items-center justify-center text-[10px] font-black text-rose-500">
                                                        {review.name.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-slate-950">— {review.name}</span>
                                                        {review.company && <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{review.company}</span>}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Creator Sidebar Discovery */}
                        <div className="space-y-12">
                            {/* Social Channels */}
                            {links?.length > 0 && (
                                <div className="space-y-6">
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-2 tracking-[0.4em]">Channels</h4>
                                    <div className="flex flex-col gap-4">
                                        {links.map((link: any) => (
                                            <a key={link.id} href={link.url} target="_blank" className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl group transition-all hover:border-rose-200 hover:bg-white hover:shadow-xl hover:shadow-rose-500/5">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center group-hover:bg-rose-50 transition-colors">
                                                        <BrandIcon url={link.url} className="h-5 w-5 opacity-40 group-hover:opacity-100" />
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{link.title}</span>
                                                </div>
                                                <ExternalLink className="h-4 w-4 text-slate-200 group-hover:text-rose-500 transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Creator QR Identity */}
                            <div className="bg-slate-900 p-10 rounded-[3rem] flex flex-col items-center gap-10 text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-400 relative z-10">Vault Access</h4>
                                <div className="p-5 bg-white rounded-[2.5rem] relative z-10 shadow-2xl">
                                    <ProfileQRCode url={`https://linklane.in/${username}`} size={160} />
                                </div>
                                <div className="flex flex-col gap-2 relative z-10">
                                    <span className="text-[11px] font-black text-white uppercase tracking-widest underline decoration-rose-500 decoration-4">Scan Profile</span>
                                </div>
                                <div className="text-center space-y-1">
                                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Verified Creator System</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col items-center gap-12 py-32 border-t border-slate-50 opacity-20 hover:opacity-100 transition-opacity">
                    <div className="p-4 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                        <ProfileQRCode url={`https://linklane.in/${username}`} size={120} />
                    </div>
                    <Link href="/" className="flex items-center gap-3 grayscale group active:scale-95 transition-transform">
                        <div className="px-6 py-2.5 bg-slate-900 rounded-xl flex items-center gap-2.5 shadow-lg group-hover:bg-rose-500 transition-colors">
                            <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white">Powered by Linklane</span>
                        </div>
                    </Link>
                </div>
            </main>

            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                profileId={profile.id}
                isVerified={profile.is_verified}
            />
        </div>
    );
}
