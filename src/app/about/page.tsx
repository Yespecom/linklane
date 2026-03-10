"use client";

import { motion } from "framer-motion";
import LinktreeNavbar from "@/components/LinktreeNavbar";
import { Zap, Shield, Globe, Users, Heart, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white">
            <LinktreeNavbar />

            <main className="pt-32 pb-20">
                {/* Hero section */}
                <section className="mx-auto max-w-7xl px-8 md:px-12 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                            Our Mission
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-[0.9]">
                            Beyond the<br /><span className="text-blue-600">Digital Handshake.</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Linklane is re-imagining how high-performance individuals and institutions connect in a decentralized world.
                        </p>
                    </motion.div>
                </section>

                {/* Values section */}
                <section className="mx-auto max-w-7xl px-8 md:px-12 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Radical Integrity", icon: Shield, desc: "We build systems that prioritize truth and verified performance above all else." },
                            { title: "Institutional Quality", icon: Zap, iconColor: "text-blue-600", desc: "Every line of code is engineered for the highest standards of the global elite." },
                            { title: "Human Centric", icon: Heart, iconColor: "text-rose-500", desc: "Technology should fade away, leaving only the power of human connection." },
                            { title: "Global Vision", icon: Globe, iconColor: "text-indigo-600", desc: "A unified platform for the digital frontier, spanning across continents." },
                            { title: "Verified Trust", icon: Target, iconColor: "text-emerald-500", desc: "Building a collective where every interaction is backed by verified data." },
                            { title: "Community Driven", icon: Users, iconColor: "text-amber-500", desc: "Powered by a global collective of creators, builders, and visionaries." }
                        ].map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:scale-[1.02] transition-transform"
                            >
                                <div className={`h-14 w-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm ${v.iconColor || "text-blue-600"}`}>
                                    <v.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{v.title}</h3>
                                <p className="text-lg font-bold text-slate-500 leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Corporate Status */}
                <section className="mx-auto max-w-3xl px-8 py-20 text-center space-y-12">
                    <div className="h-px w-full bg-slate-100" />
                    <div className="space-y-4">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">A Subsidiary of</p>
                        <h2 className="text-4xl font-black uppercase tracking-tight">YESP CORPORATION</h2>
                        <p className="text-slate-500 font-bold leading-relaxed">
                            Established to pioneer the next generation of identity infrastructure.
                            Linklane operates as the flagship professional discovery platform within the YESP ecosystem.
                        </p>
                    </div>
                </section>
            </main>

            {/* Simple Footer */}
            <footer className="mx-auto max-w-7xl px-8 py-20 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform group">
                    <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                        <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_#fff] animate-pulse" />
                    </div>
                    <div className="flex flex-col -gap-1">
                        <span className="text-xl font-black tracking-tighter text-slate-900 leading-tight">Linklane</span>
                        <span className="text-[7px] font-black uppercase tracking-[0.3em] text-blue-600/60 leading-none pl-0.5">Professional Hub</span>
                    </div>
                </Link>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">powered by yesp corporation</p>
            </footer>
        </div>
    );
}
