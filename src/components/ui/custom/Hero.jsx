import { Link } from "react-router-dom";
import { useState, useCallback } from "react";

function Hero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleParallax = useCallback((e) => {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    setOffset({ x, y });
  }, []);

  return (
    <main
      className="flex-grow flex items-center justify-center relative pt-4 overflow-hidden min-h-screen"
      onMouseMove={handleParallax}
    >
      <div className="absolute inset-0 pointer-events-none -z-10 bg-cream-50">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-100/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-100/40 rounded-full blur-[120px]"></div>
      </div>
      <div className="relative w-full max-w-7xl px-6 py-20 pb-20 lg:pb-20 flex flex-col items-center justify-center z-10 min-h-[calc(100vh-200px)] lg:min-h-[calc(100vh-200px)]">
        <div className="text-center max-w-4xl mx-auto mb-8 lg:mb-16 relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-charcoal/5 shadow-sm mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-burnt-orange">
              The New Standard
            </span>
          </div>
          <h1 className="font-editorial-headline font-bold text-6xl md:text-8xl leading-[1.05] tracking-tight mb-8 text-charcoal">
            Your next adventure, <br className="hidden md:block" />
            <span className="italic font-light text-slate-muted">curated by AI.</span>
          </h1>
          <p className="font-sans font-light text-lg md:text-xl text-slate-muted max-w-xl mx-auto leading-relaxed mb-12">
            Experience the art of travel planning. We transform complex logistics into a beautifully organized journey, tailored just for you.
          </p>
          <Link
            to="/create-trip"
            className="group relative inline-flex items-center justify-center h-[56px] px-10 rounded-full text-white bg-burnt-orange font-medium text-lg overflow-hidden shadow-lg hover:bg-charcoal/90 transition-colors"
          >
            <span className="relative z-10 mr-2 font-serif italic pr-1">Start Planning</span>
            <span className="material-symbols-outlined relative z-10 transition-transform group-hover:translate-x-1 text-sm">
              arrow_forward
            </span>
          </Link>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-muted font-medium">
            <span className="flex -space-x-2 mr-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-cream-50"></div>
              <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-cream-50"></div>
              <div className="w-6 h-6 rounded-full bg-slate-400 border-2 border-cream-50"></div>
            </span>
            <span>Join 10,000+ discerning travelers</span>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none z-0">

          {/* Tokyo Card */}
          <div
            className="absolute top-[5%] lg:top-[10%] left-[8%] sm:left-[8%] lg:left-[2%] xl:left-[8%] w-[180px] sm:w-[220px] lg:w-[300px] opacity-70 lg:opacity-100"
            style={{ transform: `translateX(${offset.x * 0.03 * 100}px) translateY(${offset.y * 0.03 * 100}px)` }}
          >
            <div className="bg-white p-3 transform -rotate-3 hover:rotate-0 transition-transform duration-500 animate-float pointer-events-auto cursor-default shadow-xl">
              <div className="relative h-32 lg:h-40 overflow-hidden mb-4 border border-charcoal/5">
                <img
                  alt="Tokyo street scene"
                  className="w-full h-full object-cover filter contrast-110 sepia-[0.1]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEdCV_N3YJFMY278NEVoH1xt-57_X-VeFKd5ag3Rnp-ELdA9bkZvzjIktgRa75lrutGwCmGyO6dEjpAiozgL6UhryFT0H3obPoLRscM_YaosxwunRyTHFfCaf8r6uTsI6yLCcIVVRNnxqwYPt6g6ZBx_ysaDAHCugA_7VkTvVQK82N-58NxrsIU37X5F2QH8IvccctUbcLAKvOZE9A_u_y7muZ3hmbj7is4_CwJVJcy1B61g4FQJhnogSK_c-2HSf0Z0dzqNqzcLE"
                />
                <div className="absolute top-0 left-0 w-full h-full ring-1 ring-inset ring-black/5"></div>
              </div>
              <div className="px-2 pb-2">
                <div className="flex justify-between items-baseline mb-2 border-b border-charcoal/10 pb-2">
                  <h3 className="font-serif font-bold text-xl lg:text-2xl text-charcoal">Tokyo</h3>
                  <span className="font-sans text-[10px] lg:text-xs font-semibold tracking-wider text-burnt-orange uppercase">5 Days</span>
                </div>
                <p className="font-serif italic text-slate-muted text-xs lg:text-sm">A curated guide to urban elegance &amp; culinary delights.</p>
              </div>
            </div>
          </div>

          {/* Paris Card */}
          <div
            className="absolute top-[40%] sm:top-[45%] lg:bottom-[10%] lg:top-auto right-[-2%] sm:right-[5%] lg:right-[2%] xl:right-[8%] w-[180px] sm:w-[220px] lg:w-[320px] opacity-70 lg:opacity-100"
            style={{ transform: `translateX(${offset.x * -0.04 * 100}px) translateY(${offset.y * -0.04 * 100}px)` }}
          >
            <div className="bg-white p-3 transform rotate-3 hover:rotate-0 transition-transform duration-500 animate-float-reverse pointer-events-auto cursor-default shadow-xl">
              <div className="flex items-center justify-between mb-2 lg:mb-4 border-b border-charcoal/10 pb-2 lg:pb-3 mx-2">
                <div className="flex items-center gap-2 lg:gap-3">
                  <span className="text-[10px] lg:text-xs font-bold tracking-widest text-charcoal uppercase">Itinerary #042</span>
                </div>
                <span className="text-burnt-orange font-serif italic text-base lg:text-lg">Parisian Life</span>
              </div>
              <div className="relative h-24 lg:h-32 overflow-hidden group mb-2 lg:mb-3 mx-2">
                <img
                  alt="Paris view"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-[0.8]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz2E03COe1l5Ha1Th6BETpu8zTWdulN3JOukKZe2ic8J4VcpCRAe1M4a2YRDPWlDbLxqELrCX6Yxm9Qang_oLWGVTsQPY2sqY36h1o_5h1lB7rq3xhN1SQ7XnfRKiobMxQ-cQ2dKtw_vqipNAPJjV7_mv5P8dZvta3KsjRkPMBoxToTwkHkoBdToMfyyVUinIQCDV3h49HzUGhst9R3MnXnEwrs4hp-W0vyA3YsP0ykTsIQI15UZDFM8vq1ELzAEtR9_h2t7iS1-s"
                />
              </div>
              <div className="px-2 pb-1 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] lg:text-xs text-slate-muted uppercase tracking-wider font-semibold">Activity</span>
                  <span className="font-serif text-base lg:text-lg text-charcoal">Le Marais Food Tour</span>
                </div>
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal">
                  <span className="material-symbols-outlined text-[14px] lg:text-[16px]">arrow_outward</span>
                </div>
              </div>
            </div>
          </div>

          {/* Iceland Card - Hidden on mobile */}
          <div
            className="hidden lg:block absolute top-[25%] right-[12%] xl:right-[18%] w-[220px] opacity-80"
            style={{ transform: `translateX(${offset.x * 0.02 * 100}px) translateY(${offset.y * 0.02 * 100}px)` }}
          >
            <div className="bg-white p-2 shadow-xl transform rotate-6 animate-float-slow border border-white">
              <div className="relative h-28 overflow-hidden mb-2">
                <img
                  alt="Iceland road"
                  className="w-full h-full object-cover filter grayscale-[0.2]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5mD_bHBAyYT_R0Ayir5XV_FKDgEL1lmdxV6ooXwILJ7wbbGMaMLcu8VKADKaa2-VK9a5_DlLEPrydas62JRowdeh53zxC9t6eEneywVOMOuYnQwcJv0hnwBmgk_jUZl24pdBwKwVx_zbUDdfA2GpYioGx9s_Gjs2E76U6-y1ypUv-HQsyXFAE8_KprMLFv2OVZMCUzgcnT35_D84h5IfnUZOFB47BuC-PHjZ6R8F65pyOzDU5Klx8zNka3B64BIKck-3BuLH1ym8"
                />
              </div>
              <div className="flex justify-between items-center px-2 py-1 bg-cream-50">
                <h3 className="font-serif font-bold text-md text-charcoal">Iceland</h3>
                <span className="text-xs font-sans text-slate-muted uppercase tracking-wide">Expedition</span>
              </div>
            </div>
          </div>

          <div
            className="absolute top-[20%] lg:top-[25%] left-[5%] lg:left-[20%] opacity-40 lg:opacity-40"
            style={{ transform: `translateX(${offset.x * 0.05 * 100}px) translateY(${offset.y * 0.05 * 100}px)` }}
          >
            <div className="text-7xl lg:text-9xl font-serif italic text-charcoal/5 pointer-events-none select-none">Travel</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;

