import { columns } from "@/components/columns";
import { Skeleton } from "@/components/ui/skeleton";

export const data = Array(10).fill({
  name: "mock",
  has_synonyms: true,
  is_moderator_only: true,
  is_required: true,
  count: 0,
});

export const columnsMock = columns.map((column) => ({
  ...column,
  cell: () => (
    <div className="flex justify-center items-center">
      <Skeleton className="w-[50%] h-[20px] rounded-lg bg-gray-300" />
    </div>
  ),
}));
