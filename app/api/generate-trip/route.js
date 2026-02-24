import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Allow up to 60s for Gemini to respond (Vercel Hobby plan max)
export const maxDuration = 60;

// Simple in-memory rate limiter (resets on cold start)
const rateLimitMap = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
        rateLimitMap.set(ip, { windowStart: now, count: 1 });
        return true;
    }
    if (entry.count >= RATE_LIMIT) return false;
    entry.count++;
    return true;
}

export async function POST(request) {
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (process.env.NODE_ENV === "production" && !checkRateLimit(ip)) {
        return NextResponse.json(
            { error: "Rate limit exceeded. Maximum 5 trip generations per hour." },
            { status: 429 }
        );
    }

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

        return NextResponse.json({ result: text });
    } catch (error) {
        console.error("Gemini API error:", error.message);
        return NextResponse.json(
            { error: "Failed to generate trip" },
            { status: 500 }
        );
    }
}
