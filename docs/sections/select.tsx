import { Select } from '../../src'
import { CodeBlock } from '../code-block'

export function SelectSection() {
  return (
    <>
      <div class="grid gap-6 sm:grid-cols-2">
        <Select
          id="zone"
          label="Time zone"
          name="zone"
          value="america/regina"
          hint="Used for dates and times."
          options={[
            {
              label: 'America',
              options: [
                { value: 'america/regina', label: 'Regina' },
                { value: 'america/toronto', label: 'Toronto' },
              ],
            },
            {
              label: 'Europe',
              options: [
                { value: 'europe/london', label: 'London' },
                { value: 'europe/paris', label: 'Paris' },
              ],
            },
          ]}
        />
        <Select
          id="language"
          label="Language"
          placeholder="Choose a language"
          required
          options={[
            { value: 'en', label: 'English' },
            { value: 'bn', label: 'Bengali' },
            { value: 'fr', label: 'French' },
          ]}
        />
        <Select
          id="country"
          label="Country"
          placeholder="Choose a country"
          error="Choose a country to continue."
          options={[
            { value: 'ca', label: 'Canada' },
            { value: 'us', label: 'United States' },
          ]}
        />
        <Select id="plan" label="Plan" disabled value="free" options={[{ value: 'free', label: 'Free' }]} />
      </div>
      <CodeBlock
        title="Basic use"
        code={`<Select
  id="zone"
  label="Time zone"
  name="zone"
  value="america/regina"
  options={[
    { value: 'america/regina', label: 'Regina' },
    { value: 'america/toronto', label: 'Toronto' },
  ]}
/>`}
      />
      <CodeBlock
        title="With a placeholder"
        code={`<Select id="language" label="Language" placeholder="Choose a language" required options={languages} />`}
      />
    </>
  )
}
