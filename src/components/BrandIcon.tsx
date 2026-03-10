import {
    Instagram,
    Linkedin,
    Youtube,
    Twitter,
    Github,
    Globe,
    Facebook,
    Mail,
    Phone,
    MessageCircle,
    Music2,
    PlayCircle,
    ShoppingCart,
    Link as LinkIcon
} from "lucide-react";

export const getBrandIcon = (url: string) => {
    const u = url.toLowerCase();
    if (u.includes("instagram.com")) return { Icon: Instagram, color: "#E4405F", label: "Instagram" };
    if (u.includes("linkedin.com")) return { Icon: Linkedin, color: "#0A66C2", label: "LinkedIn" };
    if (u.includes("youtube.com") || u.includes("youtu.be")) return { Icon: Youtube, color: "#FF0000", label: "YouTube" };
    if (u.includes("twitter.com") || u.includes("x.com")) return { Icon: Twitter, color: "#1DA1F2", label: "X" };
    if (u.includes("github.com")) return { Icon: Github, color: "#181717", label: "GitHub" };
    if (u.includes("facebook.com")) return { Icon: Facebook, color: "#1877F2", label: "Facebook" };
    if (u.includes("spotify.com")) return { Icon: Music2, color: "#1DB954", label: "Spotify" };
    if (u.includes("tiktok.com")) return { Icon: Music2, color: "#000000", label: "TikTok" };
    if (u.includes("wa.me") || u.includes("whatsapp.com")) return { Icon: MessageCircle, color: "#25D366", label: "WhatsApp" };
    if (u.includes("mailto:")) return { Icon: Mail, color: "#EA4335", label: "Email" };
    if (u.includes("tel:")) return { Icon: Phone, color: "#34A853", label: "Phone" };

    return { Icon: LinkIcon, color: "#64748b", label: "Link" };
};

export default function BrandIcon({ url, className }: { url: string; className?: string }) {
    const { Icon, color } = getBrandIcon(url);
    return <Icon className={className} style={{ color }} />;
}
