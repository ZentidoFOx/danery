"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// OPCIÓN 8: Círculos con Doble Borde
export default function CountdownOption8() {
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
    <section className="bg-white py-16 md:py-24 px-4">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decoración de hoja de oliva */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-32 h-20 md:w-40 md:h-24">
            <Image
              src="/images/hojaoliva.webp"
              alt="Hoja de oliva decorativa"
              fill
              className="object-contain opacity-60"
              priority
            />
          </div>
        </div>

        <h3 className="text-[#3A4E6A] text-sm md:text-base tracking-[0.4em] uppercase font-light mb-12">
          Faltan
        </h3>

        <div className="flex justify-center gap-4 md:gap-8 mb-12">
          {[
            { value: timeLeft.days, label: "Días" },
            { value: timeLeft.hours, label: "Horas" },
            { value: timeLeft.minutes, label: "Minutos" },
            { value: timeLeft.seconds, label: "Segundos" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-20 h-20 md:w-32 md:h-32 mb-3">
                {/* Círculo exterior */}
                <div className="absolute inset-0 rounded-full border border-[#C7B299]/30" />
                {/* Círculo interior */}
                <div className="absolute inset-2 rounded-full border-2 border-[#C7B299] flex items-center justify-center bg-white">
                  <span className="text-3xl md:text-5xl font-light text-[#1F2A38]">
                    {String(item.value).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-[#8C5A38] uppercase tracking-widest">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[#3A4E6A] text-sm md:text-base tracking-[0.2em] uppercase mb-8">
          7 de Diciembre, 2025
        </p>

        <div className="max-w-2xl mx-auto px-4">
          <p className="text-[#8C5A38] text-sm md:text-base leading-relaxed text-center font-light">
            Con la bendición de Dios y en compañía de nuestros padres, queremos invitarlos a que compartan con nosotros el momento más importante de nuestras vidas.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
