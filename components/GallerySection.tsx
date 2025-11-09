"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function GallerySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  // Array de imágenes de ejemplo
  const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
  ];

  return (
    <section className="relative bg-white">
      {/* Header con degradado tipo humo */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        {/* Degradado superior tipo humo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8E5DC] via-[#E8E5DC]/80 to-transparent z-10" />
        
        {/* Contenido del header */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Iniciales */}
            <h2 className="text-[#6B7C5E] text-6xl sm:text-7xl md:text-8xl font-serif mb-2">
              D <span className="text-4xl sm:text-5xl md:text-6xl">&</span> J
            </h2>
            
            {/* Fecha */}
            <p className="text-[#6B7C5E] text-sm sm:text-base tracking-[0.3em] mb-4">
              13.11.2025
            </p>
            
            {/* Decoración floral */}
            <div className="flex justify-center">
              <div className="relative w-32 h-8">
                <Image
                  src="/images/hojaoliva.webp"
                  alt="Decoración"
                  fill
                  className="object-contain opacity-60"
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Imagen de fondo con degradado */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/gallery-bg.jpg"
              alt="Background"
              fill
              className="object-cover opacity-30"
            />
          </div>
        </div>
      </div>

      {/* Galería - Imágenes completas */}
      <motion.div
        className="py-8 md:py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Stack de imágenes completas */}
        <div className="space-y-4 md:space-y-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden group cursor-pointer"
            >
              <Image
                src={image}
                alt={`Galería ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
