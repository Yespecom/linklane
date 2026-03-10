"use client";

import { BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function VerifiedBadge({ size = "md", className = "" }: { size?: "sm" | "md" | "lg", className?: string }) {
    const sizeClasses = {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5"
    };

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`inline-flex items-center justify-center text-blue-600 ${className}`}
            title="Verified Profile"
        >
            <BadgeCheck className={`${sizeClasses[size]} fill-blue-600 text-white`} strokeWidth={2.5} />
        </motion.div>
    );
}
