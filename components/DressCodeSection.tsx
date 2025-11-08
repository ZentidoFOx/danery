"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Leaf } from "lucide-react";

export default function DressCodeSection() {
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

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-white py-16 sm:py-20 md:py-24 px-4"
    >
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Decorative Line Top */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-12"
        >
          <div className="w-full max-w-md h-px bg-gray-300" />
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12 flex items-center justify-center gap-4">
          {/* Hojas decorativas */}
          <Leaf className="text-[#8B9D83] flex-shrink-0" size={40} strokeWidth={1.2} />
          
          <div className="text-center">
            <h2 className="font-elegant text-gray-500 text-lg sm:text-xl tracking-wide">
              VESTIMENTA
            </h2>
            <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-gray-800 -mt-2">
              formal
            </h2>
          </div>

          <Leaf className="text-[#8B9D83] flex-shrink-0" size={40} strokeWidth={1.2} />
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <p className="font-elegant text-gray-500 text-lg sm:text-xl tracking-wide">
            RESPETUOSAMENTE
          </p>
          <p className="font-script text-4xl sm:text-5xl md:text-6xl text-gray-800 -mt-2">
            No niños
          </p>
        </motion.div>

        {/* Decorative Line Bottom */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <div className="w-full max-w-md h-px bg-gray-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
