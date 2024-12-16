import ColorPalette from "@/app/components/Atoms/ColorPalette/ColorPalette";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ColorPalette> = {
  component: ColorPalette,
  title: "Atoms/ColorPalette",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
