import Footer from "@/app/components/Molecules/Footer/Footer";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: "Molecules/Footer",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
