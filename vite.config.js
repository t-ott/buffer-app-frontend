import {defineConfig} from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/buffer': 'http://localhost:8080'
    }
  }
})
