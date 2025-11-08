"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { imageConfig, getImageUrl } from "@/lib/imageConfig";

export default function CouplePhotoSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = imageConfig.gallery.map((img, index) => 
    getImageUrl(img.src, imageConfig.fallback.gallery[index])
  );

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full bg-white py-0"
    >
      <motion.div
        className="w-full"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Top Section - Cream Background with Initials */}
        <div className="bg-gradient-to-b from-amber-50 to-amber-100 py-16 sm:py-20 md:py-24 px-4">
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto text-center">
            {/* Initials */}
            <h2 className="font-script text-7xl sm:text-8xl md:text-9xl text-[#6B8E6F] mb-4">
              D & J
            </h2>

            {/* Date */}
            <p className="font-elegant text-gray-600 text-lg sm:text-xl tracking-wide mb-6">
              18.11.2023
            </p>

            {/* Decorative Leaves */}
            <motion.div variants={itemVariants} className="flex justify-center gap-8 mb-8">
              <Leaf className="text-[#8B9D83]" size={24} strokeWidth={1.5} />
              <Leaf className="text-[#8B9D83]" size={24} strokeWidth={1.5} />
              <Leaf className="text-[#8B9D83]" size={24} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section - Photo Gallery */}
        <motion.div
          variants={imageVariants}
          className="relative w-full h-96 sm:h-[500px] md:h-[600px] bg-gray-300 group overflow-hidden"
        >
          <img
            key={currentImageIndex}
            src={galleryImages[currentImageIndex]}
            alt={`D & J - Photo ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
            loading="lazy"
          />

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full font-elegant text-sm">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
