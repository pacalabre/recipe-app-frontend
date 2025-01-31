import NavLogo from "@/app/components/Atoms/NavLogo/NavLogo";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NavLogo> = {
  component: NavLogo,
  title: "Atoms/NavLogo",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
