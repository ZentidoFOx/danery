"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { imageConfig, getImageUrl } from "@/lib/imageConfig";

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [heroImage, setHeroImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const resizeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Memoized confetti handler
  const handleConfetti = useCallback(() => {
    confetti({
      particleCount: isMobile ? 40 : 80,
      spread: isMobile ? 50 : 80,
      origin: { y: 0.5 },
      colors: ['#8C5A38', '#C7B299', '#F4F1EB', '#3A4E6A'],
    });
  }, [isMobile]);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    
    // Cargar imagen apropiada inmediatamente
    const img = new Image();
    img.src = mobile ? imageConfig.hero.vertical : imageConfig.hero.horizontal;
    
    if (img.complete) {
      setHeroImage(img.src);
      setIsLoaded(true);
    } else {
      img.onload = () => {
        setHeroImage(img.src);
        setIsLoaded(true);
      };
    }

    // Manejar resize con debounce
    const handleResize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      
      resizeTimerRef.current = setTimeout(() => {
        const newMobile = window.innerWidth < 768;
        if (newMobile !== mobile) {
          setIsMobile(newMobile);
          setHeroImage(newMobile ? imageConfig.hero.vertical : imageConfig.hero.horizontal);
        }
      }, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Confeti al cargar la página
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        confetti({
          particleCount: isMobile ? 50 : 100,
          spread: isMobile ? 60 : 100,
          origin: { y: 0.6 },
          colors: ['#8C5A38', '#C7B299', '#F4F1EB', '#3A4E6A'],
        });
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, isMobile]);


  return (
    <section 
      ref={heroRef} 
      className="relative h-screen w-full overflow-hidden cursor-pointer"
      onClick={handleConfetti}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundImage: heroImage ? `url('${heroImage}')` : 'none',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundAttachment: 'scroll',
            backgroundRepeat: 'no-repeat',
            opacity: isLoaded && heroImage ? 1 : 0,
          }}
        />
        {/* Degradado con paleta personalizada - Azul Pizarra */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A5F7A]/75 via-[#3A4E6A]/65 to-[#2C3E50]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/85 via-[#4A5F7A]/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 py-8 text-center">
        {/* Top Border */}
        <div className="mb-4 md:mb-6 flex items-center gap-3 sm:gap-4">
          <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#B8C5D6]/70" />
          <Heart size={isMobile ? 20 : 20} className="text-[#D4D9E0]/90 fill-[#8B95A5]/50" />
          <div className="h-px w-10 sm:w-12 bg-gradient-to-l from-transparent to-[#B8C5D6]/70" />
        </div>

        {/* Title */}
        <h2 className="mb-4 md:mb-6 font-elegant text-white text-base sm:text-base md:text-lg tracking-[0.2em] uppercase font-light drop-shadow-lg relative">
          ¡NOS CASAMOS!
        </h2>

        {/* Names */}
        <div className="mb-6 md:mb-8">
          <h1
            className={`font-script text-white text-7xl sm:text-7xl md:text-8xl lg:text-9xl leading-tight drop-shadow-2xl cursor-pointer px-4 flex items-center justify-center gap-4 sm:gap-4 md:gap-6 ${isMobile ? 'flex-col' : 'flex-row flex-wrap'}`}
            onClick={handleConfetti}
          >
            <span>Salvador</span>
            <span className={isMobile ? 'my-0' : ''}>
              <Heart size={isMobile ? 40 : 40} className="text-[#E8EBF0] fill-[#9BA5B5]/60 drop-shadow-lg" />
            </span>
            <span>Danery</span>
          </h1>
          
          {/* Underline */}
          <div className="mt-6 flex justify-center">
            <div className="w-32 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#B8C5D6]/70 to-transparent" />
          </div>
        </div>

        {/* Date */}
        <div className="mb-4 backdrop-blur-md bg-[#E8EBF0]/10 rounded-full px-8 sm:px-8 py-3 sm:py-3 border-2 border-[#B8C5D6]/40">
          <p className="font-elegant text-white text-base sm:text-base md:text-lg lg:text-xl tracking-wider font-light drop-shadow-lg">
            07 de Diciembre 2025
          </p>
        </div>

        {/* Location */}
        <div className="mb-6 text-center">
          <p className="text-[#F4F1EB] text-sm sm:text-base md:text-lg font-light drop-shadow-lg px-4">
            Iglesia Tricities, 221 S Benton St, Kennewick
          </p>
        </div>

        {/* Bottom Border */}
        <div className="mt-6 md:mt-8 flex items-center gap-4 sm:gap-6">
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#B8C5D6]/70" />
          <Heart size={isMobile ? 22 : 24} className="text-[#D4D9E0]/90 fill-[#8B95A5]/50" />
          <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#B8C5D6]/70" />
        </div>
      </div>

      {/* Cloud Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-10 h-20 sm:h-24 md:h-32 lg:h-40 xl:h-48"
        style={{
          backgroundImage: `url('${getImageUrl(imageConfig.clouds.bottom, imageConfig.fallback.clouds)}')`,
          backgroundPosition: 'bottom center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
        }}
      />
    </section>
  );
}