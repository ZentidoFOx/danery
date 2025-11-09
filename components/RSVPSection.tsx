"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: "",
    attending: "",
    companions: "",
    vanService: "",
    dietary: "",
    phone: "",
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Aquí puedes agregar la lógica para enviar el formulario
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="bg-[#F4F1EB] py-16 md:py-20 px-4">
      <motion.div
        className="max-w-lg mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Mensaje de bienvenida */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <p className="text-[#1F2A38] text-base sm:text-lg font-light leading-relaxed mb-2">
            ¡Queremos compartir este momento tan esperado contigo!
          </p>
          <p className="text-[#1F2A38] text-base sm:text-lg font-semibold">
            Por favor ayúdanos confirmando tu asistencia.
          </p>
        </motion.div>

        {/* Línea decorativa */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="h-px w-20 mx-auto bg-[#C7B299]/50" />
        </motion.div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre del invitado */}
          <motion.div variants={itemVariants}>
            <input
              type="text"
              name="name"
              placeholder="Nombre y Apellidos del Invitado"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white text-[#1F2A38] placeholder-[#8C8C8C] text-sm border-none focus:ring-2 focus:ring-[#C7B299] outline-none"
            />
          </motion.div>

          {/* ¿Asistirás? */}
          <motion.div variants={itemVariants}>
            <select
              name="attending"
              value={formData.attending}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white text-[#1F2A38] text-sm border-none focus:ring-2 focus:ring-[#C7B299] outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.5rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5em 1.5em",
                paddingRight: "2.5rem",
              }}
            >
              <option value="">- ¿Asistirás? -</option>
              <option value="si">Sí, asistiré</option>
              <option value="no">No podré asistir</option>
            </select>
          </motion.div>

          {/* Acompañantes */}
          <motion.div variants={itemVariants}>
            <input
              type="text"
              name="companions"
              placeholder="Nombre(s) y Apellidos de Acompañante(s)"
              value={formData.companions}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white text-[#1F2A38] placeholder-[#8C8C8C] text-sm border-none focus:ring-2 focus:ring-[#C7B299] outline-none"
            />
          </motion.div>

          {/* Servicio de van */}
          <motion.div variants={itemVariants}>
            <select
              name="vanService"
              value={formData.vanService}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white text-[#1F2A38] text-sm border-none focus:ring-2 focus:ring-[#C7B299] outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.5rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5em 1.5em",
                paddingRight: "2.5rem",
              }}
            >
              <option value="">- ¿Requerirás el servicio de van para tu llegada? -</option>
              <option value="si">Sí, lo requiero</option>
              <option value="no">No, gracias</option>
            </select>
          </motion.div>

          {/* Restricciones alimentarias */}
          <motion.div variants={itemVariants}>
            <input
              type="text"
              name="dietary"
              placeholder="Indicar restricción alimentaria (opcional)"
              value={formData.dietary}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white text-[#1F2A38] placeholder-[#8C8C8C] text-sm border-none focus:ring-2 focus:ring-[#C7B299] outline-none"
            />
          </motion.div>

          {/* Número telefónico */}
          <motion.div variants={itemVariants}>
            <input
              type="tel"
              name="phone"
              placeholder="Número Telefónico"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white text-[#1F2A38] placeholder-[#8C8C8C] text-sm border-none focus:ring-2 focus:ring-[#C7B299] outline-none"
            />
          </motion.div>

          {/* Botón de envío */}
          <motion.div variants={itemVariants} className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#6B7C5E] hover:bg-[#5A6A4F] text-white text-sm tracking-[0.2em] uppercase py-4 transition-all duration-300"
            >
              Confirmar Asistencia
            </button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
}
