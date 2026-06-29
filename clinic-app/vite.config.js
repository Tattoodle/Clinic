import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // "/" for production, "/dev/" for the staging build (DEPLOY_BASE=/dev/ npm run build)
  base: process.env.DEPLOY_BASE || "/",
  plugins: [react()],
  server: {
    port: 5184,
    strictPort: true,
  },
});
