import { MetadataRoute } from 'next';
import { createClient } from "@/utils/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = await createClient();

    // Fetch all onboarded profiles
    const { data: profiles } = await supabase
        .from("profiles")
        .select("username, updated_at")
        .eq("onboarded", true);

    const baseUrl = "https://linklane.app";

    const profileUrls = (profiles || []).map((profile) => ({
        url: `${baseUrl}/${profile.username}`,
        lastModified: profile.updated_at || new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/explore`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...profileUrls,
    ];
}
