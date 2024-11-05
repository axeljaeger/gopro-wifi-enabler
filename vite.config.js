import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  base: 'https://axeljaeger.github.io/gopro-wifi-enabler/',
  build: {
    outDir: 'build',
  },
  plugins: [react()],
}));
