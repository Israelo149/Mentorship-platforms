import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174, // use whatever port Vite is using
    allowedHosts: 'all' // or ['.trycloudflare.com'] if you prefer to be specific
  }
})
