import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: (format, entry) => `${entry}.${format}.js`,
    },
    minify: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
        preserveModules: true,
      },
    },
  },
})
