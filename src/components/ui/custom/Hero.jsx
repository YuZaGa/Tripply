import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center gap-9'><h1 className='font-extrabold text-[45px] text-center mt-16 text-orange-600'>Discover your next adventure with AI:</h1>
    <p className='text-xl text-gray-500 text-center'> Your personal trip planner</p>
    
    <Link to={'/create-trip'}>
    <Button>Get Started, It&apos;s Free</Button>
    </Link>


    </div>
  )
}

export default Hero