# Solución al Parpadeo en Resize

## Problema

Al redimensionar la ventana del navegador, la imagen del HeroSection parpadeaba constantemente, causando una mala experiencia de usuario.

## Causas Identificadas

1. **Recarga constante de imagen:** La imagen se recargaba con un nuevo timestamp en cada evento resize
2. **Sin debounce:** Cada pixel de cambio ejecutaba el evento
3. **Transiciones complejas:** Blur y opacity simultáneos causaban parpadeo
4. **Sin verificación de estado:** Cambiaba aunque siguiera en el mismo breakpoint

## Soluciones Implementadas

### 1. Debounce en Resize (150ms)

```typescript
const handleResize = () => {
  if (resizeTimerRef.current) {
    clearTimeout(resizeTimerRef.current);
  }
  resizeTimerRef.current = setTimeout(checkMobile, 150);
};
```

**Resultado:** Solo ejecuta después de 150ms sin cambios de tamaño.

### 2. Verificación de Cambio Real

```typescript
const checkMobile = () => {
  const mobile = window.innerWidth < 768;
  const wasMobile = isMobile;
  
  // Solo cambiar si realmente cambia el estado mobile/desktop
  if (mobile !== wasMobile) {
    // Cambiar imagen
  }
};
```

**Resultado:** Solo cambia imagen si cruza el breakpoint de 768px.

### 3. Timestamp Único por Sesión

```typescript
// Timestamp único para toda la sesión (no cambia en cada resize)
const timestamp = new Date().getTime();
```

**Resultado:** Misma URL de imagen, sin recargas innecesarias.

### 4. Transición Simple

```typescript
style={{
  opacity: isLoaded && heroImage ? 1 : 0,
  transition: 'opacity 0.5s ease-in-out',
}}
```

**Resultado:** Solo fade in/out suave, sin blur ni efectos complejos.

### 5. Estado de Transición

```typescript
const [isTransitioning, setIsTransitioning] = useState(false);

// Al cambiar
setIsTransitioning(true);
setTimeout(() => setIsTransitioning(false), 300);
```

**Resultado:** Control preciso del estado durante el cambio.

## Antes vs Después

### Antes ❌
- Parpadeo en cada resize
- Recarga de imagen constante
- Transiciones pesadas
- Sin control de timing

### Después ✅
- Sin parpadeo
- Cambio solo en breakpoint
- Transición suave
- Debounce inteligente

## Cómo Funciona

```
1. Usuario empieza a redimensionar
2. Debounce espera 150ms sin cambios
3. Verifica si cruzó breakpoint (768px)
4. Si cruzó: activa transición
5. Cambia imagen suavemente
6. Desactiva transición después de 300ms
```

## Testing

### Desktop → Mobile
1. Abre en pantalla grande (>768px)
2. Redimensiona lentamente hacia abajo
3. Al pasar 768px: cambio suave a imagen vertical
4. Sin parpadeos durante el proceso

### Mobile → Desktop
1. Abre en pantalla pequeña (<768px)
2. Redimensiona lentamente hacia arriba
3. Al pasar 768px: cambio suave a imagen horizontal
4. Sin parpadeos durante el proceso

### Resize Rápido
1. Redimensiona rápidamente varias veces
2. Debounce evita ejecuciones innecesarias
3. Solo cambia al cruzar breakpoint
4. Suave y fluido

## Configuración

### Ajustar Tiempo de Debounce

```typescript
// En HeroSection.tsx, línea ~55
resizeTimerRef.current = setTimeout(checkMobile, 150);
// Cambiar 150 a:
// - 100: Más rápido pero más sensible
// - 200: Más lento pero más estable
```

### Ajustar Duración de Transición

```typescript
// En HeroSection.tsx, línea ~106
transition: 'opacity 0.5s ease-in-out',
// Cambiar 0.5s a:
// - 0.3s: Más rápido
// - 0.7s: Más suave y lento
```

### Cambiar Breakpoint

```typescript
// En HeroSection.tsx, línea ~30
const mobile = window.innerWidth < 768;
// Cambiar 768 a otro valor:
// - 640: Breakpoint más pequeño
// - 1024: Breakpoint más grande
```

## Troubleshooting

**Todavía hay parpadeo:**
- Verifica que las imágenes existan en `public/images/`
- Limpia cache: `npm run clean`
- Recarga con Ctrl+Shift+R

**El cambio es muy lento:**
- Reduce debounce de 150ms a 100ms
- Reduce transición de 0.5s a 0.3s

**El cambio es muy brusco:**
- Aumenta debounce de 150ms a 200ms
- Aumenta transición de 0.5s a 0.7s

## Notas Técnicas

- **useRef:** Mantiene referencia del timer sin causar re-renders
- **Debounce:** Patrón común para optimizar eventos frecuentes
- **Breakpoint:** 768px es el estándar para mobile/desktop
- **Timestamp único:** Previene recargas innecesarias del navegador
