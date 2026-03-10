"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, Mail, ChevronRight, Send } from "lucide-react";

export default function PhoneMockup() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative mx-auto w-full max-w-[300px]">
            {/* Phone Case */}
            <div className="relative aspect-[9/19] rounded-[3rem] border-8 border-slate-800 bg-slate-900 p-3 shadow-2xl">
                {/* Screen */}
                <div className="h-full w-full overflow-hidden rounded-[2.2rem] bg-white text-slate-900">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col items-center px-6 py-8"
                    >
                        {/* Profile */}
                        <motion.div variants={item} className="mb-6 flex flex-col items-center">
                            <div className="mb-3 h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                                <div
                                    className="h-full w-full rounded-full bg-white bg-cover"
                                    style={{ backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=srinithin')` }}
                                />
                            </div>
                            <h3 className="text-lg font-bold">@srinithin</h3>
                            <p className="text-center text-[10px] font-medium text-slate-500">Full-stack Developer & Creator</p>
                        </motion.div>

                        {/* Primary Action */}
                        <motion.button
                            variants={item}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mb-6 w-full rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                        >
                            Book a Consultation
                            <ChevronRight className="h-3 w-3" />
                        </motion.button>

                        {/* Links */}
                        <div className="mb-6 flex w-full flex-col gap-3">
                            {[
                                { icon: <Instagram className="h-4 w-4" />, label: "Instagram", color: "#E4405F" },
                                { icon: <Twitter className="h-4 w-4" />, label: "Twitter", color: "#1DA1F2" },
                                { icon: <Youtube className="h-4 w-4" />, label: "YouTube", color: "#FF0000" },
                            ].map((link, i) => (
                                <motion.a
                                    key={i}
                                    variants={item}
                                    whileHover={{ x: 5 }}
                                    href="#"
                                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 text-[11px] font-semibold transition-colors hover:bg-slate-50 shadow-sm"
                                >
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: `${link.color}20`, color: link.color }}>
                                        {link.icon}
                                    </div>
                                    <span className="flex-1">{link.label}</span>
                                    <ChevronRight className="h-3 w-3 text-slate-300" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Lead Form */}
                        <motion.div variants={item} className="w-full rounded-2xl bg-slate-50 p-4 border border-slate-100">
                            <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Join my newsletter</h4>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="flex-1 bg-white p-2 text-[10px] outline-none rounded-lg border border-slate-200"
                                />
                                <button className="rounded-lg bg-slate-900 p-2 text-white shadow-md">
                                    <Send className="h-3 w-3" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Phone Elements */}
                <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-800" />
            </div>
        </div>
    );
}
