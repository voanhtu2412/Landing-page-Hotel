// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const variablesPath = resolve(rootDir, 'app/assets/scss/variables.scss').replace(/\\/g, '/')

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n'
  ],



  i18n: {
    locales: [
      { code: 'vi', file: 'vi.json' },
      { code: 'en', file: 'en.json' }
    ],
    defaultLocale: 'vi',
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
  },

  // ── App Head (SEO base) ──────────────────────────────────
  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      title: 'Hotel Amy – Khách Sạn Tân Phú Giá Rẻ, Đẹp Tại Sài Gòn',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Tìm khách sạn giá rẻ tại Tân Phú? Hotel Amy là khách sạn Sài Gòn lý tưởng với không gian ấm cúng, sạch sẽ, giá cả hợp lý và tiện nghi hiện đại. Đặt phòng ngay!',
        },
        { name: 'keywords', content: 'khách sạn tân phú, khách sạn giá rẻ, khách sạn sài gòn, khách sạn tân phú giá rẻ, hotel amy tân phú' },
        { property: 'og:title', content: 'Hotel Amy – Khách Sạn Tân Phú Giá Rẻ, Đẹp Tại Sài Gòn' },
        {
          property: 'og:description',
          content: 'Khách sạn giá rẻ, sạch đẹp và tiện nghi tại Tân Phú, Sài Gòn. Trải nghiệm không gian lưu trú tuyệt vời tại Hotel Amy.',
        },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#C8865A' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logo-dark.png' },
      ],
    },
  },

  // ── CSS Global ───────────────────────────────────────────
  css: [
    '~/assets/scss/main.scss',
    '@flaticon/flaticon-uicons/css/all/all.css'
  ],

  // ── Vite / SCSS ──────────────────────────────────────────
  // additionalData injects variables into EVERY .scss file processed by Vite,
  // including component <style lang="scss"> blocks.
  // main.scss itself already has @use via direct import — additionalData
  // only affects component styles.
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // loadPaths tells Sass where to resolve @use imports
          loadPaths: [resolve(rootDir, 'app/assets/scss')],
          // additionalData injects variables into every .scss file (components)
          // The function form skips files that already handle their own imports
          additionalData: (content: string, filepath: string) => {
            if (
              filepath.includes('variables.scss') ||
              filepath.includes('main.scss')
            ) {
              return content
            }
            return `@use "variables" as *;\n${content}`
          },
        },
      },
    },
  },
})
