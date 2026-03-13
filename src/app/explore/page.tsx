"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
    Search,
    MapPin,
    Star,
    Briefcase,
    ChevronRight,
    Loader2,
    Filter,
    TrendingUp,
    Zap,
    Clock,
    ArrowUpDown,
    Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LinktreeNavbar from "@/components/LinktreeNavbar";
import VerifiedBadge from "@/components/VerifiedBadge";
import { BadgeCheck } from "lucide-react";

export default function ExplorePage() {
    const supabase = createClient();
    const [profiles, setProfiles] = useState<any[]>([]);
    const [featured, setFeatured] = useState<any[]>([]);
    const [topRated, setTopRated] = useState<any[]>([]);
    const [trending, setTrending] = useState<any[]>([]);
    const [recentlyReviewed, setRecentlyReviewed] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("rating"); // rating, reviews, newest
    const [loading, setLoading] = useState(true);

    const categories = ["All", "Design", "Marketing", "Consulting", "Fitness", "Tech", "Beauty"];

    useEffect(() => {
        fetchFeatured();
        fetchProfiles();
    }, [category, sortBy]);

    async function fetchFeatured() {
        // High Impact Featured (Monetized Section)
        const { data: feat } = await supabase
            .from("profiles")
            .select("*")
            .eq("onboarded", true)
            .eq("is_featured", true)
            .limit(4);
        setFeatured(feat || []);

        // Top Rated
        const { data: top } = await supabase
            .from("profiles")
            .select("*")
            .eq("onboarded", true)
            .order("rating", { ascending: false })
            .limit(4);
        setTopRated(top || []);

        // Trending (Most Reviewed)
        const { data: trend } = await supabase
            .from("profiles")
            .select("*")
            .eq("onboarded", true)
            .order("review_count", { ascending: false })
            .limit(4);
        setTrending(trend || []);

        // Recently Reviewed (Featured Profiles with recent approved reviews)
        const { data: recentRev } = await supabase
            .from("reviews")
            .select("profile_id")
            .eq("status", "approved")
            .order("created_at", { ascending: false })
            .limit(10);

        if (recentRev && recentRev.length > 0) {
            const uniqueIds = Array.from(new Set(recentRev.map(r => r.profile_id))).slice(0, 4);
            const { data: recentProfiles } = await supabase
                .from("profiles")
                .select("*")
                .in("id", uniqueIds);
            setRecentlyReviewed(recentProfiles || []);
        }
    }

    async function fetchProfiles() {
        setLoading(true);
        let query = supabase
            .from("profiles")
            .select("*")
            .eq("onboarded", true)
            .order("is_verified", { ascending: false });

        if (category !== "All") {
            query = query.ilike("category", `%${category}%`);
        }

        if (sortBy === "rating") query = query.order("rating", { ascending: false });
        if (sortBy === "reviews") query = query.order("review_count", { ascending: false });
        if (sortBy === "newest") query = query.order("created_at", { ascending: false });

        const { data } = await query;
        setProfiles(data || []);
        setLoading(false);
    }

    const filteredProfiles = profiles.filter(p =>
        p.display_name?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase()) ||
        p.bio?.toLowerCase().includes(search.toLowerCase())
    );

    const ProfileCard = ({ p, compact = false }: { p: any, compact?: boolean }) => (
        <Link
            href={`/${p.username}`}
            className={`group block bg-white rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-2 active:scale-95 relative overflow-hidden h-full ${compact ? 'p-6' : 'p-8'}`}
        >
            <div className={`flex items-start justify-between ${compact ? 'mb-4' : 'mb-8'}`}>
                <div className="flex items-center gap-4">
                    <div className={`${compact ? 'h-12 w-12' : 'h-20 w-20'} ${p.profile_shape || 'rounded-3xl'} bg-slate-50 overflow-hidden border border-slate-100 shrink-0`}>
                        <img
                            src={p.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.username}`}
                            className="h-full w-full object-cover"
                            alt={p.display_name}
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className={`${compact ? 'text-lg' : 'text-2xl'} font-bold text-slate-900 leading-tight line-clamp-1`}>{p.display_name}</h3>
                            {p.is_verified && <VerifiedBadge size={compact ? "sm" : "md"} />}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{p.category || "General"}</span>
                            {p.location && (
                                <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                                    <MapPin className="h-3 w-3" /> {p.location}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {!compact && (
                <p className="text-sm font-normal text-slate-500 mb-8 line-clamp-2 leading-relaxed h-10">
                    {p.bio || "No description provided."}
                </p>
            )}

            <div className={`flex items-center justify-between pt-6 border-t border-slate-50 mt-auto`}>
                <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`h-3 w-3 ${s <= Math.round(p.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-slate-100"}`} />
                        ))}
                    </div>
                    <span className="text-xs font-bold text-slate-900">{p.rating || 0}</span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">({p.review_count || 0})</span>
                </div>
                <div className={`${compact ? 'h-8 w-8' : 'h-10 w-10'} rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                    <ChevronRight className={`${compact ? 'h-4 w-4' : 'h-5 w-5'}`} />
                </div>
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-32 overflow-x-hidden">
            <LinktreeNavbar />

            <main className="mx-auto max-w-7xl px-8 pt-48">
                {/* Hero Search Section */}
                <div className="flex flex-col items-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-center mb-10 max-w-3xl leading-[1.1]"
                    >
                        Find Experts.<br />
                        <span className="text-blue-600">Grow Your Network.</span>
                    </motion.h1>

                    <div className="w-full max-w-2xl relative z-50">
                        <div className="absolute left-6 top-[40px] -translate-y-1/2 text-slate-400">
                            <Search className="h-6 w-6" />
                        </div>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, category or service..."
                            className="w-full pl-16 pr-6 py-6 rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl shadow-blue-500/5 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-lg"
                        />

                        {/* Google-style Live Results Dropdown */}
                        <AnimatePresence>
                            {search.length > 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                    className="absolute inset-x-0 top-full mt-4 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden p-3"
                                >
                                    <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                                        {filteredProfiles.length > 0 ? (
                                            <div className="flex flex-col gap-1">
                                                <div className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Live Suggestions</div>
                                                {filteredProfiles.slice(0, 5).map((p) => (
                                                    <Link
                                                        key={p.id}
                                                        href={`/${p.username}`}
                                                        className="flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 transition-all group"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`h-12 w-12 ${p.profile_shape || 'rounded-2xl'} bg-slate-100 overflow-hidden border border-slate-200 shrink-0`}>
                                                                <img
                                                                    src={p.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.username}`}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="flex items-center gap-1.5 min-w-0">
                                                                    <div className="text-sm font-black text-slate-900 leading-tight truncate">{p.display_name}</div>
                                                                    {p.is_verified && <VerifiedBadge size="sm" />}
                                                                </div>
                                                                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{p.category || 'Expert'}</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 shrink-0">
                                                            <div className="flex items-center gap-1">
                                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                                <span className="text-xs font-black text-slate-900">{p.rating || 0}</span>
                                                            </div>
                                                            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                                                        </div>
                                                    </Link>
                                                ))}
                                                {filteredProfiles.length > 5 && (
                                                    <div className="p-4 text-center border-t border-slate-50 mt-2">
                                                        <button
                                                            onClick={() => {
                                                                const el = document.getElementById('all-profiles');
                                                                el?.scrollIntoView({ behavior: 'smooth' });
                                                            }}
                                                            className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline"
                                                        >
                                                            See all {filteredProfiles.length} results
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="p-12 text-center">
                                                <Search className="h-8 w-8 text-slate-200 mx-auto mb-4" />
                                                <div className="text-sm font-bold text-slate-400">No suggestions for "{search}"</div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Featured Sections (Horizontal Scroll or Compact Grid) */}
                <div className="space-y-20 mb-32">
                    {/* Monetized Featured Professionals */}
                    {featured.length > 0 && (
                        <section className="bg-blue-600 rounded-[3rem] p-8 lg:p-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform h-full flex items-center">
                                <BadgeCheck className="h-64 w-64 -mr-20 -mt-20 text-white" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-10 px-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                                            <Sparkles className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-white">Featured Global Hub</h2>
                                            <p className="text-xs font-bold text-blue-100 uppercase tracking-widest">Hand-picked elite professionals</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {featured.map(p => (
                                        <motion.div
                                            key={p.id}
                                            whileHover={{ scale: 1.02 }}
                                            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-[2.5rem] p-1 transition-all"
                                        >
                                            <ProfileCard p={p} compact />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Top Rated Section */}
                    <section>
                        <div className="flex items-center justify-between mb-8 px-2">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600">
                                    <Star className="h-5 w-5 fill-yellow-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Top Rated</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Highest community trust</p>
                                </div>
                            </div>
                            <Link href="#all-profiles" className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">View All</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {topRated.map(p => <ProfileCard key={p.id} p={p} compact />)}
                        </div>
                    </section>

                    {/* Trending Section */}
                    <section>
                        <div className="flex items-center justify-between mb-8 px-2">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Trending Now</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Most active contributors</p>
                                </div>
                            </div>
                            <Link href="#all-profiles" className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">View All</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {trending.map(p => <ProfileCard key={p.id} p={p} compact />)}
                        </div>
                    </section>

                    {/* Recently Reviewed Section */}
                    {recentlyReviewed.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-8 px-2">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900">Recently Reviewed</h2>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fresh feedback from clients</p>
                                    </div>
                                </div>
                                <Link href="#all-profiles" className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">View All</Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {recentlyReviewed.map(p => <ProfileCard key={p.id} p={p} compact />)}
                            </div>
                        </section>
                    )}
                </div>

                {/* Main Content Area */}
                <div id="all-profiles" className="flex flex-col lg:flex-row gap-12 border-t border-slate-100 pt-20">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="sticky top-32 space-y-12">
                            <div>
                                <div className="flex items-center gap-2 mb-8 ml-2">
                                    <Filter className="h-4 w-4 text-slate-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Categories</span>
                                </div>
                                <div className="flex flex-wrap lg:flex-col gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setCategory(cat)}
                                            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all text-left ${category === cat
                                                ? "bg-slate-900 text-white shadow-xl"
                                                : "bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 shadow-sm"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-8 ml-2">
                                    <ArrowUpDown className="h-4 w-4 text-slate-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort By</span>
                                </div>
                                <div className="flex flex-wrap lg:flex-col gap-2">
                                    {[
                                        { id: "rating", label: "Top Rated", icon: Star },
                                        { id: "reviews", label: "Most Reviewed", icon: Briefcase },
                                        { id: "newest", label: "Newest", icon: Clock },
                                    ].map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => setSortBy(s.id)}
                                            className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all text-left ${sortBy === s.id
                                                ? "bg-blue-600 text-white shadow-xl"
                                                : "bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 shadow-sm"
                                                }`}
                                        >
                                            <s.icon className="h-4 w-4" />
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-12 ml-2">
                            <h2 className="text-3xl font-black text-slate-900">All Professionals</h2>
                            <span className="text-sm font-bold text-slate-400">{filteredProfiles.length} Results</span>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-32">
                                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                            </div>
                        ) : filteredProfiles.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 text-center">
                                <Search className="h-12 w-12 text-slate-200 mb-6" />
                                <h3 className="text-xl font-bold text-slate-400">No results found for "{search}"</h3>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <AnimatePresence mode="popLayout">
                                    {filteredProfiles.map((p, i) => (
                                        <motion.div
                                            key={p.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <ProfileCard p={p} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
