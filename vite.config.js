import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => ({
    base: "https://axeljaeger.github.io/gopro-wifi-enabler/",
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  })
);