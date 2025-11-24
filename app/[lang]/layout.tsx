import type { Metadata, Viewport } from "next";
import { Playfair_Display, Great_Vibes, Cormorant_Garamond, Poppins } from "next/font/google";
import "../globals.css";
import { Providers } from "@/components/Providers";

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

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#6B8E6F',
};

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const language = params.lang || 'en';

  const metadataConfig = {
    es: {
      title: "Salvador y Danery - Invitación de Boda",
      description: "Te invitamos a celebrar nuestra boda - 07 de Diciembre del 2025",
      locale: "es_ES",
      siteName: "Salvador y Danery - Boda",
      imageAlt: "Salvador y Danery - Invitación de Boda",
    },
    en: {
      title: "Salvador and Danery - Wedding Invitation",
      description: "We invite you to celebrate our wedding - December 07, 2025",
      locale: "en_US",
      siteName: "Salvador and Danery - Wedding",
      imageAlt: "Salvador and Danery - Wedding Invitation",
    },
    pt: {
      title: "Salvador e Danery - Convite de Casamento",
      description: "Convidamos você para celebrar nosso casamento - 07 de Dezembro de 2025",
      locale: "pt_BR",
      siteName: "Salvador e Danery - Casamento",
      imageAlt: "Salvador e Danery - Convite de Casamento",
    },
  };

  const config = metadataConfig[language as keyof typeof metadataConfig] || metadataConfig.en;

  return {
    title: config.title,
    description: config.description,
    keywords: ["boda", "invitación", "Salvador", "Danery", "wedding", "Kennewick", "casamento"],
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
    openGraph: {
      type: 'website',
      locale: config.locale,
      url: 'https://salvadordanerywedding.site',
      siteName: config.siteName,
      title: config.title,
      description: config.description,
      images: [
        {
          url: '/images/share.jpg',
          width: 1200,
          height: 630,
          alt: config.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: ['/images/share.jpg'],
    },
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} className={`${playfair.variable} ${greatVibes.variable} ${cormorant.variable} ${poppins.variable}`}>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/images/horizontal.jpg" media="(min-width: 768px)" />
        <link rel="preload" as="image" href="/images/vertical.png" media="(max-width: 767px)" />
      </head>
      <body className="antialiased">
        <Providers lang={params.lang}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
