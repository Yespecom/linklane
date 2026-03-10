"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, UserPlus, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactActions({ profile }: { profile: any }) {
    const [saved, setSaved] = useState(false);

    const handleSaveContact = () => {
        // VCF Generation Logic
        const vcfData = `
BEGIN:VCARD
VERSION:3.0
FN:${profile.display_name}
TITLE:${profile.title || ""}
ORG:${profile.company || ""}
TEL;TYPE=CELL:${profile.phone || ""}
EMAIL:${profile.contact_email || profile.email || ""}
END:VCARD`;

        const blob = new Blob([vcfData], { type: "text/vcard" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${profile.display_name.replace(/\s+/g, "_")}.vcf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const actions = [
        {
            icon: Phone,
            label: "Call",
            href: profile.phone ? `tel:${profile.phone}` : null,
        },
        {
            icon: MessageCircle,
            label: "WhatsApp",
            href: profile.phone ? `https://wa.me/${profile.phone.replace(/\D/g, "")}` : null,
        },
        {
            icon: Mail,
            label: "Email",
            href: profile.contact_email ? `mailto:${profile.contact_email}` : (profile.email ? `mailto:${profile.email}` : null),
        }
    ];

    return (
        <div className="w-full mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Save Contact Hero Button */}
            <button
                onClick={handleSaveContact}
                className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white rounded-2xl py-5 shadow-2xl shadow-slate-900/10 mb-4 transition-all hover:bg-black active:scale-95 group overflow-hidden relative"
            >
                <motion.div
                    animate={saved ? { y: -40 } : { y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex items-center gap-3"
                >
                    <UserPlus className="h-6 w-6" />
                    <span className="text-xl font-black">Save Contact</span>
                </motion.div>

                {saved && (
                    <motion.div
                        initial={{ y: 40 }}
                        animate={{ y: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white"
                    >
                        <CheckCircle2 className="h-6 w-6 mr-2" />
                        <span className="text-xl font-black tracking-tight">VCF Downloaded</span>
                    </motion.div>
                )}
            </button>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-3 gap-3">
                {actions.map((action, i) => (
                    action.href ? (
                        <a
                            key={i}
                            href={action.href}
                            className="flex flex-col items-center justify-center gap-2 bg-white border border-slate-200 text-slate-900 rounded-2xl py-4 transition-all hover:bg-slate-50 active:scale-95 shadow-sm"
                        >
                            <action.icon className="h-5 w-5" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{action.label}</span>
                        </a>
                    ) : (
                        <div
                            key={i}
                            className="flex flex-col items-center justify-center gap-2 bg-slate-50 text-slate-200 border border-slate-100 rounded-2xl py-4 flex-1 opacity-50 grayscale"
                        >
                            <action.icon className="h-5 w-5" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{action.label}</span>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
