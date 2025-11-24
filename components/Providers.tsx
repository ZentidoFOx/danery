"use client";

import { LanguageProvider } from "./LanguageContext";
import { ReactNode } from "react";

export function Providers({ children, lang }: { children: ReactNode; lang?: string }) {
    return (
        <LanguageProvider initialLang={lang}>
            {children}
        </LanguageProvider>
    );
}
