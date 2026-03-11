"use client";

import { motion } from "framer-motion";
import LinktreeNavbar from "@/components/LinktreeNavbar";
import { Send, Mail, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600 selection:text-white">
            <LinktreeNavbar />

            <main className="pt-32 pb-20">
                <section className="mx-auto max-w-7xl px-8 md:px-12 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    Support Alpha
                                </div>
                                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-[0.9]">
                                    Connect with the<br /><span className="text-blue-500">Frontier.</span>
                                </h1>
                                <p className="text-xl font-bold text-slate-500 max-w-lg leading-relaxed">
                                    Our support teams are active across the digital collective. Reach out for elite inquiries or technical synchronization.
                                </p>
                            </div>

                            <div className="space-y-10">
                                {[
                                    { label: "Direct Support", value: "hello@linklane.in", icon: Mail },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-8 group cursor-pointer">
                                        <div className="h-16 w-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all group-hover:rotate-6">
                                            <item.icon className="h-7 w-7 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{item.label}</p>
                                            <p className="text-2xl font-black tracking-tight group-hover:text-blue-400 transition-colors">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full" />
                            <form
                                className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 space-y-10"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const fd = new FormData(e.currentTarget);
                                    window.location.href = `mailto:hello@linklane.in?subject=Contact%20Inquiry:%20${encodeURIComponent(fd.get('name') as string)}&body=${encodeURIComponent(fd.get('message') as string)}%0A%0A---%0AReply%20To:%20${encodeURIComponent(fd.get('email') as string)}`;
                                }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                                        <input required name="name" type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-blue-500/50 transition-all" placeholder="Enter name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                                        <input required name="email" type="email" className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-blue-500/50 transition-all" placeholder="Enter email" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Message</label>
                                    <textarea required name="message" rows={4} className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-blue-500/50 transition-all resize-none" placeholder="How can we help?" />
                                </div>
                                <button type="submit" className="w-full py-6 bg-blue-600 text-white rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 hover:bg-white hover:text-slate-950 transition-all group active:scale-95">
                                    Send Message <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </section>
            </main>

            <footer className="mx-auto max-w-7xl px-8 py-20 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform group">
                    <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                        <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_#fff] animate-pulse" />
                    </div>
                    <div className="flex flex-col -gap-1">
                        <span className="text-xl font-black tracking-tighter text-white leading-tight">Linklane</span>
                        <span className="text-[7px] font-black uppercase tracking-[0.3em] text-blue-400/60 leading-none pl-0.5">Professional Hub</span>
                    </div>
                </Link>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">powered by yesp corporation</p>
            </footer>
        </div>
    );
}
