import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalApi";


const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;

function HotelCard({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: hotel?.hotelName };
      const resp = await GetPlaceDetails(data);
      if (resp.data.places?.[0]?.photos?.[3]?.name) {
        setPhotoUrl(
          PHOTO_REF_URL.replace("{NAME}", resp.data.places[0].photos[3].name)
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress}`;

  return (
    <a href={mapsUrl} target="_blank" className="block">
      <div className="bg-white shadow-sm group">
        <div
          className="relative h-56 bg-cover bg-center"
          style={{
            backgroundImage: photoUrl
              ? `url('${photoUrl}')`
              : `url('${hotel?.hotelImageUrl}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
          <div className="absolute top-0 left-0 bg-white px-4 py-3 border-b border-r border-stone-100">
            <h3 className="font-serif text-lg font-bold text-charcoal italic">
              The Stay
            </h3>
          </div>
          <div className="absolute bottom-4 right-4 bg-charcoal text-white px-3 py-1 text-xs font-bold tracking-widest uppercase shadow-lg">
            {hotel?.price}
          </div>
        </div>
        <div className="p-6 border-t border-stone-100">
          <h4 className="font-serif font-bold text-xl text-charcoal mb-1">
            {hotel?.hotelName}
          </h4>
          <div className="flex items-center gap-1 mb-3">
            <span className="material-symbols-outlined text-sm text-burnt-orange filled">
              star
            </span>
            <span className="text-xs font-bold text-charcoal">
              {hotel?.rating}
            </span>
            <span className="text-xs text-slate-muted font-light ml-1">
              {hotel?.rating >= 4.5 ? "Excellent" : hotel?.rating >= 4 ? "Very Good" : "Good"}
            </span>
          </div>
          <p className="text-xs text-charcoal/70 leading-relaxed mb-4 font-light line-clamp-3">
            {hotel?.description}
          </p>
          <span className="block w-full text-center py-3 border border-charcoal text-charcoal text-xs font-bold uppercase tracking-widest hover:bg-charcoal hover:text-white transition-colors">
            View Property
          </span>
        </div>
      </div>
    </a>
  );
}

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotels || [];

  if (hotels.length === 0) return null;

  return (
    <div className="space-y-6">
      {hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </div>
  );
}

export default Hotels;