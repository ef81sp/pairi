import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.mts'],
  target: 'esnext',
  sourcemap: true,
  clean: true,
  dts: true,
  minify: true,
  format: ["cjs", "esm"],
})