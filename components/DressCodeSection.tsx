"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function DressCodeSectionAlt4() {
  // Refs para GSAP
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formalRef = useRef<HTMLParagraphElement>(null);
  const noKidsRef = useRef<HTMLParagraphElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulso en el título
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          scale: 1.03,
          textShadow: "0 0 20px rgba(212, 181, 160, 0.4)",
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Efecto de brillo en "Formal"
      if (formalRef.current) {
        gsap.to(formalRef.current, {
          scale: 1.05,
          textShadow: "0 0 15px rgba(44, 44, 44, 0.3)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Efecto de brillo en "No Niños"
      if (noKidsRef.current) {
        gsap.to(noKidsRef.current, {
          scale: 1.05,
          textShadow: "0 0 15px rgba(44, 44, 44, 0.3)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }

      // Pulso en el corazón
      if (heartRef.current) {
        gsap.to(heartRef.current, {
          scale: 1.2,
          rotation: 10,
          duration: 1.5,
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section className="bg-white py-16 md:py-20 px-4">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <p className="text-wedding-beige-light text-sm md:text-base tracking-[0.4em] uppercase font-light mb-4">
            DRESS CODE
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-script text-wedding-navy-medium">
            Código de Vestimenta
          </h2>
        </motion.div>

        {/* Horizontal layout con divider central */}
        <div className="flex flex-row items-center justify-center gap-4 md:gap-16">
          {/* Vestimenta */}
          <motion.div
            variants={itemVariants}
            className="flex-1 text-center md:text-right max-w-[180px] md:max-w-sm"
          >
            <div className="inline-block shadow-md shadow-wedding-navy-medium/5 rounded-2xl p-4 bg-white/50">
              <h3 className="text-wedding-beige-light text-xs md:text-base tracking-[0.2em] md:tracking-[0.3em] uppercase font-light mb-2 md:mb-4">
                Vestimenta
              </h3>
              <motion.p 
                className="font-script text-wedding-navy-dark text-3xl md:text-6xl lg:text-7xl mb-2 md:mb-4"
                whileHover={{ scale: 1.1, color: "#344A6C" }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Formal
              </motion.p>
              <div className="w-16 md:w-24 h-px bg-wedding-beige-light/30 ml-auto"></div>
            </div>
          </motion.div>

          {/* Divider vertical con decoración */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-2 md:gap-3"
          >
            <motion.div 
              className="w-px h-12 md:h-20 bg-wedding-beige-light/30"
              animate={{ scaleY: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
            <motion.div 
              className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-wedding-beige-light/30 flex items-center justify-center flex-shrink-0"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-4 h-4 md:w-6 md:h-6 text-wedding-brown-warm fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>
            <motion.div 
              className="w-px h-12 md:h-20 bg-wedding-beige-light/30"
              animate={{ scaleY: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            ></motion.div>
          </motion.div>

          {/* No Niños */}
          <motion.div
            variants={itemVariants}
            className="flex-1 text-center md:text-left max-w-[180px] md:max-w-sm"
          >
            <div className="inline-block shadow-md shadow-wedding-navy-medium/5 rounded-2xl p-4 bg-white/50">
              <h3 className="text-wedding-beige-light text-xs md:text-base tracking-[0.2em] md:tracking-[0.3em] uppercase font-light mb-2 md:mb-4">
                Respetuosamente
              </h3>
              <motion.p 
                className="font-script text-wedding-navy-dark text-3xl md:text-6xl lg:text-7xl mb-2 md:mb-4"
                whileHover={{ scale: 1.1, color: "#344A6C" }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                No Niños
              </motion.p>
              <div className="w-16 md:w-24 h-px bg-wedding-beige-light/30 mr-auto"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
