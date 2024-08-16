import type { Meta, StoryObj } from "@storybook/react";
import CameraDisplay from "../CameraDisplay";

const meta: Meta<typeof CameraDisplay> = {
  title: "CameraDisplay",
  component: CameraDisplay,
  parameters: {
    layout: "centered",
  },
  tags: [],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CameraDisplay>;

export const Primary: Story = {
  args: {},
};
