"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CountdownSectionImproved() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

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
    <section className="bg-white py-12 md:py-10 px-4 relative overflow-hidden">
      {/* Decoraciones sutiles de fondo - ocultas en móvil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-10 left-10 w-32 h-32 border border-[#C7B299]/20 rounded-full" />
        <div className="absolute top-20 right-20 w-24 h-24 border border-[#8C5A38]/10 rounded-full" />
        <div className="absolute bottom-10 left-1/4 w-40 h-40 border border-[#C7B299]/15 rounded-full" />
      </div>

      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decoración de hoja de oliva */}
        <div className="mb-6 md:mb-10 flex justify-center">
          <div className="relative w-24 h-16 md:w-40 md:h-24">
            <Image
              src="/images/hojaoliva.webp"
              alt="Hoja de oliva decorativa"
              fill
              className="object-contain opacity-60"
              priority
            />
          </div>
        </div>

        <h3 className="text-[#3A4E6A] text-xs md:text-base tracking-[0.3em] md:tracking-[0.4em] uppercase font-light mb-8 md:mb-12">
          Nuestro Gran Día
        </h3>

        <div className="flex justify-center gap-3 md:gap-8 mb-8 md:mb-12">
          {[
            { value: timeLeft.days, label: "Días" },
            { value: timeLeft.hours, label: "Horas" },
            { value: timeLeft.minutes, label: "Minutos" },
            { value: timeLeft.seconds, label: "Segundos" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 md:w-28 md:h-28 rounded-full border-2 border-[#C7B299] flex items-center justify-center mb-2 md:mb-3 bg-gradient-to-br from-[#F4F1EB]/30 to-white shadow-sm">
                <span className="text-2xl md:text-5xl font-light text-[#1F2A38]">
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>
              <p className="text-[10px] md:text-sm text-[#8C5A38] uppercase tracking-wider md:tracking-widest">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-[#3A4E6A] text-xs md:text-base tracking-[0.15em] md:tracking-[0.2em] uppercase font-light mb-6 md:mb-8">
          7 de Diciembre, 2025
        </p>

        {/* Texto de invitación */}
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-[#8C5A38] text-xs md:text-base leading-relaxed text-center font-light">
            Con la bendición de Dios y en compañía de nuestros padres, queremos invitarlos a que compartan con nosotros el momento más importante de nuestras vidas.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
