import { Metadata } from "next";

import { TableSkeleton } from "@/components/data-table-skeleton";
import { Suspense } from "react";
import Table from "./table";

export const metadata: Metadata = {
  title: "Tags",
  description: "Stack Overflow tags browser using Tanstack Table.",
};

export default async function TaskPage({
  searchParams,
}: {
  searchParams: { pagesize: string; page: string; order: string; sort: string };
}) {
  const { page, pagesize, sort, order } = searchParams;
  const searchParamsString = String(page) + String(pagesize) + String(sort) + String(order);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div className="ml-[2px]">
            <h2 className="text-2xl font-bold tracking-tight">Welcome!</h2>
            <p className="text-muted-foreground">Here&apos;s a list of Stack Overflow tags</p>
          </div>
        </div>
        <Suspense key={searchParamsString} fallback={<TableSkeleton />}>
          <Table page={page} pagesize={pagesize} sort={sort} order={order} />
        </Suspense>
      </div>
    </>
  );
}
