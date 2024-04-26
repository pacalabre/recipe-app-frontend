import type { Meta, StoryObj } from "@storybook/react";
import AuthForm from "@/app/components/Auth/Auth";

const meta: Meta<typeof AuthForm> = {
  component: AuthForm,
  title: "Authentication Form",
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
