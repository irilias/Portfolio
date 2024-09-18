import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
  },
  component: {
    specPattern: "cypress/component/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
    supportFile: 'cypress/support/component.js',
    setupNodeEvents(on, config) {
    }
  },
})
