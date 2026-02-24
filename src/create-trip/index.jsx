import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  SelectTravelsList,
  BudgetOptionsList,
  AI_PROMPT,
} from "@/constants/options.jsx";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import LoadingScreen from "@/components/ui/custom/LoadingScreen";


function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({
    noOfDays: 3
  });
  const [loading, setLoading] = useState(false);
  const [travelStyle, setTravelStyle] = useState("");
  const [interests, setInterests] = useState([]);
  const [pace, setPace] = useState(50);
  const [startDate, setStartDate] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInterestToggle = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const OnGenerateTrip = async () => {
    if (
      (formData?.noOfDays > 20 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler ||
      !travelStyle ||
      !startDate
    ) {
      toast("Please fill all details & choose a Start Date.");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays || 3)
      .replace("{travler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{travelStyle}", travelStyle)
      .replace("{interests}", interests.length > 0 ? interests.join(", ") : "general sightseeing")
      .replace("{pace}", pace)
      .replace("{startDate}", format(startDate, 'MMMM do, yyyy'));

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (Tripdata) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userselection: {
        ...formData,
        travelStyle,
        interests,
        pace,
        startDate: startDate ? format(startDate, 'MMMM do, yyyy') : null
      },
      tripData: JSON.parse(Tripdata),
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  };

  const specificInterestsOptions = [
    "Architecture", "Fine Dining", "Modern Art", "Hiking", "Nightlife",
    "Photography", "Coffee Culture", "Wellness & Spa", "History"
  ];

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-cream-50 text-charcoal font-sans antialiased min-h-screen pt-4 pb-20 px-6">
      <style>{`
        .custom-checkbox:checked + div { border-color: #EB5E28; background-color: #ffffff; box-shadow: 0 10px 30px -5px rgba(235, 94, 40, 0.15); }
        .custom-checkbox:checked + div .check-icon { opacity: 1; transform: scale(1); }
        .tag-checkbox:checked + span { background-color: #EB5E28; color: white; border-color: #EB5E28; }
        .option-card-radio:checked + div { border-color: #EB5E28; background-color: #ffffff; box-shadow: 0 4px 20px -2px rgba(235, 94, 40, 0.15); }
        .option-card-radio:checked + div .emoji-icon { transform: scale(1.1); }
      `}</style>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4 pt-8 border-t border-charcoal/10">
          <span className="text-xs font-bold tracking-[0.2em] text-burnt-orange uppercase">Curate Your Journey</span>
          <h1 className="font-editorial-headline text-5xl md:text-6xl text-charcoal font-medium leading-tight">
            How do you wish to <br /><span className="italic text-slate-muted">experience the world?</span>
          </h1>
          <p className="text-slate-muted font-light max-w-xl mx-auto mt-4 text-lg">
            Define the parameters of your next escape, and let our editorial AI architect your perfect itinerary.
          </p>
        </div>

        <div className="space-y-16">
          <section className="space-y-8">
            <div className="flex items-center justify-between mb-8 border-b border-charcoal/10 pb-4">
              <h2 className="font-serif text-2xl text-charcoal italic">01. The Basics</h2>
              <span className="text-xs uppercase tracking-widest text-slate-muted">Where & When</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-medium uppercase tracking-wider text-charcoal">Where to?</h2>
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  placeholder: "Enter destination city...",
                  onChange: (v) => {
                    setPlace(v);
                    handleInputChange("location", v);
                  },
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      padding: '12px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '4px',
                      fontFamily: 'Inter',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(255,255,255,0.7)',
                    })
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 flex flex-col">
                <h2 className="text-sm font-medium uppercase tracking-wider text-charcoal">Start Date</h2>
                <div className="h-full">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    placeholderText="Select your departure date"
                    wrapperClassName="w-full"
                    className="w-full p-4 h-[62px] border border-slate-200 rounded-sm font-sans text-charcoal bg-white/70 focus:outline-none focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-medium uppercase tracking-wider text-charcoal">Duration</h2>
                <div className="flex items-center justify-between bg-white/70 border border-slate-200 rounded-sm p-4 h-[62px]">
                  <span className="text-xs uppercase font-medium tracking-widest text-slate-muted">Days</span>
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleInputChange("noOfDays", Math.max(1, (formData.noOfDays || 3) - 1))}
                      className="w-8 h-8 rounded-full border border-charcoal/30 flex items-center justify-center text-charcoal hover:border-burnt-orange hover:text-burnt-orange transition-colors"
                    >
                      <span className="text-xl font-light">-</span>
                    </button>
                    <span className="font-serif text-2xl text-charcoal min-w-[30px] text-center">
                      {formData.noOfDays || 3}
                    </span>
                    <button
                      onClick={() => handleInputChange("noOfDays", (formData.noOfDays || 3) + 1)}
                      className="w-8 h-8 rounded-full border border-charcoal/30 flex items-center justify-center text-charcoal hover:border-burnt-orange hover:text-burnt-orange transition-colors"
                    >
                      <span className="text-xl font-light">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center justify-between mb-8 border-b border-charcoal/10 pb-4">
              <h2 className="font-serif text-2xl text-charcoal italic">02. Budget</h2>
              <span className="text-xs uppercase tracking-widest text-slate-muted">Per Person</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BudgetOptionsList.map((item, index) => (
                <label key={index} className="cursor-pointer relative group block">
                  <input
                    className="sr-only option-card-radio"
                    name="budget"
                    type="radio"
                    value={item.title}
                    checked={formData?.budget === item.title}
                    onChange={() => handleInputChange("budget", item.title)}
                  />
                  <div className="p-6 bg-white/50 border border-transparent rounded-sm hover:border-slate-200 transition-all duration-300 h-full flex flex-col items-center text-center space-y-3 shadow-sm">
                    <div className="mb-1 emoji-icon transition-transform duration-300">
                      <span className="material-symbols-outlined text-[32px] text-burnt-orange">{item.icon}</span>
                    </div>
                    <h3 className="font-serif text-lg text-charcoal">{item.title}</h3>
                    <p className="text-xs text-slate-muted font-light">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </section >

          < section >
            <div className="flex items-center justify-between mb-8 border-b border-charcoal/10 pb-4">
              <h2 className="font-serif text-2xl text-charcoal italic">03. Travel Companions</h2>
              <span className="text-xs uppercase tracking-widest text-slate-muted">Who's Coming?</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SelectTravelsList.map((item, index) => (
                <label key={index} className="cursor-pointer relative group block">
                  <input
                    className="sr-only option-card-radio"
                    name="companion"
                    type="radio"
                    value={item.people}
                    checked={formData?.traveler === item.people}
                    onChange={() => handleInputChange("traveler", item.people)}
                  />
                  <div className="p-5 bg-white/50 border border-transparent rounded-sm hover:border-slate-200 transition-all duration-300 h-full flex flex-col items-center text-center space-y-2 shadow-sm">
                    <div className="mb-1 emoji-icon transition-transform duration-300">
                      <span className="material-symbols-outlined text-[28px] text-burnt-orange">{item.icon}</span>
                    </div>
                    <h3 className="font-serif text-base text-charcoal">{item.title}</h3>
                    <p className="text-[10px] text-slate-muted font-light uppercase tracking-wide">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </section >

          < section >
            <div className="flex items-center justify-between mb-8 border-b border-charcoal/10 pb-4">
              <h2 className="font-serif text-2xl text-charcoal italic">04. Travel Style</h2>
              <span className="text-xs uppercase tracking-widest text-slate-muted">Select One</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { id: 'wanderer', title: 'The Wanderer', desc: 'You prefer the path less traveled. Hidden gems, scenic routes, and spontaneous discoveries define your journey.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5mD_bHBAyYT_R0Ayir5XV_FKDgEL1lmdxV6ooXwILJ7wbbGMaMLcu8VKADKaa2-VK9a5_DlLEPrydas62JRowdeh53zxC9t6eEneywVOMOuYnQwcJv0hnwBmgk_jUZl24pdBwKwVx_zbUDdfA2GpYioGx9s_Gjs2E76U6-y1ypUv-HQsyXFAE8_KprMLFv2OVZMCUzgcnT35_D84h5IfnUZOFB47BuC-PHjZ6R8F65pyOzDU5Klx8zNka3B64BIKck-3BuLH1ym8' },
                { id: 'curator', title: 'The Curator', desc: 'History, art, and culture are your compass. You seek deep understanding, guided tours, and architectural marvels.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz2E03COe1l5Ha1Th6BETpu8zTWdulN3JOukKZe2ic8J4VcpCRAe1M4a2YRDPWlDbLxqELrCX6Yxm9Qang_oLWGVTsQPY2sqY36h1o_5h1lB7rq3xhN1SQ7XnfRKiobMxQ-cQ2dKtw_vqipNAPJjV7_mv5P8dZvta3KsjRkPMBoxToTwkHkoBdToMfyyVUinIQCDV3h49HzUGhst9R3MnXnEwrs4hp-W0vyA3YsP0ykTsIQI15UZDFM8vq1ELzAEtR9_h2t7iS1-s' },
                { id: 'epicurean', title: 'The Epicurean', desc: 'You travel taste-buds first. Michelin stars, local street food, and wine tastings are the highlights of your trip.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEdCV_N3YJFMY278NEVoH1xt-57_X-VeFKd5ag3Rnp-ELdA9bkZvzjIktgRa75lrutGwCmGyO6dEjpAiozgL6UhryFT0H3obPoLRscM_YaosxwunRyTHFfCaf8r6uTsI6yLCcIVVRNnxqwYPt6g6ZBx_ysaDAHCugA_7VkTvVQK82N-58NxrsIU37X5F2QH8IvccctUbcLAKvOZE9A_u_y7muZ3hmbj7is4_CwJVJcy1B61g4FQJhnogSK_c-2HSf0Z0dzqNqzcLE' }
              ].map((style) => (
                <label key={style.id} className="group cursor-pointer relative block">
                  <input
                    className="peer sr-only custom-checkbox"
                    name="travel_style"
                    type="radio"
                    value={style.id}
                    checked={travelStyle === style.id}
                    onChange={() => setTravelStyle(style.id)}
                  />
                  <div className="relative h-[420px] bg-white border border-transparent transition-all duration-300 peer-checked:border-burnt-orange shadow-sm overflow-hidden">
                    <div className="h-64 overflow-hidden relative">
                      <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors z-10"></div>
                      <img alt={style.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" src={style.img} />
                      <div className="absolute top-4 right-4 z-20 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md check-icon opacity-0 transition-all duration-300 transform scale-75 text-burnt-orange">
                        <span className="material-symbols-outlined text-sm font-bold">check</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl mb-2 text-charcoal">{style.title}</h3>
                      <p className="text-sm text-slate-muted leading-relaxed font-light">{style.desc}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-burnt-orange transform scale-x-0 group-hover:scale-x-100 peer-checked:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </label>
              ))}
            </div>
          </section >

          < section >
            <div className="flex items-center justify-between mb-8 border-b border-charcoal/10 pb-4">
              <h2 className="font-serif text-2xl text-charcoal italic">05. Specific Interests</h2>
              <span className="text-xs uppercase tracking-widest text-slate-muted">Select Multiple</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {specificInterestsOptions.map((item) => (
                <label key={item} className="cursor-pointer block">
                  <input
                    className="sr-only tag-checkbox"
                    type="checkbox"
                    checked={interests.includes(item)}
                    onChange={() => handleInterestToggle(item)}
                  />
                  <span className="inline-block px-6 py-2 border border-charcoal/20 text-slate-muted rounded-full text-sm transition-all duration-200 hover:border-burnt-orange hover:text-burnt-orange">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </section >

          < section >
            <div className="flex items-center justify-between mb-8 border-b border-charcoal/10 pb-4">
              <h2 className="font-serif text-2xl text-charcoal italic">06. Travel Pace</h2>
              <span className="text-xs uppercase tracking-widest text-slate-muted">Intensity</span>
            </div>
            <div className="relative pt-8 pb-4 px-2">
              <input
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-burnt-orange"
                max="100"
                min="1"
                type="range"
                value={pace}
                onChange={(e) => setPace(parseInt(e.target.value))}
              />
              <div className="flex justify-between mt-4 text-xs uppercase tracking-widest text-slate-muted font-medium">
                <span>Relaxed</span>
                <span>Balanced</span>
                <span>Intense</span>
              </div>
            </div>
          </section >

          <div className="pt-8 flex flex-col items-center">
            <button
              onClick={OnGenerateTrip}
              disabled={loading}
              className="group relative inline-flex items-center justify-center bg-burnt-orange hover:bg-burnt-orange/90 text-white text-lg font-medium px-12 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
              type="button"
            >
              <span className="font-serif italic pr-2">
                {loading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mr-2 inline" /> : null}
                {loading ? 'Consulting AI...' : 'Compose Itinerary'}
              </span>
              {!loading && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>}
            </button>
            <p className="mt-6 text-sm text-slate-muted italic font-serif">Estimated build time: <span className="text-burnt-orange">~30 seconds</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
