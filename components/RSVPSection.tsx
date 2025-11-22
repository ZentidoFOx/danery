"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Heart, User, Users, CheckCircle, Video, Clock } from "lucide-react";
import { useLanguage } from "./LanguageContext";

// DISEÑO 3: Cards Horizontales con Iconos
export default function RSVPSection3() {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    attending: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.rsvp.alert_msg.replace("{name}", formData.firstName));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // No mostrar la sección RSVP si el idioma es portugués
  if (language === 'pt') {
    return null;
  }

  return (
    <section id="rsvp-section" className="bg-white py-10 px-4 relative overflow-hidden">
      {/* Corner frames */}
      <div ref={(el) => { cornerRefs.current[0] = el; }} className="absolute top-6 left-6 w-28 h-28 border-t-2 border-l-2 border-wedding-navy-medium/15 rounded-tl-3xl"></div>
      <div ref={(el) => { cornerRefs.current[1] = el; }} className="absolute top-6 right-6 w-28 h-28 border-t-2 border-r-2 border-wedding-navy-medium/15 rounded-tr-3xl"></div>
      <div ref={(el) => { cornerRefs.current[2] = el; }} className="absolute bottom-6 left-6 w-28 h-28 border-b-2 border-l-2 border-wedding-navy-medium/15 rounded-bl-3xl"></div>
      <div ref={(el) => { cornerRefs.current[3] = el; }} className="absolute bottom-6 right-6 w-28 h-28 border-b-2 border-r-2 border-wedding-navy-medium/15 rounded-br-3xl"></div>

      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="mb-10 md:mb-12 flex flex-col items-center text-center">
          <div className="relative w-40 h-28 md:w-56 md:h-36 lg:w-72 lg:h-44 mb-5">
            <Image
              src="https://wpocean.com/html/tf/sukun/assets/images/preview/title-2.png"
              alt="Decoración"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <p className="text-wedding-beige-light text-xs md:text-sm tracking-[0.5em] uppercase font-poppins font-light mb-4">{t.rsvp.title_small}</p>
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-script text-wedding-navy-medium">{t.rsvp.title_large}</h2>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre Card */}
            <motion.div variants={itemVariants} className="relative group">
              <motion.div
                className="absolute -top-4 left-6 bg-white px-4 py-2 rounded-full border-2 border-wedding-navy-medium/30 flex items-center gap-2 z-10"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <User size={16} className="text-wedding-navy-medium" />
                <span className="text-wedding-navy-medium text-xs uppercase tracking-wider font-light">{t.rsvp.name_label}</span>
              </motion.div>
              <div className="pt-6 pb-4 px-6 bg-gradient-to-br from-white to-wedding-white-soft/30 border-2 border-wedding-navy-medium/20 rounded-2xl group-hover:border-wedding-navy-medium/50 transition-all shadow-md shadow-wedding-navy-medium/10">
                <input
                  type="text"
                  name="firstName"
                  placeholder={t.rsvp.name_placeholder}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-wedding-navy-medium/20 rounded-lg text-wedding-navy-dark placeholder-wedding-navy-medium/40 text-sm focus:border-wedding-navy-medium focus:ring-2 focus:ring-wedding-navy-medium/20 outline-none transition-all"
                />
              </div>
            </motion.div>

            {/* Apellido Card */}
            <motion.div variants={itemVariants} className="relative group">
              <motion.div
                className="absolute -top-4 left-6 bg-white px-4 py-2 rounded-full border-2 border-wedding-navy-medium/30 flex items-center gap-2 z-10"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Users size={16} className="text-wedding-navy-medium" />
                <span className="text-wedding-navy-medium text-xs uppercase tracking-wider font-light">{t.rsvp.lastname_label}</span>
              </motion.div>
              <div className="pt-6 pb-4 px-6 bg-gradient-to-br from-white to-wedding-white-soft/30 border-2 border-wedding-navy-medium/20 rounded-2xl group-hover:border-wedding-navy-medium/50 transition-all shadow-md shadow-wedding-navy-medium/10">
                <input
                  type="text"
                  name="lastName"
                  placeholder={t.rsvp.lastname_placeholder}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-wedding-navy-medium/20 rounded-lg text-wedding-navy-dark placeholder-wedding-navy-medium/40 text-sm focus:border-wedding-navy-medium focus:ring-2 focus:ring-wedding-navy-medium/20 outline-none transition-all"
                />
              </div>
            </motion.div>
          </div>

          {/* Asistencia Card */}
          <motion.div variants={itemVariants} className="relative group">
            <motion.div
              className="absolute -top-4 left-6 bg-white px-4 py-2 rounded-full border-2 border-wedding-navy-medium/30 flex items-center gap-2 z-10"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle size={16} className="text-wedding-navy-medium" />
              <span className="text-wedding-navy-medium text-xs uppercase tracking-wider font-light">{t.rsvp.attendance_label}</span>
            </motion.div>
            <div className="pt-6 pb-4 px-6 bg-gradient-to-br from-white to-wedding-white-soft/30 border-2 border-wedding-navy-medium/20 rounded-2xl group-hover:border-wedding-navy-medium/50 transition-all shadow-md shadow-wedding-navy-medium/10">
              <select
                name="attending"
                value={formData.attending}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-wedding-navy-medium/20 rounded-lg text-wedding-navy-dark text-sm focus:border-wedding-navy-medium focus:ring-2 focus:ring-wedding-navy-medium/20 outline-none appearance-none cursor-pointer transition-all"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23344A6C' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 0.75rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="">{t.rsvp.select_option}</option>
                <option value="si">{t.rsvp.yes_option}</option>
                <option value="no">{t.rsvp.no_option}</option>
              </select>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-4">
            <motion.button
              type="submit"
              className="w-full bg-wedding-navy-medium hover:bg-wedding-navy-dark text-white text-sm tracking-[0.2em] uppercase py-4 rounded-xl transition-all duration-300 font-light shadow-lg shadow-wedding-navy-medium/30 hover:shadow-xl hover:shadow-wedding-navy-medium/40 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart size={18} className="fill-white" />
              {t.rsvp.submit_btn}
            </motion.button>
          </motion.div>
        </form>

        {/* Online Guests Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 border-2 border-wedding-navy-medium/20 rounded-3xl p-6 md:p-8 bg-gradient-to-br from-wedding-beige-light/5 via-white to-wedding-navy-medium/5 shadow-lg"
        >
          <div className="text-center mb-6">
            <motion.div
              className="inline-flex items-center gap-2 mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Video size={24} className="text-wedding-navy-medium" />
              <h3 className="text-2xl md:text-3xl font-script text-wedding-navy-medium">
                {t.rsvp.online_title}
              </h3>
            </motion.div>
            <p className="text-wedding-navy-dark/70 text-sm md:text-base font-poppins font-light mb-6 max-w-2xl mx-auto">
              {t.rsvp.online_desc}
            </p>
          </div>

          {/* Google Meet Link */}
          <motion.a
            href="https://meet.google.com/your-meeting-link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full max-w-md mx-auto bg-wedding-navy-medium hover:bg-wedding-navy-dark text-white text-sm md:text-base tracking-wide uppercase px-6 py-4 rounded-xl transition-all duration-300 font-light shadow-lg mb-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Video size={20} />
            {t.rsvp.online_btn}
          </motion.a>

          {/* Time Zones */}
          <div className="bg-white/50 rounded-2xl p-6 border border-wedding-beige-light/30">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock size={18} className="text-wedding-brown-warm" />
              <h4 className="text-wedding-brown-warm text-sm md:text-base tracking-wider uppercase font-light">
                {t.rsvp.timezones_title}
              </h4>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Los Angeles */}
              <motion.div
                className="text-center p-4 bg-gradient-to-br from-white to-wedding-white-soft/30 rounded-xl border border-wedding-navy-medium/10"
                whileHover={{ scale: 1.05, borderColor: "rgba(52, 74, 108, 0.3)" }}
              >
                <p className="text-wedding-navy-medium text-xs uppercase tracking-wider mb-1 font-poppins font-light">{t.rsvp.los_angeles}</p>
                <p className="text-wedding-navy-dark text-xl md:text-2xl font-script">4:00 pm</p>
              </motion.div>

              {/* Peru */}
              <motion.div
                className="text-center p-4 bg-gradient-to-br from-white to-wedding-white-soft/30 rounded-xl border border-wedding-navy-medium/10"
                whileHover={{ scale: 1.05, borderColor: "rgba(52, 74, 108, 0.3)" }}
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <p className="text-wedding-navy-medium text-xs uppercase tracking-wider font-poppins font-light">{t.rsvp.peru}</p>
                  <Image
                    src="https://flagcdn.com/w40/pe.png"
                    alt="Peru Flag"
                    width={16}
                    height={12}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-wedding-navy-dark text-xl md:text-2xl font-script">6:00 pm</p>
              </motion.div>

              {/* Brasil */}
              <motion.div
                className="text-center p-4 bg-gradient-to-br from-white to-wedding-white-soft/30 rounded-xl border border-wedding-navy-medium/10"
                whileHover={{ scale: 1.05, borderColor: "rgba(52, 74, 108, 0.3)" }}
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <p className="text-wedding-navy-medium text-xs uppercase tracking-wider font-poppins font-light">{t.rsvp.brazil}</p>
                  <Image
                    src="https://flagcdn.com/w40/br.png"
                    alt="Brazil Flag"
                    width={16}
                    height={12}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-wedding-navy-dark text-xl md:text-2xl font-script">8:00 pm</p>
              </motion.div>

              {/* Bolivia */}
              <motion.div
                className="text-center p-4 bg-gradient-to-br from-white to-wedding-white-soft/30 rounded-xl border border-wedding-navy-medium/10"
                whileHover={{ scale: 1.05, borderColor: "rgba(52, 74, 108, 0.3)" }}
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <p className="text-wedding-navy-medium text-xs uppercase tracking-wider font-poppins font-light">{t.rsvp.bolivia}</p>
                  <Image
                    src="https://flagcdn.com/w40/bo.png"
                    alt="Bolivia Flag"
                    width={16}
                    height={12}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-wedding-navy-dark text-xl md:text-2xl font-script">7:00 pm</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
