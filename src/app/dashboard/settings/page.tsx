"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Lock,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function SettingsPage() {
    const supabase = createClient();
    const [activeTab, setActiveTab] = useState("account");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const [profile, setProfile] = useState({
        id: "",
        display_name: "",
        email: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data: profileData } = await supabase
                    .from("profiles")
                    .select("id, display_name")
                    .eq("id", user.id)
                    .single();

                setProfile({
                    id: user.id,
                    display_name: profileData?.display_name || "",
                    email: user.email || ""
                });
            }
            setLoading(false);
        };

        fetchUserData();
    }, [supabase]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const { error } = await supabase
                .from("profiles")
                .update({ display_name: profile.display_name })
                .eq("id", profile.id);

            if (error) throw error;

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Failed to save changes. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: "account", label: "Account", icon: User },
    ];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronizing Identity...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Preferences</h1>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Configure your Linklane global identity</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
                {/* Navigation Sidebar */}
                <aside className="bg-white rounded-[2.5rem] p-4 border border-slate-200 shadow-sm flex flex-col gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10 translate-x-1"
                                : "text-slate-400 hover:bg-slate-50"
                                }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </aside>

                {/* Content Area */}
                <div className="bg-white rounded-[3rem] p-10 lg:p-14 border border-slate-200 shadow-sm relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-12"
                        >
                            {/* Account Section */}
                            {activeTab === "account" && (
                                <>
                                    <section className="space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-black text-slate-900">Personal Identity</h3>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">Sync Enabled</span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Global Display Name</label>
                                                <input
                                                    type="text"
                                                    className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm font-bold outline-none focus:border-blue-600 transition-all"
                                                    placeholder="Enter name"
                                                    value={profile.display_name}
                                                    onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Verification Email</label>
                                                <div className="relative group">
                                                    <input
                                                        type="email"
                                                        readOnly
                                                        className="w-full bg-slate-100 border border-slate-200 rounded-2xl p-5 text-sm font-bold opacity-60 cursor-not-allowed outline-none"
                                                        placeholder="Email"
                                                        value={profile.email}
                                                    />
                                                    <Lock className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="pt-10 border-t border-slate-100 space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-black text-slate-900">Notifications</h3>
                                            <div className="h-6 w-12 bg-blue-600 rounded-full flex items-center justify-end px-1 cursor-pointer">
                                                <div className="h-4 w-4 bg-white rounded-full shadow-sm" />
                                            </div>
                                        </div>
                                        <p className="text-sm font-bold text-slate-400 max-w-lg leading-relaxed">
                                            Enable push notifications to receive real-time updates when potential leads interact with your profile handles.
                                        </p>
                                    </section>
                                </>
                            )}

                            {/* Action Footer */}
                            <div className="pt-10 border-t border-slate-100 flex justify-end gap-3 items-center">
                                {saved && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest mr-4"
                                    >
                                        <CheckCircle2 className="h-3 w-3" /> Changes Published
                                    </motion.div>
                                )}
                                <button className="px-8 py-4 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Cancel</button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
                                >
                                    {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : "Save Changes"}
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
