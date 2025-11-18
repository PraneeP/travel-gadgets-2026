import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // **สำคัญ:** base ต้องเป็นชื่อ Repository
  base: "/travel-gadgets-2026/", 
  plugins: [react()],
})