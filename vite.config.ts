import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        additionalData: `@import "/src/styles/variables/index.scss";`,
        silenceDeprecations: ['import'],  //! отключаем предупреждения Deprecation Warning о Dart Sass 3.0.0.
      }
    }
  }
})
