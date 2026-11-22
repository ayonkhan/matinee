import type { FC } from 'hono/jsx'
import { ActionBarSection } from './action-bar'
import { AvatarSection } from './avatar'
import { BadgeSection } from './badge'
import { BottomNavSection } from './bottom-nav'
import { ButtonSection } from './button'
import { CardSection } from './card'
import { CheckboxSection } from './checkbox'
import { CodeInputSection } from './code-input'
import { ColoursSection } from './colours'
import { CoverSection } from './cover'
import { DisclosureSection } from './disclosure'
import { EmptyStateSection } from './empty-state'
import { FieldSection } from './field'
import { FieldsetSection } from './fieldset'
import { FileInputSection } from './file-input'
import { GettingStartedSection } from './getting-started'
import { NoticeSection } from './notice'
import { RadioGroupSection } from './radio-group'
import { SegmentedControlSection } from './segmented-control'
import { SelectSection } from './select'
import { SliderSection } from './slider'
import { StarsSection } from './stars'
import { StatSection } from './stat'
import { ToggleSection } from './toggle'
import { TopBarSection } from './top-bar'
import { TypographySection } from './typography'

// The folding groups in the sidebar. Foundations and Start have none.
export type SectionCategory = 'Actions' | 'Display' | 'Forms' | 'Navigation'

export type SectionEntry = {
  id: string
  title: string
  Component: FC
  category?: SectionCategory
}

export type SectionGroup = {
  title: string
  sections: SectionEntry[]
}

// Add a section here and it shows up in the sidebar and on the page.
export const groups: SectionGroup[] = [
  {
    title: 'Start',
    sections: [{ id: 'getting-started', title: 'Getting started', Component: GettingStartedSection }],
  },
  {
    title: 'Foundations',
    sections: [
      { id: 'colours', title: 'Colours', Component: ColoursSection },
      { id: 'typography', title: 'Typography', Component: TypographySection },
    ],
  },
  {
    title: 'Components',
    // Keep each category together and in A to Z order. The page follows this order too.
    sections: [
      { id: 'action-bar', title: 'ActionBar', Component: ActionBarSection, category: 'Actions' },
      { id: 'button', title: 'Button', Component: ButtonSection, category: 'Actions' },
      { id: 'avatar', title: 'Avatar', Component: AvatarSection, category: 'Display' },
      { id: 'badge', title: 'Badge', Component: BadgeSection, category: 'Display' },
      { id: 'card', title: 'Card', Component: CardSection, category: 'Display' },
      { id: 'cover', title: 'Cover', Component: CoverSection, category: 'Display' },
      { id: 'disclosure', title: 'Disclosure', Component: DisclosureSection, category: 'Display' },
      { id: 'empty-state', title: 'EmptyState', Component: EmptyStateSection, category: 'Display' },
      { id: 'notice', title: 'Notice', Component: NoticeSection, category: 'Display' },
      { id: 'stars', title: 'Stars', Component: StarsSection, category: 'Display' },
      { id: 'stat', title: 'Stat', Component: StatSection, category: 'Display' },
      { id: 'checkbox', title: 'Checkbox', Component: CheckboxSection, category: 'Forms' },
      { id: 'code-input', title: 'CodeInput', Component: CodeInputSection, category: 'Forms' },
      { id: 'field', title: 'Field', Component: FieldSection, category: 'Forms' },
      { id: 'fieldset', title: 'Fieldset', Component: FieldsetSection, category: 'Forms' },
      { id: 'file-input', title: 'FileInput', Component: FileInputSection, category: 'Forms' },
      { id: 'radio-group', title: 'RadioGroup', Component: RadioGroupSection, category: 'Forms' },
      { id: 'select', title: 'Select', Component: SelectSection, category: 'Forms' },
      { id: 'slider', title: 'Slider', Component: SliderSection, category: 'Forms' },
      { id: 'toggle', title: 'Toggle', Component: ToggleSection, category: 'Forms' },
      { id: 'bottom-nav', title: 'BottomNav', Component: BottomNavSection, category: 'Navigation' },
      { id: 'segmented-control', title: 'SegmentedControl', Component: SegmentedControlSection, category: 'Navigation' },
      { id: 'top-bar', title: 'TopBar', Component: TopBarSection, category: 'Navigation' },
    ],
  },
]
