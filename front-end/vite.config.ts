import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'resolve-public-assets',
      resolveId(id) {
        if (id.startsWith('/assets/')) {
          // Convierte /assets/file.png a la ruta absoluta correcta
          return path.resolve(__dirname, 'public', id.slice(1))
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '/assets': path.resolve(__dirname, './public/assets')
    }
  },
  publicDir: 'public',
  base: '/',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif']
})