"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import UsernameInput from "@/components/UsernameInput";
import LinktreeNavbar from "@/components/LinktreeNavbar";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import {
  Star,
  ArrowUpRight,
  Zap,
  Shield,
  Globe,
  Send,
  Mail,
  Github,
  Twitter,
  Instagram,
  ChevronRight,
  MapPin,
  Phone,
  Layers,
  ExternalLink,
  Loader2
} from "lucide-react";

export default function Home() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [topProfiles, setTopProfiles] = useState<any[]>([]);
  const supabase = createClient();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      if (count !== null) setUserCount(count);

      const { data: profiles } = await supabase
        .from('profiles')
        .select('username, display_name, avatar_url, rating, review_count')
        .eq('onboarded', true)
        .order('rating', { ascending: false })
        .order('review_count', { ascending: false })
        .limit(10);

      if (profiles) setTopProfiles(profiles);
    };
    fetchInitialData();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-blue-100 selection:text-blue-600 overflow-x-hidden">
      <LinktreeNavbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-8 pt-32 md:pt-48 pb-20 md:pb-32 relative">
        {/* Visual Engineering Layer (Abstract Art + Grid) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {/* The Grid Protocol */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

          {/* Floating Ecosystem Blobs */}
          <motion.div
            animate={{
              y: [0, -60, 0],
              x: [0, 40, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100/40 to-indigo-100/30 blur-[120px]"
          />
          <motion.div
            animate={{
              y: [0, 80, 0],
              x: [0, -60, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] right-[15%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-rose-50/20 to-blue-50/20 blur-[140px]"
          />

          {/* Architectural Orbitals */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1, rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="w-[1000px] h-[1000px] border-[0.5px] border-slate-900 rounded-full border-dashed"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 0.05, scale: 1, rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-[1000px] h-[1000px] border-[0.5px] border-blue-600 rounded-full border-dashed"
            />
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-10 md:gap-16 mb-16 md:mb-32 overflow-visible relative">
          {/* Hero Identity Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-10 md:gap-12 max-w-5xl"
          >
            <div className="space-y-4 md:space-y-8">
              <h1 className="text-[2.75rem] sm:text-[6rem] md:text-[8rem] lg:text-[9.5rem] leading-[1.1] md:leading-[0.8] font-[1000] tracking-[-0.06em] text-slate-950 px-2">
                Claim your <br />
                <span className="relative inline-block text-blue-600 md:text-slate-950">
                  linklane
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute -bottom-1 md:-bottom-4 left-0 h-1 md:h-4 bg-blue-600/10 rounded-full -z-10"
                  />
                </span>
              </h1>
            </div>

            <p className="text-sm sm:text-2xl font-bold leading-relaxed max-w-2xl text-slate-500/80 px-8 md:px-0">
              The universal platform to own your digital footprint.
              <br className="hidden md:block" />
              Designed for performance, built for trust.
            </p>

            <div className="w-full max-w-lg flex flex-col items-center gap-8 mt-2 md:mt-4 relative px-4 sm:px-0">
              {/* Glass background for input focus area */}
              <div className="absolute inset-x-[-10%] top-[-20%] bottom-[-20%] bg-blue-50/30 blur-3xl -z-10 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />

              <div className="w-full transform transition-all duration-700 hover:translate-y-[-2px]">
                <UsernameInput />
              </div>
            </div>
          </motion.div>
        </div>
        {/* Top Rated Profiles - Auto-scrolling Carousel */}
        <div className="mb-32 md:mb-48">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-12 md:mb-16 px-4"
          >
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4 text-center">Elite Discovery</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] text-center">Spotlight: Top Performing Profiles</p>
          </motion.div>

          <div className="relative group overflow-hidden">
            <div className="flex gap-4 md:gap-6 animate-scroll whitespace-nowrap py-4 md:py-10">
              {[...topProfiles, ...topProfiles].map((profile, i) => (
                <Link
                  key={`${profile.username}-${i}`}
                  href={`/${profile.username}`}
                  className="inline-block"
                >
                  <motion.div
                    className="relative w-72 md:w-[26rem] p-6 md:p-8 bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 cursor-pointer group h-full flex flex-col overflow-hidden text-left"
                  >
                    {/* Background Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="flex flex-col flex-1 relative z-10">
                      <div className="flex items-start justify-between mb-8">
                        <div className="relative">
                          {/* Inner glow effect on hover */}
                          <div className="absolute -inset-3 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-[1.2rem] md:rounded-[1.4rem] bg-white border border-slate-100/50 shadow-sm p-1 group-hover:scale-105 transition-transform duration-500">
                            <img src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`} alt={profile.display_name} className="w-full h-full object-cover rounded-[1rem] md:rounded-[1.1rem] bg-slate-50" />
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-900 rounded-full border border-slate-100 group-hover:bg-amber-50 group-hover:border-amber-100 group-hover:text-amber-900 transition-colors">
                          <Star className="h-3 md:h-3.5 w-3 md:w-3.5 fill-amber-400 text-amber-500" />
                          <span className="text-[10px] md:text-xs font-black">{profile.rating || "5.0"}</span>
                        </div>
                      </div>

                      <div className="mb-6 flex-1">
                        <h4 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 mb-2 truncate group-hover:text-blue-600 transition-colors">{profile.display_name}</h4>
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] truncate">
                            linklane.in/{profile.username}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 md:gap-4 mb-8">
                        <div className="flex items-center justify-between text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          <span>Profile Strength</span>
                          <span className="text-blue-600">Elite</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            whileInView={{ width: "85%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-blue-600 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-5 md:pt-6 border-t border-slate-100 mt-auto">
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Community Voice</span>
                          <span className="text-[11px] md:text-xs font-black text-slate-900">{profile.review_count || (Math.floor(Math.random() * 50) + 1)} Reviews</span>
                        </div>
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transform group-hover:rotate-12 shrink-0">
                          <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            {/* Gradient Fade Overlays */}
            <div className="absolute top-0 left-0 h-full w-20 md:w-40 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 right-0 h-full w-20 md:w-40 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          </div>
        </div>

        {/* Templates Section */}
        <div className="mb-32 md:mb-48 px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase">Choose Your Vibe</h2>
            <p className="text-lg md:text-xl font-bold text-slate-400">Templates designed for every professional path.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { id: 'professional', title: 'Professional', desc: 'Business & Consulting', icon: Shield, bg: 'bg-blue-50', color: 'text-blue-600' },
              { id: 'creator', title: 'Creator', desc: 'Influencers & Artists', icon: Zap, bg: 'bg-rose-50', color: 'text-rose-600' },
              { id: 'minimal', title: 'Minimal', desc: 'Clean & Simple', icon: Layers, bg: 'bg-slate-100', color: 'text-slate-900' }
            ].map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:border-transparent hover:-translate-y-2 cursor-pointer"
              >
                <div className={`h-16 md:h-20 w-16 md:w-20 ${item.bg} rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`h-6 md:h-8 w-6 md:w-8 ${item.color}`} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-base md:text-lg font-bold text-slate-400 mb-8">{item.desc}</p>
                <div className="h-1 w-20 bg-slate-100 rounded-full group-hover:w-full transition-all duration-700" style={{ backgroundColor: item.color === 'text-blue-600' ? '#2563eb' : item.color === 'text-rose-600' ? '#e11d48' : '#0f172a' }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="mb-32 md:mb-48 scroll-mt-32 px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-center lg:text-left">Beyond a<br /><span className="text-blue-600">Bio Link.</span></h2>
                <p className="text-lg md:text-xl font-bold text-slate-400 max-w-lg leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
                  Linklane is the next-generation platform for personal and professional brand management. We provide the tools you need to own your digital presence, gather high-fidelity insights, and monetize your influence with total data integrity.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                {[
                  { label: "Elite Performance", icon: Zap, desc: "Ultra-fast updates for seamless profile management." },
                  { label: "High-Trust Security", icon: Shield, desc: "Enterprise-grade protection for your personal data." },
                  { label: "Global Presence", icon: Globe, desc: "Scale your brand across every digital platform." },
                  { label: "Instant Sync", icon: Zap, desc: "Your profile updates instantly to your global collective." }
                ].map((feature) => (
                  <div key={feature.label} className="space-y-4">
                    <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-widest">{feature.label}</h4>
                    <p className="text-xs font-bold text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-blue-100/30 rounded-[4rem] blur-[120px]" />
              <div className="relative h-full w-full bg-white border border-slate-100 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden p-8 md:p-16 shadow-2xl">
                <div className="flex flex-col gap-12">
                  <div className="flex flex-col items-center gap-6">
                    <div className="h-20 w-20 bg-slate-950 rounded-3xl flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_#fff]" />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "84%" }} transition={{ duration: 1.5 }} className="h-full bg-blue-600" />
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="h-32 bg-slate-50 rounded-[2rem]" />
                      <div className="h-32 bg-slate-50 rounded-[2rem]" />
                      <div className="h-32 bg-slate-900 rounded-[2rem]" />
                    </div>
                    <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-32 px-4 md:px-0">
          <div className="bg-slate-950 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 lg:p-24 overflow-hidden relative group">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[160px] group-hover:bg-blue-600/30 transition-all duration-1000" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.9] text-center lg:text-left">Reach the<br /><span className="text-blue-500 underline decoration-slate-800 underline-offset-[12px]">Support Alpha.</span></h2>
                  <p className="text-lg md:text-xl font-bold text-slate-500 max-w-sm leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
                    Have questions or need support? Our team is active on the digital frontier.
                  </p>
                </div>

                <div className="space-y-8">
                  {[
                    { label: "Direct Support", icon: Send, value: "hello@linklane.in" }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-6 group/item cursor-pointer">
                      <div className="h-14 w-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-white group-hover/item:border-blue-500/50 transition-colors">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">{item.label}</p>
                        <p className="text-lg font-bold text-white group-hover/item:text-blue-400 transition-colors">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center lg:justify-start gap-4 pt-4">
                  {[Twitter, Github, Instagram].map((Icon, i) => (
                    <button key={i} className="h-12 w-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 transition-all">
                      <Icon className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 space-y-8">
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Profile Name</p>
                    <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-blue-500/50 transition-all" placeholder="Full Name" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Data Origin</p>
                    <input type="email" className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-blue-500/50 transition-all" placeholder="Email Address" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Transmission</p>
                    <textarea className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-blue-500/50 transition-all h-32 resize-none" placeholder="Your message..." />
                  </div>
                </div>
                <button className="w-full py-5 bg-blue-600 text-white rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                  Send <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-8 py-20 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform group">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
            <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_#fff] animate-pulse" />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-xl font-black tracking-tighter text-slate-900 leading-tight">Linklane</span>
            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-blue-600/60 leading-none pl-0.5">Professional Hub</span>
          </div>
        </Link>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">powered by yesp corporation</p>
      </footer>

      <style jsx global>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                    display: flex;
                    width: max-content;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
    </div>
  );
}
