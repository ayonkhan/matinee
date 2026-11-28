import { Field } from '../../src'
import { CodeBlock } from '../code-block'

export function FieldSection() {
  return (
    <>
      <div class="grid gap-6 sm:grid-cols-2">
        <Field id="username" label="Username" placeholder="swift-raven-5065" hint="Shown on your public profile." />
        <Field
          id="email"
          label="Email address"
          type="email"
          required
          value="name@example.com"
          hint="Used to sign in. Never shown on your profile."
        />
        <Field
          id="site"
          label="Website"
          type="url"
          value="example"
          error="Enter a full address, starting with https://"
        />
        <Field id="username-locked" label="Username, locked" readonly value="swift-raven-5065" />
        <Field id="off" label="Disabled" disabled value="Not available" />
        <Field id="date" label="Date" type="date" value="2026-11-21" />
        <Field id="time" label="Time" type="time" value="19:30" />
        <Field id="when" label="Date and time" type="datetime-local" value="2026-11-21T19:30" />
        <Field id="month" label="Month" type="month" value="2026-11" />
      </div>
      <Field
        id="bio"
        label="Bio"
        multiline
        rows={3}
        value="Night owl. I collect far too many things."
        hint="Shown on your profile. Up to 200 characters."
      />
      <CodeBlock
        title="Basic use"
        code={'<Field id="email" label="Email address" type="email" required hint="Used to sign in." />'}
      />
      <CodeBlock
        title="Tuned for a username"
        code={`<Field
  id="username"
  label="Username"
  required
  minlength={3}
  maxlength={20}
  autocomplete="username"
  autocapitalize="none"
  spellcheck={false}
/>`}
      />
      <p class="type-hint">
        By default the browser shows its own pop-up when a required field is empty or a pattern does not match. Mark
        the form with data-inline-errors and add inlineErrorsScript to the page once, and the message shows under the
        field instead, in your own words with invalidMessage. The first field with a problem gets the cursor, and
        typing clears its message. Field, CodeInput and Checkbox all take invalidMessage. Without the script the
        browser's pop-up still works, so nothing breaks.
      </p>
      <CodeBlock
        title="Messages under the field"
        code={`<form method="post" action="/sign-in" data-inline-errors>
  <Field
    id="email"
    label="Email address"
    type="email"
    required
    invalidMessage="Enter a valid email address."
  />
  <Button type="submit">Send me a code</Button>
</form>`}
      />
      <CodeBlock
        title="Add the script once"
        code={`import { raw } from 'hono/html'
import { inlineErrorsScript } from '@ayonkhan/matinee'

<script>{raw(inlineErrorsScript)}</script>`}
      />
      <CodeBlock
        title="With an error"
        code={'<Field id="site" label="Website" type="url" error="Enter a full address, starting with https://" />'}
      />
    </>
  )
}
