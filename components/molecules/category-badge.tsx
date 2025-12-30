"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { Token } from "@/lib/types";

interface CategoryBadgeProps {
  category: Token["category"];
}

const categoryConfig = {
  "new-pairs": {
    label: "New Pairs",
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  "final-stretch": {
    label: "Final Stretch",
    className: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  },
  migrated: {
    label: "Migrated",
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
};

export const CategoryBadge = memo(function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = categoryConfig[category];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
});

