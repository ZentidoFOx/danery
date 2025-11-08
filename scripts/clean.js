#!/usr/bin/env node

/**
 * Script para limpiar cache y archivos temporales
 */

const fs = require('fs');
const path = require('path');

const dirsToClean = [
  '.next',
  'node_modules/.cache',
  '.turbo',
];

console.log('🧹 Limpiando cache del proyecto...\n');

dirsToClean.forEach((dir) => {
  const fullPath = path.join(__dirname, '..', dir);
  
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`✅ Eliminado: ${dir}`);
    } catch (error) {
      console.log(`⚠️  No se pudo eliminar: ${dir}`);
    }
  }
});

console.log('\n✨ Cache limpiado correctamente');
console.log('Ejecuta: npm run dev\n');
