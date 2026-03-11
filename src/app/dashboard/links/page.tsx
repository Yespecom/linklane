"use client";

import { motion } from "framer-motion";
import {
    Link as LinkIcon,
    Plus,
    Trash2,
    Upload,
    Save,
    Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LinksPage() {
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        async function fetchLinks() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: profileData } = await supabase.from("profiles").select("id").eq("id", user.id).single();
            setProfile(profileData);

            const { data } = await supabase
                .from("links")
                .select("*")
                .eq("user_id", user.id)
                .order("order", { ascending: true });

            setLinks(data || []);
            setLoading(false);
        }
        fetchLinks();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user || !profile) return;

            // Sync Links (Clean Re-sync)
            await supabase.from("links").delete().eq("user_id", profile.id);
            if (links.length > 0) {
                const { error: linksError } = await supabase.from("links").insert(
                    links.map((l, i) => ({
                        user_id: profile.id,
                        title: l.title,
                        url: l.url,
                        icon_url: l.icon_url,
                        order: i
                    }))
                );
                if (linksError) throw linksError;
            }

            alert("Links Saved Successfully! 🚀");
        } catch (err: any) {
            console.error("Saving failure:", err);
            alert(`Unable to update: ${err.message || 'Unknown error'}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex animate-pulse flex-col gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-slate-100 rounded-[2rem]" />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 max-w-3xl">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Social Connections</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Manage your digital touchpoints</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setLinks([...links, { title: "New Link", url: "https://", icon_url: null }])} className="flex items-center gap-2 rounded-xl bg-blue-50 px-5 py-2.5 text-xs font-black text-blue-600 uppercase tracking-widest hover:bg-blue-100 transition-all">
                        <Plus className="h-4 w-4" /> Add
                    </button>
                    <button onClick={handleSave} disabled={saving} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50">
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
                    </button>
                </div>
            </header>

            <div className="space-y-4">
                {links.map((l, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex flex-col gap-4 p-6 border border-slate-100 bg-white rounded-[2rem] relative group shadow-sm"
                    >
                        <button onClick={() => setLinks(links.filter((_, i) => i !== idx))} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors z-10"><Trash2 className="h-5 w-5" /></button>
                        <div className="flex items-start gap-4 pr-10">
                            <div className="h-12 w-12 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 shrink-0 shadow-sm relative overflow-hidden group/icon mt-1">
                                {l.icon_url ? (
                                    <img src={l.icon_url} className="w-full h-full object-cover" />
                                ) : (
                                    <LinkIcon className="h-5 w-5 text-slate-300" />
                                )}
                                <label className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover/icon:opacity-100 cursor-pointer transition-all">
                                    <Upload className="h-4 w-4 text-white" />
                                    <input type="file" className="hidden" accept="image/*"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (file && profile?.id) {
                                                try {
                                                    const path = `${profile.id}/icon-${Date.now()}.${file.name.split('.').pop()}`;
                                                    const { data, error } = await supabase.storage.from('media').upload(path, file);
                                                    if (error) throw error;
                                                    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(path);
                                                    const n = [...links];
                                                    n[idx].icon_url = publicUrl;
                                                    setLinks(n);
                                                } catch (err: any) { alert(err.message); }
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="flex-1 min-w-0 space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                                    <input value={l.title} onChange={(e) => { const n = [...links]; n[idx].title = e.target.value; setLinks(n); }} className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-sm font-bold w-full focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all outline-none min-w-0" placeholder="Label (e.g. My Website)" />
                                    <input value={l.url} onChange={(e) => { const n = [...links]; n[idx].url = e.target.value; setLinks(n); }} className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-sm font-bold w-full text-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all outline-none min-w-0" placeholder="https://..." />
                                </div>

                                {/* Quick Presets */}
                                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full relative">
                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest shrink-0">Presets:</span>
                                    {[
                                        { name: "WhatsApp", url: "https://wa.me/..." },
                                        { name: "Instagram", url: "https://instagram.com/..." },
                                        { name: "TikTok", url: "https://tiktok.com/@..." },
                                        { name: "Spotify", url: "https://open.spotify.com/..." },
                                        { name: "Apple", url: "https://music.apple.com/..." },
                                        { name: "X", url: "https://x.com/..." }
                                    ].map(preset => (
                                        <button
                                            key={preset.name}
                                            onClick={() => { const n = [...links]; n[idx].title = preset.name; n[idx].url = preset.url; setLinks(n); }}
                                            className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black uppercase text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 transition-all shrink-0"
                                        >
                                            {preset.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {links.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-white">
                        <LinkIcon className="h-10 w-10 text-slate-200 mb-4" />
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No connections yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
