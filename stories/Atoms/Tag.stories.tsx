import Tag from "@/app/components/Atoms/Tag/Tag";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: "Atoms/Tag",
  argTypes: {
    label: {
      control: { type: "text" },
    },
    isActive: {
      options: [true, false],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: "Italian",
  },
};
