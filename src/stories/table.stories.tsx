import { TableHeader } from "../components/ui/table";

import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import type { Meta, StoryObj } from "@storybook/react";
import { mockData } from "./mocks/generator";

const meta = {
  title: "Table",
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof TableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Table: Story = {
  render: () => <DataTable data={mockData} columns={columns} />,
};
