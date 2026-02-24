import { NextResponse } from "next/server";
import { verifyToken, checkUsage } from "@/service/usageService";

/**
 * GET /api/usage — returns the current user's usage stats.
 * Used by the Header to display remaining trip count.
 */
export async function GET(request) {
    const authHeader = request.headers.get("authorization");
    const uid = await verifyToken(authHeader);
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    const identifier = uid || ip;
    const isAuthenticated = !!uid;

    const usage = await checkUsage(identifier, isAuthenticated);
    return NextResponse.json(usage);
}
