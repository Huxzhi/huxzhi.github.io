import { defineConfig, transformerDirectives, presetUno, presetIcons } from "unocss";
import { presetTheme } from "unocss-preset-theme";

const themes = {
  dark: {
    colors: {
      primary: "rgba(217, 173, 0, 1)",
      text: "#fff",
      icon: "#fff",
      bg: "#333",
      modal: '#242424'
    },
  } as any,
  light: {
    colors: {
      primary: "#facc15",
      text: "#000",
      icon: "rgba(116,115,115,1)",
      bg: "#fff",
      modal: '#fff'
    },
  },
};

export default defineConfig({
  transformers: [transformerDirectives({ enforce: "pre" })],
  presets: [
    presetUno({
      dark: "media",

    }),
    presetTheme({
      theme: {
        dark: themes.dark,
      },
    }),
    presetIcons({
      autoInstall: true,
    }),
    // ...other presets
  ],
  theme: themes.light,
  content: {
    filesystem: [
      'src/**/*.tsx'
    ]
  }
});
