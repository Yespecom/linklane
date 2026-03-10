"use client";

import { motion } from "framer-motion";

export default function SocialProof() {
    const logos = [
        "Designers", "Developers", "Coaches", "Writers", "Artists",
        "Musicians", "Podcasters", "Freelancers", "Startups", "Creators"
    ];

    return (
        <div className="w-full overflow-hidden py-10 border-y border-white/5 bg-slate-950/20">
            <div className="flex whitespace-nowrap">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-16 items-center"
                >
                    {[...logos, ...logos].map((logo, i) => (
                        <span
                            key={i}
                            className="text-2xl font-bold tracking-tighter text-slate-800 transition-colors hover:text-slate-200 cursor-default uppercase"
                        >
                            {logo}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
