"use client";

/**
 * HeroOption4 - Diseño Asimétrico Moderno
 * 
 * Características:
 * - Layout asimétrico con contenido alineado a la izquierda
 * - Degradado diagonal dinámico
 * - Elementos flotantes animados
 * - Tipografía con peso variable
 * - Transiciones suaves en hover
 * - CTA prominente con efecto glassmorphism
 * - Optimizado para accesibilidad con ARIA labels
 */

import { useEffect, useState, useRef } from "react";
import { Heart, ArrowDown, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { imageConfig, getImageUrl } from "@/lib/imageConfig";
import HeartLoader from "./HeartLoader";

export default function HeroOption4() {
  const [isMobile, setIsMobile] = useState(false);
  const [heroImage, setHeroImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 50]);

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
        {/* Background con degradado diagonal */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: heroImage ? `url('${heroImage}')` : 'none',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.7s ease-in-out',
            }}
            role="img"
            aria-label="Imagen de fondo de la boda"
          />
          {/* Degradado diagonal */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-800/30 to-pink-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        </div>

        <motion.div 
          className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ opacity, y }}
        >
          {/* Estrellas flotantes */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + i * 25}%`,
                right: `${10 + i * 15}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <Star className="text-white" size={isMobile ? 16 : 24} fill="white" opacity={0.4} />
            </motion.div>
          ))}

          {/* Contenido alineado a la izquierda */}
          <div className="max-w-4xl">
            {/* Badge superior */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <div className="inline-flex items-center gap-3 px-5 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/30">
                <Heart className="text-white fill-white/30" size={isMobile ? 16 : 20} />
                <span className="font-elegant text-white text-xs sm:text-sm tracking-wider uppercase">
                  Nuestra Boda
                </span>
              </div>
            </motion.div>

            {/* Nombres con animación escalonada */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mb-6 sm:mb-8"
            >
              <h1 className="font-script text-white text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none drop-shadow-2xl">
                Salvador
              </h1>
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="mb-8 sm:mb-12 flex items-center gap-4 sm:gap-6"
            >
              <div className="w-12 sm:w-16 md:w-20 h-px bg-white/50" />
              <span className="font-elegant text-white/80 text-2xl sm:text-3xl md:text-4xl">&</span>
              <div className="w-12 sm:w-16 md:w-20 h-px bg-white/50" />
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="mb-10 sm:mb-14"
            >
              <h1 className="font-script text-white text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none drop-shadow-2xl">
                Danery
              </h1>
            </motion.div>

            {/* Información de fecha y lugar */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 1 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-1 h-12 sm:h-14 bg-gradient-to-b from-white/60 to-transparent" />
                <div>
                  <p className="font-elegant text-white/70 text-xs sm:text-sm uppercase tracking-wider mb-1">
                    Fecha
                  </p>
                  <p className="font-elegant text-white text-lg sm:text-xl md:text-2xl tracking-wide">
                    18 de Noviembre, 2023
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-1 h-12 sm:h-14 bg-gradient-to-b from-white/60 to-transparent" />
                <div>
                  <p className="font-elegant text-white/70 text-xs sm:text-sm uppercase tracking-wider mb-1">
                    Lugar
                  </p>
                  <p className="font-elegant text-white text-lg sm:text-xl md:text-2xl tracking-wide">
                    Oaxaca, México
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.2 }}
              className="mt-10 sm:mt-14"
            >
              <motion.button
                className="group px-8 sm:px-10 py-4 sm:py-5 bg-white/15 backdrop-blur-lg rounded-full border border-white/30 font-elegant text-white text-sm sm:text-base tracking-wider uppercase transition-all duration-300 hover:bg-white/25 hover:border-white/50 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => confetti({
                  particleCount: isMobile ? 80 : 200,
                  spread: isMobile ? 90 : 150,
                  origin: { y: 0.6 },
                  colors: ['#D4AF37', '#C4B5A0', '#FFFFFF', '#F5F1E8'],
                })}
                aria-label="Celebrar con confetti"
              >
                <span className="flex items-center gap-3">
                  Celebremos Juntos
                  <Heart className="text-white fill-white/30 group-hover:fill-white/50 transition-all" size={18} />
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <ArrowDown className="text-white/60" size={isMobile ? 20 : 24} />
              <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
            </motion.div>
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
