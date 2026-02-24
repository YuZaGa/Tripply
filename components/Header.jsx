"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

function Header() {
    const { user, signIn, signOut, getIdToken, loading } = useAuth();
    const [usage, setUsage] = useState(null);
    const pathname = usePathname();

    // Fetch usage count when auth state or route changes
    useEffect(() => {
        fetchUsage();
    }, [user, pathname]);

    const fetchUsage = async () => {
        try {
            const headers = { "Content-Type": "application/json" };
            const token = await getIdToken();
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            const res = await fetch("/api/usage", { headers });
            if (res.ok) {
                const data = await res.json();
                setUsage(data);
            }
        } catch (e) {
            // silently fail
        }
    };

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-cream-50/80 backdrop-blur-md border-b border-charcoal/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-burnt-orange rounded-md shadow-sm flex items-center justify-center text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="currentColor" opacity="0.9" />
                            <path d="M12 18L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                        </svg>
                    </div>
                    <span className="font-serif font-bold text-xl text-charcoal italic hidden sm:block tracking-wide">Tripply</span>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Usage counter badge */}
                    {usage && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-charcoal/10 text-xs font-semibold">
                            <span className="material-symbols-outlined text-burnt-orange text-sm">bolt</span>
                            <span className="text-charcoal">
                                {usage.remaining}/{usage.limit}
                            </span>
                            <span className="text-slate-muted">trips</span>
                        </div>
                    )}

                    {loading ? (
                        <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
                    ) : user ? (
                        <>
                            <img
                                src={user.photoURL || ""}
                                alt=""
                                className="w-10 h-10 rounded-full border-2 border-burnt-orange/30 object-cover"
                                referrerPolicy="no-referrer"
                            />
                            <button
                                onClick={signOut}
                                className="hidden sm:flex items-center justify-center px-5 h-10 rounded-full border border-charcoal/10 bg-cream-100 text-sm font-semibold text-charcoal hover:bg-white hover:shadow-sm transition-all duration-200"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={signIn}
                            className="flex items-center gap-2 justify-center px-6 h-11 rounded-full bg-burnt-orange text-sm font-semibold text-white hover:bg-burnt-orange/90 hover:shadow-md transition-all duration-200"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;
