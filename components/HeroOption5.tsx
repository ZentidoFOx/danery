"use client";

/**
 * HeroOption5 - Diseño Split Screen Elegante
 * 
 * Características:
 * - Layout dividido en dos secciones (desktop)
 * - Degradado suave con overlay de color
 * - Animaciones de entrada sincronizadas
 * - Tipografía con contraste alto
 * - Elementos decorativos florales
 * - Transiciones fluidas entre estados
 * - Responsive collapse en mobile
 * - Accesibilidad mejorada con roles ARIA
 */

import { useEffect, useState, useRef } from "react";
import { Heart, Flower2, Calendar, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { imageConfig, getImageUrl } from "@/lib/imageConfig";
import HeartLoader from "./HeartLoader";

export default function HeroOption5() {
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
        {/* Background con degradado suave */}
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
          {/* Degradado suave con tono cálido */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/60 via-amber-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        </div>

        <motion.div 
          className="relative z-10 h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ opacity }}
        >
          <div className="h-full flex flex-col md:flex-row">
            {/* Sección izquierda - Nombres */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-0">
              {/* Flores decorativas */}
              <motion.div
                className="absolute top-8 sm:top-12 left-8 sm:left-12"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 360, opacity: 0.4 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Flower2 className="text-white" size={isMobile ? 40 : 60} strokeWidth={0.5} />
              </motion.div>

              <motion.div
                className="absolute bottom-24 sm:bottom-32 right-8 sm:right-12 md:left-12"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: -360, opacity: 0.4 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <Flower2 className="text-white" size={isMobile ? 50 : 70} strokeWidth={0.5} />
              </motion.div>

              <div className="text-center md:text-left w-full max-w-2xl">
                {/* Título superior */}
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-6 sm:mb-8"
                >
                  <p className="font-elegant text-white/90 text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase">
                    Te invitamos a celebrar
                  </p>
                </motion.div>

                {/* Nombres */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="mb-8 sm:mb-10"
                >
                  <h1 
                    className="font-script text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-tight drop-shadow-2xl cursor-pointer mb-3 sm:mb-4"
                    onClick={() => confetti({
                      particleCount: isMobile ? 50 : 120,
                      spread: isMobile ? 70 : 100,
                      origin: { y: 0.5 },
                      colors: ['#D4AF37', '#C4B5A0', '#FFFFFF', '#F5F1E8'],
                    })}
                    tabIndex={0}
                    role="button"
                    aria-label="Salvador - Click para confetti"
                  >
                    Salvador
                  </h1>

                  {/* Separador elegante */}
                  <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 my-4 sm:my-5">
                    <motion.div
                      animate={{ scaleX: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 sm:w-20 md:w-24 h-px bg-white/50"
                    />
                    <Heart className="text-white fill-white/30" size={isMobile ? 20 : 28} />
                    <motion.div
                      animate={{ scaleX: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="w-16 sm:w-20 md:w-24 h-px bg-white/50"
                    />
                  </div>

                  <h1 
                    className="font-script text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-tight drop-shadow-2xl cursor-pointer"
                    onClick={() => confetti({
                      particleCount: isMobile ? 50 : 120,
                      spread: isMobile ? 70 : 100,
                      origin: { y: 0.5 },
                      colors: ['#D4AF37', '#C4B5A0', '#FFFFFF', '#F5F1E8'],
                    })}
                    tabIndex={0}
                    role="button"
                    aria-label="Danery - Click para confetti"
                  >
                    Danery
                  </h1>
                </motion.div>

                {/* Subtítulo */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <p className="font-elegant text-white/80 text-base sm:text-lg md:text-xl tracking-wide">
                    Nuestra Boda
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Sección derecha - Información */}
            <motion.div 
              className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-0 bg-black/20 backdrop-blur-sm"
              initial={{ x: isMobile ? 0 : 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="w-full max-w-md space-y-8 sm:space-y-10">
                {/* Fecha */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="group"
                >
                  <div className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300">
                    <div className="mt-1">
                      <Calendar className="text-white/80 group-hover:text-white transition-colors" size={isMobile ? 24 : 28} />
                    </div>
                    <div>
                      <p className="font-elegant text-white/70 text-xs sm:text-sm uppercase tracking-wider mb-2">
                        Fecha
                      </p>
                      <p className="font-elegant text-white text-lg sm:text-xl md:text-2xl tracking-wide">
                        18 de Noviembre
                      </p>
                      <p className="font-elegant text-white/80 text-base sm:text-lg">
                        2023
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Ubicación */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="group"
                >
                  <div className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300">
                    <div className="mt-1">
                      <MapPin className="text-white/80 group-hover:text-white transition-colors" size={isMobile ? 24 : 28} />
                    </div>
                    <div>
                      <p className="font-elegant text-white/70 text-xs sm:text-sm uppercase tracking-wider mb-2">
                        Lugar
                      </p>
                      <p className="font-elegant text-white text-lg sm:text-xl md:text-2xl tracking-wide">
                        Oaxaca
                      </p>
                      <p className="font-elegant text-white/80 text-base sm:text-lg">
                        México
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Decoración */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex justify-center pt-4"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Heart className="text-white/60 fill-white/20" size={isMobile ? 32 : 40} />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
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
