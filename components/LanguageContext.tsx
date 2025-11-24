"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, translations } from '@/lib/i18n';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('es');

    useEffect(() => {
        // 1. Try to get from localStorage
        const savedLanguage = localStorage.getItem('wedding-language') as Language;
        if (savedLanguage && ['es', 'en', 'pt'].includes(savedLanguage)) {
            setLanguageState(savedLanguage);
            document.cookie = `wedding-language=${savedLanguage}; path=/; max-age=31536000`;
            return;
        }

        // 2. If not saved, try to detect from browser
        // This approximates "where the user connects from" based on their device settings
        const browserLang = navigator.language.toLowerCase();
        let detectedLang: Language = 'es'; // Default fallback

        if (browserLang.startsWith('pt')) {
            detectedLang = 'pt';
        } else if (browserLang.startsWith('en')) {
            detectedLang = 'en';
        }

        setLanguageState(detectedLang);
        localStorage.setItem('wedding-language', detectedLang);
        document.cookie = `wedding-language=${detectedLang}; path=/; max-age=31536000`;
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('wedding-language', lang);
        // Also save to cookie for server-side metadata
        document.cookie = `wedding-language=${lang}; path=/; max-age=31536000`; // 1 year
    };

    const value = {
        language,
        setLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
