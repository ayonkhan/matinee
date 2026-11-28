import { ErrorPage } from '../../src'
import { CodeBlock } from '../code-block'

export function ErrorPageSection() {
  return (
    <>
      <div class="rounded-card border border-line px-6 py-10">
        <ErrorPage code="404" title="Page not found" action={{ label: 'Back to the home page', href: '#' }}>
          We could not find that page. It may have moved, or the address may have a typo.
        </ErrorPage>
      </div>
      <p class="type-hint">
        For a whole page that says something went wrong or is missing, such as a page not found, a server error or no
        access. The title is the heading of the page. It has no space above or below, so the page decides, for example
        with class="py-16".
      </p>
      <CodeBlock
        title="A page not found"
        code={`<ErrorPage code="404" title="Page not found" action={{ label: 'Back to the home page', href: '/' }} class="py-16">
  We could not find that page. It may have moved, or the address may have a typo.
</ErrorPage>`}
      />
      <CodeBlock
        title="A server error"
        code={`<ErrorPage code="Oops" title="Something went wrong" action={{ label: 'Back to the home page', href: '/' }}>
  That was our mistake, not yours. Please try again in a moment.
</ErrorPage>`}
      />
    </>
  )
}
