"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function RSVPSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    guestName: "",
    attendance: "",
    companionName: "",
    vanService: "",
    dietaryRestriction: "",
    phone: "",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-amber-50 py-16 sm:py-20 md:py-24 px-4"
    >
      <motion.div
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="font-elegant text-gray-700 text-base sm:text-lg tracking-wide mb-2">
            ¡Queremos compartir este momento
          </p>
          <p className="font-elegant text-gray-700 text-base sm:text-lg tracking-wide mb-6">
            tan esperado contigo!
          </p>
          <p className="font-serif text-gray-800 text-lg sm:text-xl font-semibold mb-1">
            Por favor ayúdanos confirmando tu
          </p>
          <p className="font-serif text-gray-800 text-lg sm:text-xl font-semibold mb-8">
            asistencia.
          </p>
          
          {/* Decorative Line */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-px bg-gray-400" />
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-90 p-8 sm:p-10 space-y-5"
        >
          {/* Guest Name */}
          <motion.div variants={itemVariants}>
            <input
              type="text"
              name="guestName"
              placeholder="Nombre y Apellidos del Invitado"
              value={formData.guestName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-gray-50 transition-colors text-sm"
              required
            />
          </motion.div>

          {/* Attendance Dropdown */}
          <motion.div variants={itemVariants} className="relative">
            <select
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 focus:outline-none focus:bg-gray-50 transition-colors appearance-none cursor-pointer text-sm"
              required
            >
              <option value="">- ¿Asistirá? -</option>
              <option value="si">Sí, asistiré</option>
              <option value="no">No podré asistir</option>
              <option value="quizas">Quizás</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
          </motion.div>

          {/* Companion Name */}
          <motion.div variants={itemVariants}>
            <input
              type="text"
              name="companionName"
              placeholder="Nombre(s) y Apellidos de Acompañante(s)"
              value={formData.companionName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-gray-50 transition-colors text-sm"
            />
          </motion.div>

          {/* Van Service Dropdown */}
          <motion.div variants={itemVariants} className="relative">
            <select
              name="vanService"
              value={formData.vanService}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 focus:outline-none focus:bg-gray-50 transition-colors appearance-none cursor-pointer text-sm"
            >
              <option value="">- ¿Requeriás el servicio de van para tu ll -</option>
              <option value="si">Sí, requiero van</option>
              <option value="no">No requiero van</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
          </motion.div>

          {/* Dietary Restriction */}
          <motion.div variants={itemVariants}>
            <input
              type="text"
              name="dietaryRestriction"
              placeholder="Indicar restricción alimentaria (opcional)"
              value={formData.dietaryRestriction}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-gray-50 transition-colors text-sm"
            />
          </motion.div>

          {/* Phone Number */}
          <motion.div variants={itemVariants}>
            <input
              type="tel"
              name="phone"
              placeholder="Número Telefónico"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-gray-50 transition-colors text-sm"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center pt-4"
          >
            <button
              type="submit"
              className="px-16 py-3 bg-[#6B8E6F] hover:bg-[#5A7A5E] text-white font-elegant text-sm tracking-widest uppercase transition-colors duration-300"
            >
              CONFIRMAR ASISTENCIA
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
}
