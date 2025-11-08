"use client";

/**
 * HeroOption3 - Diseño Minimalista Elegante
 * 
 * Características:
 * - Layout vertical centrado con espaciado amplio
 * - Degradado radial desde el centro
 * - Tipografía extra grande para nombres
 * - Animaciones sutiles de entrada
 * - Decoraciones geométricas minimalistas
 * - Optimizado para carga rápida con lazy loading
 */

import { useEffect, useState, useRef } from "react";
import { Heart, Circle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { imageConfig, getImageUrl } from "@/lib/imageConfig";
import HeartLoader from "./HeartLoader";

export default function HeroOption3() {
  const [isMobile, setIsMobile] = useState(false);
  const [heroImage, setHeroImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const preloadImages = () => {
      const mobileImg = new Image();
      const desktopImg = new Image();
      
      mobileImg.src = imageConfig.hero.vertical;
      desktopImg.src = imageConfig.hero.horizontal;
      
      const checkLoad = () => {
        const mobile = window.innerWidth < 768;
        const imgToCheck = mobile ? mobileImg : desktopImg;
        
        if (imgToCheck.complete) {
          setIsMobile(mobile);
          setHeroImage(imgToCheck.src);
          setIsLoaded(true);
          setShowLoader(false);
        } else {
          imgToCheck.onload = () => {
            setIsMobile(mobile);
            setHeroImage(imgToCheck.src);
            setIsLoaded(true);
            setShowLoader(false);
          };
        }
      };
      
      checkLoad();
    };
    
    preloadImages();

    const fallbackTimer = setTimeout(() => {
      if (showLoader) {
        setShowLoader(false);
        setIsLoaded(true);
      }
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, [showLoader]);

  return (
    <>
      <HeartLoader isLoading={showLoader} />
      
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden" role="banner" aria-label="Hero Section">
        {/* Background con degradado radial */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: heroImage ? `url('${heroImage}')` : 'none',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
            role="img"
            aria-label="Imagen de fondo de la boda"
          />
          {/* Degradado radial desde el centro */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/70" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <motion.div 
          className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ opacity }}
        >
          {/* Círculos decorativos */}
          <motion.div
            className="absolute top-16 sm:top-20 left-8 sm:left-16"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Circle className="text-white" size={isMobile ? 40 : 60} strokeWidth={0.5} />
          </motion.div>

          <motion.div
            className="absolute bottom-24 sm:bottom-32 right-8 sm:right-16"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Circle className="text-white" size={isMobile ? 50 : 80} strokeWidth={0.5} />
          </motion.div>

          {/* Etiqueta superior */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <div className="inline-block px-6 sm:px-8 py-2 sm:py-3 border border-white/40 rounded-full backdrop-blur-sm">
              <p className="font-elegant text-white text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase">
                18 • Nov • 2023
              </p>
            </div>
          </motion.div>

          {/* Nombres extra grandes */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8 sm:mb-12"
          >
            <h1 
              className="font-script text-white text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] leading-none drop-shadow-2xl cursor-pointer mb-4 sm:mb-6"
              onClick={() => confetti({
                particleCount: isMobile ? 60 : 150,
                spread: isMobile ? 80 : 140,
                origin: { y: 0.5 },
                colors: ['#D4AF37', '#C4B5A0', '#FFFFFF', '#F5F1E8'],
                ticks: 200,
              })}
              tabIndex={0}
              role="button"
              aria-label="Salvador - Click para confetti"
            >
              Salvador
            </h1>

            {/* Separador con corazón */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center gap-3 sm:gap-4 my-4 sm:my-6"
            >
              <div className="w-12 sm:w-16 md:w-20 h-px bg-white/40" />
              <Heart className="text-white fill-white/25" size={isMobile ? 24 : 36} />
              <div className="w-12 sm:w-16 md:w-20 h-px bg-white/40" />
            </motion.div>

            <h1 
              className="font-script text-white text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] leading-none drop-shadow-2xl cursor-pointer"
              onClick={() => confetti({
                particleCount: isMobile ? 60 : 150,
                spread: isMobile ? 80 : 140,
                origin: { y: 0.5 },
                colors: ['#D4AF37', '#C4B5A0', '#FFFFFF', '#F5F1E8'],
                ticks: 200,
              })}
              tabIndex={0}
              role="button"
              aria-label="Danery - Click para confetti"
            >
              Danery
            </h1>
          </motion.div>

          {/* Ubicación */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <p className="font-elegant text-white/90 text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[0.4em] uppercase">
              Oaxaca
            </p>
          </motion.div>

          {/* Línea decorativa inferior */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isMobile ? "120px" : "200px", opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="mt-8 sm:mt-12"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Cloud Bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-10 h-20 sm:h-24 md:h-32 lg:h-40 xl:h-48"
          style={{
            backgroundImage: `url('${getImageUrl(imageConfig.clouds.bottom, imageConfig.fallback.clouds)}')`,
            backgroundPosition: 'bottom center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />
      </section>
    </>
  );
}
