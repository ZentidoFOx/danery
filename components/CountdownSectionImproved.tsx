"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function CountdownSectionImproved() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  // Variantes de animación tipo ola de mar continua
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2025-12-07T00:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section className="bg-white py-2 px-4 relative overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* Header con título - Sin animación de entrada para evitar estilos inline */}
        <div className="mb-12 md:mb-16">
          {/* Subtítulo */}
          <p className="text-wedding-beige-light text-sm md:text-base tracking-[0.4em] uppercase font-poppins font-light mb-4">
            {t.countdown.title_small}
          </p>

          {/* Título */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-script text-wedding-navy-medium mb-6">
            {t.countdown.title_large}
          </h2>

          {/* Línea decorativa */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-wedding-beige-light/40"></div>
            <div className="w-2 h-2 bg-wedding-brown-warm rounded-full"></div>
            <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-wedding-beige-light/40"></div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {[
            { value: timeLeft.days, label: t.countdown.days },
            { value: timeLeft.hours, label: t.countdown.hours },
            { value: timeLeft.minutes, label: t.countdown.minutes },
            { value: timeLeft.seconds, label: t.countdown.seconds },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <span
                  className="text-5xl md:text-7xl font-serif text-wedding-navy-medium leading-none mb-2 md:mb-3 drop-shadow-sm"
                  key={item.value}
                >
                  {String(item.value).padStart(2, "0")}
                </span>
                <p className="text-sm md:text-lg text-wedding-brown-warm font-poppins capitalize tracking-wider">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
