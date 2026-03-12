"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Users,
    Settings,
    BarChart3,
    Link as LinkIcon,
    Crown,
    LogOut,
    Star,
    X,
    ChevronRight,
    Zap
} from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    username?: string;
}

export default function DashboardSidebar({ isOpen, onClose, username = "dashboard" }: SidebarProps) {
    const pathname = usePathname();
    
    const navItems = [
        { icon: BarChart3, label: "Overview", href: "/dashboard" },
        { icon: Users, label: "Leads", href: "/dashboard/leads" },
        { icon: LinkIcon, label: "Links", href: "/dashboard/links" },
        { icon: Star, label: "Reviews", href: "/dashboard/reviews" },
        { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/20 backdrop-blur-md z-[100] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Content */}
            <aside className={`
                fixed left-0 top-0 h-full w-72 bg-white border-r border-slate-200 z-[110] transition-transform duration-500 ease-[0.16, 1, 0.3, 1]
                lg:translate-x-0 lg:z-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center justify-between mb-10 px-2 lg:justify-start">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-6 transition-transform">
                                <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_5px_white]" />
                            </div>
                            <span className="text-xl font-black tracking-tighter text-slate-900">Linklane</span>
                        </Link>

                        <button
                            onClick={onClose}
                            className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center lg:hidden active:scale-95 transition-all"
                        >
                            <X className="h-4 w-4 text-slate-500" />
                        </button>
                    </div>

                    <nav className="flex-1 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 ml-4 mb-4">Control System</p>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => onClose()}
                                    className={`
                                        flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all group
                                        ${isActive
                                            ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                                            : "text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
                                        {item.label}
                                    </div>
                                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-slate-100">
                        <form action="/auth/signout" method="post">
                            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </aside>
        </>
    );
}
