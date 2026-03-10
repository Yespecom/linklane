"use client";

import { motion } from "framer-motion";
import UsernameInput from "./UsernameInput";

export default function FinalCTA() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary to-secondary p-12 text-center shadow-2xl"
                >
                    {/* Decorative background circles */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

                    <div className="relative z-10 flex flex-col items-center gap-8">
                        <h2 className="text-4xl font-extrabold text-white sm:text-6xl">
                            Claim your Linklane today
                        </h2>
                        <p className="max-w-2xl text-lg text-white/80 sm:text-xl">
                            Thousands of creators are already using Linklane to build their digital presence. Join them and get your page live in seconds.
                        </p>

                        <div className="w-full flex justify-center">
                            <UsernameInput variant="cta" />
                        </div>

                        <p className="text-sm font-medium text-white/60">
                            Free forever. No credit card required.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
