import type { Meta, StoryObj } from "@storybook/react";
import Light from "@/app/components/Light/Light";

const meta: Meta<typeof Light> = {
  component: Light,
  title: "Example/Light",
  argTypes: {
    varient: {
      control: { type: "select" },
      options: ["green", "yellow", "red"],
    },
    text: {
      control: { type: "text" },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    varient: "green",
    text: "",
  },
};

export const Red: Story = {
  args: {
    varient: "red",
  },
};

export const Yellow: Story = {
  args: {
    varient: "yellow",
  },
};

export const TrafficLight: Story = {
  render: (args) => (
    <>
      <Light text="" varient="red" />
      <Light text="" varient="yellow" />
      <Light text="" varient="green" />
    </>
  ),
};
