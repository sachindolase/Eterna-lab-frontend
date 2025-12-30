import { Skeleton } from "@/components/atoms/skeleton";

export function TableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[#1a1a1a]">
        <thead className="bg-[#0f0f0f]">
          <tr>
            {Array.from({ length: 6 }).map((_, i) => (
              <th key={i} className="px-2 sm:px-4 py-2 sm:py-3">
                <Skeleton className="h-4 w-16 sm:w-24" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1a1a1a]">
          {Array.from({ length: 8 }).map((_, i) => (
            <tr key={i}>
              {Array.from({ length: 6 }).map((_, j) => (
                <td key={j} className="px-2 sm:px-4 py-3 sm:py-4">
                  <Skeleton className="h-5 sm:h-6 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

