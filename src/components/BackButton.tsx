"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackButton() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show if the user came from the /explore page
        if (typeof document !== 'undefined' && document.referrer.includes('/explore')) {
            setIsVisible(true);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="fixed top-8 left-8 z-[200] flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-900/5 group"
        >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back
        </motion.button>
    );
}
