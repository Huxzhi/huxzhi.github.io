import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss'
import { presetTheme } from 'unocss-preset-theme'

interface ThemeColors {
  colors: {
    primary: string
    text: string
    icon: string
    bg: string
    modal: string
  }
}

const themes: Record<string, ThemeColors> = {
  dark: {
    colors: {
      primary: 'rgba(217, 173, 0, 1)',
      text: '#fff',
      icon: '#fff',
      bg: '#333',
      modal: '#242424',
    },
  },
  light: {
    colors: {
      primary: '#facc15',
      text: '#000',
      icon: 'rgba(116,115,115,1)',
      bg: '#fff',
      modal: '#fff',
    },
  },
}

export default defineConfig({
  transformers: [transformerDirectives({ enforce: 'pre' })],
  presets: [
    presetUno({
      dark: 'media',
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
    filesystem: ['src/**/*.tsx'],
  },
})
