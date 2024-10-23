import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
function InfoSection(trip) {
    trip=trip?.trip;
    console.log(trip);

    const [photoUrl,setPhotoUrl] = useState();

useEffect(()=>{
    trip&&GetPlacePhoto();
},[trip])


    const GetPlacePhoto=async()=>{
        const data = {
            textQuery:trip?.userselection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[3].name);

            const photoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(photoURL);
        })
    }
  return (
    <div>
        <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl'/>
        <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='fon-bold text-2xl'>{trip?.userselection?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 📅 {trip?.userselection?.noOfDays + ' Day'}</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 🤑 {trip?.userselection?.budget + ' Budget'}</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 🚶🏽‍♂️ {trip?.userselection?.traveler}</h2>
            </div>
        </div>
        <Button><IoIosSend/></Button>
        </div>
    </div>
  )
}

export default InfoSection