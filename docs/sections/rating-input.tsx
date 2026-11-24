import { RatingInput } from '../../src'
import { CodeBlock } from '../code-block'

export function RatingInputSection() {
  return (
    <>
      <div class="grid gap-6 sm:grid-cols-2">
        <RatingInput id="rating-basic" legend="Your rating" name="rating-basic" />
        <RatingInput
          id="rating-chosen"
          legend="Your rating"
          name="rating-chosen"
          value={4}
          hint="Tap a star to change it."
        />
        <RatingInput
          id="rating-error"
          legend="Your rating"
          name="rating-error"
          required
          error="Choose a rating to continue."
        />
        <RatingInput id="rating-ten" legend="Out of ten" name="rating-ten" max={10} value={7} />
        <RatingInput id="rating-off" legend="Locked" name="rating-off" value={3} disabled />
      </div>
      <p class="type-hint">
        Each star is a radio button, so it works without JavaScript and the form sends a whole number from 1 to the
        top.
      </p>
      <CodeBlock
        title="Basic use"
        code={`<RatingInput id="rating" legend="Your rating" name="rating" value={4} />`}
      />
      <CodeBlock
        title="Out of ten"
        code={`<RatingInput id="score" legend="Score" name="score" max={10} />`}
      />
    </>
  )
}
