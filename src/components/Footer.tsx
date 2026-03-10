"use client";

export default function Footer() {
    const footerLinks = [
        {
            title: "Product",
            links: ["Features", "Pricing", "Demo", "What's New"],
        },
        {
            title: "Company",
            links: ["About", "Blog", "Careers", "Contact"],
        },
        {
            title: "Resources",
            links: ["Help Center", "Docs", "Community", "Privacy"],
        },
    ];

    return (
        <footer className="border-t border-white/5 bg-slate-950/50 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-secondary" />
                            <span className="text-lg font-bold text-white">Linklane</span>
                        </div>
                        <p className="max-w-[200px] text-sm text-slate-500">
                            The modern way to share your links, content, and leads.
                        </p>
                    </div>

                    {footerLinks.map((column) => (
                        <div key={column.title} className="flex flex-col gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                                {column.title}
                            </h4>
                            <ul className="flex flex-col gap-2">
                                {column.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-slate-500 transition-colors hover:text-white"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
                    <p className="text-xs text-slate-600">
                        © {new Date().getFullYear()} Linklane Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-xs text-slate-600 hover:text-slate-400">Twitter</a>
                        <a href="#" className="text-xs text-slate-600 hover:text-slate-400">Instagram</a>
                        <a href="#" className="text-xs text-slate-600 hover:text-slate-400">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
