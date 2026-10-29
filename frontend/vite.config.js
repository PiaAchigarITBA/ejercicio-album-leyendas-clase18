import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Sin proxy: el front le pide los datos DIRECTO a la API, con la URL completa
// que está en VITE_API_URL (.env.development en tu compu, variable de entorno
// en Vercel). Así funciona igual en local y publicado.
export default defineConfig({
  plugins: [react()],
})
