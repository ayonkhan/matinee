/// <reference types="vite/client" />
import { describe, expect, it } from 'vitest'
import { groups } from '../docs/sections'
import * as kit from '../src'

// The source of every component, so a snippet can be checked against the props it really has.
const sources = import.meta.glob<string>('../src/components/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const kebab = (name: string) => name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

// The names written directly on a tag, such as "href" and "fullWidth".
// Quotes and braces are skipped, so values never count.
function attributesAfter(code: string, start: number) {
  const names: string[] = []
  let depth = 0
  let quote = ''
  let word = ''

  for (let i = start; i < code.length; i++) {
    const char = code[i] ?? ''

    if (quote) {
      if (char === quote) quote = ''
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char
      continue
    }

    if (char === '{') {
      depth++
      continue
    }

    if (char === '}') {
      depth--
      continue
    }

    if (depth > 0) continue

    if (/[\w-]/.test(char)) {
      word += char
      continue
    }

    if (word) names.push(word)
    word = ''

    if (char === '>') break
  }

  if (word) names.push(word)

  return names
}

// Everything wrong with a snippet: a component or a prop that does not exist.
export function problems(code: string) {
  const found: string[] = []

  for (const match of code.matchAll(/<([A-Z][A-Za-z]*)/g)) {
    const name = match[1] ?? ''

    if (typeof (kit as Record<string, unknown>)[name] !== 'function') {
      found.push(`${name} is not exported`)
      continue
    }

    const source = sources[`../src/components/${kebab(name)}.tsx`] ?? ''

    for (const attribute of attributesAfter(code, (match.index ?? 0) + match[0].length)) {
      if (!new RegExp(`\\b${attribute}\\??:`).test(source)) found.push(`${name} has no ${attribute}`)
    }
  }

  return found
}

// The text of every code block in a rendered section.
function snippetsIn(html: string) {
  return [...html.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/g)].map((match) =>
    (match[1] ?? '')
      .replace(/<[^>]+>/g, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&'),
  )
}

describe('the snippet checker', () => {
  it('accepts a real component with real props', () => {
    expect(problems('<Button href="/a" fullWidth>Save</Button>')).toEqual([])
  })

  it('catches a component that does not exist', () => {
    expect(problems('<Wibble />')).toEqual(['Wibble is not exported'])
  })

  it('catches a prop that does not exist', () => {
    expect(problems('<Button wibble="x" />')).toEqual(['Button has no wibble'])
  })

  it('skips values, nested braces and plain html tags', () => {
    expect(problems(`<Select id="a" label="A" options={[{ value: 'x', label: 'X' }]}><p class="a">x</p></Select>`)).toEqual([])
  })
})

describe('docs snippets', () => {
  for (const group of groups) {
    for (const section of group.sections) {
      const snippets = snippetsIn(String(<section.Component />))

      it(`${section.title} has a snippet`, () => {
        expect(snippets.length).toBeGreaterThan(0)
      })

      it(`${section.title} snippets only use what the kit has`, () => {
        for (const code of snippets) {
          expect(problems(code), code).toEqual([])
        }
      })
    }
  }
})
