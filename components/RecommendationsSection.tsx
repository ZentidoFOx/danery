"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, UtensilsCrossed } from "lucide-react";

export default function RecommendationsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 md:py-24 px-4"
    >
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Spacing */}
        <motion.div variants={itemVariants} className="mb-16" />

        {/* Buttons Container - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4">
          {/* Accommodation Button */}
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            className="flex justify-center"
          >
            <button
              onClick={() => {
                // Aquí puedes agregar la lógica para abrir un modal o navegar
                console.log("Ver recomendación de hospedaje");
              }}
              className="w-full px-6 sm:px-8 py-4 bg-[#6B8E6F] hover:bg-[#5A7A5E] text-white font-elegant text-base sm:text-lg tracking-widest uppercase transition-colors duration-300 shadow-lg"
            >
              VER RECOMENDACIÓN DE HOSPEDAJE
            </button>
          </motion.div>

          {/* Restaurants Button */}
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            className="flex justify-center"
          >
            <button
              onClick={() => {
                // Aquí puedes agregar la lógica para abrir un modal o navegar
                console.log("Ver recomendación de restaurantes");
              }}
              className="w-full px-6 sm:px-8 py-4 bg-[#6B8E6F] hover:bg-[#5A7A5E] text-white font-elegant text-base sm:text-lg tracking-widest uppercase transition-colors duration-300 shadow-lg"
            >
              VER RECOMENDACIÓN DE RESTAURANTES
            </button>
          </motion.div>
        </div>

        {/* Spacing */}
        <motion.div variants={itemVariants} className="mt-16" />
      </motion.div>
    </section>
  );
}
