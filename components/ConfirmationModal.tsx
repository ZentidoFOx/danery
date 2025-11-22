"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, PartyPopper, Sparkles, Video } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "./LanguageContext";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    attending: string;
    firstName: string;
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    attending,
    firstName,
}: ConfirmationModalProps) {
    const { t } = useLanguage();
    const isAttending = attending === "si";

    useEffect(() => {
        if (isOpen && isAttending) {
            // Confetti para confirmaciones positivas
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ["#344A6C", "#D1B99A", "#8B5A38"],
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ["#344A6C", "#D1B99A", "#8B5A38"],
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
    }, [isOpen, isAttending]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Background gradient */}
                        <div
                            className={`absolute inset-0 ${isAttending
                                ? "bg-gradient-to-br from-green-50 via-white to-wedding-beige-light/30"
                                : "bg-gradient-to-br from-rose-50 via-white to-wedding-beige-light/30"
                                }`}
                        />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg"
                        >
                            <X size={20} className="text-wedding-navy-dark" />
                        </button>

                        {/* Content */}
                        <div className="relative p-8 text-center">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="mb-6 flex justify-center"
                            >
                                {isAttending ? (
                                    <div className="relative">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 10, -10, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl"
                                        >
                                            <PartyPopper size={48} className="text-white" />
                                        </motion.div>
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.5, 0.8, 0.5],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            className="absolute inset-0 bg-green-400 rounded-full blur-xl -z-10"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.1, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-xl"
                                        >
                                            <Heart size={48} className="text-white fill-white" />
                                        </motion.div>
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.5, 0.8, 0.5],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            className="absolute inset-0 bg-rose-400 rounded-full blur-xl -z-10"
                                        />
                                    </div>
                                )}
                            </motion.div>

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-4xl font-script text-wedding-navy-dark mb-4"
                            >
                                {isAttending ? t.confirmationModal.title_yes : t.confirmationModal.title_no}
                            </motion.h2>

                            {/* Message */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-3"
                            >
                                <p className="text-lg font-poppins text-wedding-navy-dark">
                                    {isAttending ? (
                                        <>
                                            <span className="font-semibold">{firstName}</span>, {t.confirmationModal.message_yes}
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-semibold">{firstName}</span>,
                                            {t.confirmationModal.message_no}
                                        </>
                                    )}
                                </p>
                                <p className="text-wedding-navy-dark/70 font-poppins text-sm">
                                    {isAttending
                                        ? t.confirmationModal.subtitle_yes
                                        : t.confirmationModal.subtitle_no}
                                </p>
                                {!isAttending && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="mt-4 p-4 bg-wedding-navy-medium/10 rounded-xl border border-wedding-navy-medium/20"
                                    >
                                        <p className="text-wedding-navy-dark font-poppins text-sm flex items-center justify-center gap-2">
                                            <Video size={18} className="text-wedding-navy-medium" />
                                            <span>
                                                {t.confirmationModal.livestream_info}
                                            </span>
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Decorative elements */}
                            {isAttending && (
                                <div className="mt-6 flex justify-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                        >
                                            <Sparkles
                                                size={20}
                                                className="text-wedding-beige-light"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Close button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                onClick={onClose}
                                className={`mt-8 w-full py-4 rounded-xl font-poppins uppercase tracking-wider text-white transition-all duration-300 shadow-lg ${isAttending
                                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                                    : "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t.confirmationModal.close_button}
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
