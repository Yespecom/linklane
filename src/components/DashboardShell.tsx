"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Menu, Search, Bell, User } from "lucide-react";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="lg:pl-72 transition-all duration-500">
                <main className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}
