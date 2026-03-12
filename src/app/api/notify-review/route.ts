import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
    return NextResponse.json({ status: "Route Active" });
}

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
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;

        // if the user hasn't set up SMTP, we just return success but log it
        if (!process.env.SMTP_USER) {
            console.log("Mock Email Sent. Configure SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT in .env to send real emails.");
            console.log(`To: ${notifyEmail}\nReview: ${rating} Stars\nComment: ${comment}`);
            return NextResponse.json({ success: true, mock: true });
        }

        await transporter.sendMail({
            from: `"Linklane Notifications" <${fromEmail}>`,
            to: notifyEmail,
            subject: `New ${rating}-Star Review from ${name}!`,
            html: `
                <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; padding: 40px 20px; color: #1e293b; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
                    <div style="background: #ffffff; padding: 40px; border-radius: 24px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                        <div style="margin-bottom: 30px; text-align: center;">
                            <div style="background: #2563eb; width: 48px; height: 48px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                                <span style="color: white; font-size: 24px; font-weight: bold;">L</span>
                            </div>
                            <h2 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 900; letter-spacing: -0.025em; line-height: 1.2;">New Review Received!</h2>
                            <p style="margin: 10px 0 0 0; color: #64748b; font-size: 16px; font-weight: 500;">Someone just shared their experience with you.</p>
                        </div>
                        
                        <div style="background: #f1f5f9; padding: 24px; border-radius: 16px; margin-bottom: 30px;">
                            <div style="display: flex; align-items: center; margin-bottom: 16px;">
                                <div style="display: flex; gap: 2px;">
                                    ${Array(5).fill(0).map((_, i) => `<span style="color: ${i < rating ? '#eab308' : '#cbd5e1'}; font-size: 20px;">★</span>`).join('')}
                                </div>
                                <span style="margin-left: 8px; color: #475569; font-size: 14px; font-weight: 700;">${rating} / 5 Stars</span>
                            </div>
                            
                            <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Reviewer</p>
                            <p style="margin: 0 0 20px 0; color: #0f172a; font-size: 16px; font-weight: 700;">${name} ${company ? `<span style="color: #64748b; font-weight: 500;">(${company})</span>` : ""}</p>
                            
                            <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Feedback</p>
                            <div style="color: #334155; font-size: 15px; line-height: 1.6; font-style: italic;">
                                "${comment}"
                            </div>
                        </div>
                        
                        <div style="text-align: center;">
                            <a href="https://linklane.in/dashboard/reviews" style="display: inline-block; background: #0f172a; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; transition: background 0.2s;">
                                Manage This Review
                            </a>
                            <p style="margin: 20px 0 0 0; color: #94a3b8; font-size: 13px;">Click the link above to manage your reviews and recommendations.</p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 32px;">
                        <p style="margin: 0; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">© 2024 Linklane · Digital Footprint Engine</p>
                    </div>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Email error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
