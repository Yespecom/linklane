import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
    Users,
    Settings,
    BarChart3,
    Link as LinkIcon,
    Crown,
    Layout as LayoutIcon,
    LogOut,
    Star
} from "lucide-react";
import DashboardShell from "@/components/DashboardShell";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Check if onboarded
    const { data: profile } = await supabase
        .from("profiles")
        .select("onboarded")
        .eq("id", user.id)
        .single();

    return (
        <DashboardShell>
            {children}
        </DashboardShell>
    );
}
