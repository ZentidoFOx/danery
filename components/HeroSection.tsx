"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { imageConfig, getImageUrl } from "@/lib/imageConfig";
import gsap from "gsap";

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [heroImage, setHeroImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const resizeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnimated = useRef(false); // Bandera para evitar re-animaciones
  
  // Refs para GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const topBorderRef = useRef<HTMLDivElement>(null);
  const topLineLeftRef = useRef<HTMLDivElement>(null);
  const topLineRightRef = useRef<HTMLDivElement>(null);
  const topHeartRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const salvadorRef = useRef<HTMLSpanElement>(null);
  const daneryRef = useRef<HTMLSpanElement>(null);
  const heartRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const dateShineRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const bottomBorderRef = useRef<HTMLDivElement>(null);
  const bottomLineLeftRef = useRef<HTMLDivElement>(null);
  const bottomLineRightRef = useRef<HTMLDivElement>(null);
  const bottomHeartRef = useRef<HTMLDivElement>(null);

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

  // GSAP Animations - Todas las animaciones
  useEffect(() => {
    if (!isLoaded || hasAnimated.current) return;
    
    hasAnimated.current = true; // Marcar como animado

    const ctx = gsap.context(() => {
      // Timeline principal
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Container fade in
      tl.from(containerRef.current, {
        opacity: 0,
        duration: 0.5,
      });

      // Top border animations
      tl.from(topLineLeftRef.current, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 0.8,
      }, 0.5);

      tl.from(topLineRightRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
      }, 0.5);

      tl.from(topHeartRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
      }, 0.8);

      // Subtitle animation
      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
      }, 0.9);

      // Names animation - solo los spans internos
      tl.from(salvadorRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
      }, 1.1);

      tl.from(heartRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
      }, 1.3);

      tl.from(daneryRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
      }, 1.1);

      // Underline animation
      tl.from(underlineRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 1,
      }, 1.8);

      // Date animation with 3D rotation
      tl.from(dateRef.current, {
        rotateY: 180,
        opacity: 0,
        ease: "back.out(1.7)",
        duration: 1,
      }, 2);

      // Location animation
      tl.from(locationRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      }, 2.3);

      // Bottom border animations
      tl.from(bottomLineLeftRef.current, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 1,
      }, 2.5);

      tl.from(bottomLineRightRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
      }, 2.5);

      tl.from(bottomHeartRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
      }, 2.8);

      // Animaciones continuas (loop)
      
      // Efecto de brillo y escala sutil en el título
      gsap.to(titleRef.current, {
        scale: 1.02,
        textShadow: "0 0 30px rgba(199,178,153,0.8), 0 0 60px rgba(140,90,56,0.6)",
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2, // Espera a que termine la entrada
      });

      // Pulso de la fecha
      gsap.to(dateRef.current, {
        scale: 1.05,
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Brillo del subtítulo
      gsap.to(subtitleRef.current, {
        textShadow: "0 0 20px rgba(255,255,255,0.5)",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Brillo de la ubicación
      gsap.to(locationRef.current, {
        textShadow: "0 0 20px rgba(199,178,153,0.8), 0 0 40px rgba(140,90,56,0.6)",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Rotación y escala del corazón superior
      gsap.to(topHeartRef.current, {
        keyframes: [
          { rotate: 0, scale: 1 },
          { rotate: -10, scale: 1.1 },
          { rotate: 10, scale: 1.1 },
          { rotate: 0, scale: 1 }
        ],
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
      });

      // Rotación del corazón central
      gsap.to(heartRef.current, {
        keyframes: [
          { rotate: 0, scale: 1 },
          { rotate: -5, scale: 1.2 },
          { rotate: 5, scale: 1.2 },
          { rotate: 0, scale: 1 }
        ],
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
      });

      // Rotación del corazón inferior
      gsap.to(bottomHeartRef.current, {
        rotate: 360,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
      });

      // Brillo del underline
      gsap.to(underlineRef.current, {
        keyframes: [
          { opacity: 0.4 },
          { opacity: 1 },
          { opacity: 0.4 }
        ],
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
      });

      // Shine effect en la fecha
      gsap.to(dateShineRef.current, {
        x: "200%",
        duration: 3,
        ease: "linear",
        repeat: -1,
      });

      // Box shadow pulsante en la fecha
      gsap.to(dateRef.current, {
        keyframes: [
          { boxShadow: "0 0 0px rgba(199,178,153,0)" },
          { boxShadow: "0 0 30px rgba(140,90,56,0.4)" },
          { boxShadow: "0 0 0px rgba(199,178,153,0)" }
        ],
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [isLoaded]);

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

      {/* Content - GSAP Animations */}
      <div 
        ref={containerRef}
        className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 py-8 text-center"
      >
        {/* Top Border con animación de líneas */}
        <div ref={topBorderRef} className="mb-4 md:mb-6 flex items-center gap-3 sm:gap-4">
          <div 
            ref={topLineLeftRef}
            className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#B8C5D6]/70"
          />
          <div ref={topHeartRef}>
            <Heart size={isMobile ? 20 : 20} className="text-[#D4D9E0]/90 fill-[#8B95A5]/50" />
          </div>
          <div 
            ref={topLineRightRef}
            className="h-px w-10 sm:w-12 bg-gradient-to-l from-transparent to-[#B8C5D6]/70"
          />
        </div>

        {/* Title con brillo */}
        <h2 
          ref={subtitleRef}
          className="mb-4 md:mb-6 font-elegant text-white text-base sm:text-base md:text-lg tracking-[0.2em] uppercase font-light drop-shadow-lg relative"
        >
          ¡NOS CASAMOS!
        </h2>

        {/* Names con efectos mejorados */}
        <div className="mb-6 md:mb-8">
          <h1
            ref={titleRef}
            className={`font-script text-white text-7xl sm:text-7xl md:text-8xl lg:text-9xl leading-tight drop-shadow-2xl cursor-pointer px-4 flex items-center justify-center gap-4 sm:gap-4 md:gap-6 ${isMobile ? 'flex-col' : 'flex-row flex-wrap'}`}
            onClick={handleConfetti}
          >
            <span ref={salvadorRef}>
              Salvador
            </span>
            <span ref={heartRef} className={isMobile ? 'my-0' : ''}>
              <Heart size={isMobile ? 40 : 40} className="text-[#E8EBF0] fill-[#9BA5B5]/60 drop-shadow-lg" />
            </span>
            <span ref={daneryRef}>
              Danery
            </span>
          </h1>
          
          {/* Underline animada */}
          <div className="mt-6 flex justify-center">
            <div 
              ref={underlineRef}
              className="w-32 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#B8C5D6]/70 to-transparent"
            />
          </div>
        </div>

        {/* Date con efecto de brillo */}
        <div 
          ref={dateRef}
          className="mb-4 backdrop-blur-md bg-[#E8EBF0]/10 rounded-full px-8 sm:px-8 py-3 sm:py-3 border-2 border-[#B8C5D6]/40 relative overflow-hidden"
        >
          <div
            ref={dateShineRef}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8C5A38]/15 to-transparent"
          />
          <p className="font-elegant text-white text-base sm:text-base md:text-lg lg:text-xl tracking-wider font-light drop-shadow-lg relative z-10">
          07 de Diciembre 2025
          </p>
        </div>

        {/* Location */}
        <div className="mb-6 text-center">
          <p
            ref={locationRef}
            className="text-[#F4F1EB] text-sm sm:text-base md:text-lg font-light drop-shadow-lg px-4"
          >
            Iglesia Tricities, 221 S Benton St, Kennewick
          </p>
        </div>

        {/* Bottom Border animado */}
        <div ref={bottomBorderRef} className="mt-6 md:mt-8 flex items-center gap-4 sm:gap-6">
          <div 
            ref={bottomLineLeftRef}
            className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#B8C5D6]/70"
          />
          <div ref={bottomHeartRef}>
            <Heart size={isMobile ? 22 : 24} className="text-[#D4D9E0]/90 fill-[#8B95A5]/50" />
          </div>
          <div 
            ref={bottomLineRightRef}
            className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#B8C5D6]/70"
          />
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