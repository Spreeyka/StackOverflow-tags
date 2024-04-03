import { Metadata } from "next";
import { z } from "zod";

import { columns } from "../../components/columns";
import { DataTable } from "../../components/data-table";

import { tagSchema } from "../../data/schema";

export const metadata: Metadata = {
  title: "Tags",
  description: "Stack Overflow tags browser using Tanstack Table.",
};

async function getTags(pagesize = "10", page = "1") {
  try {
    const res = await fetch(
      `https://api.stackexchange.com/2.3/tags?pagesize=${pagesize}&page=${page}&order=desc&sort=popular&site=stackoverflow`
    );
    if (!res.ok) {
      return { items: ["Error"] };
    }
    const tags = await res.json();
    z.array(tagSchema).parse(tags.items);

    return tags;
  } catch (error) {
    console.log("error", error);
    return { items: ["Error"] };
  }
}

export default async function TaskPage({ searchParams }: { searchParams: { pagesize: string; page: string } }) {
  const { page, pagesize } = searchParams;

  const tags = await getTags(pagesize, page);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome!</h2>
            <p className="text-muted-foreground">Here&apos;s a list of Stack Overflow tags</p>
          </div>
        </div>
        <DataTable data={tags.items} columns={columns} />
      </div>
    </>
  );
}
