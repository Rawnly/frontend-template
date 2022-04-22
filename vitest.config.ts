import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['__tests__/**/*'],
    environment: 'jsdom',
    globals: true
  },
})
