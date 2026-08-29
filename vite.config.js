import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// base must match the GitHub Pages repo path.
// Repo: ethics-platform  ->  https://<user>.github.io/ethics-platform/
export default defineConfig({
    base: "/ethics-platform/",
    plugins: [react()],
});
