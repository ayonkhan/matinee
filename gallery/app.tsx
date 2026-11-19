import { Hono } from 'hono'
import { Page } from './page'

const app = new Hono()

app.get('/', (c) => {
  const theme = c.req.query('theme') === 'dark' ? 'dark' : 'light'

  return c.html(<Page theme={theme} />)
})

export default app
