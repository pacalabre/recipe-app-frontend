import Button from "@/app/components/Atoms/Button/Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Atoms/Button",
  argTypes: {
    text: {
      control: { type: "text" },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    text: "",
  },
};
