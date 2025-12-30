"use client";

import { memo, useEffect, useState } from "react";
import { formatPrice, formatPercentage } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceCellProps {
  price: number;
  change24h: number;
  previousPrice?: number;
}

export const PriceCell = memo(function PriceCell({
  price,
  change24h,
  previousPrice,
}: PriceCellProps) {
  const [priceChange, setPriceChange] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (previousPrice !== undefined) {
      if (price > previousPrice) {
        setPriceChange("up");
      } else if (price < previousPrice) {
        setPriceChange("down");
      }
      const timer = setTimeout(() => setPriceChange(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [price, previousPrice]);

  const isPositive = change24h >= 0;

  return (
    <div
      className={cn(
        "text-sm font-medium transition-colors duration-300",
        priceChange === "up" && "text-green-500",
        priceChange === "down" && "text-red-500",
        !priceChange && "text-white"
      )}
    >
      ${formatPrice(price)}
    </div>
  );
});

