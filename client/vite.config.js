import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['.onrender.com', 'threadnova-ecommerce.onrender.com', 'localhost']
  },
  plugins: [react()],
})
