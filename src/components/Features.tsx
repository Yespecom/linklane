"use client";

import { motion } from "framer-motion";
import { MousePointer2, Target, Globe } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function Features() {
    const features = [
        {
            title: "Drag & Drop Builder",
            desc: "Arrange your page blocks effortlessly. No coding, no design skills needed.",
            icon: <MousePointer2 className="h-8 w-8 text-primary" />,
            color: "from-primary/10",
        },
        {
            title: "Conversion Focused",
            desc: "Turn visitors into leads and actions. Optimized for high engagement.",
            icon: <Target className="h-8 w-8 text-secondary" />,
            color: "from-secondary/10",
        },
        {
            title: "One Link Everywhere",
            desc: "Use your Linklane across all platforms. Instagram, Twitter, YouTube, and more.",
            icon: <Globe className="h-8 w-8 text-accent" />,
            color: "from-accent/10",
        }
    ];

    return (
        <section id="features" className="py-24 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-sm p-8 group hover:border-white/20 transition-all duration-500">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
