import { RadioGroup } from '../../src'

export function RadioGroupSection() {
  return (
    <div class="grid gap-6 sm:grid-cols-2">
      <RadioGroup
        id="layout"
        legend="Layout"
        name="layout"
        value="comfortable"
        hint="You can change this later."
        options={[
          { value: 'comfortable', label: 'Comfortable', hint: 'More space around everything.' },
          { value: 'compact', label: 'Compact', hint: 'Fits more on screen.' },
          { value: 'tiny', label: 'Tiny', disabled: true },
        ]}
      />
      <RadioGroup
        id="visibility"
        legend="Who can see your list"
        name="visibility"
        required
        error="Choose who can see your list."
        options={[
          { value: 'me', label: 'Only me' },
          { value: 'members', label: 'Members' },
          { value: 'everyone', label: 'Everyone' },
        ]}
      />
    </div>
  )
}
