import { ActionBar, Field } from '../../src'
import { CodeBlock } from '../code-block'

export function ActionBarSection() {
  return (
    <>
      <div class="max-w-sm rounded-card border border-line bg-page py-6">
        <ActionBar placement="inline" cancelHref="#" />
      </div>
      <p class="type-hint">It takes the place of the bottom navigation on pages with a form.</p>
      <CodeBlock
        title="Basic use"
        code={`<ActionBar formId="settings" cancelHref="/settings" />`}
      />
      <CodeBlock
        title="Own label"
        code={`<ActionBar label="Save changes" />`}
      />

      <div class="flex max-w-lg flex-col gap-4 rounded-card border border-line bg-page p-4">
        <form id="action-bar-demo" onsubmit="return false">
          <Field id="action-bar-demo-bio" name="bio" label="Bio" hint="Change the text to see the bar." value="" />
        </form>
        <ActionBar
          formId="action-bar-demo"
          placement="inline"
          message="Unsaved changes"
          revealOnChange
        />
      </div>
      <p class="type-hint">
        With a message and revealOnChange, the bar stays out of sight until something in the form differs from how it started, and goes away again if the change is undone. Add
        actionBarScript to the page once. Without JavaScript the bar just stays visible, so the form can still be
        saved. A bar that floats is shown on phones only, unless you add desktop.
      </p>
      <CodeBlock
        title="A save bar that appears when something changes"
        code={`<form id="settings" method="post">
  <Field id="bio" name="bio" label="Bio" />
</form>
<ActionBar formId="settings" message="Unsaved changes" revealOnChange desktop />`}
      />
      <CodeBlock
        title="Add the script once"
        code={`<script dangerouslySetInnerHTML={{ __html: actionBarScript }} />`}
      />
    </>
  )
}
