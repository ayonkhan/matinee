import { describe, expect, it } from 'vitest'
import { sidebarScript } from '../docs/sidebar-script'

describe('sidebarScript', () => {
  it('marks the current section and opens its group', () => {
    expect(sidebarScript).toContain("'aria-current', 'location'")
    expect(sidebarScript).toContain('group.open = true')
  })

  it('closes the groups it opened, but not the ones you opened', () => {
    expect(sidebarScript).toContain('group.open = false')
    expect(sidebarScript).toContain('mine.indexOf(group) < 0')
  })

  it('follows both scrolling and links with a hash', () => {
    expect(sidebarScript).toContain("addEventListener('scroll'")
    expect(sidebarScript).toContain("addEventListener('hashchange'")
    expect(sidebarScript).toContain("addEventListener('load'")
  })
})
