import { createClient } from "@/utils/supabase/server";
import {
    Users,
    Settings,
    BarChart3,
    Link as LinkIcon,
    Share2,
    TrendingUp,
    MousePointer2,
    UserPlus,
    Plus,
    ArrowRight,
    Layout
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OverviewPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    // Fetch ALL lanes (profiles) for this user
    // Note: We're filtering by id=user.id for the primary, but we'll soon transition 
    // to a multiple-row-per-user model where user_id is the reference.
    const { data: lanes } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id); // In the future, this becomes .eq("user_id", user.id)

    const profile = lanes?.[0];

    if (!profile?.onboarded) {
        redirect("/dashboard/onboarding");
    }

    // Fetch real counts
    const { count: totalViews } = await supabase
        .from("leads")
        .select("*", { count: 'exact', head: true })
        .eq("profile_id", profile.id)
        .eq("type", "view");

    const { count: leadsCaptured } = await supabase
        .from("leads")
        .select("*", { count: 'exact', head: true })
        .eq("profile_id", profile.id)
        .neq("type", "view");

    // Simple growth calc: views today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: viewsToday } = await supabase
        .from("leads")
        .select("*", { count: 'exact', head: true })
        .eq("profile_id", profile.id)
        .eq("type", "view")
        .gte("created_at", today.toISOString());

    return (
        <div className="flex flex-col min-h-screen">
            <header className="lg:sticky top-0 z-30 border-b border-slate-100 bg-white/80 p-4 backdrop-blur-xl lg:p-6 mb-8 rounded-3xl">
                <div className="flex items-center justify-between mx-auto max-w-7xl w-full">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">Profile Overview</h1>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Manage your professional digital identity</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/${profile.username}`}
                            target="_blank"
                            className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-xs font-black text-slate-600 hover:bg-slate-200 transition-all active:scale-95"
                        >
                            <Share2 className="h-4 w-4" />
                            View Public Page
                        </Link>
                    </div>
                </div>
            </header>

            <main className="w-full max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Primary Profile Card */}
                    <Link href="/dashboard/editor" className="lg:col-span-2 group">
                        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:border-blue-200 relative overflow-hidden h-full flex flex-col justify-between">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                                <Layout className="h-40 w-40 -mr-10 -mt-10 text-slate-900" />
                            </div>

                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                                        <Layout className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 leading-none">{profile.display_name || "My Profile"}</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 px-2 py-0.5 bg-slate-50 rounded-full border border-slate-100 inline-block">
                                            {profile.template_id || 'Professional'} Template
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Live at:</p>
                                <p className="text-xl font-black text-blue-600 tracking-tight">linklane.in/{profile.username}</p>
                            </div>

                            <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-50">
                                <span className="text-[10px] font-black py-2 px-4 bg-slate-900 text-white rounded-xl uppercase tracking-widest shadow-lg shadow-slate-900/10">
                                    Enter Editor
                                </span>
                                <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { label: "Total Views", value: totalViews || 0, icon: MousePointer2, color: "text-blue-600", bg: "bg-blue-50" },
                            { label: "Leads Captured", value: leadsCaptured || 0, icon: UserPlus, color: "text-emerald-600", bg: "bg-emerald-50" },
                            { label: "Trust Score", value: profile.rating || "N/A", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white rounded-[2rem] p-6 border border-slate-200 flex items-center justify-between hover:border-blue-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                        <p className="text-lg font-black text-slate-900">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Growth Section */}
                <div className="mt-12 bg-white rounded-[3rem] p-12 border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
                        <BarChart3 className="h-32 w-32" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h4 className="text-xl font-black text-slate-900">Audience Growth</h4>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time performance metrics</p>
                            </div>
                            <div className="px-4 py-2 bg-emerald-50 rounded-xl text-emerald-600 text-xs font-black">
                                +{viewsToday || 0} today
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200">
                            {viewsToday && viewsToday > 0 ? (
                                <div className="text-center">
                                    <TrendingUp className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                                    <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Active growth detected</p>
                                    <p className="text-xs text-slate-400 mt-2">You gained {viewsToday} new views in the last 24 hours.</p>
                                </div>
                            ) : (
                                <>
                                    <Users className="h-12 w-12 text-slate-200 mb-4" />
                                    <p className="text-sm font-black text-slate-300 uppercase tracking-widest italic">Waiting for more data...</p>
                                    <p className="text-xs text-slate-400 mt-2 px-6 text-center">Share your profile to start seeing real-time audience engagement.</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
