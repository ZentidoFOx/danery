"use client";

import { useEffect, useState } from "react";
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
    <section className="bg-white py-2 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Header con título */}
        <div className="mb-12 md:mb-16">
          {/* Subtítulo */}
          <p className="text-[#D4B5A0] text-sm md:text-base tracking-[0.4em] uppercase font-light mb-4">
            CUENTA REGRESIVA
          </p>
          
          {/* Título */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-script text-[#2C2C2C] mb-6">
            Nuestro Gran Día
          </h2>
          
          {/* Línea decorativa */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[#D4B5A0]/40"></div>
            <div className="w-2 h-2 bg-[#D4B5A0] rounded-full"></div>
            <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[#D4B5A0]/40"></div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {[
            { value: timeLeft.days, label: "Días" },
            { value: timeLeft.hours, label: "Horas" },
            { value: timeLeft.minutes, label: "Minutos" },
            { value: timeLeft.seconds, label: "Segundos" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-32 h-32 md:w-52 md:h-52 rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                <Image
                  src="https://wpocean.com/html/tf/habibi/assets/images/date-bg.png"
                  alt="Background"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="relative z-10 flex flex-col items-center -mt-2" style={{ marginLeft: '2.5rem' }}>
                  <span 
                    className="text-4xl md:text-7xl font-serif text-[#5A6F4C] leading-none mb-1 md:mb-2 drop-shadow-sm"
                    key={item.value}
                  >
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <p className="text-sm md:text-lg text-[#6B7C68] font-sans capitalize">
                    {item.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
