import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { verifyToken, checkUsage, incrementUsage } from "@/service/usageService";

// Allow up to 60s for Gemini to respond (Vercel Hobby plan max)
export const maxDuration = 60;

export async function POST(request) {
    // --- Auth & Usage Check ---
    const authHeader = request.headers.get("authorization");
    const uid = await verifyToken(authHeader);
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    const identifier = uid || ip;
    const isAuthenticated = !!uid;

    // Check usage limits (skip in dev)
    if (process.env.NODE_ENV === "production") {
        const usage = await checkUsage(identifier, isAuthenticated);
        if (!usage.allowed) {
            return NextResponse.json(
                {
                    error: isAuthenticated
                        ? "Monthly limit reached (7/7 trips). Resets next month."
                        : "Free limit reached (3/3 trips). Sign in for 7 trips/month!",
                    remaining: 0,
                    limit: usage.limit,
                    needsAuth: !isAuthenticated,
                },
                { status: 429 }
            );
        }
    }

    // --- Input Validation ---
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
        return NextResponse.json(
            { error: "Missing or invalid prompt" },
            { status: 400 }
        );
    }

    if (prompt.length > 5000) {
        return NextResponse.json(
            { error: "Prompt too long (max 5000 chars)" },
            { status: 400 }
        );
    }

    // --- Gemini Call ---
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        const modelStr = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

        if (!apiKey) {
            console.error("GEMINI_API_KEY is not configured");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelStr });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
        };

        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        {
                            text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
                        },
                    ],
                },
                {
                    role: "model",
                    parts: [{ text: '```json\n{"hotels":[],"itinerary":[]}\n```\n' }],
                },
            ],
        });

        const result = await chatSession.sendMessage(prompt);
        const text = result.response.text();

        // Increment usage AFTER successful generation
        await incrementUsage(identifier, isAuthenticated);

        return NextResponse.json({ result: text });
    } catch (error) {
        console.error("Gemini API error:", error.message);
        return NextResponse.json(
            { error: "Failed to generate trip" },
            { status: 500 }
        );
    }
}
