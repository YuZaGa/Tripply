import { Button } from "@/components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";


function PlaceCardItem(place) {
    place=place?.place;
  return (

    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target="blank">
        <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img src='' className='w-[130px] h-[130px] rounded-xl'/>
        <div className="flex flex-col justify-between flex-grow">
            <h2 className="font-bold text-lg">{place?.placeName}</h2>
            <p className="text-sm text-gray-400">{place.placeDetails}</p>
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