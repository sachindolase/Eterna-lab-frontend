"use client";

import { memo, useState } from "react";
import { Zap, Menu, ArrowUpDown } from "lucide-react";
import { Token } from "@/lib/types";
import { TokenRow } from "@/components/molecules/token-row";
import { TableHeader } from "@/components/molecules/table-header";
import { TableSkeleton } from "@/components/molecules/table-skeleton";
import { useSort } from "@/hooks/use-sort";
import { cn } from "@/lib/utils";

interface CategorySectionProps {
  title: "New Pairs" | "Final Stretch" | "Migrated";
  tokens: Token[];
  isLoading?: boolean;
  previousPrices: Map<string, number>;
}

const categoryMap = {
  "New Pairs": "new-pairs" as const,
  "Final Stretch": "final-stretch" as const,
  Migrated: "migrated" as const,
};

export const CategorySection = memo(function CategorySection({
  title,
  tokens,
  isLoading,
  previousPrices,
}: CategorySectionProps) {
  const [activeTab, setActiveTab] = useState("P1");
  const { sortedTokens, sortConfig, handleSort } = useSort(tokens);

  const categoryTokens = sortedTokens.filter(
    (token) => token.category === categoryMap[title]
  );

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] min-h-[500px] bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium text-white">{title}</h3>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-xs text-gray-400">{categoryTokens.length}</span>
          </div>
          <Menu className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
        </div>

        {/* P1 P2 P3 Tabs */}
        <div className="flex items-center gap-1">
          {["P1", "P2", "P3"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-2 py-1 text-xs font-medium rounded transition-colors",
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sort Icon */}
        <button
          onClick={() => handleSort("price")}
          className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
        >
          <ArrowUpDown className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton />
          </div>
        ) : categoryTokens.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
            No tokens in {title}
          </div>
        ) : (
          <div className="overflow-y-auto h-full">
            <table className="w-full divide-y divide-[#1a1a1a]">
              <thead className="bg-[#0f0f0f] sticky top-0 z-10">
                <tr>
                  <TableHeader
                    column="name"
                    label="Token"
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    className="min-w-[140px]"
                  />
                  <TableHeader
                    column="price"
                    label="Price"
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    className="min-w-[100px]"
                  />
                  <TableHeader
                    column="change24h"
                    label="24h"
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    className="min-w-[80px]"
                  />
                  <TableHeader
                    column="volume"
                    label="Volume"
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    className="min-w-[100px]"
                  />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a] bg-[#0a0a0a]">
                {categoryTokens.map((token) => (
                  <TokenRow
                    key={token.id}
                    token={token}
                    previousPrice={previousPrices.get(token.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
});

