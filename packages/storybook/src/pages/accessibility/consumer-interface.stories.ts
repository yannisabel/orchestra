import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta = {
  title: 'Accessibility/Consumer Interface',
  render: () => {
    const section = document.createElement('section')
    section.setAttribute('aria-label', 'Preferences')
    section.innerHTML = `
      <orchestra-checkbox label="Accept privacy policy"></orchestra-checkbox>
      <orchestra-button text="Save changes"></orchestra-button>
      <orchestra-button text="Unavailable action" disabled></orchestra-button>
      <orchestra-icon name="checkbox-check" size="24px" label="Completed"></orchestra-icon>
      <orchestra-icon name="checkbox-check" size="24px"></orchestra-icon>
      <p role="status">Not saved</p>
    `
    let saveCount = 0
    section.querySelector('orchestra-button')?.addEventListener('click', () => {
      saveCount += 1
      const status = section.querySelector('[role="status"]')
      if (status)
        status.textContent = `Saved ${saveCount} ${saveCount === 1 ? 'time' : 'times'}`
    })
    return section
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Preferences: Story = {}
