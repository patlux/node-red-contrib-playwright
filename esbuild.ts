import path from 'path'
import { rm } from 'node:fs/promises'
import * as esbuild from 'esbuild'

try {
  try {
    await rm(path.join('dist'), { recursive: true, force: true })
  } catch {}

  const result = await esbuild.build({
    entryPoints: ['./src/nodes/**/*.ts', './src/nodes/**/*.html'],
    target: 'node21',
    splitting: false,
    bundle: true,
    external: ['*'],
    format: 'cjs',
    outbase: './src',
    outdir: './dist',
    allowOverwrite: true,
    loader: { '.html': 'copy' },
  })

  console.log(JSON.stringify({ out: result.outputFiles }))

  // for (const res of result.outputs) {
  //   const nodeName = res.path.split('/').pop()?.split('.')[0]
  //   if (nodeName == null) throw new Error(`Failed to parse "${res}".`)

  //   const srcDir = path.join('src', 'nodes', nodeName)
  //   const distDir = path.join('dist', 'nodes', nodeName)

  //   await Bun.write(path.join(distDir, `${nodeName}.js`), res)
  //   await Bun.write(
  //     path.join(distDir, `${nodeName}.html`),
  //     Bun.file(path.join(srcDir, `${nodeName}.html`)),
  //   )
  // }
} catch (error: unknown) {
  console.error(error)
}
