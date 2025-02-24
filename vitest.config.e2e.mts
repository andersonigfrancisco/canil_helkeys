import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'

export default defineConfig(async () => {
  const tsConfigPaths = (await import('vite-tsconfig-paths')).default

  return {
    test: {
      include: ['**/*.e2e-spec.ts'],
      globals: true,
      root: './',
      setupFiles: ['./test/setup-e2e.ts'],
    },
    plugins: [
      tsConfigPaths(),
      swc.vite({
        module: { type: 'es6' },
      }),
    ],
  }
})
