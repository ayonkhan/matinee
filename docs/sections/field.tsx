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
        value="Night owl. I watch too many films and rate them harshly."
        hint="Shown on your profile. Up to 200 characters."
      />
      <CodeBlock
        title="Basic use"
        code={'<Field id="email" label="Email address" type="email" required hint="Used to sign in." />'}
      />
      <CodeBlock
        title="With an error"
        code={'<Field id="site" label="Website" type="url" error="Enter a full address, starting with https://" />'}
      />
    </>
  )
}
