"use client";

import { useLanguage } from "./LanguageContext";
import { useEffect } from "react";

export default function DynamicMetadata() {
    const { language } = useLanguage();

    useEffect(() => {
        // Configuración de metadatos según el idioma
        const metadataConfig = {
            es: {
                title: "Salvador y Danery - Invitación de Boda",
                description: "Te invitamos a celebrar nuestra boda - 07 de Diciembre del 2025",
                locale: "es_ES",
            },
            en: {
                title: "Salvador and Danery - Wedding Invitation",
                description: "We invite you to celebrate our wedding - December 07, 2025",
                locale: "en_US",
            },
            pt: {
                title: "Salvador e Danery - Convite de Casamento",
                description: "Convidamos você para celebrar nosso casamento - 07 de Dezembro de 2025",
                locale: "pt_BR",
            },
        };

        const config = metadataConfig[language];

        // Actualizar el título de la página
        document.title = config.title;

        // Actualizar meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.setAttribute("name", "description");
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute("content", config.description);

        // Actualizar Open Graph locale
        let ogLocale = document.querySelector('meta[property="og:locale"]');
        if (!ogLocale) {
            ogLocale = document.createElement("meta");
            ogLocale.setAttribute("property", "og:locale");
            document.head.appendChild(ogLocale);
        }
        ogLocale.setAttribute("content", config.locale);

        // Actualizar Open Graph title
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
            ogTitle = document.createElement("meta");
            ogTitle.setAttribute("property", "og:title");
            document.head.appendChild(ogTitle);
        }
        ogTitle.setAttribute("content", config.title);

        // Actualizar Open Graph description
        let ogDescription = document.querySelector('meta[property="og:description"]');
        if (!ogDescription) {
            ogDescription = document.createElement("meta");
            ogDescription.setAttribute("property", "og:description");
            document.head.appendChild(ogDescription);
        }
        ogDescription.setAttribute("content", config.description);

        // Actualizar Twitter title
        let twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (!twitterTitle) {
            twitterTitle = document.createElement("meta");
            twitterTitle.setAttribute("name", "twitter:title");
            document.head.appendChild(twitterTitle);
        }
        twitterTitle.setAttribute("content", config.title);

        // Actualizar Twitter description
        let twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (!twitterDescription) {
            twitterDescription = document.createElement("meta");
            twitterDescription.setAttribute("name", "twitter:description");
            document.head.appendChild(twitterDescription);
        }
        twitterDescription.setAttribute("content", config.description);

        // Actualizar lang del HTML
        document.documentElement.lang = language;
    }, [language]);

    return null;
}
