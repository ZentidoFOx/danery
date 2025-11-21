"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export default function FloatingRSVP() {
    const { t } = useLanguage();
    const [showButton, setShowButton] = useState(false);
    const [isRSVPVisible, setIsRSVPVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling down 300px
            setShowButton(window.scrollY > 300);
        };

        // Intersection Observer to hide button when RSVP section is visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsRSVPVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const rsvpSection = document.getElementById('rsvp-section');
        if (rsvpSection) {
            observer.observe(rsvpSection);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rsvpSection) observer.unobserve(rsvpSection);
        };
    }, []);

    const scrollToRSVP = () => {
        const rsvpSection = document.getElementById('rsvp-section');
        if (rsvpSection) {
            rsvpSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Only show if scrolled enough AND RSVP section is NOT visible
    const isVisible = false; // showButton && !isRSVPVisible;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center md:hidden pointer-events-none">
                    <motion.button
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={scrollToRSVP}
                        className="pointer-events-auto flex items-center justify-center gap-3 bg-wedding-navy-medium hover:bg-wedding-navy-dark text-white w-[90%] max-w-sm py-3 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/10 backdrop-blur-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <CalendarCheck size={20} />
                        </motion.div>
                        <span className="font-medium text-sm tracking-wider uppercase">
                            {t.floatingRSVP.confirm}
                        </span>
                    </motion.button>
                </div>
            )}
        </AnimatePresence>
    );
}
