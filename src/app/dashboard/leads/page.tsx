"use client";

import { motion } from "framer-motion";
import { Users, Eye, MousePointerClick, TrendingUp, Calendar, Zap, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LeadsPage() {
    const supabase = createClient();
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Get profile first
                const { data: profile } = await supabase.from('profiles').select('id').eq('user_id', user.id).single();
                if (profile) {
                    const { data } = await supabase
                        .from('leads')
                        .select('*')
                        .eq('profile_id', profile.id)
                        .order('created_at', { ascending: false });
                    setLeads(data || []);
                }
            }
            setLoading(false);
        };
        fetchLeads();
    }, []);

    const views = leads.filter(l => l.type === 'view').length;
    const clicks = leads.filter(l => l.type !== 'view').length;

    if (loading) return (
        <div className="flex animate-pulse flex-col gap-4 max-w-5xl">
            <div className="h-32 bg-slate-100 rounded-[2rem]" />
            <div className="h-96 bg-slate-100 rounded-[2rem]" />
        </div>
    );

    return (
        <div className="flex flex-col gap-8 max-w-5xl">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Leads & Analytics</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Track views and clicks across your page.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Events</p>
                        <p className="text-3xl font-black text-slate-900 leading-none mt-1">{leads.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center">
                        <Eye className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Page Views</p>
                        <p className="text-3xl font-black text-slate-900 leading-none mt-1">{views}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <MousePointerClick className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Link Clicks</p>
                        <p className="text-3xl font-black text-slate-900 leading-none mt-1">{clicks}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6">Recent Activity</h3>
                {leads.length > 0 ? (
                    <div className="space-y-4">
                        {leads.map((lead, i) => (
                            <motion.div
                                key={lead.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.02 }}
                                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${lead.type === 'view' ? 'bg-slate-200 text-slate-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {lead.type === 'view' ? <Eye className="h-4 w-4" /> : <MousePointerClick className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 capitalize font-poppins">{lead.target || 'Profile Page'}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lead.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
                                    <Calendar className="h-3 w-3" />
                                    <span className="text-[10px] font-black tracking-widest uppercase">
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <Zap className="h-10 w-10 text-slate-200 mb-4" />
                        <p className="text-sm font-black text-slate-900 uppercase tracking-widest">No activity yet</p>
                        <p className="text-xs font-medium text-slate-400 mt-2">Share your profile to start seeing traffic!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
