import { describe, expect, it } from 'vitest'
import { Pagination } from '../src/components/pagination'

const render = (node: unknown) => String(node)
const count = (html: string, pattern: RegExp) => (html.match(pattern) ?? []).length
const href = (page: number) => '/items?page=' + page

describe('Pagination', () => {
  it('says where you are', () => {
    expect(render(<Pagination page={2} pageCount={9} href={href} />)).toContain('Page 2 of 9')
  })

  it('links to the page before and the page after', () => {
    const html = render(<Pagination page={5} pageCount={9} href={href} />)

    expect(html).toContain('href="/items?page=4"')
    expect(html).toContain('href="/items?page=6"')
    expect(count(html, /<a /g)).toBe(2)
  })

  it('puts Previous before the page and Next after it', () => {
    const html = render(<Pagination page={5} pageCount={9} href={href} />)

    expect(html.indexOf('Previous')).toBeLessThan(html.indexOf('Page 5 of 9'))
    expect(html.indexOf('Page 5 of 9')).toBeLessThan(html.indexOf('Next'))
  })

  it('has no link back from the first page', () => {
    const html = render(<Pagination page={1} pageCount={9} href={href} />)

    expect(html).toContain('href="/items?page=2"')
    expect(html).not.toContain('href="/items?page=0"')
    expect(count(html, /<a /g)).toBe(1)
    expect(count(html, /<button/g)).toBe(1)
    expect(html).toContain('disabled')
  })

  it('has no link forward from the last page', () => {
    const html = render(<Pagination page={9} pageCount={9} href={href} />)

    expect(html).toContain('href="/items?page=8"')
    expect(html).not.toContain('href="/items?page=10"')
    expect(count(html, /<a /g)).toBe(1)
    expect(count(html, /<button/g)).toBe(1)
  })

  it('draws nothing for one page or none', () => {
    expect(render(<Pagination page={1} pageCount={1} href={href} />)).toBe('')
    expect(render(<Pagination page={1} pageCount={0} href={href} />)).toBe('')
  })

  it('brings a page outside the range back inside it', () => {
    expect(render(<Pagination page={20} pageCount={9} href={href} />)).toContain('Page 9 of 9')
    expect(render(<Pagination page={0} pageCount={9} href={href} />)).toContain('Page 1 of 9')
    expect(render(<Pagination page={-3} pageCount={9} href={href} />)).toContain('Page 1 of 9')
  })

  it('is named Pagination for screen readers, or anything else you choose', () => {
    expect(render(<Pagination page={2} pageCount={9} href={href} />)).toContain('aria-label="Pagination"')
    expect(render(<Pagination page={2} pageCount={9} href={href} label="Results pages" />)).toContain(
      'aria-label="Results pages"',
    )
  })

  it('lines the page number up with equal width digits', () => {
    expect(render(<Pagination page={2} pageCount={9} href={href} />)).toContain('tabular-nums')
  })

  it('adds extra classes', () => {
    expect(render(<Pagination page={2} pageCount={9} href={href} class="mt-6" />)).toContain('mt-6')
  })
})
