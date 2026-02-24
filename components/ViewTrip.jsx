"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { toast } from "sonner";
import InfoSection from "@/components/InfoSection";
import Hotels from "@/components/Hotels";
import Itinerary from "@/components/Itinerary";
import dummyData from "@/constants/dummy-data.json";

function ViewTrip() {
    const params = useParams();
    const tripId = params?.tripId;
    const [trip, setTrip] = useState(null);
    const [shareOpen, setShareOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [activeDay, setActiveDay] = useState(1);

    useEffect(() => {
        if (tripId) {
            GetTripData();
        } else {
            setTrip({ tripData: dummyData, userselection: { location: { label: "Tokyo, Japan" }, noOfDays: 3, budget: "Moderate", traveler: "Couple" } });
        }
    }, [tripId]);

    const GetTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setTrip(docSnap.data());
        } else {
            console.log("No such data");
            toast("No trip Found. Loading dummy data for preview.");
            setTrip({ tripData: dummyData, userselection: { location: { label: "Tokyo, Japan" }, noOfDays: 3, budget: "Moderate", traveler: "Couple" } });
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (!trip) return <div className="min-h-screen bg-cream-50"></div>;

    return (
        <>
            {/* Dashboard Sub-Navigation */}
            <div className="w-full border-b border-stone-200 bg-cream-50/95 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-3 py-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="#C2410C" opacity="0.9" />
                    </svg>
                    <a className="text-xs font-bold uppercase tracking-widest text-burnt-orange border-b-2 border-burnt-orange pb-1" href="#day1">Itinerary</a>
                </div>
            </div>

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-10 bg-cream-50 font-sans text-charcoal min-h-screen selection:bg-burnt-orange selection:text-white">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 h-full items-start">
                    <div className="lg:col-span-3 lg:sticky lg:top-28 space-y-8">
                        <InfoSection trip={trip} activeDay={activeDay} setActiveDay={setActiveDay} />
                    </div>
                    <div className="lg:col-span-6 space-y-12 pb-32">
                        <Itinerary trip={trip} setActiveDay={setActiveDay} />
                    </div>
                    <div className="lg:col-span-3 space-y-8 lg:sticky lg:top-28">
                        <Hotels trip={trip} />
                        <a
                            href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(trip?.tripData?.tripDetails?.location || trip?.userselection?.location?.label || "")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white shadow-sm group hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <div className="p-4 border-b border-stone-100 flex justify-between items-center">
                                <h3 className="font-serif font-bold text-charcoal text-lg italic">Geography</h3>
                                <span className="text-[10px] font-bold text-slate-muted uppercase tracking-widest">Map</span>
                            </div>
                            <div className="h-48 w-full bg-stone-100 relative overflow-hidden flex flex-col items-center justify-center gap-3 text-stone-400 group-hover:text-burnt-orange transition-colors">
                                <span className="material-symbols-outlined text-4xl">map</span>
                                <span className="text-xs font-bold uppercase tracking-widest">View on Google Maps</span>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40">
                    <button onClick={() => setShareOpen(true)} className="flex items-center gap-3 px-6 py-3 bg-burnt-orange text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-orange-700 transition-colors shadow-2xl">
                        <span className="material-symbols-outlined text-lg">ios_share</span>
                        <span>Share Trip</span>
                    </button>
                </div>
            </main>

            {shareOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShareOpen(false)}></div>
                    <div className="relative bg-cream-50 border border-stone-200 shadow-2xl max-w-md w-full mx-4 p-0 animate-[fadeInUp_0.3s_ease-out_forwards]">
                        <div className="p-6 pb-4 flex justify-between items-start">
                            <div>
                                <h3 className="font-serif font-bold text-xl text-charcoal">Share Trip</h3>
                                <p className="text-xs text-slate-muted mt-1 font-light">Anyone with this link can view your itinerary.</p>
                            </div>
                            <button onClick={() => setShareOpen(false)} className="text-slate-muted hover:text-charcoal transition-colors">
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>
                        <div className="px-6 pb-6">
                            <div className="flex items-stretch border border-stone-200 bg-white">
                                <input readOnly value={typeof window !== "undefined" ? window.location.href : ""} className="flex-1 px-4 py-3 text-sm text-charcoal bg-transparent outline-none font-mono truncate" />
                                <button onClick={handleCopyLink} className={"px-4 border-l border-stone-200 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors " + (copied ? "bg-burnt-orange text-white" : "bg-stone-50 text-charcoal hover:bg-stone-100")}>
                                    <span className="material-symbols-outlined text-lg">{copied ? "check" : "content_copy"}</span>
                                    <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
                                </button>
                            </div>
                        </div>
                        <div className="px-6 pb-6">
                            <button onClick={() => setShareOpen(false)} className="w-full py-3 border border-charcoal text-charcoal text-xs font-bold uppercase tracking-widest hover:bg-charcoal hover:text-white transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                    <style>{"@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }"}</style>
                </div>
            )}
        </>
    );
}

export default ViewTrip;
