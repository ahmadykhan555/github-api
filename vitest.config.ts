import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup/test-setup.ts'],
    exclude: [
      '**/tests/e2e/**', // Exclude e2e tests
    ],
  },
});
