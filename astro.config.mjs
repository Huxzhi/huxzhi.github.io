// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  output: import.meta.env.DEV ? 'server' : 'static',
  integrations: [UnoCSS({ injectReset: true })],
  server: {
    host: true
  },
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "urodele.config": fileURLToPath(new URL("./urodele.config.ts", import.meta.url))
      },
    },
  },
});
