import Button from "@/app/components/Atoms/Button/Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Atoms/Button",
  argTypes: {
    label: {
      control: { type: "text" },
    },
    varient: {
      options: ["primary", "secondary", "tertiary"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: "submit",
  },
};
