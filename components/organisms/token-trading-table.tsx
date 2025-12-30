"use client";

import { useEffect, useMemo } from "react";
import { useTokenData } from "@/hooks/use-token-data";
import { useWebSocket } from "@/hooks/use-websocket";
import { useSort } from "@/hooks/use-sort";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTokens, setLoading, setError } from "@/store/tokenSlice";
import { TableHeader } from "@/components/molecules/table-header";
import { TokenRow } from "@/components/molecules/token-row";
import { TableSkeleton } from "@/components/molecules/table-skeleton";
import { ErrorBoundary } from "@/components/molecules/error-boundary";
import { TooltipProvider } from "@/components/molecules/tooltip";
import { cn } from "@/lib/utils";

export function TokenTradingTable() {
  const { data: tokens, isLoading, error } = useTokenData();
  const dispatch = useAppDispatch();
  const storedTokens = useAppSelector((state) => state.tokens.tokens);
  const { sortedTokens, sortConfig, handleSort } = useSort(storedTokens);

  // Sync React Query data to Redux
  useEffect(() => {
    if (tokens) {
      dispatch(setTokens(tokens));
    }
  }, [tokens, dispatch]);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    dispatch(setError(error?.message || null));
  }, [error, dispatch]);

  // Use WebSocket for real-time updates
  useWebSocket(storedTokens);

  // Track previous prices for color transitions
  const previousPrices = useMemo(() => {
    const prices = new Map<string, number>();
    storedTokens.forEach((token) => {
      prices.set(token.id, token.price);
    });
    return prices;
  }, [storedTokens]);

  if (isLoading) {
    return (
      <ErrorBoundary>
        <div className="rounded-lg border border-[#1a1a1a] bg-[#0f0f0f] p-4 sm:p-6">
          <TableSkeleton />
        </div>
      </ErrorBoundary>
    );
  }

  if (error) {
    return (
      <ErrorBoundary>
        <div className="rounded-lg border border-[#1a1a1a] bg-[#0f0f0f] p-4 sm:p-6">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-xl font-semibold text-white mb-2">Failed to load tokens</h2>
            <p className="text-gray-400">{error.message}</p>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <div className="rounded-lg border border-[#1a1a1a] bg-[#0f0f0f] p-2 sm:p-4 lg:p-6 overflow-hidden">
          <div className="overflow-x-auto -mx-2 sm:-mx-4 lg:-mx-6">
            <div className="inline-block min-w-full align-middle px-2 sm:px-4 lg:px-6">
              <table className="min-w-full divide-y divide-[#1a1a1a]">
                <thead className="bg-[#0f0f0f]">
                  <tr>
                    <TableHeader
                      column="name"
                      label="Token"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                      className="min-w-[140px] sm:min-w-[200px]"
                    />
                    <TableHeader
                      column="category"
                      label="Category"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                      className="min-w-[100px] sm:min-w-[120px]"
                    />
                    <TableHeader
                      column="price"
                      label="Price"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                      className="min-w-[100px] sm:min-w-[120px]"
                    />
                    <TableHeader
                      column="volume"
                      label="Volume"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                      className="min-w-[100px] sm:min-w-[120px]"
                    />
                    <TableHeader
                      column="marketCap"
                      label="Market Cap"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                      className="hidden sm:table-cell min-w-[120px]"
                    />
                    <TableHeader
                      column="liquidity"
                      label="Liquidity"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                      className="hidden md:table-cell min-w-[120px]"
                    />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a] bg-[#0a0a0a]">
                  {sortedTokens.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-2 sm:px-4 py-8 text-center text-gray-400">
                        No tokens found
                      </td>
                    </tr>
                  ) : (
                    sortedTokens.map((token) => (
                      <TokenRow
                        key={token.id}
                        token={token}
                        previousPrice={previousPrices.get(token.id)}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </ErrorBoundary>
  );
}

