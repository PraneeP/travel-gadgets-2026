import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // **สำคัญ:** base ต้องเป็นชื่อ Repository ของคุณ
  // การตั้งค่านี้จำเป็นเพื่อให้ Vite Build Path ของ Assets (เช่น รูปภาพ) ได้ถูกต้อง
  base: "/travel-gadgets-2026/", 
  plugins: [react()],
})