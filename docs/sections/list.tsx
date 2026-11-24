import { Avatar, Badge, Button, List, ListItem } from '../../src'
import { CodeBlock } from '../code-block'

export function ListSection() {
  return (
    <>
      <div class="flex max-w-xl flex-col gap-6">
        <List label="Recent items">
          <ListItem
            title="Design notes"
            description="Added 3 days ago"
            href="#"
            leading={<Avatar name="Design notes" size="sm" decorative />}
          />
          <ListItem
            title="Travel plans"
            description="Added last week"
            href="#"
            leading={<Avatar name="Travel plans" size="sm" decorative />}
            trailing={<Badge tone="accent">New</Badge>}
          />
          <ListItem
            title="Cooking ideas"
            description="Added last month"
            href="#"
            leading={<Avatar name="Cooking ideas" size="sm" decorative />}
          />
        </List>

        <List label="Removed items">
          <ListItem
            title="Old reading list"
            description="Removed yesterday"
            trailing={
              <Button variant="secondary" href="#">
                Restore
              </Button>
            }
          />
          <ListItem title="Draft" description="Removed last week" trailing={<Badge>Hidden</Badge>} />
        </List>
      </div>
      <p class="type-hint">
        A row with an address is one big link and shows an arrow. A link cannot hold a button, so a row with an action
        uses trailing and has no address.
      </p>
      <CodeBlock
        title="Rows that open something"
        code={`<List label="Recent items">
  <ListItem title="Design notes" description="Added 3 days ago" href="/items/1" />
  <ListItem title="Travel plans" description="Added last week" href="/items/2" />
</List>`}
      />
      <CodeBlock
        title="A row with an action"
        code={`<List label="Removed items">
  <ListItem
    title="Old reading list"
    description="Removed yesterday"
    trailing={<Button variant="secondary" href="/items/3/restore">Restore</Button>}
  />
</List>`}
      />
    </>
  )
}
