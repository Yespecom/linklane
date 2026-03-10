"use client";

import { motion } from "framer-motion";
import { Link2, Layers, Share2, ArrowRight } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            title: "Claim your page",
            domain: "linklane.app/username",
            icon: <Link2 className="h-6 w-6 text-primary" />,
            desc: "Secure your unique handle in seconds."
        },
        {
            title: "Add blocks",
            domain: "Links • Buttons • Forms",
            icon: <Layers className="h-6 w-6 text-secondary" />,
            desc: "Drag and drop anything you want to share."
        },
        {
            title: "Share everywhere",
            domain: "Instagram • Twitter • TikTok",
            icon: <Share2 className="h-6 w-6 text-accent" />,
            desc: "One link for all your platforms."
        }
    ];

    return (
        <section id="demo" className="py-24 bg-slate-950/50">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">How it works</h2>
                    <p className="mt-4 text-slate-400">Get your page live in under 2 minutes.</p>
                </div>

                <div className="relative grid gap-12 md:grid-cols-3">
                    {/* Connector Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 hidden w-full -translate-y-12 px-24 md:block">
                        <div className="h-0.5 w-full bg-slate-800" />
                    </div>

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="relative flex flex-col items-center text-center"
                        >
                            <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-sm z-10">
                                {step.icon}
                                <div className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white border border-white/10">
                                    {i + 1}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                            <p className="mt-2 text-sm text-primary font-medium">{step.domain}</p>
                            <p className="mt-2 max-w-[200px] text-sm text-slate-500">{step.desc}</p>

                            {/* Arrow (Mobile) */}
                            {i < 2 && (
                                <div className="mt-8 md:hidden">
                                    <ArrowRight className="h-6 w-6 rotate-90 text-slate-800" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
