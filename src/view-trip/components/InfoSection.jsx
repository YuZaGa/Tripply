import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
function InfoSection(trip) {
    trip=trip?.trip;
    console.log(trip);
  return (
    <div>
        <img src='' className='h-[340px] w-full object-cover rounded-xl'/>
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