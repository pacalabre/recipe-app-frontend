import type { Meta, StoryObj } from "@storybook/react";
import FooterLogo from "@/app/components/Atoms/FooterLogo/FooterLogo";

const meta: Meta<typeof FooterLogo> = {
  component: FooterLogo,
  title: "Atoms/FooterLogo",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
