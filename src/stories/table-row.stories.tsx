import type { Meta, StoryObj } from "@storybook/react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { TableSkeleton as TableSkeletonComponent } from "../components/data-table-skeleton";
import { columnsMock, data } from "./mocks";

import { flexRender } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow as TableRowComponent } from "../components/ui/table";
import { columns } from "@/components/columns";
import { mockData } from "./mocks/generator";

const meta = {
  title: "TableRow",
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
    data: mockData,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    pageCount: 25,
  });

  return (
    <Table className="min-w-[800px]">
      <TableBody>
        {table.getRowModel().rows?.length &&
          table
            .getRowModel()
            .rows.slice(1, 2)
            .map((row) => (
              <TableRowComponent key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }} className="!px-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRowComponent>
            ))}
      </TableBody>
    </Table>
  );
};

export const TableRow: Story = {
  render: () => <DataTableSkeletonStory />,
};
