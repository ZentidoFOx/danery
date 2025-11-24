"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, translations } from '@/lib/i18n';
import { useRouter, usePathname } from 'next/navigation';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLang }: { children: ReactNode; initialLang?: string }) {
    const [language, setLanguageState] = useState<Language>((initialLang as Language) || 'es');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (initialLang && ['es', 'en', 'pt'].includes(initialLang)) {
            setLanguageState(initialLang as Language);
        }
    }, [initialLang]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('wedding-language', lang);
        document.cookie = `wedding-language=${lang}; path=/; max-age=31536000`;

        // Redirigir a la nueva URL
        const segments = pathname.split('/');
        // segments[0] es ""
        // segments[1] es el idioma actual (es, en, pt)
        if (['es', 'en', 'pt'].includes(segments[1])) {
            segments[1] = lang;
            const newPath = segments.join('/');
            router.push(newPath);
        } else {
            // Si no hay idioma en la ruta, lo agregamos
            router.push(`/${lang}${pathname === '/' ? '' : pathname}`);
        }
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
