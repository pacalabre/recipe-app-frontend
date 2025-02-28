import type { Meta, StoryObj } from "@storybook/react";
import TextArea from "@/app/components/Molecules/TextArea/TextArea";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: "Molecules/TextArea",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    formField: "",
    label: "description",
    register: () => {
      return null;
    },
  },
};
