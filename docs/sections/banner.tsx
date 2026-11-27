import { Banner } from '../../src'
import { CodeBlock } from '../code-block'

export function BannerSection() {
  return (
    <>
      <div class="max-w-xl">
        <Banner id="docs-demo" placement="inline" label="Example banner" remember={false}>
          We only use the cookies needed to keep you signed in. No tracking, no advertising.
        </Banner>
      </div>
      <p class="type-hint">
        On a real page the banner sticks to the bottom of the screen, or the top with edge="top", until the visitor
        presses the button. Their choice stays in their browser, so it does not come back. A banner at the bottom
        covers the BottomNav until it is dismissed. The banner starts hidden and needs JavaScript to appear, so add
        bannerScript to the page once, in a script tag.
      </p>
      <CodeBlock
        title="Basic use"
        code={`<Banner id="cookies" label="Cookie notice">
  We only use the cookies needed to keep you signed in.
</Banner>`}
      />
      <CodeBlock
        title="Add the script once"
        code={`import { raw } from 'hono/html'
import { bannerScript } from '@ayonkhan/matinee'

<script>{raw(bannerScript)}</script>`}
      />
      <CodeBlock
        title="At the top of the page"
        code={`<Banner id="sale" edge="top">
  The sale ends on Friday.
</Banner>`}
      />
      <CodeBlock
        title="Own button text, and it returns on every visit"
        code={`<Banner id="beta" action="Close" remember={false}>
  This is a beta. Things may change.
</Banner>`}
      />
    </>
  )
}
