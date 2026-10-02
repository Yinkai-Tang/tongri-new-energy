import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// DEPLOY_BASE：部署到 GitHub Pages 子路径时由 CI 注入（如 /tongri-new-energy/），
// 本地开发与默认构建保持根路径 '/'，互不影响。
export default defineConfig({
  plugins: [react()],
  base: process.env.DEPLOY_BASE || '/',
  server: {
    port: 5173,
    open: false,
  },
  build: {
    // 企业官网以加载速度优先：chunk 过大时给出提示
    chunkSizeWarningLimit: 900,
  },
})
