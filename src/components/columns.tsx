"use client";

import { ColumnDef } from "@tanstack/react-table";

import { statuses } from "../data/data";
import { Tag } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Tag>[] = [
  {
    accessorKey: "name",
    minSize: 200,

    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div className="flex justify-center items-center -ml-5">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "has_synonyms",

    header: ({ column }) => <DataTableColumnHeader column={column} title="Synonyms" />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue("has_synonyms"));

      if (!status) {
        return null;
      }

      return (
        <div className="flex justify-center items-center">
          <status.icon className={status.value ? "text-green-500" : "text-red-500"} width="20" height="20" />
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "is_moderator_only",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Moderator only" />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue("has_synonyms"));

      if (!status) {
        return null;
      }

      return (
        <div className="flex justify-center items-center">
          <status.icon className={status.value ? "text-green-500" : "text-red-500"} width="20" height="20" />
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "is_required",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Required" />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue("is_required"));

      if (!status) {
        return null;
      }

      return (
        <div className="flex justify-center items-center">
          <status.icon className={status.value ? "text-green-500" : "text-red-500"} width="20" height="20" />
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Count" className="justify-center ml-6" />,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">
          <div>{String(row.getValue("count"))}</div>
        </div>
      );
    },
  },
];
