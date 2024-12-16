import FontHierarchy from "@/app/components/Atoms/FontHierarchy/FontHierarchy";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FontHierarchy> = {
  component: FontHierarchy,
  title: "Atoms/FontHierarchy",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
