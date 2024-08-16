import type { Meta, StoryObj } from "@storybook/react";
import WifiJoin from "../WifiJoin";

const meta: Meta<typeof WifiJoin> = {
  title: "WifiJoin",
  component: WifiJoin,
  parameters: {
    layout: "centered",
  },
  tags: [],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WifiJoin>;

export const Primary: Story = {
  args: {},
};
