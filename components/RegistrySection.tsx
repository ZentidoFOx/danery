"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Gift, ExternalLink, Copy, Check, Sparkles, QrCode } from "lucide-react";

// DISEÑO 1: CARD HORIZONTAL CON QR A LA IZQUIERDA
export default function RegistrySection1() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section className="bg-white py-10 px-4 relative overflow-hidden">
      {/* Corner frames */}
      <div ref={(el) => { cornerRefs.current[0] = el; }} className="absolute top-6 left-6 w-28 h-28 border-t-2 border-l-2 border-[#5a6f4c]/10 rounded-tl-3xl"></div>
      <div ref={(el) => { cornerRefs.current[1] = el; }} className="absolute top-6 right-6 w-28 h-28 border-t-2 border-r-2 border-[#5a6f4c]/10 rounded-tr-3xl"></div>
      <div ref={(el) => { cornerRefs.current[2] = el; }} className="absolute bottom-6 left-6 w-28 h-28 border-b-2 border-l-2 border-[#5a6f4c]/10 rounded-bl-3xl"></div>
      <div ref={(el) => { cornerRefs.current[3] = el; }} className="absolute bottom-6 right-6 w-28 h-28 border-b-2 border-r-2 border-[#5a6f4c]/10 rounded-br-3xl"></div>

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-12 flex flex-col items-center text-center">
          <div className="relative w-32 h-20 md:w-56 md:h-36 lg:w-72 lg:h-44 mb-3 md:mb-5">
            <Image
              src="https://wpocean.com/html/tf/sukun/assets/images/preview/title-2.png"
              alt="Decoración"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <p className="text-[#D4B5A0] text-xs md:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase font-light mb-2 md:mb-4">M E S A  D E  R E G A L O S</p>
          <h2 ref={titleRef} className="text-2xl md:text-5xl lg:text-6xl font-script text-[#2C2C2C] mb-2 md:mb-4">Tu Presencia es Nuestro Regalo</h2>
        </motion.div>

        {/* Horizontal Card */}
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-6 md:mb-8">
          <div className="border-2 border-[#5a6f4c]/15 rounded-2xl md:rounded-3xl p-4 md:p-10 bg-gradient-to-br from-white via-white to-[#F5F1E8]/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
              {/* Left: QR Code */}
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-48 h-48 md:w-64 md:h-64 rounded-xl md:rounded-2xl overflow-hidden border-2 md:border-4 border-[#5a6f4c]/20 shadow-xl md:shadow-2xl mb-3 md:mb-4"
                >
                  <Image
                    src="https://cash.app/qr/$Carlitos554?size=288&margin=0&bg=000000&logoColor=ffffff"
                    alt="Cash App QR Code"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </motion.div>
                <div className="flex items-center gap-2 text-[#5a6f4c]">
                  <QrCode size={16} className="md:w-5 md:h-5" />
                  <p className="text-xs md:text-sm font-light">Escanea para enviar</p>
                </div>
              </div>

              {/* Right: Info */}
              <div className="space-y-3 md:space-y-6">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#00D632] rounded-lg md:rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg md:text-xl">$</span>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-script text-[#2C2C2C]">Cash App</h3>
                    <p className="text-[#5a6f4c] text-xs md:text-sm font-light">Envío rápido y seguro</p>
                  </div>
                </div>

                <div className="bg-white/50 rounded-lg md:rounded-xl p-3 md:p-4 border border-[#5a6f4c]/10">
                  <p className="text-[#5a6f4c] text-xs uppercase tracking-wider mb-1 md:mb-2">Cashtag</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[#2C2C2C] font-light text-lg md:text-xl">$Carlitos554</p>
                    <button
                      onClick={() => copyToClipboard("$Carlitos554", "cashapp")}
                      className="p-2 hover:bg-[#5a6f4c]/10 rounded-lg transition-colors"
                    >
                      {copiedField === "cashapp" ? (
                        <Check size={18} className="text-green-600" />
                      ) : (
                        <Copy size={18} className="text-[#5a6f4c]" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-white/50 rounded-lg md:rounded-xl p-3 md:p-4 border border-[#5a6f4c]/10">
                  <p className="text-[#5a6f4c] text-xs uppercase tracking-wider mb-1 md:mb-2">Titular</p>
                  <p className="text-[#2C2C2C] font-light text-sm md:text-base">Carlos Salvador Borquez Garcia</p>
                </div>

                <motion.a
                  href="https://cash.app/$Carlitos554"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#00D632] hover:bg-[#00C02D] text-white text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase py-3 md:py-4 rounded-lg md:rounded-xl transition-all duration-300 font-light shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink size={18} />
                  Abrir Cash App
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom message */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="bg-gradient-to-r from-[#5a6f4c]/5 via-[#5a6f4c]/10 to-[#5a6f4c]/5 rounded-3xl px-8 py-6 border border-[#5a6f4c]/10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Gift size={24} className="text-[#5a6f4c]" />
              <p className="text-[#5a6f4c] font-script text-2xl md:text-3xl">¡Gracias por tu generosidad!</p>
              <Sparkles size={24} className="text-[#5a6f4c]" />
            </div>
            <p className="text-[#2C2C2C]/70 text-sm md:text-base font-light">
              Tu presencia y buenos deseos son lo más importante para nosotros
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
