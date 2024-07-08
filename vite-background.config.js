import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false, // So that popup and content build files don't get deleted
    rollupOptions: {
      input: {
        background: "./background/background.js", // Entry Point
      },
      output: {
        entryFileNames: "assets/[name].js",
      },
    },
  },
});
