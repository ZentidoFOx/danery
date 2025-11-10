"use client";

import { useEffect, useState, useCallback } from "react";
import { Heart, Sparkle, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { imageConfig, getImageUrl } from "@/lib/imageConfig";
import { motion } from "framer-motion";

const CONFETTI_COLORS = ['#8B5A38', '#D1B99A', '#F5F3EE', '#344A6C'];

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [heroImage, setHeroImage] = useState('');

  const handleConfetti = useCallback(() => {
    confetti({
      particleCount: isMobile ? 40 : 80,
      spread: isMobile ? 50 : 80,
      origin: { y: 0.5 },
      colors: CONFETTI_COLORS,
    });
  }, [isMobile]);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setHeroImage(mobile ? imageConfig.hero.vertical : imageConfig.hero.horizontal);

    const handleResize = () => {
      const newMobile = window.innerWidth < 768;
      if (newMobile !== isMobile) {
        setIsMobile(newMobile);
        setHeroImage(newMobile ? imageConfig.hero.vertical : imageConfig.hero.horizontal);
      }
    };

    // Confetti automático cada 15 segundos
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: mobile ? 30 : 60,
        spread: mobile ? 60 : 100,
        origin: { y: 0.6 },
        colors: CONFETTI_COLORS,
      });
    }, 15000);

    // Confetti inicial después de 2 segundos
    const initialConfetti = setTimeout(() => {
      confetti({
        particleCount: mobile ? 50 : 100,
        spread: mobile ? 70 : 120,
        origin: { y: 0.6 },
        colors: CONFETTI_COLORS,
      });
    }, 2000);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(confettiInterval);
      clearTimeout(initialConfetti);
    };
  }, [isMobile]);

  return (
    <section className="relative h-screen w-full overflow-hidden cursor-pointer" onClick={handleConfetti}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: heroImage ? `url('${heroImage}')` : 'none',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wedding-navy-dark/85 via-wedding-navy-medium/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Top Ornament */}
        <motion.div 
          className="mb-6 flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-white/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="w-1 h-1 rounded-full bg-white/30" />
          </div>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/70 to-white/50" />
          <div className="w-3 h-3 rounded-full bg-white/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent via-white/70 to-white/50" />
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="w-2 h-2 rounded-full bg-white/50" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2 
          className="mb-6 font-elegant text-white text-base tracking-[0.3em] uppercase font-light drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          ¡NOS CASAMOS!
        </motion.h2>

        {/* Names */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.h1 
            className="font-script text-white text-7xl md:text-9xl leading-tight drop-shadow-2xl"
            animate={{ 
              filter: [
                "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
                "drop-shadow(0 0 20px rgba(255,255,255,0.6))",
                "drop-shadow(0 0 10px rgba(255,255,255,0.3))"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Salvador
          </motion.h1>
          
          <motion.div 
            className="my-4 flex items-center justify-center gap-3"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="h-px w-12 bg-white/50" />
            <Heart size={30} className="text-white fill-white/60" />
            <div className="h-px w-12 bg-white/50" />
          </motion.div>
          
          <motion.h1 
            className="font-script text-white text-7xl md:text-9xl leading-tight drop-shadow-2xl"
            animate={{ 
              filter: [
                "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
                "drop-shadow(0 0 20px rgba(255,255,255,0.6))",
                "drop-shadow(0 0 10px rgba(255,255,255,0.3))"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            Danery
          </motion.h1>
        </motion.div>

        {/* Date */}
        <motion.div 
          className="mb-4 backdrop-blur-md bg-white/15 rounded-2xl px-10 py-3 border-2 border-white/40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="font-elegant text-white text-xl tracking-wider font-light drop-shadow-lg">
            07 de Diciembre 2025
          </p>
        </motion.div>

        {/* Location */}
        <motion.p 
          className="text-white/90 text-base font-light drop-shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          Iglesia Tricities, 221 S Benton St, Kennewick
        </motion.p>

        {/* Bottom Ornament */}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-white/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="w-1 h-1 rounded-full bg-white/30" />
          </div>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/70 to-white/50" />
          <div className="w-3 h-3 rounded-full bg-white/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent via-white/70 to-white/50" />
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="w-2 h-2 rounded-full bg-white/50" />
          </div>
        </motion.div>
      </div>

      {/* Cloud Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-10 h-32"
        style={{
          backgroundImage: `url('${getImageUrl(imageConfig.clouds.bottom, imageConfig.fallback.clouds)}')`,
          backgroundPosition: 'bottom center',
          backgroundSize: 'cover',
        }}
      />
    </section>
  );
}
