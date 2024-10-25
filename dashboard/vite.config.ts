import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import postcssNesting from 'postcss-nesting'
import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import postcssPresetEnv from 'postcss-preset-env'
import cssnano from 'cssnano'
import { config } from 'dotenv'

config({ path: path.resolve(process.cwd(), "../.env") });

// Validação de variáveis de ambiente
if (!process.env.API_URL) {
  console.error("API_URL missing from environment variables");
  process.exit(1);
}

export default defineConfig({
  plugins: [
    vue2(),
    createHtmlPlugin({
      template: 'index.html',
      inject: {
        data: {
          title: 'Dashboard'
        }
      }
    })
  ],

  css: {
    preprocessorOptions: {
      pcss: {
        // Opções específicas para .pcss se necessário
      }
    },
    postcss: {
      plugins: [
        postcssImport({
          resolve(id) {
            // Permite importar do node_modules sem o prefixo ~
            if (id.startsWith('tailwindcss/')) {
              return path.resolve(__dirname, 'node_modules', id)
            }
            return id
          }
        }),
        tailwindcss(),
        postcssNesting(),
        ...(process.env.NODE_ENV === 'production' ? [postcssPresetEnv(), cssnano()] : [])
      ]
    }
  },
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs', '.vue', '.pcss'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },

  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'],

  build: {
    sourcemap: process.env.NODE_ENV === 'production',
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },

  server: {
    port: 3002,
    host: true, // Equivalente ao allowedHosts: 'all'
    proxy: {
      '/api': {
        target: process.env.API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  },

  define: {
    'process.env.API_URL': JSON.stringify(process.env.API_URL)
  }
})