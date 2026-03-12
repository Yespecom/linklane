import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "GEMINI_API_KEY is not set in environment variables. Please restart your Next.js server!" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const body = await req.json();
        const { name, title, category, bio, location, services } = body;

        const prompt = `You are an expert SEO specialist. Write a highly optimized, powerful SEO Title, SEO Meta Description, and a comma-separated list of SEO Keywords based on the following professional profile data:

Name: ${name || "Not provided"}
Title: ${title || "Not provided"}
Category: ${category || "Not provided"}
Location: ${location || "Not provided"}
Bio: ${bio || "Not provided"}
Services Offered: ${services?.join(", ") || "None"}

Constraints:
1. SEO Title must be under 60 characters and highly clickable.
2. SEO Description must be compelling, action-oriented, and between 140-160 characters.
3. Keywords should refer to the category, title, specific services, and location (max 10 relevant keywords).
4. Return ONLY valid JSON in the exact format matching the keys below. No markdown. No additional text.
{
  "seo_title": "The Title",
  "seo_description": "The description.",
  "custom_keywords": "keyword1, keyword2, keyword3"
}`;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Extract JSON string from the response in case there's backticks
        const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const seoData = JSON.parse(jsonStr);

        return NextResponse.json(seoData);
    } catch (error: any) {
        console.error("SEO Generation Error:", error);
        return NextResponse.json({ error: error.message || "Failed to generate SEO from Gemini" }, { status: 500 });
    }
}
