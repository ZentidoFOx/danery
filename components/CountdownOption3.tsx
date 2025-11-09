"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// OPCIÓN 3: Cards con Sombra y Degradado
export default function CountdownOption3() {
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
    <section className="bg-gradient-to-b from-white to-[#F4F1EB] py-16 md:py-24 px-4">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-[#1F2A38] text-base md:text-lg tracking-[0.3em] uppercase font-light mb-4">
          Faltan
        </h3>
        <p className="font-script text-[#C7B299] text-4xl md:text-5xl mb-12">
          para el gran día
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {[
            { value: timeLeft.days, label: "Días" },
            { value: timeLeft.hours, label: "Horas" },
            { value: timeLeft.minutes, label: "Minutos" },
            { value: timeLeft.seconds, label: "Segundos" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-5xl md:text-6xl font-light text-[#6B7C5E] mb-3">
                {String(item.value).padStart(2, "0")}
              </p>
              <p className="text-xs md:text-sm text-[#8C8C8C] uppercase tracking-widest">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-[#1F2A38] text-sm md:text-base">
          7 de Diciembre, 2025
        </p>
      </motion.div>
    </section>
  );
}
