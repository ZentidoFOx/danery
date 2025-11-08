# Loader de Corazón

## Descripción

Un loader elegante con animación de corazón que aparece antes de cargar el HeroSection.

## Características

✅ **Animación de Corazón:**
- Aparece con escala desde 0
- Pulsa suavemente (latido)
- Se expande y desvanece al terminar

✅ **Partículas Decorativas:**
- 8 partículas que rotan alrededor del corazón
- Aparecen y desaparecen en secuencia
- Efecto sutil y elegante

✅ **Texto de Pareja:**
- Muestra "Daniela y Josué"
- Aparece con fade-in suave
- Tipografía elegante

✅ **Transición Suave:**
- Duración: 1.2 segundos
- Fade out elegante
- Sin saltos ni parpadeos

## Implementación

### Componente: HeartLoader.tsx

```typescript
<HeartLoader isLoading={showLoader} />
```

**Props:**
- `isLoading` (boolean): Controla si el loader está visible
- `onComplete` (función opcional): Callback cuando termina la animación

### Timeline de Animaciones

```
0ms    - Loader aparece (escala 0 → 1.2 → 1)
300ms  - Texto "Daniela y Josué" fade in
0-1500ms - Partículas rotan (loop)
1200ms - Loader comienza fade out
1800ms - Loader completamente oculto
1900ms - Contenido aparece
```

## Personalización

### Colores

Edita los colores en `HeartLoader.tsx`:

```typescript
// Fondo
bg-wedding-cream

// Corazón
text-wedding-sage fill-wedding-sage

// Partículas
bg-wedding-sage/30
```

### Duración

Ajusta la duración en `HeroSection.tsx`:

```typescript
const loaderTimer = setTimeout(() => {
  setShowLoader(false);
  setTimeout(() => setIsLoaded(true), 100);
}, 1200); // Cambiar aquí (en milisegundos)
```

### Tamaño del Corazón

Cambia el tamaño en `HeartLoader.tsx`:

```typescript
<Heart 
  className="text-wedding-sage fill-wedding-sage drop-shadow-2xl" 
  size={80} // Cambiar aquí
/>
```

## Comportamiento

1. **Al cargar la página:**
   - Loader aparece inmediatamente
   - Corazón anima durante 1.2s
   - Fade out suave

2. **Después del loader:**
   - HeroSection aparece con fade in
   - Imagen carga según dispositivo
   - Animaciones de contenido inician

3. **Sin reload:**
   - El loader solo aparece en la primera carga
   - Navegación posterior no muestra loader

## Tips

### Acelerar el Loader
Para hacer el loader más rápido:
```typescript
// En HeroSection.tsx, línea ~38
}, 800); // Cambiar de 1200 a 800
```

### Hacerlo Más Lento
Para dar más tiempo al loader:
```typescript
// En HeroSection.tsx, línea ~38
}, 2000); // Cambiar de 1200 a 2000
```

### Desactivar Completamente
Para quitar el loader:
```typescript
// En HeroSection.tsx
const [showLoader, setShowLoader] = useState(false); // false en vez de true
```

## Animaciones Incluidas

1. **Heart Scale:** 0 → 1.2 → 1
2. **Heart Rotation:** 0° → -10° → 10° → 0°
3. **Heart Pulse:** 1 → 1.1 → 1 (loop infinito)
4. **Exit Scale:** 1 → 3 con fade out
5. **Particles:** Rotación circular con fade
6. **Text:** Fade in desde abajo

## Troubleshooting

**El loader no desaparece:**
- Verifica que `showLoader` se establece en `false`
- Revisa que no hay errores en la consola

**El loader es muy lento:**
- Reduce el timeout de 1200ms a 800ms
- Ajusta las duraciones de animación

**El loader se ve cortado:**
- Asegúrate de que tiene `z-50` (mayor que otros elementos)
- Verifica que el contenedor padre no tiene `overflow: hidden`
