"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Array de imágenes
  const images = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200",
    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cornerRefs.current.forEach((corner, index) => {
        if (corner) {
          gsap.from(corner, {
            scale: 0,
            opacity: 0,
            duration: 1,
            delay: index * 0.1,
            ease: "back.out(1.7)",
          });
        }
      });

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          scale: 1.02,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="bg-white py-10 relative overflow-hidden">
      {/* Corner frames */}
      <div ref={(el) => { cornerRefs.current[0] = el; }} className="absolute top-6 left-6 w-28 h-28 border-t-2 border-l-2 border-wedding-navy-medium/15 rounded-tl-3xl"></div>
      <div ref={(el) => { cornerRefs.current[1] = el; }} className="absolute top-6 right-6 w-28 h-28 border-t-2 border-r-2 border-wedding-navy-medium/15 rounded-tr-3xl"></div>
      <div ref={(el) => { cornerRefs.current[2] = el; }} className="absolute bottom-6 left-6 w-28 h-28 border-b-2 border-l-2 border-wedding-navy-medium/15 rounded-bl-3xl"></div>
      <div ref={(el) => { cornerRefs.current[3] = el; }} className="absolute bottom-6 right-6 w-28 h-28 border-b-2 border-r-2 border-wedding-navy-medium/15 rounded-br-3xl"></div>

      {/* Floating decorations */}
      <motion.div
        className="absolute top-[15%] left-[8%] w-12 h-12 opacity-20"
        animate={{ y: [0, -15, 0], rotate: [0, 360], scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-1.svg" alt="" fill className="object-contain" unoptimized />
      </motion.div>

      <motion.div
        className="absolute top-[25%] right-[10%] w-14 h-14 opacity-18"
        animate={{ y: [0, 18, 0], rotate: [0, -360], scale: [1, 1.18, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Image src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-2.svg" alt="" fill className="object-contain" unoptimized />
      </motion.div>

      <motion.div
        className="relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="mb-10 md:mb-12 flex flex-col items-center text-center px-4">
          <div className="relative w-40 h-28 md:w-56 md:h-36 lg:w-72 lg:h-44 mb-5">
            <Image
              src="https://wpolive.com/html/bohu-live/assets/images/preview/title-1.png"
              alt="Decoración"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <p className="text-wedding-beige-light text-xs md:text-sm tracking-[0.5em] uppercase font-light mb-4">G A L E R Í A</p>
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-script text-wedding-navy-medium">Nuestros Momentos</h2>
        </motion.div>

        {/* Slider */}
        <motion.div variants={itemVariants} className="relative md:max-w-7xl md:mx-auto md:px-4">
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] md:rounded-3xl overflow-hidden md:border-2 border-wedding-navy-medium/15 bg-gradient-to-br from-white to-wedding-white-soft/20 shadow-2xl shadow-wedding-navy-medium/15">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`Galería ${currentIndex + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.button
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              animate={{ x: [-2, 2, -2] }}
              transition={{ x: { duration: 2, repeat: Infinity } }}
            >
              <ChevronLeft size={24} className="text-wedding-brown-warm" />
            </motion.button>
            <motion.button
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              animate={{ x: [2, -2, 2] }}
              transition={{ x: { duration: 2, repeat: Infinity } }}
            >
              <ChevronRight size={24} className="text-wedding-brown-warm" />
            </motion.button>

            {/* Counter */}
            <motion.div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              key={currentIndex}
            >
              <motion.p 
                className="text-wedding-brown-warm text-sm font-light"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
                key={currentIndex}
              >
                {currentIndex + 1} / {images.length}
              </motion.p>
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 px-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-2 bg-wedding-brown-warm"
                    : "w-2 h-2 bg-wedding-brown-warm/30 hover:bg-wedding-brown-warm/50"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Thumbnails */}
        <motion.div variants={itemVariants} className="mt-8 px-4 grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? "border-wedding-brown-warm scale-105 shadow-lg shadow-wedding-navy-medium/20"
                  : "border-wedding-navy-medium/20 hover:border-wedding-brown-warm/50 shadow-md shadow-wedding-navy-medium/10"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-wedding-brown-warm/20 flex items-center justify-center">
                  <Heart size={20} className="text-white fill-white" />
                </div>
              )}
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
