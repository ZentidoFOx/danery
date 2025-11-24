import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "es", "pt"];
const defaultLocale = "en"; // Idioma principal en /

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Ignorar archivos estáticos y API
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/images") ||
        pathname.startsWith("/favicon.svg") ||
        pathname.startsWith("/manifest.json")
    ) {
        return;
    }

    // Comprobar si la ruta ya tiene un locale
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        // Si estamos en la raíz /, reescribimos a /en (o el default)
        if (pathname === "/") {
            return NextResponse.rewrite(new URL(`/${defaultLocale}`, request.url));
        }

        // Para otras rutas sin locale (como /asistencia), redirigir al default
        return NextResponse.redirect(
            new URL(`/${defaultLocale}${pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next).*)",
    ],
};
