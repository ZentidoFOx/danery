"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function ReceptionSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
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

  return (
    <section className="bg-white py-16 md:py-20 px-4 relative overflow-hidden">
      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Contenedor principal - Vertical en móvil, Horizontal en PC */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-16 md:gap-20">
          {/* Ceremonia Religiosa */}
          <motion.div variants={itemVariants} className="flex-1">
            {/* Título */}
            <h2 className="text-[#3A4E6A] text-sm sm:text-base tracking-[0.4em] uppercase font-light mb-3">
              Ceremonia Religiosa
            </h2>

            {/* Hora */}
            <p className="text-[#1F2A38] text-2xl sm:text-3xl font-light mb-4">
              4:00 PM
            </p>

            {/* Nombre del lugar */}
            <h3 className="font-script text-[#C7B299] text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
              Iglesia Tricities
            </h3>

            {/* Dirección */}
            <p className="text-[#1F2A38] text-base sm:text-lg font-light mb-6 leading-relaxed">
              221 S Benton St, Kennewick
            </p>

            {/* Botón de ubicación */}
            <a
              href="https://maps.google.com/?q=Iglesia+Tricities+221+S+Benton+St+Kennewick"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full md:w-auto text-center bg-[#C7B299] hover:bg-[#8C5A38] text-white text-sm sm:text-base tracking-[0.2em] uppercase px-12 py-3 transition-all duration-300"
            >
              Ver Ubicación
            </a>
          </motion.div>

          {/* Separador vertical - Solo en PC */}
          <motion.div
            variants={itemVariants}
            className="hidden md:block w-px bg-[#C7B299]/30 self-stretch"
          />

          {/* Recepción */}
          <motion.div variants={itemVariants} className="flex-1">
            {/* Título */}
            <h2 className="text-[#3A4E6A] text-sm sm:text-base tracking-[0.4em] uppercase font-light mb-3">
              Recepción
            </h2>

            {/* Hora */}
            <p className="text-[#1F2A38] text-2xl sm:text-3xl font-light mb-4">
              6:00 PM
            </p>

            {/* Nombre del lugar */}
            <h3 className="font-script text-[#C7B299] text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
              Iglesia Tricities
            </h3>

            {/* Dirección */}
            <p className="text-[#1F2A38] text-base sm:text-lg font-light mb-6 leading-relaxed">
              221 S Benton St, Kennewick
            </p>

            {/* Botón de ubicación */}
            <a
              href="https://maps.google.com/?q=Iglesia+Tricities+221+S+Benton+St+Kennewick"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full md:w-auto text-center bg-[#C7B299] hover:bg-[#8C5A38] text-white text-sm sm:text-base tracking-[0.2em] uppercase px-12 py-3 transition-all duration-300"
            >
              Ver Ubicación
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
