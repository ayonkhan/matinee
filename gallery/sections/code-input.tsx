import { CodeInput } from '../../src'

export function CodeInputSection() {
  return (
    <div class="grid gap-6 sm:grid-cols-2">
      <CodeInput id="code" label="Verification code" name="code" hint="We sent a 6 digit code to your email." />
      <CodeInput id="pin" label="PIN" length={4} value="12" />
      <CodeInput id="wrong-code" label="Try again" value="123456" error="That code is wrong." />
      <CodeInput id="locked-code" label="Locked" disabled />
    </div>
  )
}
