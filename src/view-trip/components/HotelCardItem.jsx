import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '@/service/GlobalApi';

function HotelCardItem(hotel) {
    const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
    hotel=hotel.hotel;

    const [photoURL, setPhotoUrl] = useState();

    useEffect(() => {
      hotel && GetPlacePhoto();
    }, [hotel]);
  
    const GetPlacePhoto = async () => {
      const data = {
        textQuery: hotel?.hotelName,
      };
      const result = await GetPlaceDetails(data).then((resp) => {
        console.log(resp.data.places[0].photos[3].name);
  
        const photoURL = PHOTO_REF_URL.replace(
            "{NAME}",
            resp.data.places[0].photos[3].name
          );
        console.log(photoURL);
        setPhotoUrl(photoURL);
      });
    };

  return (
    <div><Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+ ',' +hotel?.hotelAddress} target='_blank'>
    <div  className='hover:scale-110 transition-all cursor-pointer'>
        <img src={photoURL} className='rounded-lg h-[200px] w-full object-cover'/>
        <div className='my-2 flex flex-col gap-2'>
            <h2 className='font-medium'>{hotel?.hotelName}</h2>
            <h2 className='text-xs text-gray-500'>📌 {hotel?.hotelAddress}</h2>
            <h2>💸 {hotel?.price}</h2>
            <h2>🌟 {hotel?.rating}</h2>
        </div>
    </div>
    </Link> </div>
  )
}

export default HotelCardItem