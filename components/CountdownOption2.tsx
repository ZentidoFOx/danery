"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// OPCIÓN 2: Línea Horizontal con Separadores
export default function CountdownOption2() {
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
    <section className="bg-[#F4F1EB] py-16 md:py-24 px-4">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-center text-[#6B7C5E] text-sm md:text-base tracking-[0.3em] uppercase font-light mb-16">
          Cuenta Regresiva
        </h3>

        <div className="flex items-center justify-center divide-x divide-[#C7B299]/40">
          {[
            { value: timeLeft.days, label: "Días" },
            { value: timeLeft.hours, label: "Horas" },
            { value: timeLeft.minutes, label: "Minutos" },
            { value: timeLeft.seconds, label: "Segundos" },
          ].map((item, index) => (
            <div key={index} className="px-6 md:px-12 text-center">
              <p className="text-5xl md:text-7xl font-light text-[#1F2A38] mb-2">
                {String(item.value).padStart(2, "0")}
              </p>
              <p className="text-xs md:text-sm text-[#8C5A38] uppercase tracking-wider">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="font-script text-[#6B7C5E] text-3xl md:text-4xl">
            7 de Diciembre, 2025
          </p>
        </div>
      </motion.div>
    </section>
  );
}
