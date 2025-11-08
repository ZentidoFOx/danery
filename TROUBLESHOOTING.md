# Troubleshooting

## Errores Comunes y Soluciones

### 1. 404 - Manifest not found
**Error:** `GET http://localhost:3001/manifest.json 404 (Not Found)`

**Solución:**
- ✅ Archivo `public/manifest.json` creado
- Reinicia el servidor: `npm run clean:dev`

### 2. 404 - Favicon not found
**Error:** `GET http://localhost:3001/favicon.ico 404 (Not Found)`

**Solución:**
- ✅ Archivo `public/favicon.svg` creado
- El navegador lo carga automáticamente

### 3. 404 - Hero image not found
**Error:** `GET http://localhost:3001/images/hero-bg.jpg 404 (Not Found)`

**Solución:**
1. Verifica que la imagen se llama `hero-section.jpeg`
2. Colócala en `public/images/hero-section.jpeg`
3. Ejecuta `npm run clean:dev`

### 4. 400 - Gallery image Bad Request
**Error:** `GET http://localhost:3001/_next/image?url=%2Fimages%2Fgallery%2Fphoto-1.jpg&w=1920&q=75 400 (Bad Request)`

**Solución:**
- ✅ Cambiado de `Image` (Next.js) a `img` (HTML)
- Las imágenes ahora se cargan como HTML normales
- Coloca las fotos en `public/images/gallery/photo-1.jpg`, etc.

## Pasos para Resolver Errores

### Paso 1: Limpiar Cache
```bash
npm run clean:dev
```

### Paso 2: Verificar Estructura de Carpetas
```
public/
├── manifest.json
├── favicon.svg
└── images/
    ├── hero-section.jpeg
    ├── clouds.png
    └── gallery/
        ├── photo-1.jpg
        ├── photo-2.jpg
        ├── photo-3.jpg
        ├── photo-4.jpg
        └── photo-5.jpg
```

### Paso 3: Limpiar Cache del Navegador
1. Abre DevTools (F12)
2. Click derecho en el botón de recargar
3. Selecciona "Vaciar caché y recargar forzadamente"

### Paso 4: Verificar Consola
1. Abre DevTools (F12)
2. Ve a la pestaña "Console"
3. Busca errores en rojo
4. Verifica que las URLs sean correctas

## Errores de Imagen

### Las imágenes no cargan
**Checklist:**
- [ ] ¿Está la imagen en `public/images/`?
- [ ] ¿El nombre es exacto? (mayúsculas/minúsculas)
- [ ] ¿Ejecutaste `npm run clean:dev`?
- [ ] ¿Limpiaste el cache del navegador?
- [ ] ¿La imagen tiene formato válido? (JPG, PNG, JPEG)

### Las imágenes se ven pixeladas
- Aumenta la resolución (mínimo 1920x1080)
- Convierte a WebP para mejor compresión
- Usa herramientas como TinyPNG para optimizar

## Errores de Compilación

### Error: Cannot find module
```
Error: Cannot find module '@/lib/imageConfig'
```
**Solución:**
- Verifica que `lib/imageConfig.ts` existe
- Ejecuta `npm run clean:dev`

### Error: TypeScript
```
Type 'Image' is not a valid JSX element type
```
**Solución:**
- ✅ Ya está corregido (cambiado a `img`)
- Ejecuta `npm run clean:dev`

## Performance

### El sitio se carga lento
1. Comprime las imágenes (máximo 500KB)
2. Usa formato WebP
3. Ejecuta `npm run build` para ver tamaño final
4. Revisa DevTools > Network para ver qué es lento

### Las animaciones son lentas en mobile
- ✅ Ya optimizadas (parallax deshabilitado en mobile)
- Reduce confetti en mobile
- Usa `will-change` en CSS si es necesario

## Debugging

### Ver qué imágenes se cargan
1. Abre DevTools (F12)
2. Ve a Network > Img
3. Verifica URLs y status codes

### Ver errores de JavaScript
1. Abre DevTools (F12)
2. Ve a Console
3. Busca errores en rojo

### Ver qué se renderiza
1. Abre DevTools (F12)
2. Ve a Elements
3. Inspecciona el HTML

## Contacto

Si el problema persiste:
1. Verifica todos los pasos anteriores
2. Ejecuta `npm run clean:dev`
3. Recarga el navegador completamente
4. Revisa la consola de errores
