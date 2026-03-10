import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ReviewFormWrapper from "@/components/ReviewFormWrapper";

export default async function ReviewRequestPage({ params }: { params: { username: string } }) {
    const supabase = await createClient();
    const { username } = await params;

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

    if (error || !profile) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white flex items-center justify-center p-6">
            <div className="w-full max-w-lg">
                <div className="flex flex-col items-center mb-12 text-center">
                    <div className="h-20 w-20 rounded-[2.5rem] bg-blue-600 flex items-center justify-center shadow-2xl mb-6">
                        <img
                            src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                            className="h-full w-full object-cover rounded-[2.5rem]"
                            alt={profile.display_name}
                        />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">{profile.display_name}</h1>
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Review Request</p>
                </div>

                <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 shadow-2xl shadow-blue-500/5">
                    <ReviewFormWrapper profileId={profile.id} />
                </div>

                <div className="mt-12 text-center opacity-30 hover:opacity-100 transition-opacity">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-950">Linklane Identity Hub</p>
                </div>
            </div>
        </div>
    );
}
