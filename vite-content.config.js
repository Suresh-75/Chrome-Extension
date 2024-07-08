import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false, // So that popup build files don't get deleted
    rollupOptions: {
      input: {
        content: "./content_script/content.js", // Entry Point
        "content-css": "./content_script/content-css.css", // Entry Point
      },
      output: {
        entryFileNames: "assets/[name].js",
      },
    },
  },
});
