"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Menu, Search, Bell, User } from "lucide-react";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-medium">
            <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className={`transition-all duration-500 ${isSidebarOpen ? "lg:pl-72" : "lg:pl-72"}`}>
                {/* Mobile/Tablet Header */}
                <header className="sticky top-0 z-40 h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between lg:hidden">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all active:scale-95"
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                                <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_5px_white]" />
                            </div>
                            <span className="text-lg font-black tracking-tighter text-slate-900">Linklane</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="h-10 w-10 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all">
                            <Bell className="h-5 w-5" />
                        </button>
                        <button className="h-10 w-10 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all text-slate-400">
                            <User className="h-5 w-5" />
                        </button>
                    </div>
                </header>

                <main className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}
