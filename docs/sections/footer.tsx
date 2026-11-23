import { Footer } from '../../src'
import { CodeBlock } from '../code-block'

export function FooterSection() {
  return (
    <>
      <div class="overflow-hidden rounded-card border border-line">
        <Footer
          links={[
            { label: 'About', href: '#' },
            { label: 'Privacy', href: '#' },
            { label: 'Terms', href: '#' },
          ]}
        >
          © 2026 Example
        </Footer>
      </div>
      <p class="type-hint">
        On a phone the note sits above the links. From wider screens up they share a row. On a page with a BottomNav,
        leave room under the footer so the floating bar does not cover the links.
      </p>
      <CodeBlock
        title="Basic use"
        code={`<Footer
  links={[
    { label: 'About', href: '/about' },
    { label: 'Privacy', href: '/privacy' },
  ]}
>
  © 2026 Example
</Footer>`}
      />
      <CodeBlock
        title="Links only"
        code={`<Footer links={[{ label: 'About', href: '/about' }]} />`}
      />
    </>
  )
}
