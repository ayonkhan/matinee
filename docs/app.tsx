import { Hono } from 'hono'
import { Page } from './page'

const app = new Hono()

app.get('/', (c) => c.html(<Page />))

export default app
