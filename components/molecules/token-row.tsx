"use client";

import { memo, useState, useRef } from "react";
import { Token } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { PriceCell } from "./price-cell";
import { CategoryBadge } from "./category-badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./tooltip";
import { cn } from "@/lib/utils";

interface TokenRowProps {
  token: Token;
  previousPrice?: number;
}

export const TokenRow = memo(function TokenRow({ token, previousPrice }: TokenRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const rowRef = useRef<HTMLTableRowElement>(null);

  return (
    <>
      <tr
        ref={rowRef}
        className={cn(
          "border-b border-[#1a1a1a] transition-all duration-200",
          "hover:bg-[#151515] cursor-pointer",
          isHovered && "bg-[#151515]"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsDialogOpen(true)}
      >
        <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
              {token.symbol[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm font-medium text-white truncate">{token.name}</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="text-xs text-gray-400 hover:text-white transition-colors flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {token.symbol}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="space-y-2">
                      <h4 className="font-medium text-white">{token.name}</h4>
                      <p className="text-sm text-gray-400">{token.description || "No description available"}</p>
                      <div className="pt-2 border-t border-[#2a2a2a]">
                        <div className="text-xs text-gray-500">Pair: {token.pair}</div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </td>
        <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
          <PriceCell price={token.price} change24h={token.priceChange24h} previousPrice={previousPrice} />
        </td>
        <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
          <div
            className={cn(
              "text-xs sm:text-sm font-medium",
              token.priceChange24h >= 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {token.priceChange24h >= 0 ? "+" : ""}
            {token.priceChange24h.toFixed(2)}%
          </div>
        </td>
        <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs sm:text-sm text-white">${formatNumber(token.volume24h)}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>24h Volume: ${token.volume24h.toLocaleString()}</p>
            </TooltipContent>
          </Tooltip>
        </td>
      </tr>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{token.name} ({token.symbol})</DialogTitle>
            <DialogDescription>{token.description || "Token information"}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400">Price</div>
                <div className="text-lg font-semibold text-white">${token.price.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">24h Change</div>
                <div
                  className={cn(
                    "text-lg font-semibold",
                    token.priceChange24h >= 0 ? "text-green-500" : "text-red-500"
                  )}
                >
                  {token.priceChange24h >= 0 ? "+" : ""}
                  {token.priceChange24h.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Volume (24h)</div>
                <div className="text-lg font-semibold text-white">${formatNumber(token.volume24h)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Market Cap</div>
                <div className="text-lg font-semibold text-white">${formatNumber(token.marketCap)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Liquidity</div>
                <div className="text-lg font-semibold text-white">${formatNumber(token.liquidity)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Pair</div>
                <div className="text-lg font-semibold text-white">{token.pair}</div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#2a2a2a]">
              <CategoryBadge category={token.category} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

