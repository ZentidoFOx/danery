/**
 * Configuración centralizada de imágenes
 * Facilita cambiar URLs sin modificar componentes
 */

export const imageConfig = {
  hero: {
    background: '/images/hero-section.jpeg',
    vertical: '/images/vertical.png',
    horizontal: '/images/horizontal.jpg',
    placeholder: '/images/hero-bg-placeholder.svg',
    alt: 'Fondo Hero - Pareja en boda',
  },
  clouds: {
    bottom: '/images/clouds.png',
    alt: 'Nubes decorativas',
  },
  gallery: [
    {
      src: '/images/gallery/photo-1.jpg',
      alt: 'Foto de la pareja 1',
    },
    {
      src: '/images/gallery/photo-2.jpg',
      alt: 'Foto de la pareja 2',
    },
    {
      src: '/images/gallery/photo-3.jpg',
      alt: 'Foto de la pareja 3',
    },
    {
      src: '/images/gallery/photo-4.jpg',
      alt: 'Foto de la pareja 4',
    },
    {
      src: '/images/gallery/photo-5.jpg',
      alt: 'Foto de la pareja 5',
    },
  ],
  // URLs de fallback de Unsplash en caso de que las imágenes locales no estén disponibles
  fallback: {
    hero: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1200',
    clouds: 'https://wanderic.ancorathemes.com/wp-content/uploads/2020/01/clouds_slider_2.png',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1465056836643-15cea6caf04d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=800&fit=crop',
    ],
  },
};

/**
 * Función helper para obtener la URL de imagen con fallback
 * Prioridad: imagen local > fallback de Unsplash
 */
export const getImageUrl = (imagePath: string, fallbackUrl: string): string => {
  // Siempre intentar cargar desde local primero
  return imagePath || fallbackUrl;
};

/**
 * Obtener imagen con placeholder
 */
export const getImageWithPlaceholder = (imagePath: string, placeholderPath: string, fallbackUrl: string): { main: string; placeholder: string } => {
  return {
    main: imagePath || fallbackUrl,
    placeholder: placeholderPath,
  };
};
