import path from 'path'
import { rm } from 'node:fs/promises'

try {
  try {
    await rm(path.join('dist'), { recursive: true, force: true })
  } catch {}

  const result = await Bun.build({
    entrypoints: ['./src/nodes/open-browser/open-browser.ts'],
    target: 'node',
    splitting: false,
    external: ['node-red'],
    format: 'esm',
  })

  for (const res of result.outputs) {
    const nodeName = res.path.split('/').pop()?.split('.')[0]
    if (nodeName == null) throw new Error(`Failed to parse "${res}".`)

    const srcDir = path.join('src', 'nodes', nodeName)
    const distDir = path.join('dist', 'nodes', nodeName)

    await Bun.write(path.join(distDir, `${nodeName}.js`), res)
    await Bun.write(
      path.join(distDir, `${nodeName}.html`),
      Bun.file(path.join(srcDir, `${nodeName}.html`)),
    )
  }
} catch (error: unknown) {
  console.error(error)
}
