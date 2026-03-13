// Linklane.in - Professional Hub
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/private/', '/draft/'],
        },
        sitemap: 'https://linklane.in/sitemap.xml',
    };
}
