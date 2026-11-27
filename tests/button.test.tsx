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
    const html = render(<Button href="/items/new">Add item</Button>)

    expect(html).toContain('<a ')
    expect(html).toContain('href="/items/new"')
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
      <Button href="/items/new" disabled>
        Add item
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

  it('can look like a link and still be a button', () => {
    const html = render(<Button variant="link" type="submit">Send a new code</Button>)

    expect(html).toContain('<button')
    expect(html).toContain('type="submit"')
    expect(html).toContain('text-accent-text')
    expect(html).toContain('hover:underline')
    expect(html).not.toContain('bg-accent')
    expect(html).not.toContain('px-5')
  })

  it('keeps a link-style button at least 44px tall, so it is easy to tap', () => {
    expect(render(<Button variant="link">Send a new code</Button>)).toContain('min-h-11')
  })

  it('shows no hover feedback on a disabled link-style button', () => {
    const html = render(<Button variant="link" disabled>Send a new code</Button>)

    expect(html).toContain('cursor-not-allowed')
    expect(html).not.toContain('hover:')
  })
})
