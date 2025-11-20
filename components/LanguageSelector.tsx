"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';
import { Language } from '@/lib/i18n';

const languages = [
    {
        code: 'es' as Language,
        label: 'Español',
        flagUrl: 'https://cdn-icons-png.flaticon.com/128/197/197563.png'
    },
    {
        code: 'en' as Language,
        label: 'English',
        flagUrl: 'https://cdn-icons-png.flaticon.com/128/4628/4628635.png'
    },
    {
        code: 'pt' as Language,
        label: 'Português',
        flagUrl: 'https://cdn-icons-png.flaticon.com/128/3909/3909370.png'
    },
];

export default function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = languages.find(lang => lang.code === language);

    return (
        <div className="fixed top-4 right-4 z-50">
            <motion.div
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Trigger Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-wedding-beige-light/30 hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {currentLang && (
                        <div className="relative w-5 h-5 rounded-full overflow-hidden border border-gray-200">
                            <Image
                                src={currentLang.flagUrl}
                                alt={currentLang.label}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    )}
                    <span className="text-wedding-navy-medium font-medium text-sm">
                        {currentLang?.label}
                    </span>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl border border-wedding-beige-light/30 overflow-hidden min-w-[140px]"
                        >
                            {languages.map((lang) => (
                                <motion.button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${language === lang.code
                                        ? 'bg-wedding-navy-medium/10 text-wedding-navy-dark'
                                        : 'hover:bg-wedding-beige-light/20 text-wedding-brown-warm'
                                        }`}
                                    whileHover={{ x: 4 }}
                                >
                                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                                        <Image
                                            src={lang.flagUrl}
                                            alt={lang.label}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <span className="font-medium text-sm whitespace-nowrap">{lang.label}</span>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
