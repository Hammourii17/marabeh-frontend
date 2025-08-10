import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "node:url"

export default defineConfig({
  plugins: [vue()],
  publicDir: "public",
  base: `/`,
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1'),
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
      "~": fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: ["esnext"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/css/global.scss";`,
      },
    },
  },
})
