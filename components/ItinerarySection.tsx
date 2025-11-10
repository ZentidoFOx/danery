"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ItinerarySectionAlt7() {
  // Refs para GSAP
  const titleRef = useRef<HTMLHeadingElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heartRefs = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulso en el título
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          scale: 1.02,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Rotación en los iconos
      iconRefs.current.forEach((icon, index) => {
        if (icon) {
          gsap.to(icon, {
            rotation: 360,
            duration: 15 + index * 2,
            repeat: -1,
            ease: "linear",
          });
        }
      });

      // Pulso en los corazones
      heartRefs.current.forEach((heart) => {
        if (heart) {
          gsap.to(heart, {
            scale: 1.2,
            duration: 1,
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
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const leftSlideVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7 },
    },
  };

  const events = [
    {
      time: "4:00 p. m.",
      title: "Ceremonia",
      description: "Iglesia Tricities, 221 S Benton St, Kennewick",
      icon: "/images/ceremony.svg",
    },
    {
      time: "6:00 p. m.",
      title: "Recepción",
      description: "Inicio de la celebración",
      icon: "/images/reception.png",
    },
    {
      time: "7:00 p. m.",
      title: "Cena y brindis",
      description: "Disfrutemos juntos",
      icon: "/images/cena-brindis.svg",
    },
    {
      time: "8:00 p. m.",
      title: "Primer baile",
      description: "Nuestro primer baile",
      icon: "/images/first-dance.svg",
    },
    {
      time: "9:00 p. m.",
      title: "Despedida",
      description: "Fin de la celebración",
      icon: "/images/depart.svg",
    },
  ];

  return (
    <section className="bg-white py-10 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Título decorativo */}
        <motion.div 
          variants={itemVariants}
          className="mb-16 md:mb-20 flex flex-col items-center text-center"
        >
          <div className="relative w-40 h-28 md:w-56 md:h-36 lg:w-72 lg:h-44 mb-5">
            <Image
              src="https://wpolive.com/html/bohu-live/assets/images/preview/title-1.png"
              alt="Decoración"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <p className="text-wedding-beige-light text-sm md:text-base tracking-[0.4em] uppercase font-light mb-4">
            NUESTRO HORARIO
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-script text-wedding-navy-medium">
            Itinerario de la Boda
          </h2>
        </motion.div>

        {/* Timeline with description - exactly like reference */}
        <div className="max-w-2xl mx-auto">
          <div className="space-y-8 md:space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3 md:gap-6"
              >
                {/* Icon */}
                <motion.div 
                  className="flex-shrink-0 w-10 h-10 md:w-16 md:h-16 relative"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    },
                    rotate: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }
                  }}
                >
                  <Image
                    src={event.icon}
                    alt={event.title}
                    fill
                    className="object-contain opacity-50"
                    unoptimized
                  />
                </motion.div>

                {/* Time */}
                <div className="flex-shrink-0 w-20 md:w-28">
                  <p className="text-base md:text-xl text-wedding-brown-warm font-light">
                    {event.time}
                  </p>
                </div>

                {/* Decorative vertical divider with heart */}
                <div className="flex-shrink-0 flex flex-col items-center h-full self-stretch">
                  <motion.div 
                    className="h-4 md:h-8 bg-gradient-to-b from-transparent via-wedding-brown-warm/30 to-wedding-brown-warm/60"
                    style={{ width: '1px' }}
                    animate={{ 
                      scaleY: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4
                    }}
                  ></motion.div>
                  <motion.svg 
                    className="w-3 h-3 md:w-4 md:h-4 text-wedding-beige-light/60 fill-current" 
                    viewBox="0 0 24 24"
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4
                    }}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </motion.svg>
                  <motion.div 
                    className="flex-1 min-h-[25px] md:min-h-[40px] bg-gradient-to-b from-wedding-brown-warm/60 via-wedding-brown-warm/40 to-transparent"
                    style={{ width: '1px' }}
                    animate={{ 
                      scaleY: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4 + 0.3
                    }}
                  ></motion.div>
                </div>

                {/* Content with description */}
                <motion.div 
                  className="flex-1 text-left"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3 
                    className="text-2xl md:text-3xl font-script text-wedding-navy-dark mb-1 md:mb-2"
                    animate={{ 
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    {event.title}
                  </motion.h3>
                  <motion.p 
                    className="text-base md:text-lg text-wedding-brown-warm/70 font-light leading-snug"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 1 }}
                    animate={{ 
                      x: [0, 3, 0]
                    }}
                    transition={{
                      x: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5 + 0.5
                      }
                    }}
                  >
                    {event.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
