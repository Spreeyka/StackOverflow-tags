"use client";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./columns";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function TableSkeleton() {
  const searchParams = useSearchParams();
  const pagesize = Number(searchParams.get("pagesize")) || 10;

  const data = useMemo(() => {
    return Array(pagesize).fill({
      name: "mock",
      has_synonyms: true,
      is_moderator_only: true,
      is_required: true,
      count: 0,
    });
  }, [pagesize]);

  const columnsMock = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      cell: () => (
        <div className="flex justify-center items-center">
          <Skeleton className="w-[50%] h-[20px] rounded-lg bg-gray-300" />
        </div>
      ),
    }));
  }, []);

  const table = useReactTable({
    data,
    columns: columnsMock,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: 25,
  });

  return (
    <div className="space-y-4 !mt-0">
      <div className="flex justify-between mt-8 w-full">
        <DataTableToolbar table={table} />
        <DataTablePagination table={table} disabled={true} />
      </div>
      <div className="rounded-md border">
        <Table className="min-w-[800px]">
          <TableHeader>
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
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length &&
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
