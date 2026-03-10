"use client";

import {
    Briefcase,
    ShoppingBag,
    ExternalLink,
    ChevronRight,
    Layout,
    Moon,
    Star,
    MessageSquarePlus,
    MapPin,
    Minus,
    Share2,
    Store,
    User,
    Zap,
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

export default function MinimalTemplate({ profile, services, products, links, reviews, username }: any) {
    const accentColor = profile.accent_color || "#000000";
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const contactRef = useRef<HTMLDivElement>(null);

    const averageRating = reviews?.length > 0
        ? (reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) / reviews.length).toFixed(1)
        : null;

    const scrollToContact = () => {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const role = profile.role || 'Individual';

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-600 selection:text-white relative overflow-x-hidden">
            {/* Minimal Sticky Nav - Air Style */}
            <div className="hidden lg:flex fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] items-center gap-12">
                {['Works', 'Reviews', 'Connect'].map((item) => (
                    <button
                        key={item}
                        onClick={() => document.getElementById(item.toLowerCase() === 'reviews' ? 'feedback' : item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 hover:text-indigo-600 transition-all"
                    >
                        {item}
                    </button>
                ))}
                <div className="w-px h-5 bg-slate-100 mx-2" />
                <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="text-[10px] font-extrabold uppercase tracking-[0.25em] bg-white text-slate-900 border border-slate-200 px-5 py-2 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                >
                    Review
                </button>
            </div>

            {/* Mesh Background */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/40 rounded-full blur-[120px]" />
            </div>

            {/* Desktop Banner - Subtle Minimal */}
            <div className="hidden lg:block h-[380px] w-full bg-slate-50 relative overflow-hidden">
                <img
                    src={profile.banner_url || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2000"}
                    className="w-full h-full object-cover grayscale opacity-20 hover:opacity-30 transition-opacity duration-1000"
                    alt="Minimal Banner"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/20 to-transparent" />
            </div>

            {/* Mobile Banner */}
            <div className="lg:hidden relative h-56 w-full bg-slate-50 overflow-hidden">
                <img
                    src={profile.banner_url || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200"}
                    className="w-full h-full object-cover grayscale opacity-30"
                    alt="Banner"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
            </div>

            <main className="mx-auto max-w-7xl px-8 lg:px-12 relative">
                <div className="flex flex-col gap-24 lg:gap-32 -mt-16 lg:-mt-32 relative z-10 pb-40">

                    {/* MINIMAL IDENTITY CARD - Platform Standard */}
                    <aside className="w-full -mt-24 lg:-mt-40 relative z-20">
                        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-white/50 relative overflow-hidden group/card">
                            {/* Profile Info Overlap */}
                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 -mt-24 lg:-mt-32 mb-12">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative mx-auto lg:mx-10"
                                >
                                    <div className="h-40 w-40 lg:h-64 lg:w-64 rounded-[3rem] bg-white p-2 lg:p-3 border-4 border-white shadow-2xl relative z-10 overflow-hidden">
                                        <img
                                            src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                                            alt={profile.display_name}
                                            className="h-full w-full object-cover rounded-[2.5rem] grayscale group-hover/card:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 h-14 w-14 bg-indigo-600 border-4 border-white rounded-2xl flex items-center justify-center text-white shadow-xl z-20">
                                        <Zap className="h-6 w-6 fill-white" />
                                    </div>
                                </motion.div>

                                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full lg:w-auto">
                                    <button
                                        onClick={scrollToContact}
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-indigo-100/10"
                                    >
                                        Connect Now <ChevronRight className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => setIsReviewModalOpen(true)}
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
                                    >
                                        Endorse <Star className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-24 relative z-10 px-4">
                                <div className="space-y-8 text-center lg:text-left">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-center lg:justify-start gap-4">
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">{role} System</span>
                                            <div className="h-px w-8 bg-indigo-100 hidden lg:block" />
                                        </div>
                                        <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.85] flex items-center justify-center lg:justify-start gap-4">
                                            {profile.display_name}
                                            {profile.is_verified && <VerifiedBadge size="lg" className="inline-block" />}
                                        </h1>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                                {profile.title || "Elite Individual"}
                                            </span>
                                            {profile.company && (
                                                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-300">at {profile.company}</span>
                                            )}
                                        </div>
                                        <p className="text-xl lg:text-3xl font-bold text-slate-500 leading-tight lg:max-w-2xl italic opacity-80 decoration-indigo-500/10 underline decoration-8">
                                            {profile.bio || "Excellence through focused execution."}
                                        </p>
                                    </div>

                                    {/* Minimal Trust Score */}
                                    {averageRating && (
                                        <div className="flex items-center justify-center lg:justify-start gap-4 pt-6 border-t border-slate-50">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-3xl font-black text-slate-900">{averageRating}</span>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Trust Score</span>
                                            </div>
                                            <div className="w-px h-10 bg-slate-100" />
                                            <div className="flex flex-col gap-1">
                                                <span className="text-3xl font-black text-slate-900">{reviews?.length || 0}+</span>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Recommendations</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div className="p-1 rounded-[2.5rem] bg-slate-50 border border-slate-100">
                                        <ContactActions profile={profile} />
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(`https://linklane.app/${username}`);
                                                alert("Identity link copied!");
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-slate-100 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all shadow-sm"
                                        >
                                            <Share2 className="h-4 w-4" /> Share
                                        </button>
                                        {profile.instagram_handle && (
                                            <a href={`https://instagram.com/${profile.instagram_handle}`} target="_blank" className="h-12 w-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors shadow-sm">
                                                <Zap className="h-4 w-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* MAIN CONTENT AREA - Multi-Column Structured */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-24">

                        <div className="space-y-32">
                            {/* Offerings */}
                            {services?.length > 0 && (
                                <section id="works">
                                    <div className="flex items-center gap-3 mb-16 px-1">
                                        <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: accentColor }} />
                                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 pt-1">Offerings</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-16">
                                        {services.map((service: any, i: number) => (
                                            <motion.div
                                                key={service.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                className="group border-b border-slate-100 pb-16 hover:border-indigo-100 transition-colors"
                                            >
                                                <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6 mb-8">
                                                    <h3 className="font-black text-4xl lg:text-5xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">{service.title}</h3>
                                                    {service.price && <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">Invest {service.price}</span>}
                                                </div>
                                                <p className="text-lg font-medium text-slate-500 mb-12 leading-relaxed max-w-2xl italic opacity-80">&quot;{service.description}&quot;</p>
                                                <button
                                                    onClick={scrollToContact}
                                                    className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] px-12 py-5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95 shadow-sm group/btn shadow-xl shadow-slate-100"
                                                >
                                                    Inquire Now <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Validation / Reviews */}
                            {reviews?.length > 0 && (
                                <section id="feedback">
                                    <div className="flex items-center gap-3 mb-16 px-1">
                                        <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: accentColor }} />
                                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 pt-1">Validation</h2>
                                    </div>
                                    <div className="space-y-40">
                                        {reviews.map((review: any, i: number) => (
                                            <motion.div
                                                key={review.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                className="max-w-4xl relative"
                                            >
                                                <div className="absolute -left-12 top-0 text-[120px] font-black text-slate-50 leading-none pointer-events-none select-none">“</div>
                                                <p className="text-3xl lg:text-6xl font-black tracking-tighter mb-12 leading-[1.1] text-slate-900 relative z-10">
                                                    &quot;{review.comment}&quot;
                                                </p>
                                                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em]">
                                                    <div className="h-1.5 w-16 bg-indigo-600 rounded-full" />
                                                    <span className="text-slate-950">{review.name}</span>
                                                    {review.company && (
                                                        <span className="text-slate-300 border-l border-slate-200 pl-8">{review.company}</span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Minimal Sidebar Content */}
                        <div className="space-y-16">
                            {/* Social Channels */}
                            {links?.length > 0 && (
                                <div className="space-y-8">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 px-2">Discovery</h4>
                                    <div className="flex flex-col gap-4">
                                        {links.map((link: any) => (
                                            <a key={link.id} href={link.url} target="_blank" className="flex items-center justify-between p-7 bg-white border border-slate-50 rounded-[2rem] group transition-all hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                                                        <BrandIcon url={link.url} className="h-5 w-5 opacity-30 group-hover:opacity-100" />
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-950 uppercase tracking-widest">{link.title}</span>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-slate-200 group-hover:text-indigo-600 transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Minimal Identity Verify */}
                            <div className="bg-slate-950 p-10 rounded-[3rem] flex flex-col items-center gap-10 text-center">
                                <h4 className="text-[9px] font-black uppercase tracking-[0.6em] text-indigo-400">Profile Verify</h4>
                                <div className="p-3 bg-white rounded-2xl">
                                    <ProfileQRCode url={`https://linklane.app/${username}`} size={120} />
                                </div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                    Scan to authenticate this minimalist profile system
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Minimal Footer Branding */}
                <div className="mt-40 py-32 border-t border-slate-100 flex flex-col items-center gap-12 opacity-30 hover:opacity-100 transition-all">
                    <div className="p-4 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                        <ProfileQRCode url={`https://linklane.app/${username}`} size={120} />
                    </div>
                    <Link href="/" className="flex flex-col items-center gap-4 group">
                        <div className="px-8 py-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-3 transition-all hover:bg-slate-950 hover:text-white hover:border-slate-950 shadow-sm">
                            <Zap className="h-3 w-3 fill-current" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Powered by Linklane</span>
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
