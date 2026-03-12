"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Lanes", href: "/lanes" },
        { name: "Features", href: "/#features" },
        { name: "Demo", href: "/#demo" },
        { name: "Pricing", href: "/#pricing" },
    ];

    const supabase = createClient();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();
    }, []);

    return (
        <header className="fixed top-0 z-[100] w-full px-6 py-4 transition-all duration-500">
            <nav
                className={`mx-auto flex max-w-7xl items-center justify-between transition-all duration-500 ${isScrolled
                        ? "rounded-full border border-white/10 bg-slate-950/60 px-6 py-3 backdrop-blur-xl shadow-2xl"
                        : "bg-transparent px-2 py-2"
                    }`}
            >
                {/* Logo */}
                <motion.a
                    href="/"
                    className="flex items-center gap-2 group"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary p-[1px]">
                        <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950 transition-colors group-hover:bg-transparent">
                            <div className="h-4 w-4 rounded-full bg-white shadow-[0_0_10px_white]" />
                        </div>
                    </div>
                    <span className="text-xl font-black tracking-tighter text-white">Linklane</span>
                </motion.a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-sm font-bold text-slate-400 transition-all hover:text-white relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all group-hover:w-full" />
                        </motion.a>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <Link href="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-black text-slate-950 shadow-lg shadow-white/5 transition-all hover:bg-slate-100"
                            >
                                Dashboard
                                <ArrowRight className="h-4 w-4" />
                            </motion.button>
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-bold text-slate-400 transition-colors hover:text-white">
                                Login
                            </Link>
                            <Link href="/claim">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-black text-slate-950 shadow-lg shadow-white/5 transition-all hover:bg-slate-100"
                                >
                                    Claim Page
                                    <ArrowRight className="h-4 w-4" />
                                </motion.button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute left-6 right-6 top-24 rounded-3xl border border-white/10 bg-slate-950/90 p-8 backdrop-blur-2xl shadow-2xl md:hidden z-50"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-white transition-colors hover:text-primary"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="my-2 h-[1px] w-full bg-white/5" />
                            {user ? (
                                <Link
                                    href="/dashboard"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 rounded-2xl bg-white py-4 text-lg font-black text-slate-950"
                                >
                                    Dashboard
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-left text-lg font-bold text-slate-400"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/claim"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-center gap-2 rounded-2xl bg-white py-4 text-lg font-black text-slate-950"
                                    >
                                        Claim Page
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
