"use client";

import { useEffect, useMemo } from "react";
import { Header } from "@/components/organisms/header";
import { PulseHeader } from "@/components/organisms/pulse-header";
import { CategorySection } from "@/components/organisms/category-section";
import { StatusBar } from "@/components/organisms/status-bar";
import { useTokenData } from "@/hooks/use-token-data";
import { useWebSocket } from "@/hooks/use-websocket";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTokens } from "@/store/tokenSlice";
import { ErrorBoundary } from "@/components/molecules/error-boundary";
import { TooltipProvider } from "@/components/molecules/tooltip";

export default function Home() {
  const { data: tokens } = useTokenData();
  const dispatch = useAppDispatch();
  const storedTokens = useAppSelector((state) => state.tokens.tokens);

  // Sync React Query data to Redux
  useEffect(() => {
    if (tokens) {
      dispatch(setTokens(tokens));
    }
  }, [tokens, dispatch]);

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

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
          <Header />
          
          <main className="flex-1 pb-12">
            <PulseHeader />
            
            {/* Three Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 sm:p-6">
              <CategorySection
                title="New Pairs"
                tokens={storedTokens}
                previousPrices={previousPrices}
              />
              <CategorySection
                title="Final Stretch"
                tokens={storedTokens}
                previousPrices={previousPrices}
              />
              <CategorySection
                title="Migrated"
                tokens={storedTokens}
                previousPrices={previousPrices}
              />
            </div>
          </main>

          <StatusBar />
        </div>
      </TooltipProvider>
    </ErrorBoundary>
  );
}

