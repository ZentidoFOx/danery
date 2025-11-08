"use client";

import { useEffect, useState, useRef } from "react";
import { Heart } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { imageConfig, getImageUrl } from "@/lib/imageConfig";
import HeartLoader from "./HeartLoader";

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [heroImage, setHeroImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects - deshabilitado en mobile
  const bgY = useTransform(scrollY, [0, 500], [0, 0]); // Deshabilitado completamente
  const contentY = useTransform(scrollY, [0, 500], [0, 0]); // Deshabilitado completamente
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Cambiar imagen según el tamaño de pantalla (sin cache)
      const timestamp = new Date().getTime();
      const baseImage = mobile ? imageConfig.hero.vertical : imageConfig.hero.horizontal;
      setHeroImage(`${baseImage}?v=${timestamp}`);
    };
    
    // Ejecutar inmediatamente sin esperar
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Ocultar loader después de 1.2 segundos
    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
      setTimeout(() => setIsLoaded(true), 100);
    }, 1200);

    // Confetti al cargar (reducido en mobile)
    const timer = setTimeout(() => {
      confetti({
        particleCount: isMobile ? 30 : 60,
        spread: isMobile ? 40 : 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#C4B5A0', '#FFFFFF', '#F5F1E8'],
        ticks: 150,
      });
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(loaderTimer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <>
      {/* Loader con Corazón */}
      <HeartLoader isLoading={showLoader} />
      
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Sepia Overlay */}
      <div 
        className="absolute inset-0 overflow-hidden"
      >
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
        {/* Sepia/Vintage Overlay */}
        <div className="absolute inset-0 bg-wedding-sage/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
      </div>

      {/* Content Container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 py-8 text-center overflow-visible"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ opacity }}
      >
        {/* Decorative Top Border */}
        <motion.div 
          className="mb-3 sm:mb-4 md:mb-6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.div 
              className="h-px bg-white/50"
              initial={{ width: 0 }}
              animate={{ width: isMobile ? "1.5rem" : "3rem" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="text-white/80 fill-white/20 flex-shrink-0" size={isMobile ? 14 : 20} />
            </motion.div>
            <motion.div 
              className="h-px bg-white/50"
              initial={{ width: 0 }}
              animate={{ width: isMobile ? "1.5rem" : "3rem" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* "¡NOS CASAMOS!" */}
        <motion.div 
          className="mb-3 sm:mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h2 
            className="font-elegant text-white text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase font-light drop-shadow-lg"
            animate={{ 
              letterSpacing: ["0.2em", "0.3em", "0.2em"] 
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ¡NOS CASAMOS!
          </motion.h2>
        </motion.div>

        {/* Names - Elegant Script Font */}
        <motion.div 
          className="mb-4 sm:mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.3,
            ease: "easeOut"
          }}
        >
          <motion.h1 
            className="font-script text-white text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight drop-shadow-2xl cursor-pointer px-4"
            whileHover={isMobile ? {} : { 
              scale: 1.05,
              textShadow: "0 0 30px rgba(255,255,255,0.8)"
            }}
            onClick={() => {
              confetti({
                particleCount: isMobile ? 40 : 100,
                spread: isMobile ? 40 : 100,
                origin: { y: 0.5 },
                colors: ['#D4AF37', '#C4B5A0', '#FFFFFF', '#F5F1E8'],
              });
            }}
          >
            Salvador y Danery
          </motion.h1>
          
          {/* Decorative underline */}
          <motion.div 
            className="mt-6 flex justify-center"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <motion.div 
              className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Date */}
        <motion.div 
          className="mb-2 sm:mb-3 md:mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div 
            className="backdrop-blur-sm bg-white/10 rounded-full px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 border border-white/30 mx-4"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderColor: "rgba(255,255,255,0.5)"
            }}
            animate={{
              boxShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 20px rgba(255,255,255,0.3)",
                "0 0 0px rgba(255,255,255,0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="font-elegant text-white text-sm sm:text-base md:text-lg lg:text-xl tracking-wider font-light drop-shadow-lg">
              18 de Noviembre del 2023
            </p>
          </motion.div>
        </motion.div>

        {/* Location */}
        <motion.div 
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.p 
            className="font-elegant text-white text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0.2em] uppercase font-light drop-shadow-lg px-4"
            whileHover={{ scale: isMobile ? 1.05 : 1.1, letterSpacing: "0.3em" }}
          >
            Oaxaca
          </motion.p>
        </motion.div>

        {/* Decorative Bottom Border */}
        <motion.div 
          className="mt-6 sm:mt-8 md:mt-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <motion.div 
              className="h-px bg-white/50"
              initial={{ width: 0 }}
              animate={{ width: isMobile ? "2rem" : "4rem" }}
              transition={{ duration: 1, delay: 1.8 }}
            />
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="text-white/80 fill-white/20 flex-shrink-0" size={isMobile ? 16 : 24} />
            </motion.div>
            <motion.div 
              className="h-px bg-white/50"
              initial={{ width: 0 }}
              animate={{ width: isMobile ? "2rem" : "4rem" }}
              transition={{ duration: 1, delay: 1.8 }}
            />
          </div>
        </motion.div>
      </motion.div>


      {/* Cloud Bottom Transition */}
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
    </>
  );
}
