import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
      },
      '/socket.io': {
        target: 'ws://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          utilities: ['i18next', 'socket.io-client', 'leo-profanity', 'react-toastify', 'yup', 'formik', '@rollbar/react', 'rollbar'],
        },
      },
    },
  },
})
