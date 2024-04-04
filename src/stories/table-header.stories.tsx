import type { Meta, StoryObj } from "@storybook/react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { TableSkeleton as TableSkeletonComponent } from "../components/data-table-skeleton";
import { columnsMock, data } from "./mocks";

import { flexRender } from "@tanstack/react-table";

import { Table, TableHead, TableHeader as TableHeaderComponent, TableRow } from "../components/ui/table";

const meta = {
  title: "TableHeader",
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof TableSkeletonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const DataTableSkeletonStory = () => {
  const table = useReactTable({
    data,
    columns: columnsMock,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    pageCount: 25,
  });

  return (
    <Table className="min-w-[800px]">
      <TableHeaderComponent>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} colSpan={header.colSpan} className="text-center">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeaderComponent>
    </Table>
  );
};

export const TableHeader: Story = {
  render: () => <DataTableSkeletonStory />,
};
