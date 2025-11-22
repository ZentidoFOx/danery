"use client";

import { motion } from "framer-motion";
import { Heart, Code } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-white py-8 px-4 border-t border-wedding-beige-light/15">
      <div className="max-w-4xl mx-auto">
        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          {/* <p className="text-wedding-brown-warm font-script text-2xl md:text-3xl mb-2">
            ¡Gracias por ser parte de nuestra historia!
          </p> */}
          <motion.div
            className="flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.3 }
            }}
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <Image
                src="/images/sello.png"
                alt="Sello Danery & Jesús"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px w-full bg-gradient-to-r from-transparent via-wedding-beige-light/30 to-transparent mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>

        {/* Bottom: Copyright & Developer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm"
        >
          <p className="text-wedding-navy-dark/60 font-poppins font-light">
            © 2025 Todos los derechos reservados
          </p>

          {/* Developer Credit */}
          <motion.a
            href="https://turin.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-wedding-brown-warm/5 to-wedding-beige-light/10 hover:from-wedding-brown-warm/10 hover:to-wedding-beige-light/20 rounded-full border border-wedding-brown-warm/20 transition-all duration-300">
              <motion.div
                className="w-6 h-6 bg-wedding-brown-warm rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Code size={12} className="text-white" />
              </motion.div>
              <div className="flex items-baseline gap-1">
                <span className="text-wedding-navy-dark/60 text-xs font-light">Developed by</span>
                <span className="text-wedding-brown-warm text-sm font-semibold tracking-tight group-hover:tracking-wide transition-all">Turin</span>
                <span className="text-wedding-brown-warm/70 text-xs">.dev</span>
              </div>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
}
