import { Checkbox, CheckboxGroup } from '../../src'
import { CodeBlock } from '../code-block'

export function CheckboxSection() {
  return (
    <>
      <div class="grid gap-6 sm:grid-cols-2">
        <div class="flex flex-col">
          <Checkbox id="remember" label="Remember me on this device" checked />
          <Checkbox id="news" label="Send me the newsletter" hint="One email a month." />
          <Checkbox id="terms" label="I agree to the terms" required error="Tick this to continue." />
          <Checkbox id="locked" label="Not available" disabled />
        </div>
        <CheckboxGroup
          id="topics"
          legend="Favourite topics"
          name="topic"
          hint="Pick any you like."
          options={[
            { value: 'design', label: 'Design', checked: true },
            { value: 'travel', label: 'Travel' },
            { value: 'cooking', label: 'Cooking', hint: 'New every week.' },
            { value: 'music', label: 'Music', disabled: true },
          ]}
        />
      </div>
      <p class="type-hint">Each row is at least 44px tall, so it is easy to tap.</p>
      <CodeBlock
        title="Basic use"
        code={`<Checkbox id="remember" name="remember" label="Remember me on this device" />`}
      />
      <CodeBlock
        title="A label with a link"
        code={`<Checkbox
  id="terms"
  name="terms"
  required
  label={
    <>
      I agree to the <a href="/terms">Terms</a>
    </>
  }
/>`}
      />
      <CodeBlock
        title="A group"
        code={`<CheckboxGroup
  id="topics"
  legend="Favourite topics"
  name="topic"
  options={[
    { value: 'design', label: 'Design', checked: true },
    { value: 'travel', label: 'Travel' },
  ]}
/>`}
      />
    </>
  )
}
