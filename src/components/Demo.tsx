"use client";

import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import PhoneMockup from "./PhoneMockup";

export default function Demo() {
    return (
        <section id="demo" className="py-24 bg-slate-900/30">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left: Text */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-4xl font-bold text-white leading-tight">
                            Experience the <br />
                            <span className="gradient-text">Linklane magic</span>
                        </h2>
                        <p className="text-lg text-slate-400">
                            See how a real bio page looks and interacts. Our pages are designed to be lightning fast and mobile-native.
                        </p>

                        <div className="flex flex-col gap-4">
                            {[
                                "Custom brand colors",
                                "Embedded lead forms",
                                "Social media integration",
                                "Real-time analytics"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] text-white">✓</div>
                                    <span className="text-slate-300 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <button className="mt-4 flex max-w-fit items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-bold text-white border border-white/20 hover:bg-white/20 transition-all">
                            <Play className="h-4 w-4 fill-white" />
                            Watch Demo Video
                        </button>
                    </div>

                    {/* Right: Interactive Card/Mockup */}
                    <div className="relative">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="glass-card overflow-hidden p-6"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="h-10 w-10 rounded-full bg-slate-800 bg-cover"
                                        style={{ backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=demo')` }}
                                    />
                                    <div>
                                        <p className="text-sm font-bold text-white">Demo Creator</p>
                                        <p className="text-xs text-primary">linklane.in/demo</p>
                                    </div>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white hover:bg-white/10 cursor-pointer">
                                    <ExternalLink className="h-4 w-4" />
                                </div>
                            </div>

                            {/* Phone Mockup Inside */}
                            <div className="scale-90 origin-top">
                                <PhoneMockup />
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-1/2 -right-4 h-32 w-1 bg-gradient-to-b from-primary to-transparent rounded-full" />
                            <div className="absolute bottom-1/4 -left-4 h-24 w-1 bg-gradient-to-t from-secondary to-transparent rounded-full" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
