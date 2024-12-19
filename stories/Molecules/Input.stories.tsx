import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/app/components/Molecules/Input/Input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Molecules/Input",

  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    formField: "",
    label: "name",
    register: () => {
      return null;
    },
  },
};
