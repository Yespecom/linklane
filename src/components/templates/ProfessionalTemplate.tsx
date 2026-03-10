"use client";

import {
    Briefcase,
    ShoppingBag,
    ExternalLink,
    ChevronRight,
    Globe,
    ShieldCheck,
    Star,
    MessageSquarePlus,
    MapPin,
    Share2,
    Users,
    User,
    Store,
    BookOpen,
    Zap,
    MessageCircle
} from "lucide-react";
import ContactActions from "@/components/ContactActions";
import ProfileQRCode from "@/components/ProfileQRCode";
import BrandIcon from "@/components/BrandIcon";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import ReviewModal from "@/components/ReviewModal";
import VerifiedBadge from "@/components/VerifiedBadge";

export default function ProfessionalTemplate({ profile, services, products, links, reviews, username }: any) {
    const accentColor = profile.accent_color || "#3B82F6";
    const profileShape = profile.profile_shape || "rounded-3xl";
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const contactRef = useRef<HTMLDivElement>(null);

    const averageRating = reviews?.length > 0
        ? (reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) / reviews.length).toFixed(1)
        : null;

    const scrollToContact = () => {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Role tags based on profile data (can be extended)
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

    const role = profile.role || (profile.template_id === 'professional' ? 'Business' : 'Individual');

    return (
        <div className="min-h-screen bg-[#F8FAFC] relative overflow-x-hidden selection:bg-indigo-600 selection:text-white">
            {/* Desktop Navbar - Modern Air-Nav */}
            <div className="hidden lg:flex fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] items-center gap-8">
                {[
                    { label: 'Mission', id: 'focus' },
                    { label: 'Services', id: 'services' },
                    { label: 'Reviews', id: 'reviews' }
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 hover:text-indigo-600 transition-all"
                    >
                        {item.label}
                    </button>
                ))}
                <div className="w-px h-5 bg-slate-200" />
                <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="text-[10px] font-extrabold uppercase tracking-[0.25em] bg-white text-slate-900 border border-slate-200 px-5 py-2 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                >
                    Review
                </button>
                <button
                    onClick={scrollToContact}
                    className="text-[10px] font-extrabold uppercase tracking-[0.25em] bg-slate-900 text-white px-5 py-2 rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/10"
                >
                    Inquiry
                </button>
            </div>

            {/* Modern Background - Subtle Mesh Gradient */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50/50 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#e2e8f0_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-30" />
            </div>

            {/* Desktop Banner - Grayscale Professional */}
            <div className="hidden lg:block h-[380px] w-full bg-slate-100 relative overflow-hidden">
                <img
                    src={profile.banner_url || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2000"}
                    className="w-full h-full object-cover grayscale opacity-40 hover:opacity-60 transition-opacity duration-1000"
                    alt="Professional Banner"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/40 to-transparent" />
            </div>

            {/* Mobile Banner */}
            <div className="lg:hidden relative h-56 w-full bg-slate-100 overflow-hidden">
                <img
                    src={profile.banner_url || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200"}
                    className="w-full h-full object-cover grayscale"
                    alt="Banner"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
            </div>

            <main className="mx-auto max-w-7xl px-8 lg:px-12 relative">
                <div className="flex flex-col lg:grid lg:grid-cols-[380px_1fr] gap-16 lg:gap-24 -mt-16 lg:-mt-32 relative z-10 pb-32">

                    {/* Profile Summary Card */}
                    <aside className="w-full lg:col-span-2 -mt-24 lg:-mt-48 relative z-20">
                        <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.1)] border border-white relative">
                            {/* Profile Info Overlap */}
                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 -mt-24 lg:-mt-32 mb-10">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative group w-max mx-auto lg:mx-0"
                                >
                                    <div className={`h-40 w-40 lg:h-56 lg:w-56 ${profileShape} bg-white p-2 lg:p-3 border-[6px] lg:border-[8px] border-white shadow-2xl relative z-10 overflow-hidden`}>
                                        <img
                                            src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                                            alt={profile.display_name}
                                            className="h-full w-full object-cover rounded-[calc(var(--radius,1.5rem)-16px)]"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 h-12 w-12 lg:h-16 lg:w-16 bg-blue-600 border-[4px] lg:border-[6px] border-white rounded-full flex items-center justify-center text-white shadow-xl z-20">
                                        <ShieldCheck className="h-6 w-6 lg:h-8 w-8" />
                                    </div>
                                </motion.div>

                                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full lg:w-auto">
                                    <button
                                        onClick={scrollToContact}
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black hover:scale-[1.02] transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                                    >
                                        <Zap className="h-4 w-4 fill-white" /> Connect Now
                                    </button>
                                    <button
                                        onClick={() => setIsReviewModalOpen(true)}
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95"
                                    >
                                        <Star className="h-4 w-4" /> Recommend
                                    </button>
                                </div>
                            </div>

                            {/* Bio & Details Container */}
                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-24">
                                <div className="space-y-8">
                                    <div className="space-y-4 text-center lg:text-left">
                                        <div className="flex items-center justify-center lg:justify-start gap-4">
                                            <span className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                                {getRoleIcon(role)} {role} Profile
                                            </span>
                                            {profile.category && (
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-l border-slate-100 pl-4">
                                                    {profile.category}
                                                </span>
                                            )}
                                        </div>
                                        <h1 className="text-4xl lg:text-7xl font-black text-slate-950 tracking-tighter leading-[0.9] flex items-center justify-center lg:justify-start gap-4">
                                            {profile.display_name}
                                            {profile.is_verified && <VerifiedBadge size="lg" className="inline-block" />}
                                        </h1>
                                        <p className="text-xl lg:text-2xl font-bold text-slate-600 lg:max-w-2xl leading-relaxed">
                                            {profile.title || "Professional Profile"}
                                        </p>
                                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2">
                                            {profile.location && (
                                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                                                    <MapPin className="h-4 w-4 text-blue-500" /> {profile.location}
                                                </div>
                                            )}
                                            {profile.company && (
                                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                                                    <Users className="h-4 w-4 text-blue-500" /> {profile.company}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600">
                                                <Globe className="h-4 w-4" /> open for opportunities
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trust Stats Bar */}
                                    <div className="flex flex-wrap gap-4 lg:gap-8 pt-4 border-t border-slate-50">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-2xl font-black text-slate-950">{averageRating || "5.0"}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Trust Score</span>
                                        </div>
                                        <div className="w-px h-10 bg-slate-100" />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-2xl font-black text-slate-950">{reviews?.length || "0"}+</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Recommendations</span>
                                        </div>
                                        <div className="w-px h-10 bg-slate-100" />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-2xl font-black text-slate-950">Verified</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Profile Status</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions Sidebar Inside Card */}
                                <div className="space-y-6">
                                    <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Contact</h4>
                                        <ContactActions profile={profile} />
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(`https://linklane.in/${username}`);
                                                alert("Profile link copied!");
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all shadow-sm"
                                        >
                                            <Share2 className="h-4 w-4" /> Share
                                        </button>
                                        {profile.instagram_handle && (
                                            <a href={`https://instagram.com/${profile.instagram_handle}`} target="_blank" className="h-12 w-12 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-500 hover:text-pink-500 transition-colors shadow-sm">
                                                <Share2 className="h-5 w-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* MAIN CONTENT AREA */}
                    <div className="w-full lg:col-span-2 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">

                        {/* Primary Work & Portfolio */}
                        <div className="space-y-16">
                            {/* Detailed Overview */}
                            {profile.bio && (
                                <section id="focus" className="relative">
                                    <div className="flex items-center justify-between mb-8 px-2">
                                        <h2 className="text-xl font-black text-slate-950 flex items-center gap-3">
                                            <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
                                            Overview
                                        </h2>
                                    </div>
                                    <div className="bg-white p-8 lg:p-10 rounded-[2rem] border border-slate-100 shadow-sm">
                                        <p className="text-xl font-medium text-slate-700 leading-relaxed">
                                            {profile.bio}
                                        </p>
                                    </div>
                                </section>
                            )}

                            {/* Service Offerings */}
                            {services?.length > 0 && (
                                <section id="services">
                                    <div className="flex items-center justify-between mb-8 px-2">
                                        <h2 className="text-xl font-black text-slate-950 flex items-center gap-3">
                                            <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
                                            Services & Offerings
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        {services.map((service: any, i: number) => (
                                            <motion.div
                                                key={service.id}
                                                initial={{ opacity: 0, y: 15 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                className="bg-white border border-slate-100 rounded-[2rem] p-8 group hover:shadow-2xl hover:shadow-blue-500/5 transition-all"
                                            >
                                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                                    <div className="space-y-4">
                                                        <h3 className="text-2xl font-black text-slate-950">{service.title}</h3>
                                                        <p className="text-base font-medium text-slate-500 max-w-xl leading-relaxed">{service.description}</p>
                                                        {service.price && (
                                                            <div className="inline-flex items-center px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-blue-600 uppercase tracking-widest border border-slate-100">
                                                                Starts at {service.price}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={scrollToContact}
                                                        className="px-8 py-4 bg-slate-950 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg"
                                                    >
                                                        Book Inquiry
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Recommendations */}
                            {reviews?.length > 0 && (
                                <section id="reviews">
                                    <div className="flex items-center justify-between mb-8 px-2">
                                        <h2 className="text-xl font-black text-slate-950 flex items-center gap-3">
                                            <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
                                            Recommendations
                                        </h2>
                                        <button onClick={() => setIsReviewModalOpen(true)} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
                                            + Endorse
                                        </button>
                                    </div>
                                    <div className="space-y-6">
                                        {reviews.map((review: any, i: number) => (
                                            <motion.div
                                                key={review.id}
                                                className="bg-white p-8 rounded-[2rem] border border-slate-100"
                                            >
                                                <div className="flex gap-1 mb-6">
                                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`h-3 w-3 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-slate-100"}`} />)}
                                                </div>
                                                <p className="text-lg font-bold text-slate-700 leading-relaxed mb-8 italic">&quot;{review.comment}&quot;</p>
                                                <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                                                    <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-black">
                                                        {review.name.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-base font-black text-slate-950">{review.name}</span>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{review.company || "Professional"}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar Information */}
                        <div className="space-y-12">
                            {/* Social Discovery */}
                            {links?.length > 0 && (
                                <div className="space-y-6">
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-2">Connected Channels</h4>
                                    <div className="space-y-3">
                                        {links.map((link: any) => (
                                            <a key={link.id} href={link.url} target="_blank" className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl group transition-all hover:border-blue-200">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                                        <BrandIcon url={link.url} className="h-5 w-5 opacity-40 group-hover:opacity-100" />
                                                    </div>
                                                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{link.title}</span>
                                                </div>
                                                <ExternalLink className="h-4 w-4 text-slate-200 group-hover:text-blue-500 transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Authentication QR */}
                            <div className="bg-slate-950 p-8 rounded-[2.5rem] flex flex-col items-center gap-8 text-center">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Verify Profile</h4>
                                <div className="p-4 bg-white rounded-3xl">
                                    <ProfileQRCode url={`https://linklane.in/${username}`} size={160} />
                                </div>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                                    Scan to verify this professional profile system
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Branding */}
                <div className="mt-40 pt-20 border-t border-slate-100 flex flex-col items-center gap-12 pb-20 opacity-40 hover:opacity-100 transition-all duration-700">
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-indigo-100/20 border border-slate-50 rotate-3 hover:rotate-0 transition-transform duration-500">
                        <ProfileQRCode url={`https://linklane.in/${username}`} size={160} />
                    </div>
                    <Link href="/" className="flex flex-col items-center gap-6 group">
                        <div className="px-8 py-3 bg-slate-900 rounded-2xl flex items-center gap-3 group-hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-500/10">
                            <Zap className="h-4 w-4 text-white fill-white" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Powered by Linklane</span>
                        </div>
                        <div className="text-center">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Profile • Performance • Growth</span>
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
