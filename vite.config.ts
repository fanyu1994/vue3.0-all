import { defineConfig, resolveBaseUrl } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import copy from 'rollup-plugin-copy'
import myExample from './rollup-plugin-local.js'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  let config = {}
  if (command === 'serve') {
    // serve 独有配置
    config = {
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
          api: resolve(__dirname, './src/api'),
        },
      },
      plugins: [
        vue(),
        Unocss({
          presets: [presetUno(), presetAttributify(), presetIcons()],
          rules: [['fit-content', { width: 'fit-content' }]],
          shortcuts: [
            // you could still have object style
            {
              btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
            },
            // dynamic shortcuts
            [
              /^btn-(.*)$/,
              ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`,
            ],
          ],
        }),
        AutoImport({
          imports: ['vitest'],
          dts: true, // generate TypeScript declaration
        }),
        Components({
          dts: true,
        }),
      ],
      server: {
        cors: true, // 默认启用并允许任何源
        proxy: {
          '^/api': {
            target: 'http://127.0.0.1:3456/',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
    }
  } else {
    // build 独有配置
    config = {
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
          api: resolve(__dirname, './src/api'),
        },
      },
      plugins: [
        vue(),
        Unocss({
          presets: [presetUno(), presetAttributify(), presetIcons()],
          rules: [['fit-content', { width: 'fit-content' }]],
          shortcuts: [
            // you could still have object style
            {
              btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
            },
            // dynamic shortcuts
            [
              /^btn-(.*)$/,
              ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`,
            ],
          ],
        }),
        AutoImport({
          imports: ['vitest'],
          dts: true, // generate TypeScript declaration
        }),
        Components({
          dts: true,
        }),
      ],
      build: {
        rollupOptions: {
          output: {
            chunkFileNames: 'static/js/[name]-[hash].js',
            entryFileNames: 'static/js/[name]-[hash].js',
            assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          },
          // plugins: [
          //   copy({
          //     targets: [
          //       {
          //         src: [
          //           resolve(__dirname, './dockerBootstrap.sh'),
          //           resolve(__dirname, '/docker-compose.yml'),
          //           resolve(__dirname, '/nginx.conf'),
          //           resolve(__dirname, '/Dockerfile'),
          //         ],
          //         dest: 'dist/',
          //       },
          //       {
          //         src: './dockerBootstrap.sh',
          //         dest: 'dist/static/',
          //       },
          //     ],
          //   }),
          // ],
        },
      },
    }
  }
  return config
})
