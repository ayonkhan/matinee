import { describe, expect, it } from 'vitest'
import { themeScript } from '../docs/theme-script'

describe('themeScript', () => {
  it('takes the theme from the address, then a saved choice, then the system setting', () => {
    const address = themeScript.indexOf("get('theme')")
    const saved = themeScript.indexOf("localStorage.getItem('theme')")
    const system = themeScript.indexOf('prefers-color-scheme: dark')

    expect(address).toBeGreaterThan(-1)
    expect(saved).toBeGreaterThan(address)
    expect(system).toBeGreaterThan(saved)
  })

  it('sets the theme right away, before the page paints', () => {
    expect(themeScript).toContain("root.setAttribute('data-theme', pick())")
  })

  it('remembers the choice and does not follow the link', () => {
    expect(themeScript).toContain("localStorage.setItem('theme', theme)")
    expect(themeScript).toContain('event.preventDefault()')
  })

  it('works when storage is blocked', () => {
    expect(themeScript.match(/catch \(error\)/g)).toHaveLength(2)
  })
})
