"use client";

import Link from "next/link";
import { CheckCircle2, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

export default function VerifiedPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-200 border border-slate-100 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 mb-6">
                        <CheckCircle2 className="h-10 w-10 text-blue-600" />
                    </div>
                    
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Email Verified!</h1>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Your email address has been successfully verified. Your account is now fully active and you're ready to build your linklane.
                        </p>
                    </div>

                    <Link
                        href="/dashboard"
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Go to Dashboard
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
