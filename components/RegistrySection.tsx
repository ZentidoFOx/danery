"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Gift, ExternalLink, Copy, Check, Sparkles, QrCode } from "lucide-react";
import { useLanguage } from "./LanguageContext";

// DISEÑO 1: CARD HORIZONTAL CON QR A LA IZQUIERDA
export default function RegistrySection1() {
  const { t } = useLanguage();
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
    <section className="bg-white py-0 px-4 relative overflow-hidden">
      {/* Corner frames */}
      <div ref={(el) => { cornerRefs.current[0] = el; }} className="absolute top-6 left-6 w-28 h-28 border-t-2 border-l-2 border-wedding-navy-medium/15 rounded-tl-3xl"></div>
      <div ref={(el) => { cornerRefs.current[1] = el; }} className="absolute top-6 right-6 w-28 h-28 border-t-2 border-r-2 border-wedding-navy-medium/15 rounded-tr-3xl"></div>
      <div ref={(el) => { cornerRefs.current[2] = el; }} className="absolute bottom-6 left-6 w-28 h-28 border-b-2 border-l-2 border-wedding-navy-medium/15 rounded-bl-3xl"></div>
      <div ref={(el) => { cornerRefs.current[3] = el; }} className="absolute bottom-6 right-6 w-28 h-28 border-b-2 border-r-2 border-wedding-navy-medium/15 rounded-br-3xl"></div>

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
          <p className="text-wedding-beige-light text-xs md:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase font-poppins font-light mb-2 md:mb-4">{t.registry.title_small}</p>
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-script text-wedding-navy-medium mb-3 md:mb-6">{t.registry.title_large}</h2>
          <p className="text-wedding-navy-dark/70 text-sm md:text-base font-poppins font-light max-w-3xl mx-auto leading-relaxed">
            {t.registry.description_1}<br className="hidden md:block" />
            {t.registry.description_2}
          </p>
        </motion.div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-6 md:mb-8">
          {/* Cash App */}
          <motion.div variants={itemVariants}>
            <div className="border-2 border-wedding-navy-medium/15 rounded-2xl p-6 bg-gradient-to-br from-white via-white to-wedding-white-soft/30 shadow-xl shadow-wedding-navy-medium/15 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#00D632] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">$</span>
                </div>
                <div>
                  <h3 className="text-2xl font-script text-wedding-navy-dark">Cash App</h3>
                  <div className="flex items-center gap-1.5">
                    <p className="text-wedding-brown-warm text-xs font-poppins font-light">{t.registry.usa}</p>
                    <Image
                      src="https://flagcdn.com/w40/us.png"
                      alt="USA Flag"
                      width={16}
                      height={12}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <motion.div
                className="relative w-32 h-32 mx-auto mb-4 rounded-xl overflow-hidden border-2 border-wedding-brown-warm/20 shadow-lg"
                whileHover={{ scale: 1.05 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/cashappqr.png"
                  alt="QR Code Cash App"
                  fill
                  className="object-contain"
                />
              </motion.div>

              <div className="bg-white/50 rounded-xl p-3 border border-wedding-beige-light/15 shadow-sm mb-3">
                <p className="text-wedding-brown-warm text-xs uppercase tracking-wider font-poppins mb-1">Cashtag</p>
                <div className="flex items-center justify-between">
                  <p className="text-wedding-navy-dark font-poppins font-light text-lg">$Carlitos554</p>
                  <motion.button
                    onClick={() => copyToClipboard("$Carlitos554", "cashapp")}
                    className="p-2 hover:bg-wedding-brown-warm/10 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copiedField === "cashapp" ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} className="text-wedding-brown-warm" />
                    )}
                  </motion.button>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-3 border border-wedding-beige-light/15 shadow-sm mb-4">
                <p className="text-wedding-brown-warm text-xs uppercase tracking-wider font-poppins mb-1">{t.registry.holder}</p>
                <p className="text-wedding-navy-dark font-poppins font-light text-sm">Carlos Salvador Borquez Garcia</p>
              </div>

              <motion.a
                href="https://cash.app/$Carlitos554"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#00D632] hover:bg-[#00C02D] text-white text-sm tracking-wide uppercase py-3 rounded-xl transition-all duration-300 font-light shadow-lg mt-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink size={16} />
                {t.registry.open_app}
              </motion.a>
            </div>
          </motion.div>

          {/* Yape - Perú */}
          <motion.div variants={itemVariants}>
            <div className="border-2 border-wedding-navy-medium/15 rounded-2xl p-6 bg-gradient-to-br from-white via-white to-wedding-white-soft/30 shadow-xl shadow-wedding-navy-medium/15 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#752F8A] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">Y</span>
                </div>
                <div>
                  <h3 className="text-2xl font-script text-wedding-navy-dark">Yape</h3>
                  <div className="flex items-center gap-1.5">
                    <p className="text-wedding-brown-warm text-xs font-poppins font-light">{t.registry.peru}</p>
                    <Image
                      src="https://flagcdn.com/w40/pe.png"
                      alt="Peru Flag"
                      width={16}
                      height={12}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <motion.div
                className="relative w-32 h-32 mx-auto mb-4 rounded-xl overflow-hidden border-2 border-wedding-brown-warm/20 shadow-lg"
                whileHover={{ scale: 1.05 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <Image
                  src="/images/yape-qr.jpg"
                  alt="QR Code Yape"
                  fill
                  className="object-contain"
                />
              </motion.div>

              <div className="bg-white/50 rounded-xl p-3 border border-wedding-beige-light/15 shadow-sm mb-3">
                <p className="text-wedding-brown-warm text-xs uppercase tracking-wider font-poppins mb-1">{t.registry.number}</p>
                <div className="flex items-center justify-between">
                  <p className="text-wedding-navy-dark font-poppins font-light text-lg">985 316 666</p>
                  <motion.button
                    onClick={() => copyToClipboard("985316666", "yape")}
                    className="p-2 hover:bg-wedding-brown-warm/10 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copiedField === "yape" ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} className="text-wedding-brown-warm" />
                    )}
                  </motion.button>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-3 border border-wedding-beige-light/15 shadow-sm mb-4">
                <p className="text-wedding-brown-warm text-xs uppercase tracking-wider font-poppins mb-1">{t.registry.holder}</p>
                <p className="text-wedding-navy-dark font-poppins font-light text-sm">Danery Alessandra Ccahuana Centeno</p>
              </div>

              <div className="flex items-center justify-center gap-2 w-full bg-[#752F8A] text-white text-sm tracking-wide uppercase py-3 rounded-xl font-light shadow-lg mt-auto">
                {t.registry.transfer} Yape
              </div>
            </div>
          </motion.div>

          {/* PIX - Brasil */}
          <motion.div variants={itemVariants}>
            <div className="border-2 border-wedding-navy-medium/15 rounded-2xl p-6 bg-gradient-to-br from-white via-white to-wedding-white-soft/30 shadow-xl shadow-wedding-navy-medium/15 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#32BCAD] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">Pix</span>
                </div>
                <div>
                  <h3 className="text-2xl font-script text-wedding-navy-dark">Pix</h3>
                  <div className="flex items-center gap-1.5">
                    <p className="text-wedding-brown-warm text-xs font-poppins font-light">{t.registry.brazil}</p>
                    <Image
                      src="https://flagcdn.com/w40/br.png"
                      alt="Brazil Flag"
                      width={16}
                      height={12}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              </div>


              <div className="bg-white/50 rounded-xl p-3 border border-wedding-beige-light/15 shadow-sm mb-3">
                <p className="text-wedding-brown-warm text-xs uppercase tracking-wider font-poppins mb-1">Chave PIX</p>
                <div className="flex items-center justify-between">
                  <p className="text-wedding-navy-dark font-poppins font-light text-sm break-all">daneryalessandra1@gmail.com</p>
                  <motion.button
                    onClick={() => copyToClipboard("daneryalessandra1@gmail.com", "pix")}
                    className="p-2 hover:bg-wedding-brown-warm/10 rounded-lg transition-colors flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copiedField === "pix" ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} className="text-wedding-brown-warm" />
                    )}
                  </motion.button>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-3 border border-wedding-beige-light/15 shadow-sm mb-4">
                <p className="text-wedding-brown-warm text-xs uppercase tracking-wider font-poppins mb-1">{t.registry.holder}</p>
                <p className="text-wedding-navy-dark font-poppins font-light text-sm">Danery Alessandra Ccahuana Centeno</p>
              </div>

              <div className="flex items-center justify-center gap-2 w-full bg-[#32BCAD] text-white text-sm tracking-wide uppercase py-3 rounded-xl font-light shadow-lg mt-auto">
                {t.registry.transfer} PIX
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom message */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.div
            className="bg-gradient-to-r from-wedding-navy-medium/5 via-wedding-beige-light/10 to-wedding-navy-medium/5 rounded-3xl px-8 py-6 border border-wedding-beige-light/15 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Gift size={24} className="text-wedding-brown-warm" />
              </motion.div>
              <p className="text-wedding-brown-warm font-script text-2xl md:text-3xl">{t.registry.thank_you}</p>
              <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
                <Sparkles size={24} className="text-wedding-brown-warm" />
              </motion.div>
            </div>
            <p className="text-wedding-navy-dark/70 text-sm md:text-base font-poppins font-light">
              {t.registry.thanks_msg}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
