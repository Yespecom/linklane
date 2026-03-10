"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function CreatorExamples() {
    const examples = [
        { name: "Dev Raj", handle: "devraj", color: "from-blue-500", avatar: "devraj" },
        { name: "Coach Mia", handle: "coachmia", color: "from-pink-500", avatar: "coachmia" },
        { name: "Design Lab", handle: "designlab", color: "from-amber-500", avatar: "designlab" },
        { name: "Tech Talk", handle: "techtalk", color: "from-emerald-500", avatar: "techtalk" },
        { name: "Fit Life", handle: "fitlife", color: "from-indigo-500", avatar: "fitlife" },
        { name: "Chef Jo", handle: "chefjo", color: "from-orange-500", avatar: "chefjo" },
    ];

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Join the creators</h2>
                    <p className="mt-4 text-slate-400">See how others are using Linklane to grow their brand.</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {examples.map((example, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <SpotlightCard className="group relative cursor-pointer rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/20">
                                <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${example.color} to-transparent opacity-30 group-hover:opacity-100 transition-opacity`} />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="h-12 w-12 rounded-full border-2 border-white/10 bg-slate-800 bg-cover transition-transform group-hover:scale-110"
                                            style={{ backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=${example.avatar}')` }}
                                        />
                                        <div>
                                            <h3 className="font-bold text-white transition-colors group-hover:text-primary">{example.name}</h3>
                                            <p className="text-sm text-slate-500">linklane.in/{example.handle}</p>
                                        </div>
                                    </div>
                                    <div className="rounded-full bg-white/5 p-2 text-slate-500 transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-12">
                                        <ExternalLink className="h-4 w-4" />
                                    </div>
                                </div>

                                {/* Mock content lines */}
                                <div className="mt-6 space-y-3">
                                    <div className="h-4 w-full rounded-full bg-white/5 group-hover:bg-white/10 transition-colors" />
                                    <div className="h-4 w-3/4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors" />
                                </div>

                                <div className="mt-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-600 transition-colors group-hover:text-slate-400">
                                    <span>View Page</span>
                                    <span className="h-1 w-8 rounded-full bg-slate-800 transition-all group-hover:w-16 group-hover:bg-primary" />
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

