import { defineConfig } from 'vite'

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  console.log("FBI WARNING>>>>>>>> ~ defineConfig ~ mode:", mode)
  console.log("FBI WARNING>>>>>>>> ~ defineConfig ~ command:", command)
  if (command === 'serve') {
    return {
      // dev 独有配置
    }
  }

  return {
    build: {
      outDir: 'dist',
      lib: {
        entry: 'src/index.ts',
        name: 'MyLib',
        formats: ['es', 'cjs', 'umd'],
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
  }
})
