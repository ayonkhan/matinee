import { describe, expect, it } from 'vitest'
import { groups } from '../docs/sections'

const sections = groups.flatMap((group) => group.sections)
const components = groups.find((group) => group.title === 'Components')?.sections ?? []

describe('the docs registry', () => {
  it('gives every section its own id', () => {
    const ids = sections.map((section) => section.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it('puts every component in a category', () => {
    for (const section of components) {
      expect(section.category, section.title).toBeDefined()
    }
  })

  it('keeps each category together, so the page and the sidebar agree on the order', () => {
    const seen: string[] = []

    for (const section of components) {
      const last = seen[seen.length - 1]

      if (section.category !== last) {
        expect(seen, `${section.category} comes back after ${last}`).not.toContain(section.category)
        seen.push(section.category ?? '')
      }
    }
  })

  it('lists each category from A to Z', () => {
    for (const category of new Set(components.map((section) => section.category))) {
      const titles = components.filter((section) => section.category === category).map((section) => section.title)

      expect(titles, String(category)).toEqual([...titles].sort())
    }
  })
})
