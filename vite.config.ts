import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import codegen from "vite-plugin-graphql-codegen";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), codegen(), react()],
  resolve: { alias: { src: "/src" } },
});
