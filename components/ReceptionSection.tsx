"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ReceptionSectionAlt3() {
  // Refs para GSAP
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulso en el título
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          scale: 1.03,
          textShadow: "0 0 20px rgba(212, 181, 160, 0.5)",
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Efecto de levitación en las cards
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            y: -8,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });

      // Rotación sutil en los iconos
      iconRefs.current.forEach((icon) => {
        if (icon) {
          gsap.to(icon, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "linear",
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

  const bottomVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  // Falling animation for decorations
  const fallingVariants = (delay: number, duration: number) => ({
    animate: {
      y: [-50, window.innerHeight + 50],
      x: [0, Math.random() * 40 - 20],
      rotate: [0, 360],
      opacity: [0, 0.3, 0.3, 0],
    },
    transition: {
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    },
  });

  return (
    <section className="bg-white py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Falling decorative elements - like rain */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8"
          style={{
            left: `${(i + 1) * 15}%`,
            top: -50,
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, Math.random() * 40 - 20],
            rotate: [0, 360],
            opacity: [0, 0.25, 0.25, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            delay: i * 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src={`https://wpocean.com/html/tf/sukun/assets/images/slider/ishape-${(i % 5) + 1}.svg`}
            alt=""
            fill
            className="object-contain"
            unoptimized
          />
        </motion.div>
      ))}

      {/* Side decorations */}
      <motion.div
        className="absolute top-1/3 left-[5%] w-14 h-14 opacity-15"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
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
        className="absolute top-2/3 right-[8%] w-12 h-12 opacity-15"
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
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
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Título decorativo */}
        <motion.div 
          variants={itemVariants}
          className="mb-12 md:mb-16 flex flex-col items-center text-center"
        >
          <div className="relative w-40 h-28 md:w-56 md:h-36 lg:w-72 lg:h-44 mb-5">
            <Image
              src="https://wpocean.com/html/tf/sukun/assets/images/preview/title-2.png"
              alt="Decoración"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <p className="text-[#D4B5A0] text-sm md:text-base tracking-[0.4em] uppercase font-light mb-4">
            OUR WEDDING
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-script text-black">
            When & Where
          </h2>
        </motion.div>

        {/* Contenedor principal con timeline vertical */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-0 md:gap-16 relative">
          {/* Timeline line (hidden on mobile) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#5a6f4c]/20 via-[#5a6f4c]/40 to-[#5a6f4c]/20 -translate-x-1/2"></div>

          {/* Ceremonia Religiosa */}
          <motion.div 
            variants={itemVariants} 
            className="flex-1 text-center md:text-right mb-12 md:mb-0 relative"
          >
            {/* Timeline dot */}
            <div className="hidden md:block absolute top-8 -right-[4.5rem] w-4 h-4 bg-[#5a6f4c] rounded-full border-4 border-white shadow-lg"></div>
            
            <div className="bg-gradient-to-br from-white to-[#5a6f4c]/5 p-8 rounded-2xl border border-[#5a6f4c]/10 shadow-sm">
              <h2 className="text-[#5a6f4c] text-sm sm:text-base tracking-[0.4em] uppercase font-light mb-4">
                Ceremonia Religiosa
              </h2>

              <p className="text-[#2C2C2C] text-3xl sm:text-4xl font-light mb-6">
                4:00 PM
              </p>

              <h3 className="font-script text-[#5a6f4c] text-3xl sm:text-4xl md:text-5xl mb-5 leading-tight">
                Iglesia Tricities
              </h3>

              <p className="text-[#2C2C2C] text-base sm:text-lg font-light mb-8 leading-relaxed">
                221 S Benton St, Kennewick
              </p>

              <motion.a
                href="https://maps.google.com/?q=Iglesia+Tricities+221+S+Benton+St+Kennewick"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center bg-[#5a6f4c] hover:bg-[#4a5f3c] text-white text-sm sm:text-base tracking-[0.2em] uppercase px-12 py-4 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Ubicación
              </motion.a>
            </div>
          </motion.div>

          {/* Recepción */}
          <motion.div 
            variants={itemVariants} 
            className="flex-1 text-center md:text-left relative"
          >
            {/* Timeline dot */}
            <div className="hidden md:block absolute top-8 -left-[4.5rem] w-4 h-4 bg-[#5a6f4c] rounded-full border-4 border-white shadow-lg"></div>
            
            <div className="bg-gradient-to-bl from-white to-[#5a6f4c]/5 p-8 rounded-2xl border border-[#5a6f4c]/10 shadow-sm">
              <h2 className="text-[#5a6f4c] text-sm sm:text-base tracking-[0.4em] uppercase font-light mb-4">
                Recepción
              </h2>

              <p className="text-[#2C2C2C] text-3xl sm:text-4xl font-light mb-6">
                6:00 PM
              </p>

              <h3 className="font-script text-[#5a6f4c] text-3xl sm:text-4xl md:text-5xl mb-5 leading-tight">
                Iglesia Tricities
              </h3>

              <p className="text-[#2C2C2C] text-base sm:text-lg font-light mb-8 leading-relaxed">
                221 S Benton St, Kennewick
              </p>

              <motion.a
                href="https://maps.google.com/?q=Iglesia+Tricities+221+S+Benton+St+Kennewick"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center bg-[#5a6f4c] hover:bg-[#4a5f3c] text-white text-sm sm:text-base tracking-[0.2em] uppercase px-12 py-4 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Ubicación
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
