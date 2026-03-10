"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, ChevronRight } from "lucide-react";

export default function LinktreeNavbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    const navY = useTransform(scrollY, [0, 100], [32, 16]);
    const navScale = useTransform(scrollY, [0, 100], [1, 0.95]);

    const navItems = [
        { label: "Explore", href: "/explore", hot: true },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" }
    ];

    return (
        <>
            <motion.nav
                style={{ top: navY, scale: navScale }}
                className={`fixed left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl transition-all duration-500`}
            >
                <div className={`
                    relative px-6 lg:px-10 py-4 flex items-center justify-between transition-all duration-500 rounded-[3.5rem]
                    ${isScrolled
                        ? "bg-white/80 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/50"
                        : "bg-white shadow-sm border border-slate-100"
                    }
                `}>
                    <div className="flex items-center gap-12">
                        {/* Logo Section */}
                        <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform group">
                            <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                                <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_#fff] animate-pulse" />
                            </div>
                            <div className="flex flex-col -gap-1">
                                <span className="text-2xl font-black tracking-tighter text-slate-900 leading-tight">Linklane</span>
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-600/60 leading-none pl-0.5">Professional Hub</span>
                            </div>
                        </Link>

                        {/* Desktop Nav Items */}
                        <div className="hidden lg:flex items-center gap-10">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="relative text-sm font-black text-slate-500 hover:text-slate-1000 transition-colors py-2 group"
                                >
                                    {item.label}
                                    {item.hot && (
                                        <span className="absolute -top-3 -right-2 px-1.5 py-0.5 bg-blue-600 text-[6px] font-black text-white rounded-full uppercase tracking-tighter">New</span>
                                    )}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-6">
                        <Link
                            href="/login"
                            className="hidden sm:inline-flex text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-950 transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/claim"
                            className="hidden lg:relative lg:group bg-slate-900 text-white px-10 py-5 rounded-[2.5rem] text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl hover:shadow-blue-600/20 active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10">Create New Account</span>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transition-all group-hover:h-full" />
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden h-12 w-12 rounded-full bg-slate-950 text-white flex items-center justify-center active:scale-95 transition-all shadow-xl shadow-slate-900/10"
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                    >
                                        <X className="h-5 w-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ opacity: 0, rotate: 90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: -90 }}
                                    >
                                        <Menu className="h-5 w-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-slate-950/20 backdrop-blur-xl z-[90] lg:hidden"
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-[3rem] p-8 shadow-2xl z-[100] lg:hidden border border-slate-100"
                        >
                            <div className="flex flex-col gap-6">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 ml-4">Explore Linklane</p>
                                    <div className="flex flex-col gap-2">
                                        {navItems.map((item, i) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center justify-between px-6 py-5 bg-slate-50 rounded-2xl group active:scale-[0.98] transition-all"
                                            >
                                                <span className="text-lg font-black text-slate-900">{item.label}</span>
                                                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                    <ChevronRight className="h-4 w-4" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px w-full bg-slate-100" />

                                <div className="flex flex-col gap-4">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-5 text-center text-sm font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
                                    >
                                        Sign In Existing Profile
                                    </Link>
                                    <Link
                                        href="/claim"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-6 bg-blue-600 text-white rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                                    >
                                        Get Started <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
