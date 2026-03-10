"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Trash2,
    ArrowRight,
    CheckCircle2,
    Camera,
    ChevronRight,
    Globe,
    Youtube,
    Instagram,
    Twitter,
    Linkedin,
    Github,
    MessageCircle,
    Calendar,
    Layers,
    Layout,
    ExternalLink,
    Loader2
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
    instagram: Instagram,
    youtube: Youtube,
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    website: Globe,
    default: Globe
};

export default function OnboardingPage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);

    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState({
        displayName: "",
        bio: "",
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`
    });
    const [links, setLinks] = useState([{ id: 1, title: "", url: "" }]);
    const [primaryAction, setPrimaryAction] = useState({ label: "Chat on WhatsApp", url: "https://wa.me/" });

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
            } else {
                setUser(user);
                setProfile(prev => ({
                    ...prev,
                    displayName: user.user_metadata?.display_name || user.user_metadata?.full_name || user.email?.split('@')[0] || ""
                }));
            }
        };
        checkUser();
    }, [supabase, router]);

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleFinish = async () => {
        setLoading(true);
        try {
            // 1. Update Profile (including the reserved username from metadata)
            let username = user?.user_metadata?.username;

            if (!username) {
                const manualUsername = prompt("Please enter a username for your page (e.g. srinithin):");
                if (!manualUsername) {
                    throw new Error("Username is required to publish your page.");
                }
                username = manualUsername.toLowerCase().replace(/[^a-z0-9_]/g, "");
            }

            const { error: profileError } = await supabase
                .from("profiles")
                .upsert({
                    id: user.id,
                    username: username,
                    display_name: profile.displayName,
                    bio: profile.bio,
                    avatar_url: profile.avatarUrl,
                    onboarded: true
                });

            if (profileError) throw profileError;

            // 2. Add Links
            const linksToInsert = links
                .filter(l => l.title && l.url)
                .map((l, i) => ({
                    user_id: user.id,
                    title: l.title,
                    url: l.url,
                    order: i
                }));

            if (linksToInsert.length > 0) {
                const { error: linksError } = await supabase
                    .from("links")
                    .insert(linksToInsert);
                if (linksError) throw linksError;
            }

            // 3. Add Primary Action
            const { error: actionError } = await supabase
                .from("primary_actions")
                .upsert({
                    user_id: user.id,
                    label: primaryAction.label,
                    url: primaryAction.url
                });

            if (actionError) throw actionError;

            router.push("/dashboard");
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-blue-100 selection:text-blue-600">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/40 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side: Forms */}
                <div className="flex flex-col gap-8 order-2 lg:order-1">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl font-black tracking-tight text-slate-900">Build Your Lane</h1>
                            <div className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">
                                Step {step} of 3
                            </div>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-600"
                                initial={{ width: "0%" }}
                                animate={{ width: `${(step / 3) * 100}%` }}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex flex-col gap-6"
                            >
                                <div className="flex items-center gap-8 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                                    <div className="relative group">
                                        <div className="h-24 w-24 rounded-[2rem] bg-slate-50 p-1 border-2 border-slate-100 overflow-hidden">
                                            <img src={profile.avatarUrl} className="h-full w-full object-cover" alt="Avatar" />
                                        </div>
                                        <button
                                            onClick={() => setProfile({ ...profile, avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}` })}
                                            className="absolute -bottom-2 -right-2 h-10 w-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform border-4 border-white"
                                        >
                                            <Camera className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Display Name</label>
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                                                placeholder="What should we call you?"
                                                value={profile.displayName}
                                                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Short Bio</label>
                                    <textarea
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all h-32 resize-none"
                                        placeholder="Pitch yourself in a few words..."
                                        value={profile.bio}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    />
                                </div>
                                <button
                                    onClick={nextStep}
                                    className="w-full flex items-center justify-center gap-2 rounded-3xl bg-slate-900 py-5 text-sm font-black text-white hover:bg-black transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                                >
                                    Continue to Links <ArrowRight className="h-4 w-4" />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex flex-col gap-6"
                            >
                                <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
                                    {links.map((link, idx) => (
                                        <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-4 relative group">
                                            <div className="flex gap-4">
                                                <div className="flex-1 space-y-2">
                                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Portfolio"
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500/50 transition-all"
                                                        value={link.title}
                                                        onChange={(e) => {
                                                            const newLinks = [...links];
                                                            newLinks[idx].title = e.target.value;
                                                            setLinks(newLinks);
                                                        }}
                                                    />
                                                </div>
                                                {links.length > 1 && (
                                                    <button
                                                        onClick={() => setLinks(links.filter((_, i) => i !== idx))}
                                                        className="mt-6 h-12 w-12 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">URL</label>
                                                <input
                                                    type="url"
                                                    placeholder="https://yourlink.com"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                                                    value={link.url}
                                                    onChange={(e) => {
                                                        const newLinks = [...links];
                                                        newLinks[idx].url = e.target.value;
                                                        setLinks(newLinks);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setLinks([...links, { id: Date.now(), title: "", url: "" }])}
                                    className="flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:bg-slate-50 hover:border-blue-200 transition-all text-xs font-black uppercase tracking-widest"
                                >
                                    <Plus className="h-4 w-4" /> Add Social Link
                                </button>
                                <div className="flex gap-4">
                                    <button onClick={prevStep} className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Back</button>
                                    <button
                                        onClick={nextStep}
                                        className="flex-[2] flex items-center justify-center gap-2 rounded-3xl bg-slate-900 py-5 text-sm font-black text-white hover:bg-black transition-all shadow-xl"
                                    >
                                        Next Step <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex flex-col gap-6"
                            >
                                <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        The primary action is your North Star. It's the most prominent button on your page, designed to drive your main goal.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Button Label</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:border-blue-500/50 appearance-none transition-all"
                                                    value={primaryAction.label}
                                                    onChange={(e) => {
                                                        const label = e.target.value;
                                                        let url = primaryAction.url;
                                                        if (label === "Chat on WhatsApp") url = "https://wa.me/";
                                                        if (label === "Book a call") url = "";
                                                        setPrimaryAction({ label, url });
                                                    }}
                                                >
                                                    <option value="Chat on WhatsApp">Chat on WhatsApp</option>
                                                    <option value="Book a call">Book a call</option>
                                                    <option value="Visit website">Visit website</option>
                                                    <option value="Buy product">Buy product</option>
                                                </select>
                                                <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 rotate-90 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Redirect URL</label>
                                            <input
                                                type="url"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                                                placeholder="https://..."
                                                value={primaryAction.url}
                                                onChange={(e) => setPrimaryAction({ ...primaryAction, url: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={prevStep} className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Back</button>
                                    <button
                                        onClick={handleFinish}
                                        disabled={loading}
                                        className="flex-[2] flex items-center justify-center gap-2 rounded-3xl bg-blue-600 py-5 text-sm font-black text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Launch My Page <ArrowRight className="h-4 w-4" /></>}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Preview */}
                <div className="flex justify-center order-1 lg:order-2">
                    <div className="relative mx-auto w-full max-w-[320px]">
                        <div className="relative aspect-[9/19] rounded-[3.5rem] border-[12px] border-slate-900 bg-slate-900 p-1 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.3)]">
                            <div className="h-full w-full overflow-hidden rounded-[2.5rem] bg-white text-slate-900 flex flex-col p-6">

                                {/* Profile Section */}
                                <div className="flex flex-col items-center mb-8 pt-6">
                                    <div className="h-24 w-24 rounded-[2.5rem] bg-slate-50 mb-4 overflow-hidden border-2 border-slate-100 shadow-sm">
                                        <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tight text-center leading-tight">{profile.displayName || "@username"}</h3>
                                    <p className="text-center text-[10px] font-black text-slate-400 mt-2 max-w-[180px] leading-relaxed uppercase tracking-[0.2em]">
                                        {profile.bio || "Crafting something legendary"}
                                    </p>
                                </div>

                                {/* Primary Action Button */}
                                <div
                                    className="w-full rounded-2xl bg-blue-600 py-4 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 mb-8"
                                >
                                    {primaryAction.label}
                                    <ChevronRight className="h-3 w-3" />
                                </div>

                                {/* Links */}
                                <div className="flex flex-col gap-3 w-full">
                                    {links.map((link, i) => (
                                        <div
                                            key={i}
                                            className={`flex items-center justify-between px-5 py-4 rounded-2xl border border-slate-100 transition-all active:scale-[0.98] ${link.title ? "opacity-100" : "opacity-20 translate-y-2"}`}
                                        >
                                            <span className="text-[11px] font-black uppercase tracking-tight">{link.title || "Link Title"}</span>
                                            <ExternalLink className="h-3 w-3 text-slate-300" />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto flex flex-col items-center pb-6 gap-2">
                                    <div className="flex items-center gap-2 opacity-30">
                                        <div className="h-5 w-5 rounded-lg bg-blue-600 flex items-center justify-center">
                                            <div className="h-1 w-1 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Linklane</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-[1.5rem] bg-slate-900" />
                        </div>

                        <div className="absolute -top-6 -right-6 bg-white border border-slate-100 p-4 rounded-2xl shadow-xl animate-bounce">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Live Preview</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
