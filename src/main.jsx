import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/ui/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import ViewTrip from './view-trip/[tripId]/index.jsx'
import Footer from './view-trip/components/Footer.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<ViewTrip/>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header></Header>
    <Toaster/>
      <RouterProvider router={router}/>
      <Footer></Footer>
  </StrictMode>,
)
