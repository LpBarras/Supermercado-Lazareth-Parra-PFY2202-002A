import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// El nombre base permite publicar el proyecto en GitHub Pages.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base:
    process.env.GITHUB_PAGES === "true"
      ? "/Supermercado-Lazareth-Parra-PFY2202-002A/"
      : "/",
});
