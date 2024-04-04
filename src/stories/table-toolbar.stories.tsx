import { DataTableToolbar } from "@/components/data-table-toolbar";
import type { Meta, StoryObj } from "@storybook/react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { data, columnsMock } from "./mocks";

const meta = {
  title: "TableToolbar",
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof DataTableToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const DataTableToolbarStory = () => {
  const table = useReactTable({
    data,
    columns: columnsMock,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    pageCount: 25,
  });

  return <DataTableToolbar table={table} />;
};

export const TableToolbar: Story = {
  render: () => <DataTableToolbarStory />,
};
