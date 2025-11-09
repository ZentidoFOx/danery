"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Sparkles, Bus, Crown, UtensilsCrossed, Users } from "lucide-react";

export default function ItinerarySection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const events = [
    {
      time: "7:00 PM",
      title: "Comida",
      description: "Iglesia Tricities, 221 S Benton St, Kennewick",
      icon: UtensilsCrossed,
    },
    {
      time: "8:00 PM",
      title: "Baile de novios",
      description: "Iglesia Tricities, 221 S Benton St, Kennewick",
      icon: Users,
    },
    {
      time: "9:00 PM",
      title: "Send off",
      description: "Iglesia Tricities, 221 S Benton St, Kennewick",
      icon: Sparkles,
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20 px-4">
      <motion.div
        className="max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Título con decoración */}
        <motion.div variants={itemVariants} className="mb-12 md:mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-14 md:h-14">
              <Image
                src="/images/hojaoliva.webp"
                alt="Decoración"
                fill
                className="object-contain opacity-50"
              />
            </div>
            <h2 className="text-[#8C8C8C] text-base sm:text-lg md:text-xl font-light">
              Nuestra{" "}
              <span className="font-script text-[#1F2A38] text-3xl sm:text-4xl md:text-5xl">
                celebración
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Lista de eventos */}
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-[#C7B299]/20" />

          <div className="space-y-8 md:space-y-12">
            {events.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex gap-6 md:gap-10 items-start relative"
                >
                  {/* Ícono */}
                  <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center relative z-10">
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-[#C7B299]" strokeWidth={1.2} />
                  </div>

                  {/* Hora */}
                  <div className="w-16 md:w-20 flex-shrink-0 pt-1 md:pt-2">
                    <p className="text-[#8C8C8C] text-xs sm:text-sm md:text-base font-light">
                      {event.time}
                    </p>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1">
                    <h3 className="text-[#1F2A38] text-base sm:text-lg md:text-2xl font-light mb-1 md:mb-2">
                      {event.title}
                    </h3>
                    <p className="text-[#8C8C8C] text-xs sm:text-sm md:text-base font-light leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
