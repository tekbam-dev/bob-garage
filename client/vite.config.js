import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  root: './client',
  plugins: [react()],
  base: '/',
  build: {
    outDir: '../dist', // Place the build output in the root 'dist' folder
    emptyOutDir:true,
  }
  })
