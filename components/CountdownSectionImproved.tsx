"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Calendar } from "lucide-react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Tilt from "react-parallax-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import toast, { Toaster } from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

export default function CountdownSectionImproved() {
  const [isMobile, setIsMobile] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const sectionRef = useRef<HTMLElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Countdown timer
  useEffect(() => {
    const weddingDate = new Date("2025-12-18T15:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".gsap-fade-up", {
        scrollTrigger: {
          trigger: ".gsap-fade-up",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleLocationClick = (location: string) => {
    confetti({
      particleCount: isMobile ? 50 : 100,
      spread: isMobile ? 50 : 70,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#C4B5A0", "#FFFFFF"],
    });
    toast.success(`Abriendo mapa: ${location}`, {
      icon: "🗺️",
      style: {
        borderRadius: "10px",
        background: "#C4B5A0",
        color: "#fff",
      },
    });
    window.open("https://maps.google.com", "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const renderTime = (value: number, label: string) => (
    <div className="flex flex-col items-center">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elegant text-wedding-dark mb-2">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs sm:text-sm md:text-base font-elegant text-wedding-dark/60 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );

  return (
    <>
      <Toaster position={isMobile ? "bottom-center" : "top-right"} />
      <section
        ref={(node) => {
          if (node) {
            ref(node);
            (sectionRef as any).current = node;
          }
        }}
        className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12 sm:py-16 md:py-20 lg:py-24 px-4 overflow-hidden"
      >
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Decorative Branch */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8 sm:mb-12">
            <svg
              width={isMobile ? "100" : "140"}
              height={isMobile ? "60" : "90"}
              viewBox="0 0 140 90"
              fill="none"
              className="text-wedding-sage opacity-40"
            >
              <path
                d="M10 45 Q 35 25, 70 45 T 130 45"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path d="M25 40 L 30 28 M30 35 L 35 25" stroke="currentColor" strokeWidth="1" />
              <path d="M60 40 L 65 28 M65 35 L 70 25" stroke="currentColor" strokeWidth="1" />
              <path d="M95 40 L 100 28 M100 35 L 105 25" stroke="currentColor" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* Countdown with Circle Timers */}
          <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
              {[
                { value: timeLeft.days, label: "DÍAS", color: "#D4AF37" },
                { value: timeLeft.hours, label: "HORAS", color: "#C4B5A0" },
                { value: timeLeft.minutes, label: "MINUTOS", color: "#B8A588" },
                { value: timeLeft.seconds, label: "SEGUNDOS", color: "#A89578" },
              ].map(({ value, label, color }, index) => (
                <motion.div
                  key={label}
                  className="flex justify-center gsap-fade-up"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: index * 0.1,
                  }}
                >
                  <div className="relative">
                    <CountdownCircleTimer
                      isPlaying={inView}
                      duration={label === "SEGUNDOS" ? 60 : label === "MINUTOS" ? 3600 : 86400}
                      colors={color as any}
                      size={isMobile ? 90 : 130}
                      strokeWidth={isMobile ? 6 : 8}
                      trailColor="#F5F1E8"
                      onComplete={() => ({ shouldRepeat: true })}
                    >
                      {() => renderTime(value, label)}
                    </CountdownCircleTimer>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Invitation Text */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 sm:mb-16 md:mb-20 px-4 gsap-fade-up"
          >
            <p className="font-elegant text-wedding-dark/70 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
              Con la bendición de Dios y en compañía de nuestros padres, queremos
              invitarlos a que compartan con nosotros el momento más importante de
              nuestras vidas.
            </p>
          </motion.div>

          {/* Padres Section with Tilt */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 mb-12 sm:mb-16 md:mb-20"
          >
            {/* Padres de la Novia */}
            <Tilt
              tiltMaxAngleX={isMobile ? 5 : 10}
              tiltMaxAngleY={isMobile ? 5 : 10}
              scale={isMobile ? 1 : 1.02}
              transitionSpeed={2500}
              className="gsap-fade-up"
            >
              <motion.div
                className="text-center p-6 sm:p-8 rounded-lg bg-gradient-to-br from-white to-gray-50 shadow-lg border border-wedding-sage/10"
                whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              >
                <div className="mb-4 sm:mb-6">
                  <h3 className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-wedding-sage mb-4">
                    Padres de la novia
                  </h3>
                  <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-wedding-sage/50 to-transparent mx-auto mb-4 sm:mb-6" />
                </div>
                <p className="font-elegant text-wedding-dark text-base sm:text-lg md:text-xl lg:text-2xl mb-2">
                  Celina Bautista Méndez
                </p>
                <p className="font-elegant text-wedding-dark text-base sm:text-lg md:text-xl lg:text-2xl">
                  Luis Alberto García Díaz
                </p>
              </motion.div>
            </Tilt>

            {/* Padres del Novio */}
            <Tilt
              tiltMaxAngleX={isMobile ? 5 : 10}
              tiltMaxAngleY={isMobile ? 5 : 10}
              scale={isMobile ? 1 : 1.02}
              transitionSpeed={2500}
              className="gsap-fade-up"
            >
              <motion.div
                className="text-center p-6 sm:p-8 rounded-lg bg-gradient-to-br from-white to-gray-50 shadow-lg border border-wedding-sage/10"
                whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              >
                <div className="mb-4 sm:mb-6">
                  <h3 className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-wedding-sage mb-4">
                    Padres del novio
                  </h3>
                  <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-wedding-sage/50 to-transparent mx-auto mb-4 sm:mb-6" />
                </div>
                <p className="font-elegant text-wedding-dark text-base sm:text-lg md:text-xl lg:text-2xl mb-2">
                  Alicia Maribel Carreño Aquino
                </p>
                <p className="font-elegant text-wedding-dark text-base sm:text-lg md:text-xl lg:text-2xl">
                  Orlando Aragón Rodríguez
                </p>
              </motion.div>
            </Tilt>
          </motion.div>

          {/* Elegant Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center my-12 sm:my-16 md:my-20 gsap-fade-up"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-wedding-sage/30" />
            <motion.div
              className="px-4 sm:px-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg
                width={isMobile ? "30" : "40"}
                height={isMobile ? "30" : "40"}
                viewBox="0 0 40 40"
                fill="none"
                className="text-wedding-sage opacity-50"
              >
                <circle cx="20" cy="20" r="3" fill="currentColor" />
                <circle cx="10" cy="20" r="2" fill="currentColor" opacity="0.6" />
                <circle cx="30" cy="20" r="2" fill="currentColor" opacity="0.6" />
              </svg>
            </motion.div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-wedding-sage/30" />
          </motion.div>

          {/* Ceremonia Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16 gsap-fade-up">
            <div>
              <motion.h2
                className="font-elegant text-wedding-dark text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0.3em] uppercase mb-4"
                whileHover={{ letterSpacing: isMobile ? "0.3em" : "0.4em" }}
              >
                CEREMONIA RELIGIOSA
              </motion.h2>
              <motion.div
                className="flex items-center justify-center gap-2 text-wedding-dark/70"
                whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
              >
                <Calendar size={isMobile ? 18 : 22} />
                <p className="font-elegant text-xl sm:text-2xl md:text-3xl lg:text-4xl">3:00 PM</p>
              </motion.div>
            </div>

            <div>
              <h3 className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-wedding-sage mb-2 sm:mb-4">
                Templo de
              </h3>
              <h3 className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-wedding-sage">
                Santo Domingo de Guzmán
              </h3>
            </div>

            <motion.div className="max-w-md mx-auto" whileHover={{ scale: isMobile ? 1 : 1.02 }}>
              <p className="font-elegant text-wedding-dark/70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                C. Macedonio Alcalá s/n, Ruta Independencia,
                <br />
                Centro, 68000 Oaxaca de Juárez, Oaxaca.
              </p>
            </motion.div>

            <motion.button
              className="group relative px-6 sm:px-8 md:px-12 py-3 sm:py-4 bg-wedding-sage/80 hover:bg-wedding-sage text-white font-elegant text-xs sm:text-sm md:text-base tracking-widest uppercase overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: isMobile ? 1.02 : 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLocationClick("Templo Santo Domingo")}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative flex items-center gap-2 justify-center">
                <MapPin size={isMobile ? 16 : 18} />
                VER UBICACIÓN
              </span>
            </motion.button>
          </motion.div>

          {/* Elegant Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center my-12 sm:my-16 md:my-20 gsap-fade-up"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-wedding-sage/30" />
            <motion.div
              className="px-4 sm:px-6"
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg
                width={isMobile ? "30" : "40"}
                height={isMobile ? "30" : "40"}
                viewBox="0 0 40 40"
                fill="none"
                className="text-wedding-sage opacity-50"
              >
                <circle cx="20" cy="20" r="3" fill="currentColor" />
                <circle cx="10" cy="20" r="2" fill="currentColor" opacity="0.6" />
                <circle cx="30" cy="20" r="2" fill="currentColor" opacity="0.6" />
              </svg>
            </motion.div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-wedding-sage/30" />
          </motion.div>

          {/* Recepción Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6 sm:space-y-8 gsap-fade-up">
            <div>
              <motion.h2
                className="font-elegant text-wedding-dark text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0.3em] uppercase mb-4"
                whileHover={{ letterSpacing: isMobile ? "0.3em" : "0.4em" }}
              >
                RECEPCIÓN
              </motion.h2>
              <motion.div
                className="flex items-center justify-center gap-2 text-wedding-dark/70"
                whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
              >
                <Calendar size={isMobile ? 18 : 22} />
                <p className="font-elegant text-xl sm:text-2xl md:text-3xl lg:text-4xl">5:00 PM</p>
              </motion.div>
            </div>

            <div>
              <h3 className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-wedding-sage mb-2">
                Paraje
              </h3>
              <h3 className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-wedding-sage">
                Ojo de Agua
              </h3>
            </div>

            <motion.div className="max-w-md mx-auto" whileHover={{ scale: isMobile ? 1 : 1.02 }}>
              <p className="font-elegant text-wedding-dark/70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                Carretera Internacional al Tule km 13.
              </p>
            </motion.div>

            <motion.button
              className="group relative px-6 sm:px-8 md:px-12 py-3 sm:py-4 bg-wedding-sage/80 hover:bg-wedding-sage text-white font-elegant text-xs sm:text-sm md:text-base tracking-widest uppercase overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: isMobile ? 1.02 : 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLocationClick("Paraje Ojo de Agua")}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative flex items-center gap-2 justify-center">
                <MapPin size={isMobile ? 16 : 18} />
                VER UBICACIÓN
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
