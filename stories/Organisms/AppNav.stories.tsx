import AppNav from "@/app/components/Organisms/AppNav/AppNav";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AppNav> = {
  component: AppNav,
  title: "Organisms/App Navigation",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
