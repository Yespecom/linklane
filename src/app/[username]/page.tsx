import { Metadata } from 'next';
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import CreatorTemplate from "@/components/templates/CreatorTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import LinklaneTemplate from "@/components/templates/LinklaneTemplate";
import BackButton from "@/components/BackButton";

interface PageParams {
    params: { username: string };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const supabase = await createClient();
    const { username } = await params;

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

    if (!profile) return { title: "Not Found | Linklane" };

    const siteName = "Linklane";
    const name = profile.display_name;
    const profession = profile.title || "Professional";
    const location = profile.location ? ` in ${profile.location}` : "";

    const defaultTitle = `${name} | ${profession}${location} | ${siteName}`;
    const defaultDesc = `${name} offers ${profession} services${location}. Read reviews, explore services, and contact directly on Linklane.`;

    return {
        title: profile.seo_title || defaultTitle,
        description: profile.seo_description || defaultDesc,
        openGraph: {
            title: profile.seo_title || defaultTitle,
            description: profile.seo_description || defaultDesc,
            images: [profile.avatar_url || "/og-image.png"],
            type: 'profile',
        },
        twitter: {
            card: 'summary_large_image',
            title: profile.seo_title || defaultTitle,
            description: profile.seo_description || defaultDesc,
            images: [profile.avatar_url || "/og-image.png"],
        }
    };
}

export default async function PublicPage({ params }: PageParams) {
    const supabase = await createClient();
    const { username } = await params;

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

    if (profileError || !profile) {
        notFound();
    }

    const { data: services } = await supabase
        .from("services")
        .select("*")
        .eq("user_id", profile.id)
        .order("order", { ascending: true });

    const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("user_id", profile.id)
        .order("order", { ascending: true });

    const { data: links } = await supabase
        .from("links")
        .select("*")
        .eq("user_id", profile.id)
        .order("order", { ascending: true });

    const { data: reviews } = await supabase
        .from("reviews")
        .select("*")
        .eq("profile_id", profile.id)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

    // Fetch Other Lanes (profiles by the same user)
    // We try by user_id if it exists, otherwise fall back to empty
    // This supports the multi-lane feature
    const { data: otherLanes } = profile.user_id ? await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url, banner_url")
        .eq("user_id", profile.user_id)
        .not("id", "eq", profile.id)
        .limit(3) : { data: [] };

    // --- JSON-LD Structured Data ---
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": profile.template_id === "professional" ? "ProfessionalService" : "Person",
        "name": profile.display_name,
        "description": profile.bio,
        "image": profile.avatar_url,
        "url": `https://linklane.app/${username}`,
        ...(profile.location && {
            "address": {
                "@type": "PostalAddress",
                "addressLocality": profile.location
            }
        }),
        ...(profile.review_count > 0 && {
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": profile.rating,
                "reviewCount": profile.review_count
            }
        })
    };

    const props = {
        profile,
        services,
        products,
        links,
        reviews: reviews || [],
        username,
        otherLanes: otherLanes || []
    };

    return (
        <div className="bg-[#FDFDFD]">
            <BackButton />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <LinklaneTemplate {...props} />
        </div>
    );
}
