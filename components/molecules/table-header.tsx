"use client";

import { memo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { SortConfig } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TableHeaderProps {
  column: string;
  label: string;
  sortConfig: SortConfig;
  onSort: (column: string) => void;
  className?: string;
}

export const TableHeader = memo(function TableHeader({
  column,
  label,
  sortConfig,
  onSort,
  className,
}: TableHeaderProps) {
  const isSorted = sortConfig.column === column;
  const sortDirection = isSorted ? sortConfig.direction : null;

  return (
    <th
      className={cn(
        "cursor-pointer select-none px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 transition-colors hover:bg-[#1a1a1a] hover:text-white",
        className
      )}
      onClick={() => onSort(column)}
    >
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="truncate">{label}</span>
        <div className="flex flex-col flex-shrink-0">
          {sortDirection === "asc" ? (
            <ArrowUp className="h-3 w-3 text-white" />
          ) : sortDirection === "desc" ? (
            <ArrowDown className="h-3 w-3 text-white" />
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          )}
        </div>
      </div>
    </th>
  );
});

