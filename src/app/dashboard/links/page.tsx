"use client";

import { motion } from "framer-motion";
import {
    Link as LinkIcon,
    Plus,
    Trash2,
    GripVertical,
    ExternalLink,
    Search
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LinksPage() {
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchLinks() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

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

    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Social Links</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Manage your digital presence</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">
                    <Plus className="h-4 w-4" /> Add New Link
                </button>
            </header>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="animate-pulse flex flex-col gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-24 bg-slate-100 rounded-[2rem]" />
                        ))}
                    </div>
                ) : links.length > 0 ? (
                    links.map((link, i) => (
                        <motion.div
                            key={link.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-blue-200 transition-colors"
                        >
                            <div className="text-slate-200 cursor-grab active:cursor-grabbing">
                                <GripVertical className="h-5 w-5" />
                            </div>

                            <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                                <LinkIcon className="h-5 w-5 text-slate-400" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-black text-slate-900">{link.title}</h3>
                                <p className="text-xs font-bold text-slate-400 truncate max-w-[200px] lg:max-w-md">{link.url}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <a
                                    href={link.url}
                                    target="_blank"
                                    className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                                <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 py-20 flex flex-col items-center justify-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
                            <LinkIcon className="h-8 w-8 text-slate-300" />
                        </div>
                        <p className="font-black text-slate-900 uppercase tracking-tighter">No links found</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Click the button above to add your first link</p>
                    </div>
                )}
            </div>
        </div>
    );
}
