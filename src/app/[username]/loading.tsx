"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6"
            >
                {/* Custom Premium Loader */}
                <div className="relative h-16 w-16">
                    <motion.div 
                        animate={{ 
                            rotate: 360,
                            borderRadius: ["20%", "50%", "20%"]
                        }}
                        transition={{ 
                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                            borderRadius: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute inset-0 border-4 border-blue-600/10 border-t-blue-600 shadow-xl"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                    </div>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">
                        Synchronizing Identity
                    </span>
                    <div className="h-0.5 w-12 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="h-full w-full bg-blue-600"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
