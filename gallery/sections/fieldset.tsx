import { Field, Fieldset } from '../../src'

export function FieldsetSection() {
  return (
    <>
      <Fieldset id="name" legend="Your name" hint="Shown on your public profile.">
        <div class="grid gap-4 py-2 sm:grid-cols-2">
          <Field id="first" label="First name" />
          <Field id="last" label="Last name" />
        </div>
      </Fieldset>
      <Fieldset id="contact" legend="Contact" required error="Add at least one way to reach you.">
        <div class="grid gap-4 py-2 sm:grid-cols-2">
          <Field id="contact-email" label="Email" type="email" />
          <Field id="contact-phone" label="Phone" type="tel" />
        </div>
      </Fieldset>
    </>
  )
}
