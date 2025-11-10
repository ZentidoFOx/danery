"use client";

import { motion } from "framer-motion";
import { Heart, Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white py-8 px-4 border-t border-[#5a6f4c]/10">
      <div className="max-w-4xl mx-auto">
        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="text-[#5a6f4c] font-script text-2xl md:text-3xl mb-2">
            ¡Gracias por ser parte de nuestra historia!
          </p>
          <div className="flex items-center justify-center gap-2 text-[#2C2C2C]/60 text-sm">
            <Heart size={16} className="text-[#5a6f4c] fill-[#5a6f4c]" />
            <p className="font-light">Danery & Jesús</p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5a6f4c]/20 to-transparent mb-6"></div>

        {/* Bottom: Copyright & Developer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm"
        >
          <p className="text-[#2C2C2C]/60 font-light">
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
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5a6f4c]/5 to-[#5a6f4c]/10 hover:from-[#5a6f4c]/10 hover:to-[#5a6f4c]/20 rounded-full border border-[#5a6f4c]/20 transition-all duration-300">
              <div className="w-6 h-6 bg-[#5a6f4c] rounded-full flex items-center justify-center">
                <Code size={12} className="text-white" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[#2C2C2C]/60 text-xs font-light">Developed by</span>
                <span className="text-[#5a6f4c] text-sm font-semibold tracking-tight group-hover:tracking-wide transition-all">Turin</span>
                <span className="text-[#5a6f4c]/70 text-xs">.dev</span>
              </div>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
}
