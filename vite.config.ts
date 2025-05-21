import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
// @ts-ignore
import path from "path"
import localConfig from "./src/local_config"
export default defineConfig({
  plugins: [vue()],
  publicDir: path.resolve(__dirname, "./src/static"),
  base: `/`,
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: ["esnext"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/css/global.scss";`,
      },
    },
  },
})
