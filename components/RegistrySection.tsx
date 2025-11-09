"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export default function RegistrySection() {
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
    <section className="bg-[#6B7C5E] py-16 md:py-20 px-4 text-[#F4F1EB]">
      <motion.div
        className="max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Título */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-[#F4F1EB] text-base sm:text-lg tracking-[0.2em] uppercase font-light mb-2">
            Sugerencia
          </h2>
          <p className="font-script text-[#F4F1EB] text-4xl sm:text-5xl md:text-6xl">
            de Regalos
          </p>
        </motion.div>

        {/* Texto descriptivo */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <p className="text-[#F4F1EB] text-sm sm:text-base font-light leading-relaxed">
            Si tu deseo es hacernos algún presente,<br />
            te compartimos nuestras sugerencias:
          </p>
        </motion.div>

        {/* Línea decorativa */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="h-px w-20 mx-auto bg-[#F4F1EB]/40" />
        </motion.div>

        {/* Liverpool */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-[#F4F1EB] text-3xl sm:text-4xl font-light mb-3">
            Liverpool
          </h3>
          <p className="text-[#F4F1EB]/80 text-sm sm:text-base font-light mb-6">
            No. Evento: 51247798
          </p>

          {/* Botón */}
          <a
            href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51247798"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#F4F1EB] text-[#6B7C5E] text-sm tracking-[0.2em] uppercase px-10 py-3 mb-6 hover:bg-[#E8E5DC] transition-colors duration-300"
          >
            Ver Mesa de Regalos
          </a>

          {/* Texto adicional */}
          <p className="text-[#F4F1EB] text-xs sm:text-sm font-light mb-4">
            Visita nuestra lista de regalos
          </p>

          {/* Logos de tiendas */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#1F2A38] flex items-center justify-center">
              <span className="text-white text-xs font-semibold">WS</span>
            </div>
            <div className="w-12 h-12 bg-[#1F2A38] flex items-center justify-center">
              <span className="text-white text-xs font-semibold">PB</span>
            </div>
            <div className="w-12 h-12 bg-[#8C8C8C] flex items-center justify-center">
              <span className="text-white text-xs font-semibold">WE</span>
            </div>
          </div>

          <p className="text-[#F4F1EB]/70 text-xs font-light">
            Dentro de la mesa de regalos Liverpool
          </p>
        </motion.div>

        {/* Línea separadora */}
        <motion.div variants={itemVariants} className="my-12">
          <div className="h-px w-full bg-[#F4F1EB]/20" />
        </motion.div>

        {/* Transferencia */}
        <motion.div variants={itemVariants} className="text-center">
          <h3 className="text-[#F4F1EB] text-3xl sm:text-4xl font-light mb-6">
            Transferencia
          </h3>
          
          <div className="flex justify-center mb-4">
            <div className="bg-white px-6 py-3 rounded">
              <span className="text-[#6B7C5E] text-lg font-semibold">Citibanamex</span>
            </div>
          </div>

          <div className="text-left max-w-sm mx-auto space-y-2 text-sm">
            <p className="text-[#F4F1EB]/90">
              <span className="font-semibold">Cuenta:</span> 1234567890
            </p>
            <p className="text-[#F4F1EB]/90">
              <span className="font-semibold">CLABE:</span> 012345678901234567
            </p>
            <p className="text-[#F4F1EB]/90">
              <span className="font-semibold">Titular:</span> Nombre de los novios
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
