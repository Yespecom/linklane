import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { profileId, name, company, comment, rating } = body;

        if (!profileId) {
            return NextResponse.json({ error: "Missing profileId" }, { status: 400 });
        }

        // Fetch user's email from the profile table
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data: profile } = await supabase
            .from("profiles")
            .select("email, contact_email")
            .eq("id", profileId)
            .single();

        if (!profile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        const notifyEmail = profile.email || profile.contact_email;

        if (!notifyEmail) {
            return NextResponse.json({ error: "No email found for profile" }, { status: 404 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // if the user hasn't set up SMTP, we just return success but log it
        if (!process.env.SMTP_USER) {
            console.log("Mock Email Sent. Configure SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT in .env to send real emails.");
            console.log(`To: ${notifyEmail}\nReview: ${rating} Stars\nComment: ${comment}`);
            return NextResponse.json({ success: true, mock: true });
        }

        await transporter.sendMail({
            from: `"Linklane" <${process.env.SMTP_USER}>`,
            to: notifyEmail,
            subject: `New ${rating}-Star Review from ${name}!`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0f172a; font-weight: 900; letter-spacing: -0.5px;">You have a new review on Linklane!</h2>
                    <p style="color: #64748b; font-size: 16px;">Someone just left you a review on your public profile.</p>
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin: 30px 0;">
                        <p style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: bold;">Review Details</p>
                        <p style="margin: 5px 0;"><strong>Reviewer:</strong> ${name} ${company ? `<span style="color: #64748b;">(${company})</span>` : ""}</p>
                        <p style="margin: 5px 0 15px 0;"><strong>Rating:</strong> <span style="color: #eab308; font-weight: bold;">${rating} / 5 Stars</span></p>
                        <div style="background: #ffffff; padding: 15px; border-radius: 8px; font-style: italic; border: 1px solid #e2e8f0; color: #334155;">
                            "${comment}"
                        </div>
                    </div>
                    <a href="https://linklane.in/dashboard/reviews" style="display: inline-block; background: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 12px; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; font-size: 12px;">
                        Manage Reviews
                    </a>
                    <p style="margin-top: 40px; font-size: 12px; color: #94a3b8; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Powered by Linklane</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Email error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
