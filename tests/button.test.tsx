import { describe, expect, it } from 'vitest'
import { Button } from '../src/components/button'

const render = (node: unknown) => String(node)

describe('Button', () => {
  it('renders a button element by default', () => {
    const html = render(<Button>Save</Button>)

    expect(html).toContain('<button')
    expect(html).toContain('type="button"')
    expect(html).toContain('Save')
  })

  it('renders a link when it has an href', () => {
    const html = render(<Button href="/films/new">Add film</Button>)

    expect(html).toContain('<a ')
    expect(html).toContain('href="/films/new"')
    expect(html).not.toContain('<button')
  })

  it('uses the primary style unless told otherwise', () => {
    expect(render(<Button>Save</Button>)).toContain('bg-accent')
    expect(render(<Button variant="danger">Delete</Button>)).toContain('bg-danger')
    expect(render(<Button variant="secondary">Cancel</Button>)).toContain('border-line')
  })

  it('can submit a form', () => {
    expect(render(<Button type="submit">Save</Button>)).toContain('type="submit"')
  })

  it('turns a link into a disabled button when disabled', () => {
    const html = render(
      <Button href="/films/new" disabled>
        Add film
      </Button>,
    )

    expect(html).toContain('<button')
    expect(html).toContain('disabled')
    expect(html).not.toContain('href=')
  })

  it('stretches to full width and accepts extra classes', () => {
    const html = render(
      <Button fullWidth class="mt-4">
        Save
      </Button>,
    )

    expect(html).toContain('w-full')
    expect(html).toContain('mt-4')
  })

  it('shows a pointer cursor and hover feedback when it can be clicked', () => {
    const html = render(<Button>Save</Button>)

    expect(html).toContain('cursor-pointer')
    expect(html).toContain('hover:brightness-110')
  })

  it('shows no hover feedback and a blocked cursor when disabled', () => {
    const html = render(<Button disabled>Save</Button>)

    expect(html).toContain('cursor-not-allowed')
    expect(html).not.toContain('cursor-pointer')
    expect(html).not.toContain('hover:')
  })
})
