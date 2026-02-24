"use client";

import Link from "next/link";

function Header() {
    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-cream-50/80 backdrop-blur-md border-b border-charcoal/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5">
                    {/* SVG Logo - Compass/Paper Airplane hybrid */}
                    <div className="w-10 h-10 bg-burnt-orange rounded-md shadow-sm flex items-center justify-center text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="currentColor" opacity="0.9" />
                            <path d="M12 18L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                        </svg>
                    </div>
                    <span className="font-serif font-bold text-xl text-charcoal italic hidden sm:block tracking-wide">Tripply</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/create-trip" className="hidden sm:flex items-center justify-center px-6 h-11 rounded-full bg-burnt-orange text-sm font-semibold text-white hover:bg-burnt-orange/90 hover:shadow-md transition-all duration-200">
                        Log In
                    </Link>
                    <Link href="/create-trip" className="hidden sm:flex items-center justify-center px-6 h-11 rounded-full border border-charcoal/10 bg-cream-100 text-sm font-semibold text-charcoal hover:bg-white hover:shadow-sm transition-all duration-200">
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;
