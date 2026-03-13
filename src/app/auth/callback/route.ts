import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // if "next" is in search params, use it as the redirection URL
    const next = searchParams.get("next") ?? "/dashboard";

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (!error) {
            const isLocalEnv = process.env.NODE_ENV === "development";
            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`);
            }
            
            // For production, use the requested origin but force https if it's not local
            const protocol = origin.startsWith('http://localhost') ? 'http' : 'https';
            const host = request.headers.get("host") || origin.split('://')[1];
            
            return NextResponse.redirect(`${protocol}://${host}${next}`);
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
