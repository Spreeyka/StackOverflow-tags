import { z } from "zod";

import { columns } from "../../components/columns";
import { DataTable } from "../../components/data-table";

import { tagSchema } from "../../data/schema";

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

export default async function Table({ page, pagesize }: { page: string; pagesize: string }) {
  const tags = await getTags(pagesize, page);

  return (
    <>
      <DataTable data={tags.items} columns={columns} />
    </>
  );
}
