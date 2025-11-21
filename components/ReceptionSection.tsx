"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ExternalLink, MapPin } from "lucide-react";

import { useLanguage } from "./LanguageContext";

export default function ReceptionSectionAlt3() {
  const { t } = useLanguage();
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
      y: [-50, typeof window !== 'undefined' ? window.innerHeight + 50 : 1000],
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
    <section className="bg-white py-10 px-4 relative overflow-hidden">
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
            y: [0, typeof window !== 'undefined' ? window.innerHeight + 100 : 1000],
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
          <p className="text-wedding-beige-light text-sm md:text-base tracking-[0.4em] uppercase font-light mb-4">
            {t.reception.title_small}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-script text-wedding-navy-medium">
            {t.reception.title_small}
          </h2>
        </motion.div>

        {/* Contenedor principal con timeline vertical */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-8 md:gap-16 relative">
          {/* Timeline line (hidden on mobile) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-wedding-navy-medium/20 via-wedding-brown-warm/40 to-wedding-navy-medium/20 -translate-x-1/2"></div>

          {/* Ceremonia Civil - Ubicación */}
          <motion.div
            variants={itemVariants}
            className="flex-1 text-center md:text-right mb-12 md:mb-0 relative"
          >
            {/* Timeline dot */}
            <motion.div
              className="hidden md:block absolute top-8 -right-[4.5rem] w-4 h-4 bg-wedding-brown-warm rounded-full border-4 border-white shadow-lg"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            <div className="bg-gradient-to-br from-white to-wedding-navy-medium/5 p-8 rounded-2xl border border-wedding-beige-light/15 shadow-lg shadow-wedding-navy-medium/10">
              {/* <motion.h2
                className="text-wedding-brown-warm text-sm sm:text-base tracking-[0.4em] uppercase font-light mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t.reception.civil_ceremony}
              </motion.h2> */}

              <motion.h3
                className="font-script text-wedding-brown-warm text-3xl sm:text-4xl md:text-5xl mb-5 leading-tight"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                {t.reception.church_name}
              </motion.h3>

              <p className="text-wedding-navy-dark text-base sm:text-lg font-light mb-8 leading-relaxed">
                {t.reception.address}
              </p>

              <motion.a
                href="https://www.google.com/maps/dir/?api=1&destination=221+S+Benton+St,+Kennewick,+WA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full md:w-auto text-center bg-wedding-navy-medium hover:bg-wedding-navy-dark text-white text-sm sm:text-base tracking-[0.2em] uppercase px-12 py-4 transition-all duration-300 shadow-md shadow-wedding-navy-medium/30 hover:shadow-lg hover:shadow-wedding-navy-medium/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin size={18} />
                {t.reception.get_directions}
              </motion.a>
            </div>
          </motion.div>

          {/* Mapa de Ubicación */}
          <motion.div
            variants={itemVariants}
            className="flex-1 text-center md:text-left relative"
            style={{ height: '300px' }}
          >
            {/* Timeline dot */}
            <motion.div
              className="hidden md:block absolute top-8 -left-[4.5rem] w-4 h-4 bg-wedding-brown-warm rounded-full border-4 border-white shadow-lg"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            ></motion.div>

            <div className="bg-gradient-to-bl from-white to-wedding-navy-medium/5 p-4 rounded-2xl border border-wedding-beige-light/15 shadow-lg shadow-wedding-navy-medium/10 h-full flex flex-col">
              <motion.h2
                className="text-wedding-brown-warm text-sm sm:text-base tracking-[0.4em] uppercase font-light mb-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t.reception.how_to_get}
              </motion.h2>

              <motion.div
                className="w-full flex-1 rounded-lg overflow-hidden border-2 border-wedding-beige-light/20 relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.6753448372846!2d-119.13937!3d46.20819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54990c5f5c8b3e75%3A0x8e4e8e8e8e8e8e8e!2s221%20S%20Benton%20St%2C%20Kennewick%2C%20WA%2099336!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de la ceremonia"
                ></iframe>

                {/* Icono de enlace en la esquina superior derecha */}
                <motion.a
                  href="https://www.google.com/maps/dir/?api=1&destination=221+S+Benton+St,+Kennewick,+WA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-wedding-navy-medium transition-all duration-300 z-10 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Abrir en Google Maps"
                >
                  <ExternalLink size={18} className="text-wedding-navy-medium group-hover:text-white" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
