import { describe, expect, it } from 'vitest'
import { ErrorPage } from '../src/components/error-page'

const render = (node: unknown) => String(node)

describe('ErrorPage', () => {
  it('shows the code and the title, and the title is the heading of the page', () => {
    const html = render(<ErrorPage code="404" title="Page not found" />)

    expect(html).toContain('404')
    expect(html).toMatch(/<h1[^>]*>Page not found<\/h1>/)
  })

  it('shows the explanation when there is one', () => {
    expect(render(<ErrorPage code="404" title="x">It may have moved.</ErrorPage>)).toContain('It may have moved.')
    expect(render(<ErrorPage code="404" title="x" />)).not.toContain('type-body')
  })

  it('offers one way out as a link, when given', () => {
    const html = render(<ErrorPage code="404" title="x" action={{ label: 'Back to the home page', href: '/' }} />)

    expect(html).toContain('<a ')
    expect(html).toContain('href="/"')
    expect(html).toContain('Back to the home page')
    expect(render(<ErrorPage code="404" title="x" />)).not.toContain('<a ')
  })

  it('leaves the space above and below to the page', () => {
    expect(render(<ErrorPage code="404" title="x" />)).not.toMatch(/\bpy-\d/)
    expect(render(<ErrorPage code="404" title="x" class="py-16" />)).toContain('py-16')
  })

  it('escapes the code, the title and the explanation', () => {
    const html = render(
      <ErrorPage code={'<b>1</b>'} title={'<script>alert(1)</script>'}>
        {'<i>x</i>'}
      </ErrorPage>,
    )

    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<b>1</b>')
    expect(html).not.toContain('<i>x</i>')
  })
})
