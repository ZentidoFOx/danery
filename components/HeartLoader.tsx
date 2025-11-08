"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface HeartLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export default function HeartLoader({ isLoading, onComplete }: HeartLoaderProps) {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-wedding-cream"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          {/* Corazón que se abre */}
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [0, -10, 10, 0]
            }}
            exit={{ 
              scale: 3,
              opacity: 0,
              transition: { duration: 0.6, ease: "easeOut" }
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart 
                className="text-wedding-sage fill-wedding-sage drop-shadow-2xl" 
                size={80}
              />
            </motion.div>
          </motion.div>

          {/* Texto debajo del corazón */}
          <motion.div
            className="absolute bottom-1/3 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="font-elegant text-wedding-sage text-lg tracking-widest">
              Daniela y Josué
            </p>
          </motion.div>

          {/* Partículas decorativas */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-wedding-sage/30 rounded-full"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: Math.cos((i * Math.PI * 2) / 8) * 80,
                y: Math.sin((i * Math.PI * 2) / 8) * 80,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
