import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

const sortMap: Record<string, string> = {
  Name: "name",
  Count: "popular",
};

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2 justify-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span>{title}</span>
            {params.get("order") === "desc" && sortMap[title] === params.get("sort") ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : params.get("order") === "asc" && sortMap[title] === params.get("sort") ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => {
              column.toggleSorting(false);
              params.set("sort", sortMap[title]);
              params.set("order", "asc");
              replace(`${pathname}?${params.toString()}`);
            }}
          >
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              column.toggleSorting(true);
              params.set("sort", sortMap[title]);
              params.set("order", "desc");
              replace(`${pathname}?${params.toString()}`);
            }}
          >
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              column.toggleVisibility(false);
            }}
          >
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
