import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/dl-visual-modules/', // ← 這裡要對應你的儲存庫名稱
  plugins: [react()],
  

})
