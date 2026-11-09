
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Ruta base del repositorio para publicar en GitHub Pages.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Supermercado-Lazareth-Parra-PFY2202-002A/'
})