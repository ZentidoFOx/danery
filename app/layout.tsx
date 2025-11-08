import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-elegant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Salvador y Danery - Invitación de Boda",
  description: "Te invitamos a celebrar nuestra boda - 18 de Noviembre del 2023",
  keywords: ["boda", "invitación", "Salvador", "Danery", "Oaxaca"],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: '#6B8E6F',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Salvador y Danery',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${greatVibes.variable} ${cormorant.variable}`}>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/images/horizontal.jpg" media="(min-width: 768px)" />
        <link rel="preload" as="image" href="/images/vertical.png" media="(max-width: 767px)" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
