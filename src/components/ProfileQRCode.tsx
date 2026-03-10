"use client";

import { QRCodeSVG } from "qrcode.react";

export default function ProfileQRCode({ url, size = 96 }: { url: string; size?: number }) {
    if (!url) return null;

    return (
        <div className="p-4 bg-white border border-slate-100 rounded-3xl shadow-sm group relative overflow-hidden">
            <QRCodeSVG
                value={url}
                size={size}
                level="H"
                includeMargin={false}
                className="transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                {/* Visual decoration */}
            </div>
        </div>
    );
}
