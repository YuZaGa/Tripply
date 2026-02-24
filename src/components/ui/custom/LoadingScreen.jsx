import React, { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
    "Consulting local guides...",
    "Mapping scenic routes...",
    "Selecting boutique stays...",
    "Reviewing culinary hotspots...",
    "Finalizing your escape..."
];

const TRAVEL_INSIGHTS = [
    "Pack a portable charger. The best moments often happen when your battery is low.",
    "A journey of a thousand miles begins with a single step.",
    "The world is a book and those who do not travel read only one page.",
    "Travel is the only thing you buy that makes you richer.",
    "Take only memories, leave only footprints.",
    "To travel is to discover that everyone is wrong about other countries."
];

export default function LoadingScreen() {
    const [progress, setProgress] = useState(5);
    const [messageIndex, setMessageIndex] = useState(0);
    const [insightIndex, setInsightIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        // Randomly select an insight on mount
        setInsightIndex(Math.floor(Math.random() * TRAVEL_INSIGHTS.length));

        // Progress bar simulation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 99) {
                    clearInterval(progressInterval);
                    return 99;
                }
                const increment = Math.floor(Math.random() * 3) + 1;
                return Math.min(prev + increment, 99);
            });
        }, 150);

        return () => clearInterval(progressInterval);
    }, []);

    useEffect(() => {
        // Message cycling with fade
        const messageInterval = setInterval(() => {
            setFade(false); // Trigger fade out

            setTimeout(() => {
                setMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
                setFade(true); // Trigger fade in
            }, 500); // Wait for fade out to complete
        }, 3000);

        return () => clearInterval(messageInterval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-cream-50 font-sans antialiased h-screen w-screen overflow-hidden text-charcoal flex flex-col items-center justify-center">
            {/* Paper texture overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5 mix-blend-multiply z-0"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
            ></div>

            <main className="relative z-10 flex flex-col items-center gap-10 w-full max-w-lg px-4">
                {/* Animated Compass Graphic */}
                <div className="relative w-40 h-40 flex items-center justify-center animate-[fadeInUp_0.8s_ease-out_forwards]">
                    <div className="absolute inset-0 border border-burnt-orange/20 rounded-full"></div>
                    <div className="absolute inset-2 border border-dotted border-burnt-orange/30 rounded-full animate-[spin_8s_linear_infinite]"></div>
                    <div className="absolute inset-12 bg-white/50 rounded-full shadow-inner border border-burnt-orange/10"></div>
                    <div className="relative z-10 text-burnt-orange">
                        <span className="material-symbols-outlined text-[48px] rotate-45">explore</span>
                    </div>
                    <div className="absolute inset-0 bg-burnt-orange/5 rounded-full animate-pulse"></div>
                </div>

                {/* Loading Text & Progress */}
                <div className="w-full flex flex-col gap-8 text-center animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl font-serif font-medium text-charcoal tracking-tight">
                            Curating your journey
                        </h2>
                        <div className="h-6 overflow-hidden relative w-full flex justify-center">
                            <p
                                className="text-slate-muted font-serif italic text-lg transition-opacity duration-500"
                                style={{ opacity: fade ? 1 : 0 }}
                            >
                                {LOADING_MESSAGES[messageIndex]}
                            </p>
                        </div>
                    </div>

                    <div className="w-full max-w-sm mx-auto space-y-3">
                        <div className="flex justify-between text-[10px] font-bold text-burnt-orange uppercase tracking-[0.2em] px-1">
                            <span>Itinerary Status</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-[2px] w-full bg-slate-200 relative overflow-hidden rounded-full">
                            <div
                                className="absolute top-0 left-0 h-full bg-burnt-orange transition-all ease-out"
                                style={{ width: `${progress}%`, transitionDuration: '300ms' }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Travel Insight Card */}
                <div
                    className="w-full max-w-md bg-orange-50/50 border border-orange-100 rounded-sm p-6 shadow-sm animate-[fadeInUp_0.8s_ease-out_forwards]"
                    style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
                >
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="text-burnt-orange/80">
                            <span className="material-symbols-outlined text-2xl font-light">auto_awesome</span>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-burnt-orange uppercase tracking-widest">Travel Insight</p>
                            <p className="text-charcoal font-serif text-lg leading-relaxed italic">
                                "{TRAVEL_INSIGHTS[insightIndex]}"
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}
