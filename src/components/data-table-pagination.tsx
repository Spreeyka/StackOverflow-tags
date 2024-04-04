import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  disabled?: boolean;
}

export function DataTablePagination<TData>({ table, disabled }: DataTablePaginationProps<TData>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();
  const params = new URLSearchParams(searchParams);

  return (
    <div className="flex items-center justify-between px-[2px]">
      <div className="flex-1 text-sm text-muted-foreground"></div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={searchParams.get("pagesize")?.toString() || "10"}
            onValueChange={(value) => {
              if (value) {
                params.set("pagesize", value);
              } else {
                params.delete("pagesize");
              }

              replace(`${pathname}?${params.toString()}`);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={searchParams.get("pagesize")?.toString() || "10"} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {searchParams.get("page")?.toString() || table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(0);
              params.set("page", String(1));

              replace(`${pathname}?${params.toString()}`);
            }}
            disabled={!table.getCanPreviousPage() || disabled}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.previousPage();
              const currentPage = table.getState().pagination.pageIndex + 1 - 1;
              if (currentPage) {
                params.set("page", String(currentPage));
              } else {
                params.delete("page");
              }

              replace(`${pathname}?${params.toString()}`);
            }}
            disabled={!table.getCanPreviousPage() || disabled}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.nextPage();
              const currentPage = table.getState().pagination.pageIndex + 1 + 1;
              if (currentPage) {
                params.set("page", String(currentPage));
              } else {
                params.delete("page");
              }

              replace(`${pathname}?${params.toString()}`);
            }}
            disabled={!table.getCanNextPage() || disabled}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
              params.set("page", String(table.getPageCount()));
              replace(`${pathname}?${params.toString()}`);
            }}
            disabled={!table.getCanNextPage() || disabled}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
