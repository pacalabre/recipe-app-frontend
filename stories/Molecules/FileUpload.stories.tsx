import FileUpload from "@/app/components/Molecules/FileUpload/FileUpload";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
  title: "Molecules/FileUpload",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
