"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Heart, User, Users, CheckCircle, Video, Clock, Frown } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import ConfirmationModal from "./ConfirmationModal";

// DISEÑO 3: Cards Horizontales con Iconos
export default function RSVPSection3() {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    attending: "",
  });
  const [showModal, setShowModal] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Mostrar modal en lugar de alert
        setShowModal(true);
      } else {
        alert(data.error || 'Error al guardar la confirmación');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la solicitud');
    }
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

  const handleCloseModal = () => {
    setShowModal(false);
    // Limpiar formulario
    setFormData({
      firstName: "",
      lastName: "",
      attending: "",
    });
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        attending={formData.attending}
        firstName={formData.firstName}
      />
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
              <div className="pt-6 pb-4 px-6 bg-gradient-to-br from-white to-wedding-white-soft/30 border-2 border-wedding-navy-medium/20 rounded-2xl shadow-md shadow-wedding-navy-medium/10">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'si' })}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${formData.attending === 'si'
                      ? 'bg-wedding-navy-medium border-wedding-navy-medium text-white shadow-lg scale-[1.02]'
                      : 'bg-white border-wedding-navy-medium/20 text-wedding-navy-dark hover:border-wedding-navy-medium/50 hover:bg-wedding-navy-medium/5'
                      }`}
                  >
                    <div className={`p-3 rounded-full transition-colors ${formData.attending === 'si' ? 'bg-white/20' : 'bg-wedding-navy-medium/10 group-hover:bg-wedding-navy-medium/20'
                      }`}>
                      <CheckCircle size={24} className={formData.attending === 'si' ? 'text-white' : 'text-wedding-navy-medium'} />
                    </div>
                    <span className="font-poppins text-sm font-medium tracking-wide text-center">{t.rsvp.yes_option}</span>

                    {formData.attending === 'si' && (
                      <motion.div
                        layoutId="check"
                        className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <CheckCircle size={14} className="text-wedding-navy-medium" />
                      </motion.div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'no' })}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${formData.attending === 'no'
                      ? 'bg-wedding-brown-warm border-wedding-brown-warm text-white shadow-lg scale-[1.02]'
                      : 'bg-white border-wedding-navy-medium/20 text-wedding-navy-dark hover:border-wedding-navy-medium/50 hover:bg-wedding-navy-medium/5'
                      }`}
                  >
                    <div className={`p-3 rounded-full transition-colors ${formData.attending === 'no' ? 'bg-white/20' : 'bg-wedding-brown-warm/10 group-hover:bg-wedding-brown-warm/20'
                      }`}>
                      <Frown size={24} className={formData.attending === 'no' ? 'text-white' : 'text-wedding-brown-warm'} />
                    </div>
                    <span className="font-poppins text-sm font-medium tracking-wide text-center">{t.rsvp.no_option}</span>

                    {formData.attending === 'no' && (
                      <motion.div
                        layoutId="check"
                        className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <CheckCircle size={14} className="text-wedding-brown-warm" />
                      </motion.div>
                    )}
                  </button>
                </div>
                {/* Hidden input for validation if needed, though state handles it */}
                <input
                  type="hidden"
                  name="attending"
                  value={formData.attending}
                  required
                />
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
                  <p className="text-wedding-navy-dark text-xl md:text-2xl font-script">5:00 pm</p>
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
        </motion.div >
      </section >
    </>
  );
}
