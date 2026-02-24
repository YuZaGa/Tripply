import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { createHash } from "crypto";

const ANON_LIMIT = 3;
const AUTH_LIMIT = 7;

/**
 * Lazily initialize Firebase Admin (only when first called).
 * This prevents build errors when env vars aren't set.
 */
let _adminApp;
function getAdminApp() {
    if (_adminApp) return _adminApp;
    if (getApps().length) {
        _adminApp = getApps()[0];
        return _adminApp;
    }

    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;

    if (!privateKey || !clientEmail) {
        return null; // Gracefully handle missing credentials
    }

    _adminApp = initializeApp({
        credential: cert({
            projectId: "tripplanner-db881",
            clientEmail,
            privateKey,
        }),
    });
    return _adminApp;
}

function hashIP(ip) {
    return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

function getCurrentMonthYear() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Verify a Firebase ID token and return the user's UID.
 */
export async function verifyToken(authHeader) {
    if (!authHeader?.startsWith("Bearer ")) return null;
    const app = getAdminApp();
    if (!app) return null;
    try {
        const token = authHeader.split("Bearer ")[1];
        const decoded = await getAuth(app).verifyIdToken(token);
        return decoded.uid;
    } catch {
        return null;
    }
}

/**
 * Check usage and return { allowed, remaining, limit, count }
 */
export async function checkUsage(identifier, isAuthenticated) {
    const limit = isAuthenticated ? AUTH_LIMIT : ANON_LIMIT;
    const app = getAdminApp();

    // If admin not configured, allow (dev fallback)
    if (!app) return { allowed: true, remaining: limit, limit, count: 0 };

    const docId = isAuthenticated ? `auth_${identifier}` : `anon_${hashIP(identifier)}`;
    const monthYear = getCurrentMonthYear();

    const docRef = getFirestore(app).collection("usage").doc(docId);
    const doc = await docRef.get();

    if (!doc.exists || doc.data().monthYear !== monthYear) {
        return { allowed: true, remaining: limit, limit, count: 0 };
    }

    const count = doc.data().count || 0;
    return {
        allowed: count < limit,
        remaining: Math.max(0, limit - count),
        limit,
        count,
    };
}

/**
 * Increment usage count for this month.
 */
export async function incrementUsage(identifier, isAuthenticated) {
    const app = getAdminApp();
    if (!app) return; // Skip in dev if admin not configured

    const docId = isAuthenticated ? `auth_${identifier}` : `anon_${hashIP(identifier)}`;
    const monthYear = getCurrentMonthYear();

    const docRef = getFirestore(app).collection("usage").doc(docId);
    const doc = await docRef.get();

    if (!doc.exists || doc.data().monthYear !== monthYear) {
        await docRef.set({ count: 1, monthYear, type: isAuthenticated ? "authenticated" : "anonymous" });
    } else {
        await docRef.update({ count: (doc.data().count || 0) + 1 });
    }
}
