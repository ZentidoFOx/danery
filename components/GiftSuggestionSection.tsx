"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function GiftSuggestionSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#6B8E6F] py-16 sm:py-20 md:py-24 px-4"
    >
      <motion.div
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="font-elegant text-white text-base sm:text-lg tracking-wide mb-1">
            Sugerencia
          </p>
          <h2 className="font-script text-6xl sm:text-7xl md:text-8xl text-white -mt-1 mb-8">
            de Regalos
          </h2>

          {/* Decorative Line */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-px bg-white" />
          </div>

          <p className="font-elegant text-white text-sm sm:text-base tracking-wide">
            Si tu deseo es hacernos algún presente,
          </p>
          <p className="font-elegant text-white text-sm sm:text-base tracking-wide">
            te compartimos nuestras sugerencias:
          </p>
        </motion.div>

        {/* Liverpool Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="font-serif text-white text-3xl sm:text-4xl mb-2">
            Liverpool
          </h3>
          <p className="font-elegant text-white text-xs sm:text-sm mb-4">
            No. Evento: 51247798
          </p>

          <button className="w-full bg-amber-100 text-[#6B8E6F] font-elegant text-xs sm:text-sm tracking-widest uppercase py-3 mb-4 hover:bg-white transition-colors">
            VER MESA DE REGALOS
          </button>

          <p className="font-elegant text-white text-xs mb-3">
            Visita nuestra lista de regalos
          </p>

          {/* Store Logos */}
          <div className="flex gap-2 mb-3">
            <div className="bg-black text-white px-3 py-2 font-bold text-xs sm:text-sm">
              WS
            </div>
            <div className="bg-black text-white px-3 py-2 font-bold text-xs sm:text-sm">
              PB
            </div>
            <div className="bg-gray-600 text-white px-3 py-2 font-bold text-xs sm:text-sm">
              we
            </div>
          </div>

          <p className="font-elegant text-white text-xs">
            Dentro de la mesa de regalos Liverpool
          </p>
        </motion.div>

        {/* Transferencia Section */}
        <motion.div variants={itemVariants}>
          <h3 className="font-serif text-white text-3xl sm:text-4xl mb-4">
            Transferencia
          </h3>

          <p className="font-elegant text-white text-sm sm:text-base mb-4 flex items-center gap-2">
            <span>citibanamex</span>
            <span className="text-lg">🏦</span>
          </p>

          <div className="space-y-2 font-elegant text-white text-xs sm:text-sm">
            <p>
              <span className="font-semibold">Nombre:</span> Daniela García Bautista
            </p>
            <p>
              <span className="font-semibold">Cuenta clave:</span> 002632701533321248
            </p>
            <p>
              <span className="font-semibold">Cuenta:</span> 3332124
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
