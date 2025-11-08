"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Calendar } from "lucide-react";

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Countdown timer
  useEffect(() => {
    const weddingDate = new Date("2025-12-18T15:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20 md:py-24 px-4"
    >
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Decorative Branch */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <svg
            width="120"
            height="80"
            viewBox="0 0 120 80"
            fill="none"
            className="text-wedding-sage opacity-40"
          >
            <path
              d="M10 40 Q 30 20, 60 40 T 110 40"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M20 35 L 25 25 M25 30 L 30 22"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M50 35 L 55 25 M55 30 L 60 22"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M80 35 L 85 25 M85 30 L 90 22"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mb-4">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div
                key={unit}
                className="flex flex-col items-center relative"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-elegant text-wedding-dark"
                  animate={{ scale: unit === "seconds" ? [1, 1.05, 1] : 1 }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {String(value).padStart(2, "0")}
                </motion.div>
                <div className="text-sm sm:text-base md:text-lg font-elegant text-wedding-dark/60 mt-2 sm:mt-3 uppercase tracking-widest">
                  {unit === "days" && "D"}
                  {unit === "hours" && "H"}
                  {unit === "minutes" && "M"}
                  {unit === "seconds" && "S"}
                </div>
                {index < 3 && (
                  <span className="absolute -right-1 sm:-right-2 md:-right-3 top-6 sm:top-8 md:top-10 lg:top-14 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-wedding-dark/30 font-elegant">
                    :
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Invitation Text */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16 sm:mb-20 px-4"
        >
          <p className="font-elegant text-wedding-dark/70 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Con la bendición de Dios y en compañía de nuestros padres, queremos
            invitarlos a que compartan con nosotros el momento más importante de
            nuestras vidas.
          </p>
        </motion.div>

        {/* Padres Section */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-12 sm:gap-16 mb-16 sm:mb-20"
        >
          {/* Padres de la Novia */}
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <h3 className="font-script text-4xl sm:text-5xl md:text-6xl text-wedding-sage mb-4">
                Padres de la novia
              </h3>
              <div className="w-32 h-px bg-wedding-sage/30 mx-auto mb-6" />
            </div>
            <motion.p
              className="font-elegant text-wedding-dark text-lg sm:text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              Celina Bautista Méndez
            </motion.p>
            <motion.p
              className="font-elegant text-wedding-dark text-lg sm:text-xl md:text-2xl mt-2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
            >
              Luis Alberto García Díaz
            </motion.p>
          </motion.div>

          {/* Padres del Novio */}
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <h3 className="font-script text-4xl sm:text-5xl md:text-6xl text-wedding-sage mb-4">
                Padres del novio
              </h3>
              <div className="w-32 h-px bg-wedding-sage/30 mx-auto mb-6" />
            </div>
            <motion.p
              className="font-elegant text-wedding-dark text-lg sm:text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              Alicia Maribel Carreño Aquino
            </motion.p>
            <motion.p
              className="font-elegant text-wedding-dark text-lg sm:text-xl md:text-2xl mt-2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
            >
              Orlando Aragón Rodríguez
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Elegant Divider */}
        <motion.div variants={itemVariants} className="flex items-center justify-center my-16 sm:my-20">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-wedding-sage/30" />
          <div className="px-6">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-wedding-sage opacity-50">
              <circle cx="20" cy="20" r="3" fill="currentColor" />
              <circle cx="10" cy="20" r="2" fill="currentColor" opacity="0.6" />
              <circle cx="30" cy="20" r="2" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-wedding-sage/30" />
        </motion.div>

        {/* Ceremonia Section */}
        <motion.div variants={itemVariants} className="text-center space-y-8">
          {/* Ceremony Title */}
          <div>
            <motion.h2
              className="font-elegant text-wedding-dark text-lg sm:text-xl md:text-2xl tracking-[0.3em] uppercase mb-4"
              whileHover={{ letterSpacing: "0.4em" }}
            >
              CEREMONIA RELIGIOSA
            </motion.h2>
            <motion.div
              className="flex items-center justify-center gap-2 text-wedding-dark/70"
              whileHover={{ scale: 1.05 }}
            >
              <Calendar size={20} />
              <p className="font-elegant text-2xl sm:text-3xl md:text-4xl">3:00 PM</p>
            </motion.div>
          </div>

          {/* Temple Name */}
          <div>
            <h3 className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-wedding-sage mb-4">
              Templo de
            </h3>
            <h3 className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-wedding-sage">
              Santo Domingo de Guzmán
            </h3>
          </div>

          {/* Address */}
          <motion.div
            className="max-w-md mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <p className="font-elegant text-wedding-dark/70 text-base sm:text-lg md:text-xl leading-relaxed">
              C. Macedonio Alcalá s/n, Ruta Independencia,
              <br />
              Centro, 68000 Oaxaca de Juárez,
              <br />
              Oaxaca.
            </p>
          </motion.div>

          {/* Location Button */}
          <motion.button
            className="group relative px-8 sm:px-12 py-3 sm:py-4 bg-wedding-sage/80 hover:bg-wedding-sage text-white font-elegant text-sm sm:text-base tracking-widest uppercase overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open("https://maps.google.com", "_blank")}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative flex items-center gap-2 justify-center">
              <MapPin size={18} />
              VER UBICACIÓN
            </span>
          </motion.button>
        </motion.div>

        {/* Elegant Divider */}
        <motion.div variants={itemVariants} className="flex items-center justify-center my-16 sm:my-20">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-wedding-sage/30" />
          <div className="px-6">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-wedding-sage opacity-50">
              <circle cx="20" cy="20" r="3" fill="currentColor" />
              <circle cx="10" cy="20" r="2" fill="currentColor" opacity="0.6" />
              <circle cx="30" cy="20" r="2" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-wedding-sage/30" />
        </motion.div>

        {/* Recepción Section */}
        <motion.div variants={itemVariants} className="text-center space-y-8">
          {/* Reception Title */}
          <div>
            <motion.h2
              className="font-elegant text-wedding-dark text-lg sm:text-xl md:text-2xl tracking-[0.3em] uppercase mb-4"
              whileHover={{ letterSpacing: "0.4em" }}
            >
              RECEPCIÓN
            </motion.h2>
            <motion.div
              className="flex items-center justify-center gap-2 text-wedding-dark/70"
              whileHover={{ scale: 1.05 }}
            >
              <Calendar size={20} />
              <p className="font-elegant text-2xl sm:text-3xl md:text-4xl">5:00 PM</p>
            </motion.div>
          </div>

          {/* Reception Venue Name */}
          <div>
            <h3 className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-wedding-sage mb-2">
              Paraje
            </h3>
            <h3 className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-wedding-sage">
              Ojo de Agua
            </h3>
          </div>

          {/* Address */}
          <motion.div
            className="max-w-md mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <p className="font-elegant text-wedding-dark/70 text-base sm:text-lg md:text-xl leading-relaxed">
              Carretera Internacional al Tule km 13.
            </p>
          </motion.div>

          {/* Location Button */}
          <motion.button
            className="group relative px-8 sm:px-12 py-3 sm:py-4 bg-wedding-sage/80 hover:bg-wedding-sage text-white font-elegant text-sm sm:text-base tracking-widest uppercase overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open("https://maps.google.com", "_blank")}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative flex items-center gap-2 justify-center">
              <MapPin size={18} />
              VER UBICACIÓN
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
