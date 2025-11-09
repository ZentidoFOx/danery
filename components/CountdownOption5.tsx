"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// OPCIÓN 5: Moderno con Números Grandes y Minimalista
export default function CountdownOption5() {
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
    <section className="bg-white py-20 md:py-32 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center mb-16">
          <p className="text-[#8C8C8C] text-xs md:text-sm tracking-[0.4em] uppercase mb-4">
            Nos casamos en
          </p>
          <h2 className="text-[#1F2A38] text-2xl md:text-3xl font-light tracking-wide">
            7 de Diciembre, 2025
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-4xl mx-auto">
          {[
            { value: timeLeft.days, label: "Días" },
            { value: timeLeft.hours, label: "Horas" },
            { value: timeLeft.minutes, label: "Minutos" },
            { value: timeLeft.seconds, label: "Segundos" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-4">
                <motion.p
                  className="text-6xl md:text-8xl lg:text-9xl font-extralight text-[#C7B299]"
                  key={item.value}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(item.value).padStart(2, "0")}
                </motion.p>
              </div>
              <div className="h-px w-12 mx-auto bg-[#C7B299]/30 mb-3" />
              <p className="text-[10px] md:text-xs text-[#8C8C8C] uppercase tracking-[0.3em]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
