"use client";

import { motion } from "framer-motion";

export default function ParentsSection() {
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
      {/* Decoraciones sutiles de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 right-10 w-40 h-40 border border-[#C7B299]/30 rounded-full" />
        <div className="absolute bottom-20 left-10 w-32 h-32 border border-[#8C5A38]/20 rounded-full" />
      </div>

      <motion.div
        className="max-w-6xl mx-auto text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Línea decorativa superior */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="h-px w-full max-w-lg mx-auto bg-gradient-to-r from-transparent via-[#C7B299]/50 to-transparent" />
        </motion.div>

        {/* Contenedor de padres - Vertical en móvil, Horizontal en PC */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
          {/* Padres de la novia */}
          <motion.div variants={itemVariants} className="flex-1">
            <h3 className="font-script text-[#C7B299] text-3xl sm:text-4xl md:text-5xl mb-8">
              Padres de la novia
            </h3>
            <div className="space-y-3">
              <p className="text-[#1F2A38] text-base sm:text-lg md:text-xl font-light tracking-wide">
                Celina Bautista Méndez
              </p>
              <p className="text-[#1F2A38] text-base sm:text-lg md:text-xl font-light tracking-wide">
                Luis Alberto García Díaz
              </p>
            </div>
          </motion.div>

          {/* Decoración central - línea vertical decorativa */}
          <motion.div 
            variants={itemVariants} 
            className="hidden md:flex flex-col items-center justify-center gap-4 px-8"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C7B299]/50 to-transparent" />
            <div className="w-3 h-3 rounded-full border-2 border-[#8C5A38]/40 bg-white" />
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C7B299]/50 to-transparent" />
          </motion.div>

          {/* Padres del novio */}
          <motion.div variants={itemVariants} className="flex-1">
            <h3 className="font-script text-[#C7B299] text-3xl sm:text-4xl md:text-5xl mb-8">
              Padres del novio
            </h3>
            <div className="space-y-3">
              <p className="text-[#1F2A38] text-base sm:text-lg md:text-xl font-light tracking-wide">
                Alicia Maribel Carreño Aquino
              </p>
              <p className="text-[#1F2A38] text-base sm:text-lg md:text-xl font-light tracking-wide">
                Orlando Aragón Rodríguez
              </p>
            </div>
          </motion.div>
        </div>

        {/* Línea decorativa inferior */}
        <motion.div variants={itemVariants} className="mt-16">
          <div className="h-px w-full max-w-lg mx-auto bg-gradient-to-r from-transparent via-[#C7B299]/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
