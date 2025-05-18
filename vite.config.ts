import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": [
            "@radix-ui/react-avatar",
            "@radix-ui/react-dialog",
            "@radix-ui/react-popover",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-tooltip",
          ],
          "utils-vendor": [
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5500",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
