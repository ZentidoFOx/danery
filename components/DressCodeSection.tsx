"use client";

import { motion } from "framer-motion";

export default function DressCodeSection() {
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
    <section className="bg-white py-16 md:py-20 px-4">
      <motion.div
        className="max-w-xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Línea decorativa superior */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="h-px w-full bg-[#C7B299]/40" />
        </motion.div>

        {/* Vestimenta */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-[#C7B299] text-sm sm:text-base tracking-[0.3em] uppercase font-light mb-2">
            Vestimenta
          </h3>
          <p className="font-script text-[#1F2A38] text-4xl sm:text-5xl md:text-6xl">
            formal
          </p>
        </motion.div>

        {/* Separador vertical */}
        <motion.div variants={itemVariants} className="flex justify-center my-8">
          <div className="w-px h-12 bg-[#C7B299]/40" />
        </motion.div>

        {/* Respetuosamente no niños */}
        <motion.div variants={itemVariants} className="mb-10">
          <h3 className="text-[#C7B299] text-sm sm:text-base tracking-[0.3em] uppercase font-light mb-2">
            Respetuosamente
          </h3>
          <p className="font-script text-[#1F2A38] text-4xl sm:text-5xl md:text-6xl">
            no niños
          </p>
        </motion.div>

        {/* Línea decorativa inferior */}
        <motion.div variants={itemVariants} className="mt-10">
          <div className="h-px w-full bg-[#C7B299]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
