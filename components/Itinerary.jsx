import React, { useEffect, useState, useRef } from "react";
import { GetPlaceDetails } from "@/service/GlobalApi";

const PHOTO_REF_URL =
    "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
    process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;

// Helper to parse time into hour/period blocks
function parseTime(timeStr) {
    if (!timeStr) return { hour: "--", period: "" };
    const parts = timeStr.split(" ");
    const timePart = parts[0];
    const period = parts[1] || "";
    const [hour, minute] = timePart.split(":");
    return { hour, minute: minute || "00", period };
}

// Convert "Day 1" number to word
const dayWords = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
function dayToWord(num) {
    return dayWords[num - 1] || String(num);
}

function TimelineCard({ item }) {
    const { hour, minute, period } = parseTime(item.time);
    const [photoUrl, setPhotoUrl] = useState(null);

    const category = item.category?.toLowerCase() || "";
    const isLandmark = category.includes("landmark");
    const isCulinary = category.includes("culinary") || category.includes("dining") || category.includes("food");
    const needsImage = isLandmark || isCulinary;

    useEffect(() => {
        if (needsImage && item.placeName) {
            fetchPlacePhoto();
        }
    }, [item.placeName]);

    const fetchPlacePhoto = async () => {
        try {
            const data = { textQuery: item.placeName };
            const resp = await GetPlaceDetails(data);
            if (resp.data.places?.[0]?.photos?.[0]?.name) {
                const url = PHOTO_REF_URL.replace("{NAME}", resp.data.places[0].photos[0].name);
                setPhotoUrl(url);
            }
        } catch (e) {
            console.error("Photo fetch failed for:", item.placeName, e);
        }
    };

    const imageUrl = photoUrl || null;

    return (
        <div className="relative pl-12 timeline-item group">
            {/* Timeline connector line */}
            <div className="timeline-line"></div>

            {/* Time label */}
            <div className="absolute left-0 top-1 w-12 text-right pr-4">
                <span className="block font-serif text-lg font-bold text-charcoal leading-none">
                    {hour}
                </span>
                <span className="block text-[10px] font-bold text-slate-muted uppercase tracking-wider">
                    {minute !== "00" ? minute : period}
                </span>
            </div>

            {/* Card content - varies by category */}
            {isLandmark && imageUrl ? (
                // Full-bleed image card for Landmarks
                <div className="bg-white group-hover:shadow-md transition-all duration-300">
                    <div
                        className="h-64 w-full bg-cover bg-center relative"
                        style={{ backgroundImage: "url('" + imageUrl + "')" }}
                    >
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                            <span className="inline-block px-2 py-px border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest mb-2 backdrop-blur-sm">
                                {item.category}
                            </span>
                            <h3 className="font-serif font-bold text-2xl text-white">
                                {item.placeName}
                            </h3>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                            {item.placeDetails}
                        </p>
                    </div>
                    {/* Metadata footer */}
                    {(item.timeToTravel || item.ticketPricing) && (
                        <div className="px-6 pb-4 flex items-center gap-4 text-xs text-slate-muted">
                            {item.timeToTravel && (
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    <span>{item.timeToTravel}</span>
                                </div>
                            )}
                            {item.ticketPricing && (
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">confirmation_number</span>
                                    <span>{item.ticketPricing}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : isCulinary && imageUrl ? (
                // Side image card for Culinary
                <div className="bg-white group-hover:shadow-md transition-all duration-300">
                    <div className="grid sm:grid-cols-3 gap-0">
                        <div
                            className="h-48 sm:h-auto bg-cover bg-center sm:col-span-1"
                            style={{ backgroundImage: "url('" + imageUrl + "')" }}
                        ></div>
                        <div className="p-6 sm:col-span-2 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-burnt-orange">
                                        {item.category}
                                    </span>
                                    {item.rating > 0 && (
                                        <div className="flex gap-0.5 text-orange-400">
                                            {[...Array(Math.min(Math.round(item.rating), 5))].map((_, i) => (
                                                <span key={i} className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-serif font-bold text-xl text-charcoal mb-2">
                                    {item.placeName}
                                </h3>
                                <p className="text-sm text-charcoal/70 leading-relaxed font-light line-clamp-3">
                                    {item.placeDetails}
                                </p>
                            </div>
                            {item.ticketPricing && (
                                <div className="mt-4 text-xs text-slate-muted">
                                    <span className="material-symbols-outlined text-sm align-middle mr-1">confirmation_number</span>
                                    {item.ticketPricing}
                                </div>
                            )}
                            {item.timeToTravel && (
                                <div className="mt-2 text-xs text-slate-muted">
                                    <span className="material-symbols-outlined text-sm align-middle mr-1">schedule</span>
                                    {item.timeToTravel}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // Default text card
                <div className="bg-white p-0 group-hover:shadow-md transition-all duration-300 border-l-4 border-transparent group-hover:border-burnt-orange">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                            <span className="inline-block px-2 py-px bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-widest">
                                {item.category}
                            </span>
                        </div>
                        <h3 className="font-serif font-bold text-2xl text-charcoal mb-2">
                            {item.placeName}
                        </h3>
                        <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                            {item.placeDetails}
                        </p>
                        {(item.timeToTravel || item.ticketPricing) && (
                            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center gap-4 text-xs text-slate-muted">
                                {item.timeToTravel && (
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                        <span>{item.timeToTravel}</span>
                                    </div>
                                )}
                                {item.ticketPricing && (
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">confirmation_number</span>
                                        <span>{item.ticketPricing}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function Itinerary({ trip, setActiveDay }) {
    const itinerary = trip?.tripData?.itinerary || [];
    const dayRefs = useRef({});

    // IntersectionObserver to detect which day is in view
    useEffect(() => {
        if (itinerary.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const dayNum = parseInt(entry.target.dataset.day, 10);
                        if (!isNaN(dayNum) && setActiveDay) {
                            setActiveDay(dayNum);
                        }
                    }
                });
            },
            { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
        );

        Object.values(dayRefs.current).forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [itinerary, setActiveDay]);

    if (itinerary.length === 0) return null;

    return (
        <div className="space-y-12">
            {itinerary.map((day, dayIndex) => (
                <div
                    key={dayIndex}
                    className="scroll-mt-32"
                    id={"day" + day.day}
                    data-day={day.day}
                    ref={(el) => (dayRefs.current[day.day] = el)}
                >
                    {/* Day Header */}
                    <div className="flex items-baseline justify-between mb-8 border-b border-stone-200 pb-4">
                        <div>
                            <span className="block text-xs font-bold text-burnt-orange uppercase tracking-[0.2em] mb-1">
                                Day {dayToWord(day.day)}
                            </span>
                            <h2 className="font-serif font-bold text-4xl text-charcoal">
                                {day.date}
                            </h2>
                        </div>
                        {day.activityLevel && (
                            <span className="hidden sm:inline-block px-4 py-1 border border-stone-200 text-stone-500 text-xs font-medium uppercase tracking-widest">
                                {day.activityLevel}
                            </span>
                        )}
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-6">
                        {day.plan?.map((item, itemIndex) => (
                            <TimelineCard key={itemIndex} item={item} />
                        ))}
                    </div>
                </div>
            ))}

            {/* CSS for timeline */}
            <style>{"\
        .timeline-line {\
          position: absolute;\
          left: 23px;\
          top: 45px;\
          bottom: -20px;\
          width: 1px;\
          background-color: #EB5E28;\
          opacity: 0.3;\
          z-index: 0;\
        }\
        .timeline-item:last-child .timeline-line {\
          display: none;\
        }\
      "}</style>
        </div>
    );
}

export default Itinerary;
