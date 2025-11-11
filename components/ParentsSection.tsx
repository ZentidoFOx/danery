"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ParentsSectionAlt5() {
  // Refs para GSAP
  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de las esquinas
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

      // Pulso continuo en el título
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          scale: 1.02,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Efecto de brillo en las cards
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.to(card, {
            boxShadow: "0 10px 40px rgba(90, 111, 76, 0.15)",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });
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

  const leftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="bg-white py-12 md:py-16 px-4 relative overflow-hidden">
      {/* Elegant corner frames */}
      <div ref={(el) => { cornerRefs.current[0] = el; }} className="absolute top-6 left-6 w-28 h-28 border-t-2 border-l-2 border-wedding-navy-medium/15 rounded-tl-3xl"></div>
      <div ref={(el) => { cornerRefs.current[1] = el; }} className="absolute top-6 right-6 w-28 h-28 border-t-2 border-r-2 border-wedding-navy-medium/15 rounded-tr-3xl"></div>
      <div ref={(el) => { cornerRefs.current[2] = el; }} className="absolute bottom-6 left-6 w-28 h-28 border-b-2 border-l-2 border-wedding-navy-medium/15 rounded-bl-3xl"></div>
      <div ref={(el) => { cornerRefs.current[3] = el; }} className="absolute bottom-6 right-6 w-28 h-28 border-b-2 border-r-2 border-wedding-navy-medium/15 rounded-br-3xl"></div>

      {/* Strategic floating decorations */}
      <motion.div
        className="absolute top-[18%] left-[9%] w-11 h-11 opacity-22"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 120, 240, 360],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-1.svg"
          alt=""
          fill
          className="object-contain"
          unoptimized
        />
      </motion.div>

      <motion.div
        className="absolute top-[28%] right-[11%] w-13 h-13 opacity-20"
        animate={{
          y: [0, 18, 0],
          rotate: [0, -90, -180, -270, -360],
          scale: [1, 1.18, 1],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Image
          src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-2.svg"
          alt=""
          fill
          className="object-contain"
          unoptimized
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[22%] left-[11%] w-12 h-12 opacity-25"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <Image
          src="https://wpocean.com/html/tf/sukun/assets/images/wedding-date/7.svg"
          alt=""
          fill
          className="object-contain"
          unoptimized
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[32%] right-[13%] w-10 h-10 opacity-20"
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Image
          src="https://wpocean.com/html/tf/sukun/assets/images/wedding-date/8.svg"
          alt=""
          fill
          className="object-contain"
          unoptimized
        />
      </motion.div>

      <motion.div
        className="absolute top-[50%] left-[5%] w-8 h-8 opacity-16"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Image
          src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-3.svg"
          alt=""
          fill
          className="object-contain"
          unoptimized
        />
      </motion.div>

      <motion.div
        className="absolute top-[48%] right-[7%] w-9 h-9 opacity-18"
        animate={{
          rotate: [0, -360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
          delay: 1,
        }}
      >
        <Image
          src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-4.svg"
          alt=""
          fill
          className="object-contain"
          unoptimized
        />
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Título decorativo */}
        <motion.div 
          variants={itemVariants}
          className="mb-2 flex flex-col items-center text-center"
        >
         
        </motion.div>

        {/* Parents section with ornate cards */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12">
          {/* Bride's Parents */}
          <motion.div 
            variants={leftVariants} 
            className="flex-1 max-w-md text-center relative group"
          >
            <div ref={(el) => { cardRefs.current[0] = el; }} className="h-full relative border-2 border-wedding-navy-medium/15 rounded-3xl p-8 bg-gradient-to-b from-white via-white to-wedding-white-soft/20 hover:border-wedding-brown-warm/30 transition-all duration-500 shadow-lg shadow-wedding-navy-medium/10 hover:shadow-2xl hover:shadow-wedding-navy-medium/20">
              {/* Corner SVG decorations */}
              <motion.div 
                className="absolute top-4 left-4 w-6 h-6 opacity-30 group-hover:opacity-50 transition-opacity"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Image
                  src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-1.svg"
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </motion.div>
              <div className="absolute top-4 right-4 w-6 h-6 opacity-30 group-hover:opacity-50 transition-opacity">
                <Image
                  src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-2.svg"
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="absolute bottom-4 left-4 w-6 h-6 opacity-30 group-hover:opacity-50 transition-opacity">
                <Image
                  src="https://wpocean.com/html/tf/sukun/assets/images/wedding-date/7.svg"
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="absolute bottom-4 right-4 w-6 h-6 opacity-30 group-hover:opacity-50 transition-opacity">
                <Image
                  src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-4.svg"
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              <h3 className="font-script text-wedding-brown-warm text-3xl sm:text-4xl mb-6">
                Padres de la novia
              </h3>

              <div className="my-6 flex items-center justify-center gap-2">
                <motion.div 
                  className="w-14 h-px bg-wedding-beige-light/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
                <motion.div 
                  className="relative w-4 h-4 opacity-35"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Image
                    src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-3.svg"
                    alt=""
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </motion.div>
                <motion.div 
                  className="w-14 h-px bg-wedding-beige-light/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
              </div>

              <div className="space-y-4">
                <motion.p 
                  className="text-wedding-navy-dark text-lg sm:text-xl font-normal"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.05, color: "#344A6C" }}
                >
                  Celina Bautista Méndez
                </motion.p>
                <motion.p 
                  className="text-wedding-navy-dark text-lg sm:text-xl font-normal"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ scale: 1.05, color: "#344A6C" }}
                >
                  Luis Alberto García Díaz
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Groom's Parents */}
          <motion.div 
            variants={rightVariants} 
            className="flex-1 max-w-md text-center relative group"
          >
            <div ref={(el) => { cardRefs.current[1] = el; }} className="h-full relative border-2 border-wedding-navy-medium/15 rounded-3xl p-8 bg-gradient-to-b from-white via-white to-wedding-white-soft/20 hover:border-wedding-brown-warm/30 transition-all duration-500 shadow-lg shadow-wedding-navy-medium/10 hover:shadow-2xl hover:shadow-wedding-navy-medium/20">
              {/* Corner SVG decorations */}
              <motion.div 
                className="absolute top-4 left-4 w-6 h-6 opacity-30 group-hover:opacity-50 transition-opacity"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Image
                  src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-5.svg"
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </motion.div>
              <div className="absolute top-4 right-4 w-6 h-6 opacity-30 group-hover:opacity-50 transition-opacity">
                <Image
                  src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-3.svg"
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="absolute bottom-4 left-4 w-6 h-6 opacity-30 group-hover:opacity-50 transition-opacity">
                <Image
                  src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-1.svg"
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="absolute bottom-4 right-4 w-6 h-6 opacity-30 group-hover:opacity-50 transition-opacity">
                <Image
                  src="https://wpocean.com/html/tf/sukun/assets/images/wedding-date/8.svg"
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              <h3 className="font-script text-wedding-brown-warm text-3xl sm:text-4xl mb-6">
                Padres del novio
              </h3>

              <div className="my-6 flex items-center justify-center gap-2">
                <motion.div 
                  className="w-14 h-px bg-wedding-beige-light/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
                <motion.div 
                  className="relative w-4 h-4 opacity-35"
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Image
                    src="https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-4.svg"
                    alt=""
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </motion.div>
                <motion.div 
                  className="w-14 h-px bg-wedding-beige-light/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
              </div>

              <div className="space-y-4">
                <motion.p 
                  className="text-wedding-navy-dark text-lg sm:text-xl font-normal"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.05, color: "#344A6C" }}
                >
                  Alicia Maribel Carreño Aquino
                </motion.p>
                <motion.p 
                  className="text-wedding-navy-dark text-lg sm:text-xl font-normal"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ scale: 1.05, color: "#344A6C" }}
                >
                  Orlando Aragón Rodríguez
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
