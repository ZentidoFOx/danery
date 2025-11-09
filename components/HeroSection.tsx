"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
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

  // Variantes de animación optimizadas (memoizadas)
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }), []);

  const titleVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }), []);

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

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
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
        {/* Degradado con paleta personalizada */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F2A38]/70 via-[#3A4E6A]/50 to-[#8C5A38]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A38]/80 via-transparent to-[#1F2A38]/40" />
      </div>

      {/* Content - Framer Motion Optimizado */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 py-8 text-center"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Top Border con animación de líneas */}
        <motion.div 
          variants={itemVariants} 
          className="mb-4 md:mb-6 flex items-center gap-3 sm:gap-4"
        >
          <motion.div 
            className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#C7B299]/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={isMobile ? 20 : 20} className="text-[#C7B299]/90 fill-[#8C5A38]/40" />
          </motion.div>
          <motion.div 
            className="h-px w-10 sm:w-12 bg-gradient-to-l from-transparent to-[#C7B299]/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        {/* Title con brillo */}
        <motion.h2 
          variants={itemVariants}
          className="mb-4 md:mb-6 font-elegant text-white text-base sm:text-base md:text-lg tracking-[0.2em] uppercase font-light drop-shadow-lg relative"
          animate={{
            textShadow: [
              "0 0 10px rgba(255,255,255,0.3)",
              "0 0 20px rgba(255,255,255,0.5)",
              "0 0 10px rgba(255,255,255,0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ¡NOS CASAMOS!
        </motion.h2>

        {/* Names con efectos mejorados */}
        <motion.div variants={titleVariants} className="mb-6 md:mb-8">
          <motion.h1
            className={`font-script text-white text-7xl sm:text-7xl md:text-8xl lg:text-9xl leading-tight drop-shadow-2xl cursor-pointer px-4 flex items-center justify-center gap-4 sm:gap-4 md:gap-6 ${isMobile ? 'flex-col' : 'flex-row flex-wrap'}`}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 30px rgba(199,178,153,0.8), 0 0 60px rgba(140,90,56,0.6)"
            }}
            transition={{ duration: 0.3 }}
            onClick={handleConfetti}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Salvador
            </motion.span>
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className={isMobile ? 'my-0' : ''}
            >
              <Heart size={isMobile ? 40 : 40} className="text-[#F4F1EB] fill-[#8C5A38]/60 drop-shadow-lg" />
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Danery
            </motion.span>
          </motion.h1>
          
          {/* Underline animada */}
          <motion.div 
            className="mt-6 flex justify-center"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.div 
              className="w-32 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#C7B299]/70 to-transparent"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Date con efecto de brillo */}
        <motion.div 
          variants={itemVariants}
          className="mb-4 backdrop-blur-md bg-[#F4F1EB]/10 rounded-full px-8 sm:px-8 py-3 sm:py-3 border-2 border-[#C7B299]/40 relative overflow-hidden"
          whileHover={{ 
            scale: 1.08, 
            backgroundColor: "rgba(199,178,153,0.2)",
            borderColor: "rgba(140,90,56,0.6)"
          }}
          animate={{
            boxShadow: [
              "0 0 0px rgba(199,178,153,0)",
              "0 0 30px rgba(140,90,56,0.4)",
              "0 0 0px rgba(199,178,153,0)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8C5A38]/15 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <p className="font-elegant text-white text-base sm:text-base md:text-lg lg:text-xl tracking-wider font-light drop-shadow-lg relative z-10">
          07 de Diciembre 2025
          </p>
        </motion.div>

        {/* Location con efecto de oro */}
        <motion.p 
          variants={itemVariants}
          className="mb-6 font-elegant text-white text-xl sm:text-lg md:text-xl lg:text-2xl tracking-[0.2em] uppercase font-light drop-shadow-lg"
          whileHover={{ 
            scale: 1.12, 
            letterSpacing: "0.35em",
            color: "#C7B299",
            textShadow: "0 0 20px rgba(140,90,56,0.8)"
          }}
          transition={{ duration: 0.3 }}
        >
          Oaxaca
        </motion.p>

        {/* Bottom Border animado */}
        <motion.div variants={itemVariants} className="mt-6 md:mt-8 flex items-center gap-4 sm:gap-6">
          <motion.div 
            className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#C7B299]/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={isMobile ? 22 : 24} className="text-[#C7B299]/90 fill-[#8C5A38]/40" />
          </motion.div>
          <motion.div 
            className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#C7B299]/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          />
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
          backgroundAttachment: 'scroll',
        }}
      />
    </section>
  );
}