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
import { EmptyStateSection } from './empty-state'
import { FieldSection } from './field'
import { FieldsetSection } from './fieldset'
import { FileInputSection } from './file-input'
import { NoticeSection } from './notice'
import { PosterSection } from './poster'
import { RadioGroupSection } from './radio-group'
import { SegmentedControlSection } from './segmented-control'
import { SelectSection } from './select'
import { SliderSection } from './slider'
import { StarsSection } from './stars'
import { StatSection } from './stat'
import { ToggleSection } from './toggle'
import { TopBarSection } from './top-bar'
import { TypographySection } from './typography'

export type SectionEntry = {
  id: string
  title: string
  Component: FC
}

export type SectionGroup = {
  title: string
  sections: SectionEntry[]
}

// Add a section here and it shows up in the sidebar and on the page.
export const groups: SectionGroup[] = [
  {
    title: 'Foundations',
    sections: [
      { id: 'colours', title: 'Colours', Component: ColoursSection },
      { id: 'typography', title: 'Typography', Component: TypographySection },
    ],
  },
  {
    title: 'Components',
    sections: [
      { id: 'action-bar', title: 'ActionBar', Component: ActionBarSection },
      { id: 'avatar', title: 'Avatar', Component: AvatarSection },
      { id: 'badge', title: 'Badge', Component: BadgeSection },
      { id: 'bottom-nav', title: 'BottomNav', Component: BottomNavSection },
      { id: 'button', title: 'Button', Component: ButtonSection },
      { id: 'card', title: 'Card', Component: CardSection },
      { id: 'checkbox', title: 'Checkbox', Component: CheckboxSection },
      { id: 'code-input', title: 'CodeInput', Component: CodeInputSection },
      { id: 'empty-state', title: 'EmptyState', Component: EmptyStateSection },
      { id: 'field', title: 'Field', Component: FieldSection },
      { id: 'fieldset', title: 'Fieldset', Component: FieldsetSection },
      { id: 'file-input', title: 'FileInput', Component: FileInputSection },
      { id: 'notice', title: 'Notice', Component: NoticeSection },
      { id: 'poster', title: 'Poster', Component: PosterSection },
      { id: 'radio-group', title: 'RadioGroup', Component: RadioGroupSection },
      { id: 'segmented-control', title: 'SegmentedControl', Component: SegmentedControlSection },
      { id: 'select', title: 'Select', Component: SelectSection },
      { id: 'slider', title: 'Slider', Component: SliderSection },
      { id: 'stars', title: 'Stars', Component: StarsSection },
      { id: 'stat', title: 'Stat', Component: StatSection },
      { id: 'toggle', title: 'Toggle', Component: ToggleSection },
      { id: 'top-bar', title: 'TopBar', Component: TopBarSection },
    ],
  },
]
