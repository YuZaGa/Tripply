import { NextResponse } from "next/server";

// Simple in-memory rate limiter
const rateLimitMap = new Map();
const RATE_LIMIT = 100;
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
            { error: "Rate limit exceeded. Try again later." },
            { status: 429 }
        );
    }

    const { textQuery } = await request.json();

    if (!textQuery || typeof textQuery !== "string") {
        return NextResponse.json(
            { error: "Missing or invalid textQuery" },
            { status: 400 }
        );
    }

    try {
        const apiKey = process.env.GOOGLE_PLACES_API_KEY;

        if (!apiKey) {
            console.error("GOOGLE_PLACES_API_KEY is not configured");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const response = await fetch(
            "https://places.googleapis.com/v1/places:searchText",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask": "places.photos,places.displayName,places.id",
                },
                body: JSON.stringify({ textQuery }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Places API error:", response.status, errorText);
            return NextResponse.json(
                { error: "Places API error" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Search places error:", error.message);
        return NextResponse.json(
            { error: "Failed to search places" },
            { status: 500 }
        );
    }
}
