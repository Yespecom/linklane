"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
    Plus,
    User,
    Palette,
    Briefcase,
    Link as LinkIcon,
    Save,
    Eye,
    Loader2,
    ChevronRight,
    FileText,
    Trash2,
    GripVertical,
    Image as ImageIcon,
    Circle,
    Square,
    Moon,
    Globe,
    Zap,
    Heart,
    Cpu,
    Search,
    Instagram,
    Music,
    Upload,
    MoreHorizontal,
    Wand2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LinklaneTemplate from "@/components/templates/LinklaneTemplate";
import BrandIcon from "@/components/BrandIcon";

export default function EditorPage() {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [links, setLinks] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("profile");
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const [generatingSEO, setGeneratingSEO] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single();
                setProfile(profileData);

                const { data: linksData } = await supabase.from("links").select("*").eq("user_id", user.id).order("order", { ascending: true });
                setLinks(linksData || []);

                const { data: servicesData } = await supabase.from("services").select("*").eq("user_id", user.id).order("order", { ascending: true });
                setServices(servicesData || []);

                const { data: productsData } = await supabase.from("products").select("*").eq("user_id", user.id).order("order", { ascending: true });
                setProducts(productsData || []);
            }
            setLoading(false);
        };
        fetchData();
    }, [supabase]);

    const handleAutoSEO = async () => {
        if (!profile) return;
        
        try {
            setGeneratingSEO(true);
            const res = await fetch("/api/generate-seo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: profile.display_name,
                    title: profile.title,
                    category: profile.category,
                    location: profile.location,
                    bio: profile.bio,
                    services: services.map(s => s.title)
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to generate SEO");
            }

            const data = await res.json();
            
            setProfile({
                ...profile,
                seo_title: data.seo_title || profile.seo_title,
                seo_description: data.seo_description || profile.seo_description,
                custom_keywords: data.custom_keywords || profile.custom_keywords
            });
        } catch (error: any) {
            console.error(error);
            alert(`SEO Generation Failed: ${error.message}`);
        } finally {
            setGeneratingSEO(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user || !profile) return;

            const targetId = profile.id;

            // 1. Update Profile
            const { error: profileError } = await supabase.from("profiles").update({
                display_name: profile.display_name,
                title: profile.title,
                company: profile.company,
                bio: profile.bio,
                phone: profile.phone,
                contact_email: profile.contact_email,
                template_id: profile.template_id,
                accent_color: profile.accent_color,
                profile_shape: profile.profile_shape,
                banner_url: profile.banner_url,
                avatar_url: profile.avatar_url,
                category: profile.category,
                location: profile.location,
                seo_title: profile.seo_title,
                seo_description: profile.seo_description,
                custom_keywords: profile.custom_keywords,
                onboarded: true
            }).eq("id", targetId);

            if (profileError) throw profileError;

            // 2. Sync Links (Clean Re-sync)
            await supabase.from("links").delete().eq("user_id", targetId);
            if (links.length > 0) {
                const { error: linksError } = await supabase.from("links").insert(
                    links.map((l, i) => ({
                        user_id: targetId,
                        title: l.title,
                        url: l.url,
                        icon_url: l.icon_url,
                        order: i
                    }))
                );
                if (linksError) throw linksError;
            }

            // 3. Sync Services
            await supabase.from("services").delete().eq("user_id", targetId);
            if (services.length > 0) {
                const { error: servicesError } = await supabase.from("services").insert(
                    services.map((s, i) => ({
                        user_id: targetId,
                        title: s.title,
                        description: s.description,
                        price: s.price,
                        order: i
                    }))
                );
                if (servicesError) throw servicesError;
            }

            // 4. Sync Products
            await supabase.from("products").delete().eq("user_id", targetId);
            if (products.length > 0) {
                const { error: productsError } = await supabase.from("products").insert(
                    products.map((p, i) => ({
                        user_id: targetId,
                        title: p.title,
                        price: p.price,
                        buy_link: p.buy_link,
                        image_url: p.image_url,
                        order: i
                    }))
                );
                if (productsError) throw productsError;
            }

            alert("Identity Published Successfully! 🚀");
        } catch (err: any) {
            console.error("Publishing failure:", err);
            alert(`Unable to update: ${err.message || 'Unknown error'}. Please ensure you ran the latest SQL for tables.`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
    );

    const tabs = [
        { id: "profile", label: "Identity", icon: User },
        { id: "appearance", label: "Styling", icon: Palette },
        { id: "services", label: "Services", icon: Briefcase },
        { id: "links", label: "Links", icon: LinkIcon },
        { id: "seo", label: "SEO", icon: Search }
    ];

    const accentThemes = [
        { id: "#3B82F6", label: "Corporate" },
        { id: "#F43F5E", label: "Creative" },
        { id: "#10B981", label: "Vibrant" },
        { id: "#8B5CF6", label: "Premium" },
        { id: "#000000", label: "Sleek" }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 p-4 backdrop-blur-xl lg:p-6">
                <div className="flex items-center justify-between mx-auto max-w-7xl">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">Identity Suite</h1>
                        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                            {profile?.username}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-black text-white shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50">
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Publish
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-[minmax(0,720px)_400px] gap-8 lg:justify-center w-full">
                <div className="flex flex-col gap-6">
                    {/* Multi-Tab Navigation */}
                    <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-full overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:bg-slate-50"}`}>
                                <tab.icon className="h-4 w-4 shrink-0" /> {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[600px]">
                        <AnimatePresence mode="wait">
                            {activeTab === "profile" && (
                                <motion.div key="profile" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4"><label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label><input value={profile?.display_name || ""} onChange={(e) => setProfile({ ...profile, display_name: e.target.value })} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-500/5 transition-all" placeholder="E.g. Srinithin S" /></div>
                                        <div className="space-y-4"><label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Title</label><input value={profile?.title || ""} onChange={(e) => setProfile({ ...profile, title: e.target.value })} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-500/5 transition-all" placeholder="Founder & Dev" /></div>
                                        <div className="space-y-4"><label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone (WhatsApp)</label><input value={profile?.phone || ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-500/5 transition-all" placeholder="+91 123..." /></div>
                                        <div className="space-y-4"><label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email</label><input value={profile?.contact_email || ""} onChange={(e) => setProfile({ ...profile, contact_email: e.target.value })} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-500/5 transition-all" placeholder="hi@example.com" /></div>
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Avatar / Logo</label>
                                            <div className="flex items-center gap-4">
                                                <div className={`h-16 w-16 ${profile?.profile_shape || "rounded-2xl"} bg-slate-100 overflow-hidden border border-slate-200`}>
                                                    {profile?.avatar_url && <img src={profile.avatar_url} className="w-full h-full object-cover" />}
                                                </div>
                                                <label className="flex-1">
                                                    <div className="flex items-center justify-center h-16 border-2 border-dashed border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer transition-all disabled:opacity-50">
                                                        <div className="flex flex-col items-center">
                                                            {uploadingAvatar ? (
                                                                <Loader2 className="h-5 w-5 text-blue-600 animate-spin mb-1" />
                                                            ) : (
                                                                <ImageIcon className="h-5 w-5 text-slate-400 mb-1" />
                                                            )}
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                                {uploadingAvatar ? "Uploading..." : "Upload New"}
                                                            </span>
                                                        </div>
                                                        <input type="file" className="hidden" accept="image/*" disabled={uploadingAvatar}
                                                            onChange={async (e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file && profile?.id) {
                                                                    setUploadingAvatar(true);
                                                                    try {
                                                                        const path = `${profile.id}/avatar-${Date.now()}.${file.name.split('.').pop()}`;
                                                                        const { data, error } = await supabase.storage.from('media').upload(path, file);
                                                                        if (error) throw error;
                                                                        if (data) {
                                                                            const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(path);
                                                                            setProfile({ ...profile, avatar_url: publicUrl });
                                                                        }
                                                                    } catch (err: any) {
                                                                        alert(`Upload failed: ${err.message || "Unknown error"}. Ensure 'media' bucket exists in Supabase Storage.`);
                                                                    } finally {
                                                                        setUploadingAvatar(false);
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4"><label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Bio</label><textarea value={profile?.bio || ""} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={3} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-900 transition-all resize-none" placeholder="Short bio..." /></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Category</label>
                                            <input
                                                value={profile?.category || ""}
                                                onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                                                className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-500/5 transition-all"
                                                placeholder="e.g. Design, Marketing, Fitness"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Location</label>
                                            <input
                                                value={profile?.location || ""}
                                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                                className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-500/5 transition-all"
                                                placeholder="e.g. Coimbatore, India"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}



                            {activeTab === "appearance" && (
                                <motion.div key="appearance" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-12">
                                    <div className="flex flex-col gap-1 mb-2">
                                        <h3 className="text-2xl font-black text-slate-900">Fine-tune Brand</h3>
                                        <p className="text-sm font-bold text-slate-400">Customize colors and shapes to match your brand vibe.</p>
                                    </div>
                                    <div className="space-y-10">
                                        <div className="space-y-6">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Identity Color Vibe</h3>
                                            <div className="flex gap-4">
                                                {accentThemes.map(theme => (
                                                    <button key={theme.id} onClick={() => setProfile({ ...profile, accent_color: theme.id })}
                                                        className={`h-12 w-12 rounded-full border-2 transition-all flex items-center justify-center p-0.5 ${profile.accent_color === theme.id ? "border-slate-900 ring-4 ring-slate-100" : "border-transparent"}`}>
                                                        <div className="h-full w-full rounded-full" style={{ backgroundColor: theme.id }} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Profile Shape</h3>
                                            <div className="flex gap-4">
                                                <button onClick={() => setProfile({ ...profile, profile_shape: "rounded-[3rem]" })}
                                                    className={`h-14 w-14 rounded-full border-2 flex items-center justify-center transition-all ${profile.profile_shape?.includes('rounded-[3') ? "border-slate-900 text-slate-900 bg-white" : "border-slate-200 text-slate-400 bg-slate-50"}`}><Circle className="h-6 w-6" /></button>
                                                <button onClick={() => setProfile({ ...profile, profile_shape: "rounded-3xl" })}
                                                    className={`h-14 w-14 rounded-2xl border-2 flex items-center justify-center transition-all ${profile.profile_shape === "rounded-3xl" ? "border-slate-900 text-slate-900 bg-white" : "border-slate-200 text-slate-400 bg-slate-50"}`}><Square className="h-6 w-6" /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 border-t border-slate-100 pt-10">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Banner Image / Cover Hero</label>
                                        <div className="flex gap-4">
                                            <div className="h-16 w-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative group shadow-sm">
                                                {profile.banner_url ? (
                                                    <>
                                                        <img src={profile.banner_url} className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={() => setProfile({ ...profile, banner_url: null })}
                                                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <div className="flex flex-col items-center gap-1">
                                                                <Trash2 className="h-4 w-4 text-white" />
                                                                <span className="text-[8px] font-black uppercase text-white tracking-widest">Remove</span>
                                                            </div>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <ImageIcon className="h-5 w-5 text-slate-300" />
                                                    </div>
                                                )}
                                            </div>
                                            <label className="flex-1">
                                                <div className="flex items-center justify-center h-16 border-2 border-dashed border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer transition-all disabled:opacity-50">
                                                    <div className="flex flex-col items-center">
                                                        {uploadingBanner ? (
                                                            <Loader2 className="h-5 w-5 text-blue-600 animate-spin mb-1" />
                                                        ) : (
                                                            <ImageIcon className="h-5 w-5 text-slate-400 mb-1" />
                                                        )}
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                            {uploadingBanner ? "Uploading..." : "Upload Cover"}
                                                        </span>
                                                    </div>
                                                    <input type="file" className="hidden" accept="image/*" disabled={uploadingBanner}
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file && profile?.id) {
                                                                setUploadingBanner(true);
                                                                try {
                                                                    const path = `${profile.id}/banner-${Date.now()}.${file.name.split('.').pop()}`;
                                                                    const { data, error } = await supabase.storage.from('media').upload(path, file);
                                                                    if (error) throw error;
                                                                    if (data) {
                                                                        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(path);
                                                                        setProfile({ ...profile, banner_url: publicUrl });
                                                                    }
                                                                } catch (err: any) {
                                                                    alert(`Upload failed: ${err.message || "Unknown error"}. Ensure 'media' bucket exists in Supabase Storage.`);
                                                                } finally {
                                                                    setUploadingBanner(false);
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* ... Services, Products, Links stay largely the same but stylized */}
                            {activeTab === "services" && <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <div className="flex justify-between items-center"><h3 className="text-xl font-black text-slate-900">Services</h3><button onClick={() => setServices([...services, { title: "New Service", price: "499" }])} className="text-blue-600 font-black text-[10px] uppercase tracking-widest">+ Add</button></div>
                                {services.map((s, idx) => (
                                    <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 relative group">
                                        <button onClick={() => setServices(services.filter((_, i) => i !== idx))} className="absolute top-4 right-4 text-slate-300 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <input value={s.title} onChange={(e) => { const n = [...services]; n[idx].title = e.target.value; setServices(n); }} className="px-4 py-3 bg-white border border-slate-100 rounded-xl text-sm font-bold" placeholder="Service Name" />
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                                <input value={s.price} onChange={(e) => { const n = [...services]; n[idx].price = e.target.value; setServices(n); }} className="w-full pl-8 pr-4 py-3 bg-white border border-slate-100 rounded-xl text-sm font-bold" placeholder="Price" />
                                            </div>
                                        </div>
                                        <textarea value={s.description} onChange={(e) => { const n = [...services]; n[idx].description = e.target.value; setServices(n); }} className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-sm font-medium h-20 resize-none" placeholder="Description..." />
                                    </div>
                                ))}
                            </motion.div>}


                            {activeTab === "links" && <motion.div key="links" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-xl font-black text-slate-900">Social Connections</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Add your digital touchpoints with high-impact icons.</p>
                                    </div>
                                    <button onClick={() => setLinks([...links, { title: "New Link", url: "https://", icon_url: null }])} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-100 transition-all">+ Add Connection</button>
                                </div>

                                <div className="space-y-4">
                                    {links.map((l, idx) => (
                                        <div key={idx} className="flex flex-col gap-4 p-6 border border-slate-100 bg-slate-50 rounded-[2rem] relative group group-hover:bg-white transition-all shadow-sm">
                                            <button onClick={() => setLinks(links.filter((_, i) => i !== idx))} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors z-10"><Trash2 className="h-5 w-5" /></button>
                                            <div className="flex items-start gap-4 pr-10">
                                                <div className="h-12 w-12 flex items-center justify-center bg-white rounded-xl border border-slate-100 shrink-0 shadow-sm relative overflow-hidden group/icon mt-1">
                                                    {l.icon_url ? (
                                                        <img src={l.icon_url} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <BrandIcon url={l.url} className="h-5 w-5" />
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
                                                        <input value={l.title} onChange={(e) => { const n = [...links]; n[idx].title = e.target.value; setLinks(n); }} className="bg-white border border-slate-100 px-4 py-3 rounded-xl text-sm font-bold w-full min-w-0" placeholder="Label (e.g. My Website)" />
                                                        <input value={l.url} onChange={(e) => { const n = [...links]; n[idx].url = e.target.value; setLinks(n); }} className="bg-white border border-slate-100 px-4 py-3 rounded-xl text-sm font-bold w-full text-blue-600 min-w-0" placeholder="https://..." />
                                                    </div>

                                                    {/* Quick Presets */}
                                                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full relative">
                                                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest shrink-0">Presets:</span>
                                                        {[
                                                            { name: "WhatsApp", url: "https://wa.me/..." },
                                                            { name: "Instagram", url: "https://instagram.com/..." },
                                                            { name: "LinkedIn", url: "https://linkedin.com/..." },
                                                            { name: "YouTube", url: "https://youtube.com/..." },
                                                            { name: "TikTok", url: "https://tiktok.com/@..." },
                                                            { name: "Spotify", url: "https://open.spotify.com/..." },
                                                            { name: "Apple M.", url: "https://music.apple.com/..." },
                                                            { name: "X", url: "https://x.com/..." },
                                                            { name: "GitHub", url: "https://github.com/..." },
                                                            { name: "Facebook", url: "https://facebook.com/..." },
                                                            { name: "Website", url: "https://" }
                                                        ].map(preset => (
                                                            <button
                                                                key={preset.name}
                                                                onClick={() => { const n = [...links]; n[idx].title = preset.name; n[idx].url = preset.url; setLinks(n); }}
                                                                className="px-3 py-1.5 bg-white border border-slate-100 rounded-full text-[9px] font-black uppercase text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shrink-0"
                                                            >
                                                                {preset.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {links.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50">
                                        <LinkIcon className="h-10 w-10 text-slate-200 mb-4" />
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No connections yet</p>
                                    </div>
                                )}
                            </motion.div>}
                            {activeTab === "seo" && (
                                <motion.div key="seo" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-12">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-2xl font-black text-slate-900">SEO Suite</h3>
                                            <p className="text-sm font-bold text-slate-400">Optimize how you appear in Google and social search results.</p>
                                        </div>
                                        <button 
                                            onClick={handleAutoSEO}
                                            disabled={generatingSEO}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-xs font-black text-blue-600 hover:bg-blue-100 hover:scale-105 active:scale-95 transition-all w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {generatingSEO ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                                            {generatingSEO ? 'Generating...' : 'Auto-Generate'}
                                        </button>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between ml-1">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Custom Page Title</label>
                                                <span className="text-[10px] font-bold text-slate-300">Recommended: 50-60 chars</span>
                                            </div>
                                            <input
                                                value={profile?.seo_title || ""}
                                                onChange={(e) => setProfile({ ...profile, seo_title: e.target.value })}
                                                className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
                                                placeholder="e.g. Srinithin | Top-Rated Web Developer in Coimbatore"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between ml-1">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Meta Description</label>
                                                <span className="text-[10px] font-bold text-slate-300">Recommended: 150-160 chars</span>
                                            </div>
                                            <textarea
                                                value={profile?.seo_description || ""}
                                                onChange={(e) => setProfile({ ...profile, seo_description: e.target.value })}
                                                rows={4}
                                                className="w-full rounded-3xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-900 transition-all outline-none resize-none"
                                                placeholder="Describe your offerings to attract clicks from search results..."
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Keywords (Comma Separated)</label>
                                            <input
                                                value={profile?.custom_keywords || ""}
                                                onChange={(e) => setProfile({ ...profile, custom_keywords: e.target.value })}
                                                className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
                                                placeholder="javascript, design, development, freelance"
                                            />
                                        </div>
                                    </div>

                                    {/* SEO Preview Card */}
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                                        <div className="flex items-center gap-2 mb-6">
                                            <Globe className="h-4 w-4 text-blue-600" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Google Preview</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-blue-700 text-xl font-medium hover:underline cursor-pointer truncate">
                                                {profile?.seo_title || `${profile?.display_name} | ${profile?.title || 'Professional'} | Linklane`}
                                            </div>
                                            <div className="text-green-800 text-sm mb-1 truncate">
                                                https://linklane.in/{profile?.username}
                                            </div>
                                            <div className="text-slate-600 text-sm line-clamp-2">
                                                {profile?.seo_description || `${profile?.display_name} offers professional ${profile?.title || 'expert'} services. Read reviews and discover my work on Linklane.`}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="hidden lg:block sticky top-32 h-[calc(100vh-160px)]">
                    <div className="relative mx-auto w-full max-w-[320px]">
                        <div className="relative aspect-[9/18.5] rounded-[3.5rem] border-[10px] border-slate-900 bg-slate-900 p-2 shadow-2xl">
                            <div className="h-full w-full overflow-hidden rounded-[2.5rem] bg-white flex flex-col pt-8 overflow-y-auto no-scrollbar">
                                {/* Live Template Preview */}
                                <div className="scale-[0.85] origin-top w-full">
                                    <LinklaneTemplate
                                        profile={profile}
                                        links={links}
                                        services={services}
                                        products={products}
                                        reviews={[]}
                                        username={profile?.username || "preview"}
                                        otherLanes={[]}
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Template Logic Active</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
