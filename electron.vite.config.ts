import {
  defineConfig,
  externalizeDepsPlugin,
} from 'electron-vite';
import { resolve } from 'path';

import react from '@vitejs/plugin-react';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@prime-root' : resolve(__dirname , './node_modules/primeflex'),
      }
    },
    plugins: [react()]
  }
})
