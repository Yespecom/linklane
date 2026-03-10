"use client";

import { motion } from "framer-motion";
import UsernameInput from "./UsernameInput";
import PhoneMockup from "./PhoneMockup";

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
            <div className="absolute top-40 -left-20 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]" />

            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Content */}
                    <div className="flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
                                Your links deserve <br />
                                <span className="gradient-text">their own lane</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="max-w-xl text-lg text-slate-400 sm:text-xl leading-relaxed"
                        >
                            Create a beautiful page for your links, content, and leads. <br className="hidden sm:block" />
                            Share one link everywhere.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative z-10"
                        >
                            <UsernameInput />
                            <p className="mt-4 text-sm text-slate-500">
                                Example: <span className="text-primary font-medium">linklane.in/srinithin</span>
                            </p>
                        </motion.div>

                        {/* Social Proof Badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="mt-4 flex items-center gap-4"
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-800 bg-cover"
                                        style={{ backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}')` }}
                                    />
                                ))}
                            </div>
                            <p className="text-sm font-medium text-slate-400">
                                Used by <span className="text-white">1,000+ creators</span>
                            </p>
                        </motion.div>
                    </div>

                    {/* Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotateY: -10 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="perspective-1000 relative"
                    >
                        <div className="glow absolute inset-0 -z-10 rounded-[3rem] opacity-20" />
                        <PhoneMockup />

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="glass-card absolute -bottom-10 -left-10 p-4 shadow-2xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                                    <span className="text-accent text-lg">✓</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white">Lead Collected</p>
                                    <p className="text-[10px] text-slate-400">2 minutes ago</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
