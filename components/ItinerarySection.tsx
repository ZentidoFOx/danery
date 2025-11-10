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
      time: "2:00 PM",
      title: "Welcome Drinks",
      description: "Templo de Santo Domingo de Guzmán",
      icon: "https://wpocean.com/html/tf/sukun/assets/images/icon/1.svg",
    },
    {
      time: "3:00 PM",
      title: "Ceremony",
      description: "Templo de Santo Domingo de Guzmán",
      icon: "https://wpocean.com/html/tf/sukun/assets/images/icon/2.svg",
    },
    {
      time: "5:00 PM",
      title: "Party Photos",
      description: "En la explanada del Templo Santo",
      icon: "https://wpocean.com/html/tf/sukun/assets/images/icon/3.svg",
    },
    {
      time: "7:00 PM",
      title: "Dinner",
      description: "Paraje Ojo de Agua, carretera al Tule km 13",
      icon: "https://wpocean.com/html/tf/sukun/assets/images/icon/5.svg",
    },
    {
      time: "9:00 PM",
      title: "Cake Cutting",
      description: "Paraje Ojo de Agua, carretera al Tule km 13",
      icon: "https://wpocean.com/html/tf/sukun/assets/images/icon/6.svg",
    },
    {
      time: "10:00 PM",
      title: "First Dance",
      description: "y con los padres",
      icon: "https://wpocean.com/html/tf/sukun/assets/images/icon/7.svg",
    },
    {
      time: "11:00 PM",
      title: "Depart",
      description: "Calle Reforma, esquina con calle Constitución",
      icon: "https://wpocean.com/html/tf/sukun/assets/images/icon/1.svg",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20 px-4">
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
              src="https://wpocean.com/html/tf/sukun/assets/images/preview/title-2.png"
              alt="Decoración"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <p className="text-[#D4B5A0] text-sm md:text-base tracking-[0.4em] uppercase font-light mb-4">
            OUR SCHEDULE
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-script text-black">
            Wedding Timeline
          </h2>
        </motion.div>

        {/* Timeline with description - exactly like reference */}
        <div className="max-w-2xl mx-auto">
          <div className="space-y-8 md:space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start md:items-center justify-center gap-3 md:gap-10"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 md:w-16 md:h-16 relative">
                  <Image
                    src={event.icon}
                    alt={event.title}
                    fill
                    className="object-contain opacity-50"
                    unoptimized
                  />
                </div>

                {/* Time */}
                <div className="flex-shrink-0 w-20 md:w-28 pt-0 md:pt-1">
                  <p className="text-base md:text-xl text-[#6B7C68] font-light">
                    {event.time}
                  </p>
                </div>

                {/* Decorative vertical divider with heart */}
                <div className="flex-shrink-0 flex flex-col items-center h-full self-stretch py-0 md:py-1">
                  <div className="w-px h-4 md:h-8 bg-[#D4B5A0]/30"></div>
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-[#D4B5A0]/60 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <div className="w-px flex-1 min-h-[25px] md:min-h-[40px] bg-[#D4B5A0]/30"></div>
                </div>

                {/* Content with description */}
                <div className="flex-1 pt-0 md:pt-1 text-left">
                  <h3 className="text-lg md:text-3xl font-script text-[#2C2C2C] mb-1 md:mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm md:text-lg text-[#6B7C68]/70 font-light leading-snug">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
