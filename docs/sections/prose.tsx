import { Prose } from '../../src'
import { CodeBlock } from '../code-block'

export function ProseSection() {
  return (
    <>
      <div class="rounded-card border border-line bg-card p-6">
        <Prose>
          <h2>Your data</h2>
          <p>
            We keep what you add so you can find it again. You can read the <a href="#">full policy</a> at any time.
          </p>
          <h3>What we keep</h3>
          <ul>
            <li>The items you add</li>
            <li>Your settings</li>
            <li>
              <strong>Nothing else</strong>
            </li>
          </ul>
          <blockquote>Plain headings, paragraphs and lists need no classes.</blockquote>
        </Prose>
      </div>
      <CodeBlock
        title="Basic use"
        code={`<Prose>
  <h2>Your data</h2>
  <p>We keep what you add so you can find it again.</p>
</Prose>`}
      />
      <CodeBlock
        title="As an article"
        code={`<Prose as="article">
  <h1>Terms</h1>
  <p>Welcome.</p>
</Prose>`}
      />
    </>
  )
}
