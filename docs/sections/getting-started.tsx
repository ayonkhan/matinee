import type { PropsWithChildren } from 'hono/jsx'
import { CodeBlock } from '../code-block'

const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Inter:wght@400;500;600&display=swap"
/>`

const firstPage = `import { Hono } from 'hono'
import { Button, Card } from '@ayonkhan/matinee'

const app = new Hono()

app.get('/', (c) =>
  c.html(
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-page font-sans text-ink">
        <Card title="Hello">
          <Button href="/next">Continue</Button>
        </Card>
      </body>
    </html>,
  ),
)

export default app`

function Step(props: PropsWithChildren<{ number: number; title: string }>) {
  return (
    <div class="flex flex-col gap-3">
      <h3 class="font-display text-lg font-bold">
        {props.number}. {props.title}
      </h3>
      {props.children}
    </div>
  )
}

export function GettingStartedSection() {
  return (
    <>
      <p class="type-body max-w-xl text-ink-soft">
        Matinee needs Hono for the components and Tailwind v4 for the styles. Five steps and you have a page.
      </p>

      <Step number={1} title="Install">
        <p class="type-body max-w-xl text-ink-soft">
          Add the package. Hono and Tailwind v4 are peer dependencies, so add them too if your project does not have
          them yet.
        </p>
        <CodeBlock language="bash" code="pnpm add @ayonkhan/matinee" />
        <CodeBlock language="bash" code="pnpm add hono tailwindcss" />
      </Step>

      <Step number={2} title="Load the theme">
        <p class="type-body max-w-xl text-ink-soft">
          Add the theme to your main CSS file. The last line matters most. It tells Tailwind to look inside Matinee for
          class names. Without it the components load with no styles.
        </p>
        <CodeBlock
          language="css"
          code={`@import "tailwindcss";
@import "@ayonkhan/matinee/theme.css";

@source "../node_modules/@ayonkhan/matinee/dist";`}
        />
      </Step>

      <Step number={3} title="Load the fonts">
        <p class="type-body max-w-xl text-ink-soft">
          The fonts are not bundled. Add these to the head of your page, or host the files yourself.
        </p>
        <CodeBlock language="html" code={fonts} />
      </Step>

      <Step number={4} title="Choose a theme">
        <p class="type-body max-w-xl text-ink-soft">
          Light is the default. For dark, set <code class="type-code">data-theme</code> on the html element. Matinee does
          not pick for you, so read the choice from a cookie or a setting on the server.
        </p>
        <CodeBlock language="html" code={`<html lang="en" data-theme="dark">`} />
      </Step>

      <Step number={5} title="Build a page">
        <p class="type-body max-w-xl text-ink-soft">
          Set your JSX to Hono in <code class="type-code">tsconfig.json</code>, then use the components in a route.
        </p>
        <CodeBlock
          language="json"
          code={`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "hono/jsx"
  }
}`}
        />
        <CodeBlock code={firstPage} />
      </Step>
    </>
  )
}
