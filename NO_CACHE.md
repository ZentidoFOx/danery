# Sistema Sin Cache para Imágenes

## Cambios Implementados

### 1. HeroSection - Timestamp en URLs
Las imágenes ahora cargan con un timestamp único cada vez:
```typescript
const timestamp = new Date().getTime();
setHeroImage(`${baseImage}?v=${timestamp}`);
```

### 2. next.config.js - Headers de No-Cache
```javascript
async headers() {
  return [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        },
      ],
    },
  ]
},
```

### 3. Layout - Meta Tags
```html
<meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta httpEquiv="Pragma" content="no-cache" />
<meta httpEquiv="Expires" content="0" />
```

## Cómo Usar

### 1. Limpiar Cache Antes de Ejecutar
```bash
npm run clean
```

### 2. Ejecutar en Desarrollo
```bash
npm run dev
```

### 3. Limpiar Cache del Navegador

**Chrome/Edge:**
1. Presiona `Ctrl + Shift + Delete`
2. Selecciona "Imágenes y archivos en caché"
3. Click en "Borrar datos"

**O presiona:**
- `Ctrl + Shift + R` (Recarga forzada)
- `F12` > Click derecho en recargar > "Vaciar caché y recargar forzadamente"

**Firefox:**
1. Presiona `Ctrl + Shift + Delete`
2. Selecciona "Caché"
3. Click en "Limpiar ahora"

## Resultado

✅ Las imágenes se cargan siempre frescas
✅ Sin cache en el navegador
✅ Sin cache en Next.js
✅ Cambios de imagen inmediatos

## Testing

1. Coloca `vertical.jpg` y `horizontal.jpg` en `public/images/`
2. Ejecuta `npm run clean`
3. Ejecuta `npm run dev`
4. Abre en mobile: verás `vertical.jpg`
5. Abre en desktop: verás `horizontal.jpg`
6. Redimensiona: la imagen cambiará automáticamente

## Troubleshooting

**La imagen no cambia:**
1. Ejecuta `npm run clean`
2. Presiona `Ctrl + Shift + R` en el navegador
3. Verifica que las imágenes existan en `public/images/`
4. Revisa la consola del navegador (F12)

**La imagen anterior sigue apareciendo:**
1. Cierra el servidor (Ctrl+C)
2. Ejecuta `npm run clean`
3. Limpia cache del navegador
4. Ejecuta `npm run dev`
5. Abre en ventana incógnita para probar

## Importante

- 🔴 El timestamp cambia cada vez que redimensionas la ventana
- 🔴 Esto fuerza que la imagen se recargue sin cache
- ✅ En producción puedes ajustar esto para mejor rendimiento
- ✅ Durante desarrollo, esto asegura que veas cambios inmediatos
