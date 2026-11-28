import { CodeInput } from '../../src'
import { CodeBlock } from '../code-block'

export function CodeInputSection() {
  return (
    <>
      <div class="grid gap-6 sm:grid-cols-2">
        <CodeInput id="code" label="Verification code" name="code" hint="We sent a 6 digit code to your email." />
        <CodeInput id="pin" label="PIN" length={4} value="12" />
        <CodeInput id="wrong-code" label="Try again" value="123456" error="That code is wrong." />
        <CodeInput id="locked-code" label="Locked" disabled />
        <CodeInput id="pasted-code" label="Pasted code" value="123 456" allowSeparators />
      </div>
      <CodeBlock
        title="Basic use"
        code={`<CodeInput id="code" label="Verification code" name="code" hint="We sent a 6 digit code to your email." />`}
      />
      <CodeBlock
        title="A code that may be pasted with a space or a dash"
        code={`<CodeInput id="code" label="Verification code" name="code" allowSeparators />`}
      />
      <CodeBlock
        title="Own length"
        code={`<CodeInput id="pin" label="PIN" length={4} />`}
      />
    </>
  )
}
