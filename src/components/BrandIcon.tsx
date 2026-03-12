import {
    SiInstagram,
    SiYoutube,
    SiX,
    SiGithub,
    SiFacebook,
    SiSpotify,
    SiTiktok,
    SiWhatsapp,
    SiApple,
    SiTelegram,
    SiDiscord,
    SiTwitch,
    SiSnapchat,
    SiReddit,
    SiPinterest,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Mail, Phone, Link as LinkIcon } from "lucide-react";

export const getBrandIcon = (url: string) => {
    const u = url.toLowerCase();
    if (u.includes("instagram.com")) return { Icon: SiInstagram, color: "#E4405F", label: "Instagram" };
    if (u.includes("linkedin.com")) return { Icon: FaLinkedin, color: "#0A66C2", label: "LinkedIn" };
    if (u.includes("youtube.com") || u.includes("youtu.be")) return { Icon: SiYoutube, color: "#FF0000", label: "YouTube" };
    if (u.includes("twitter.com") || u.includes("x.com")) return { Icon: SiX, color: "#000000", label: "X" };
    if (u.includes("github.com")) return { Icon: SiGithub, color: "#181717", label: "GitHub" };
    if (u.includes("facebook.com") || u.includes("fb.me")) return { Icon: SiFacebook, color: "#1877F2", label: "Facebook" };
    if (u.includes("spotify.com")) return { Icon: SiSpotify, color: "#1DB954", label: "Spotify" };
    if (u.includes("tiktok.com")) return { Icon: SiTiktok, color: "#000000", label: "TikTok" };
    if (u.includes("wa.me") || u.includes("whatsapp.com") || u.includes("api.whatsapp.com")) return { Icon: SiWhatsapp, color: "#25D366", label: "WhatsApp" };
    if (u.includes("music.apple.com") || u.includes("apple.com")) return { Icon: SiApple, color: "#FA243C", label: "Apple" };
    if (u.includes("t.me") || u.includes("telegram.me")) return { Icon: SiTelegram, color: "#26A5E4", label: "Telegram" };
    if (u.includes("discord.com") || u.includes("discord.gg")) return { Icon: SiDiscord, color: "#5865F2", label: "Discord" };
    if (u.includes("twitch.tv")) return { Icon: SiTwitch, color: "#9146FF", label: "Twitch" };
    if (u.includes("snapchat.com")) return { Icon: SiSnapchat, color: "#FFFC00", label: "Snapchat" };
    if (u.includes("reddit.com")) return { Icon: SiReddit, color: "#FF4500", label: "Reddit" };
    if (u.includes("pinterest.com")) return { Icon: SiPinterest, color: "#E60023", label: "Pinterest" };
    if (u.includes("mailto:")) return { Icon: Mail, color: "#EA4335", label: "Email" };
    if (u.includes("tel:")) return { Icon: Phone, color: "#34A853", label: "Phone" };

    return { Icon: LinkIcon, color: "#64748b", label: "Link" };
};

export default function BrandIcon({ url, className }: { url: string; className?: string }) {
    const { Icon, color } = getBrandIcon(url);
    return <Icon className={className || "h-5 w-5"} style={{ color }} />;
}
