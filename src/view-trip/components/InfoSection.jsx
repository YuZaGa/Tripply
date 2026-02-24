import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalApi";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip, activeDay, setActiveDay }) {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.jpg");
  const tripData = trip?.tripData?.tripDetails;
  const userSelection = trip?.userselection;

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    if (!userSelection?.location?.label) return;
    const data = { textQuery: userSelection?.location?.label };
    try {
      const resp = await GetPlaceDetails(data);
      if (resp.data.places[0]?.photos[3]?.name) {
        const photoURL = PHOTO_REF_URL.replace("{NAME}", resp.data.places[0].photos[3].name);
        setPhotoUrl(photoURL);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const locationParts = tripData?.location?.split(",") || userSelection?.location?.label?.split(",") || ["Unknown", "Location"];
  const mainLocation = locationParts[0];
  const subLocation = tripData?.theme || "Chronicles";
  // Extract date from itinerary first day, or userSelection
  const firstDate = trip?.tripData?.itinerary?.[0]?.date || "";
  // Try to extract month + year from the date string like "Thursday, Oct 12" -> derive year from context
  const startDateStr = firstDate ? firstDate.split(", ").slice(1).join(", ") : (userSelection?.startDate || "");

  const bgImage = "url('" + photoUrl + "')";

  return (
    <div className="space-y-8">
      {/* Magazine Cover Card */}
      <div className="group relative overflow-hidden bg-white shadow-sm transition-all duration-500 hover:-translate-y-1">
        <div
          className="h-64 w-full bg-cover bg-center relative"
          style={{ backgroundImage: bgImage }}
        >
          <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 transition-colors"></div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
            {startDateStr}
          </div>
        </div>

        <div className="p-6 relative">
          <div className="absolute -top-10 left-6 bg-burnt-orange text-white p-3 shadow-lg">
            <span className="material-symbols-outlined text-2xl">near_me</span>
          </div>

          <h1 className="font-serif font-bold text-4xl leading-none text-charcoal mb-2 mt-2">
            {mainLocation}<br />
            <span className="text-2xl italic font-normal text-slate-muted">{subLocation}</span>
          </h1>

          <div className="w-10 h-1 bg-burnt-orange my-4"></div>

          <div className="mt-6">
            <div className="text-left">
              <p className="text-xs text-slate-muted uppercase tracking-wider">Est. Budget</p>
              <p className="font-serif text-lg font-bold text-burnt-orange mt-1">
                {tripData?.estimatedBudget
                  ? tripData.estimatedBudget
                  : "Essential budget for " + (userSelection?.traveler || "travelers")
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links inside Sidebar */}
      <nav className="pl-2 border-l border-stone-200 hidden lg:block">
        <ul className="space-y-4">
          {trip?.tripData?.itinerary?.map((day, index) => {
            const isActive = activeDay === day.day;
            return (
              <li key={index}>
                <a
                  className={"group flex items-center gap-3 transition-colors " + (isActive ? "text-burnt-orange" : "text-slate-muted hover:text-charcoal")}
                  href={"#day" + day.day}
                  onClick={() => setActiveDay(day.day)}
                >
                  <span className={"text-xs font-bold font-serif italic " + (isActive ? "" : "opacity-50")}>{"0" + day.day}</span>
                  <span className={(isActive ? "font-bold" : "font-medium") + " text-sm uppercase tracking-wider group-hover:translate-x-1 transition-transform line-clamp-1"}>{day.theme}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Weather Widget */}
      {tripData?.weatherForecast && (
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 border border-orange-100 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 text-orange-200 opacity-20 group-hover:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-9xl">
              {(tripData.weatherForecast.condition || "").toLowerCase().includes("rain") ? "rainy"
                : (tripData.weatherForecast.condition || "").toLowerCase().includes("cloud") ? "cloud"
                  : (tripData.weatherForecast.condition || "").toLowerCase().includes("snow") ? "ac_unit"
                    : "wb_sunny"}
            </span>
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-800/60">Forecast</span>
              <span className="material-symbols-outlined text-3xl text-orange-400">
                {(tripData.weatherForecast.condition || "").toLowerCase().includes("rain") ? "rainy"
                  : (tripData.weatherForecast.condition || "").toLowerCase().includes("cloud") ? "cloud"
                    : (tripData.weatherForecast.condition || "").toLowerCase().includes("snow") ? "ac_unit"
                      : "wb_sunny"}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl text-charcoal">
                {tripData.weatherForecast.temperature
                  ? tripData.weatherForecast.temperature.split(" ")[0]
                  : "--"}
              </span>
              <span className="text-lg text-slate-muted font-serif italic truncate">{mainLocation}</span>
            </div>
            <p className="text-xs text-slate-muted mt-2 uppercase tracking-wide">
              {tripData.weatherForecast.condition || "Check local forecast"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoSection;
