/// <reference types="vite/client" />
import { describe, expect, it } from 'vitest'

const raw = import.meta.glob<string>(['../package.json', '../src/theme.css'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

const pkg = JSON.parse(raw['../package.json'] ?? '{}')

describe('package.json', () => {
  it('is published under the ayonkhan scope', () => {
    expect(pkg.name).toBe('@ayonkhan/matinee')
  })

  it('exports the components and the theme', () => {
    expect(pkg.exports['.'].default).toBe('./dist/index.js')
    expect(pkg.exports['.'].types).toBe('./dist/index.d.ts')
    expect(pkg.exports['./theme.css']).toBe('./src/theme.css')
  })

  it('points the theme export at a file that exists', () => {
    const file = pkg.exports['./theme.css'].replace('./', '../')

    expect(file in raw).toBe(true)
  })

  it('ships the build and the theme and nothing else', () => {
    expect(pkg.files).toEqual(['dist', 'src/theme.css'])
  })

  it('leaves Hono and Tailwind to the app that installs it', () => {
    expect(pkg.peerDependencies.hono).toBeDefined()
    expect(pkg.peerDependencies.tailwindcss).toBeDefined()
    expect(pkg.dependencies).toBeUndefined()
  })
})
