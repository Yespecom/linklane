"use client";

import { useState, useEffect } from "react";
import { Check, X, Loader2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const RESERVED_WORDS = ["admin", "dashboard", "api", "login", "settings", "signup", "auth", "home"];

export default function UsernameInput({ variant = "hero" }: { variant?: "hero" | "cta" }) {
    const [username, setUsername] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isChecking, setIsChecking] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUsername = async () => {
            // Basic validation
            if (username.length < 3) {
                setIsValid(null);
                setMessage("");
                return;
            }

            if (username.length > 20) {
                setIsValid(false);
                setMessage("Too long (max 20)");
                return;
            }

            if (!/^[a-z0-9_]+$/.test(username)) {
                setIsValid(false);
                setMessage("Letters, numbers, underscores only");
                return;
            }

            if (RESERVED_WORDS.includes(username)) {
                setIsValid(false);
                setMessage("Username reserved");
                return;
            }

            setIsChecking(true);
            const { data, error } = await supabase
                .from("profiles")
                .select("username")
                .eq("username", username)
                .single();

            setIsChecking(false);

            if (error && error.code === "PGRST116") {
                // No results found, username is available
                setIsValid(true);
                setMessage("Available");
            } else {
                setIsValid(false);
                setMessage("Already taken");
            }
        };

        const timer = setTimeout(checkUsername, 500);
        return () => clearTimeout(timer);
    }, [username, supabase]);

    const handleClaim = () => {
        if (isValid === true) {
            router.push(`/signup?username=${username}`);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-lg">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
                {/* Input area */}
                <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all min-h-[64px]">
                    <span className="text-slate-400 font-bold text-base select-none mr-1.5 pt-0.5">linklane.app/</span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                        placeholder="yourname"
                        className="flex-1 bg-transparent px-0 outline-none text-slate-900 font-black text-lg placeholder:text-slate-300 tracking-tight pt-0.5"
                        onKeyDown={(e) => e.key === "Enter" && handleClaim()}
                    />
                    <div className="flex items-center ml-2 h-6">
                        <AnimatePresence mode="wait">
                            {isChecking && <Loader2 className="h-5 w-5 text-slate-300 animate-spin" />}
                            {!isChecking && isValid === true && <Check className="h-5 w-5 text-green-600" />}
                            {!isChecking && isValid === false && <X className="h-5 w-5 text-red-500" />}
                        </AnimatePresence>
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    onClick={handleClaim}
                    disabled={!isValid || isChecking}
                    className="rounded-2xl bg-blue-600 text-white px-8 py-4 text-sm font-black transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 whitespace-nowrap shadow-xl shadow-blue-500/20 uppercase tracking-[0.1em]"
                >
                    {variant === "hero" ? "Claim your Linklane" : "Join for free"}
                </button>
            </div>

            <div className="h-4 px-6">
                <AnimatePresence>
                    {username.length >= 3 && isValid !== null && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                            className={`text-xs font-bold uppercase tracking-widest ${isValid ? "text-blue-600" : "text-red-700"}`}
                            key={message}
                        >
                            {message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
