import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function PlaceCardItem(place) {
    place=place?.place;
    const [photoURL, setPhotoUrl] = useState();

    useEffect(() => {
      place && GetPlacePhoto();
    }, [place]);
  
    const GetPlacePhoto = async () => {
      const data = {
        textQuery: place?.placeName + place.placeDetails,
      };
      const result = await GetPlaceDetails(data).then((resp) => {
  
        const photoURL = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        );
        setPhotoUrl(photoURL);
      });
    };


  return (

    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target="blank">
        <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img src={photoURL} className='w-[130px] h-[130px] rounded-xl'/>
        <div className="flex flex-col justify-between flex-grow">
            <h2 className="font-bold text-lg">{place?.placeName}</h2>
            <p className="text-sm text-gray-400">{place.placeDetails}</p>
            <h2 className="font-semibold text-sm">Price : <span className="text-green-500">{place?.ticketPricing}</span></h2>
                <div className="flex justify-between items-center mt-auto">
                <h2>🕔 {place.timeToTravel}</h2>
                <Button size="sm"><FaMapLocationDot /></Button>
                </div>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem