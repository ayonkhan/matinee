import { CopyBlock } from '../../src'
import { CodeBlock } from '../code-block'

const invite = `Hello,

Here is the link to my list:
https://example.com/lists/night-owl

See you there.`

export function CopyBlockSection() {
  return (
    <>
      <div class="flex max-w-xl flex-col gap-6">
        <CopyBlock title="Invite message" language="Text" code={invite} />
        <CopyBlock
          title="Long lines wrap"
          language="Text"
          wrap
          code="One long line of text that would run off the edge of a small screen if it could not wrap, so it wraps onto the next line instead."
        />
        <CopyBlock title="Code, coloured" language="tsx" highlight code={'<Button href="/next">Continue</Button>'} />
      </div>
      <p class="type-hint">
        The text stays plain unless you add highlight, which turns component tags gold and attribute names grey. That
        suits Matinee code. The Copy button only appears when JavaScript is on, because copying needs it. Without
        JavaScript the text is still there to select. Add copyScript to the page once, in a script tag.
      </p>
      <CodeBlock
        title="Basic use"
        code={`<CopyBlock title="Invite message" language="Text" code={message} />`}
      />
      <CodeBlock
        title="Wrapping long lines"
        code={`<CopyBlock title="Message" wrap code={message} />`}
      />
      <CodeBlock
        title="Colours for Matinee code"
        code={`<CopyBlock language="tsx" highlight code={snippet} />`}
      />
      <CodeBlock
        title="Turn the Copy button on"
        language="tsx"
        code={`import { raw } from 'hono/html'
import { copyScript } from '@ayonkhan/matinee'

<script>{raw(copyScript)}</script>`}
      />
    </>
  )
}
