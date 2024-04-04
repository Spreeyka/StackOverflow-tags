import type { Meta, StoryObj } from "@storybook/react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columnsMock, data } from "./mocks";
import { DataTablePagination } from "../components/data-table-pagination";

const meta = {
  title: "TablePagination",
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof DataTablePagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const DataTablePaginationStory = () => {
  const table = useReactTable({
    data,
    columns: columnsMock,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    pageCount: 25,
  });

  return <DataTablePagination table={table} />;
};

export const TablePagination: Story = {
  render: () => <DataTablePaginationStory />,
};
