import { Checkbox, CheckboxGroup } from '../../src'

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
          id="genres"
          legend="Favourite genres"
          name="genre"
          hint="Pick any you like."
          options={[
            { value: 'drama', label: 'Drama', checked: true },
            { value: 'comedy', label: 'Comedy' },
            { value: 'thriller', label: 'Thriller', hint: 'Edge of your seat.' },
            { value: 'horror', label: 'Horror', disabled: true },
          ]}
        />
      </div>
      <p class="type-hint">Each row is at least 44px tall, so it is easy to tap.</p>
    </>
  )
}
