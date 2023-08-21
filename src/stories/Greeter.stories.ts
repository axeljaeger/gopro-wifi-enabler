import type { Meta, StoryObj } from '@storybook/react';
import Greeter from '../Greeter';

const meta: Meta<typeof Greeter> = {
  title: 'Greeter',
  component: Greeter,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Greeter>;

export const Primary: Story = {
  args: {},
};
