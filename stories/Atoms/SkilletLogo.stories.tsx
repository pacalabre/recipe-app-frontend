import SkilletLogo from "@/app/components/Atoms/SkilletLogo/SkilletLogo";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SkilletLogo> = {
  component: SkilletLogo,
  title: "Atoms/SkilletLogo",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
